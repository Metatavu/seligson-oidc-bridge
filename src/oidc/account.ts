import Encryption from "src/encyption";
import Database from "../database";
import { strings } from "../localization/strings";

/**
 * Account handler. 
 */
export default class Account {

  /**
   * Finds account by account id
   * 
   * @param _ctx context
   * @param id account id
   * @returns account or undefined if not found
   */
  static async findAccount(_ctx: any, id: string): Promise<any> {
    try {
      const userAccount = await Database.findUserAccountById({ id: parseInt(id) });
      if (!userAccount) {
        console.warn("Account not found");
        return undefined;
      }

      const companyRah = await Database.findCompanyRahByComCode({ comCode: userAccount.comCode });
      if (!companyRah) {
        console.warn("Company not found for an account");
        return undefined;
      }

      const addressRah = await Database.findAddressRahByComCode({ comCode: userAccount.comCode });
      if (!addressRah) {
        console.warn("Address not found for an account");
        return undefined;
      }
      
      return {
        accountId: id,
        async claims() {
          return {
            email_verified: true,
            sub: id,
            email: addressRah.EMAIL,
            phone: addressRah.PHONE,
            given_name: companyRah.FIRST_NAME,
            family_name: companyRah.LAST_NAME,
            ssn: companyRah.SO_SEC_NR
          };
        },
      };
    } catch(e) {
      console.error("Unhandled error while finding account", e);
      return undefined;
    }
  }

  /**
   * Authenticates the user with given username and password
   * 
   * @param username username
   * @param password password
   * @returns user id
   */
  static async authenticate(username?: string, password?: string): Promise<string> {
    if (!username || !password) {
      return Promise.reject(strings.missingCredentialsError);
    }
    
    const userAccount = await Database.findUserAccountByUsername({
      username: username
    });
    
    if (!userAccount || !userAccount.id) {
      console.warn("User account not found");
      return Promise.reject(strings.wrongUsernameOrPasswordError);
    }

    if (!userAccount.random) {
      console.warn("User account random not found");
      return Promise.reject(strings.wrongUsernameOrPasswordError);
    }

    const hash = await Encryption.createPasswordhash(password, userAccount.random);
    if (hash != userAccount.hash) {
      console.warn("Password did not match", hash, userAccount.hash);
      return Promise.reject(strings.wrongUsernameOrPasswordError);
    }

    return userAccount.id.toString();
  }

}
