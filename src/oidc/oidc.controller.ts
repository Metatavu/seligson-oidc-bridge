import * as dotenv from 'dotenv';
dotenv.config();
import { Controller, All, Req, Res, Post, Body, HttpException, HttpStatus, Logger, Get, Param, UseFilters } from '@nestjs/common';
import { Provider, Configuration } from 'oidc-provider';
import { Request, Response } from 'express';
import Account from './account';
import { strings } from '../localization/strings';
import { HttpExceptionFilter } from './http-exception.filter';
import RedisAdapter from "./redisadapter";
import Config from '../config';

/**
 * Open id connector class
 */
@Controller('oidc')
export class OidcController {

  /**
   * Logger
   */
  private readonly logger = new Logger(OidcController.name);
  private configuration: Configuration;
  private oidc: Provider;
  private callback: any;

  constructor() {

    strings.setLanguage("fi");

    this.configuration = {
      adapter: RedisAdapter,
      
      features: {
        introspection: { enabled: true },
        revocation: { enabled: true },
        backchannelLogout: { enabled: true },
        rpInitiatedLogout: {
          enabled: true,
          logoutSource: (ctx, form) => {
            ctx.body = `
              <!DOCTYPE html>
                <head>
                  <title>Logout Request</title>
                  <link rel="stylesheet" type="text/css" href="/css/redirect-form.css"/>                
                </head>
                <body>
                  <div class="wrapper">
                    <div class="container">
                      <h3>${strings.loggingOutHeader}</h3>
                      <p>${strings.loggingOutText}</p>
                      ${form}
                      <button id="continue-button" autofocus type="submit" form="op.logoutForm" value="yes" name="logout">${strings.loggingOutButton}</button>
                    </div>
                  </div>
                  <script>
                    setTimeout(function() {
                      document.getElementById("continue-button").click();
                    }, 3000)
                  </script>
                </body>
              </html>
            `;
          }
        }
      },
      claims: {
        email: ['email', 'email_verified'],
        profile: ['family_name', 'given_name', 'name']
      },
      cookies: {
        keys: [Config.COOKIE_SECRET],
        long: { maxAge: Number(Config.COOKIE_MAX_AGE) }
      },
      jwks: {
        keys: require(Config.JWKS_KEY_FILE_PATH)
      },
      ttl: {
        IdToken: 5,
        AccessToken: 5,
      },
      expiresWithSession: (ctx, token) => false,
      clients: [{
        client_id: Config.CLIENT_ID,
        client_secret: Config.CLIENT_SECRET,
        redirect_uris: [Config.CLIENT_REDIRECT_URL],
        post_logout_redirect_uris: [Config.CLIENT_POST_LOGOUT_REDIRECT_URL]
      }],
      findAccount: Account.findAccount
    };

    this.oidc = new Provider(`${ Config.SERVER_URL }:${ Config.SERVER_PORT }`, this.configuration);
    this.oidc.proxy = Config.USE_PROXY ? true : false;
    this.callback = this.oidc.callback();
  }

  /**
   * Method for logging in to Koha
   *
   * @param req request
   * @param res response
   * @param body request body
   */
  @Post("/interaction/:uid")
  @UseFilters(new HttpExceptionFilter())
  public async login(@Req() req: Request, @Res() res: Response, @Body() body: any, @Param("uid") uid) {
    try {
      const interactionDetails = await this.oidc.interactionDetails(req, res);
      const { prompt: { name } } = interactionDetails;

      if (name === "login") {
        try {
          const { login, password } = body;
          const accountId = await Account.authenticate(login, password);

          if (!accountId) {
            return res.render(name, { uid: uid, strings: strings, error: strings.wrongUsernameOrPasswordError });
          }
          
          const result = {
            login: {
              remember: false,
              accountId: accountId,
            },
          };

          return await this.oidc.interactionFinished(req, res, result, {
            mergeWithLastSubmission: false
          });
        } catch(e) {
          return res.render(name, { uid: uid, strings: strings, error: e });
        }

      } else if ( name === "consent") {
        const { prompt: { details }, params, session: { accountId } } = interactionDetails;
        let { grantId } = interactionDetails;
        let grant;

        if (grantId) {
          // we'll be modifying existing grant in existing session
          grant = await this.oidc.Grant.find(grantId);
        } else {
          // we're establishing a new grant
          grant = new this.oidc.Grant({
            accountId,
            clientId: params.client_id,
          });
        }

        if (details.missingOIDCScope) {
          grant.addOIDCScope(details.missingOIDCScope.join(' '));
        }
        if (details.missingOIDCClaims) {
          grant.addOIDCClaims(details.missingOIDCClaims);
        }
        if (details.missingResourceScopes) {
          // eslint-disable-next-line no-restricted-syntax
          for (const [indicator, scopes] of Object.entries(details.missingResourceScopes)) {
            grant.addResourceScope(indicator, (scopes as any).join(' '));
          }
        }

        grantId = await grant.save();

        const consent: any = {};
        if (!interactionDetails.grantId) {
          // we don't have to pass grantId to consent, we're just modifying existing one
          consent.grantId = grantId;
        }

        const result = { consent };
        await this.oidc.interactionFinished(req, res, result, { mergeWithLastSubmission: true });
      } else {
        throw new HttpException("Interaction not supported", HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      this.logger.error(err);
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/interaction/:uid")
  @UseFilters(new HttpExceptionFilter())
  public async renderLoginForm(@Req() req: Request, @Res() res: Response, @Param("uid") uid) {
    const information = await this.oidc.interactionDetails(req, res);
    const { prompt, params, session } = information;
    const client = await this.oidc.Client.find(params.client_id);
    const { name, details } = prompt;

    switch(name) {
      case "login":
        return res.render(name, { uid: uid, strings: strings });
      case "consent":
        const account = await this.oidc.Account.findAccount(undefined, String(session.accountId));
        if (!account) {
          return;
        }

        const claims = await account.claims(name, "profile email", {email: null, profile: null}, []);
        
        return res.render(name, {
          params,
          uid: uid,
          client: client,
          claims: claims,
          strings: strings,
          details: details,
          title: 'Authorize',
          session: session ? session : undefined,
          dbg: { params: params, prompt: prompt, }
        });
      default:
        return res.send(404);
    }
  }

  /**
   * Method for open id connector mounted event
   *
   * @param req request
   * @param res response
   */
  @All('/*')
  public mountedOidc(@Req() req: Request, @Res() res: Response) {
    req.url = req.originalUrl.replace('/oidc', '');
    return this.callback(req, res);
  }
}