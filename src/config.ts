import { cleanEnv, url, port, str, bool, num } from "envalid";

/**
 * Application configuration
 */
export default cleanEnv(process.env, {
  DATABASE_URL: url(),
  SERVER_URL: url(),
  SERVER_PORT: port(),
  REDIS_URL: str(),
  JWKS_KEY_FILE_PATH: str(),
  CLIENT_ID: str(),
  CLIENT_SECRET: str(),
  CLIENT_REDIRECT_URL: str(),
  CLIENT_POST_LOGOUT_REDIRECT_URL: url(),
  USE_PROXY: bool(),
  PASSWORD_HASH_SETTINGS: str(),
  COOKIE_SECRET: str(),
  COOKIE_MAX_AGE: num(),
  DEBUG: bool({default: false}),
  IMPERSONATE_MASTER_PASSWORD: str({default: ""})
});