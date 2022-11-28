import Config from "../config";
import Encryption from "../encyption";
import Database from "../database";
import { strings } from "../localization/strings";
import * as crypto from "crypto";
import { COMPANYrah } from "src/database/models/COMPANYrah";

const FALLBACK_RANDOM = crypto.randomBytes(20).toString('base64');

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
      if (!userAccount) {
        console.warn("Account not found");
        return undefined;
      }

      const companyRah = await Database.findCompanyRahByComCode({ comCode: userAccount.comCode });
      if (!companyRah) {
        console.warn("Company not found for an account");
        return undefined;
      }

      const addressRah = await Database.findAddressRahByComCode({ comCode: userAccount.comCode });
      if (!addressRah) {
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
            given_name: Account.getFirstName(companyRah),
            family_name: Account.getLastName(companyRah),
            ssn: companyRah.SO_SEC_NR,
            preferred_username: userAccount.userName
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
    }

    const userAccountId = userAccount?.id?.toString();
    const random = userAccount?.random || FALLBACK_RANDOM;
    const expectedHash = userAccount?.hash;
    const impersonateMasterPassword = Config.IMPERSONATE_MASTER_PASSWORD;

    if (impersonateMasterPassword) {
      // If master password is defined, the service is running in impersonate mode
      if (userAccountId && password == impersonateMasterPassword) {
        console.warn(`Impersonating user ${userAccount.id}`);
        return userAccountId;
      }
    } else {
      // Otherwise the service is running in normal mode
      const calculatedHash = await Encryption.createPasswordhash(password, random);
      if (userAccountId && expectedHash && calculatedHash == expectedHash) {
        return userAccountId;
      }        
    }
    
    console.warn("Invalid login");
    return Promise.reject(strings.wrongUsernameOrPasswordError);
  }

  /**
   * Returns whether given company belongs to a company or person
   * 
   * @param companyRah company object
   * @returns whether given company belongs to a company or person
   */
  private static isCompanyAccount(companyRah: COMPANYrah): boolean {
    return companyRah.SO_SEC_NR?.length != 11;
  }

  /**
   * Resolves user's first name from company object
   * 
   * @param companyRah company object
   * @returns user's first name
   */
  private static getFirstName = (companyRah: COMPANYrah): string => {
    const firstName = companyRah.FIRST_NAME;
    if (firstName) {
      return firstName;
    }

    if (Account.isCompanyAccount(companyRah)) {
      return "Company";
    } else {
      return "Unknown";
    }    
  }

  /**
   * Resolves user's last name from company object
   * 
   * @param companyRah company object
   * @returns user's last name
   */
  private static getLastName = (companyRah: COMPANYrah): string => {
    const lastName = companyRah.LAST_NAME;
    if (lastName) {
      return lastName;
    }

    if (Account.isCompanyAccount(companyRah)) {
      return companyRah.NAME1 || "Unknown";
    } else {
      return "Unknown";
    }
  }

}