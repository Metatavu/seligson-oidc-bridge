import { Sequelize } from "sequelize";
import config from "../config";
import { UserAccount } from "./models/UserAccount";
import { COMPANYrah } from "./models/COMPANYrah";
import { ADDRESSrah } from "./models/ADDRESSrah";

const sequelize = new Sequelize(config.DATABASE_URL, {
  logging: false
});

UserAccount.initModel(sequelize);
COMPANYrah.initModel(sequelize);
ADDRESSrah.initModel(sequelize);

/**
 * Database operations
 */
export default class Database {

  /**
   * Finds user account by id
   * 
   * @param opts options
   * @returns account or null if not found
   */
  public static findUserAccountById(opts: { id: number }): Promise<UserAccount> {
    const { id } = opts;
    return UserAccount.findByPk(id);
  }

  /**
   * Finds user account by username
   * 
   * @param opts options
   * @returns account or null if not found
   */
  public static findUserAccountByUsername(opts: { username: string }): Promise<UserAccount | null> {
    const { username } = opts;

    return UserAccount.findOne({
      where: {
        userName: username
      }
    });
  }

  /**
   * Finds company by comcode
   * 
   * @param opts options
   * @returns company or null if not found
   */
  public static findCompanyRahByComCode(opts: { comCode: number }): Promise<COMPANYrah> {
    const {comCode } = opts;

    return COMPANYrah.findOne({
      where: {
        COM_CODE: comCode
      }
    });
  }

  /**
   * Finds address by comcode
   * 
   * @param opts options
   * @returns address or null if not found
   */
  public static findAddressRahByComCode(opts: { comCode: number }): Promise<ADDRESSrah> {
    const {comCode } = opts;

    return ADDRESSrah.findOne({
      where: {
        COM_CODE: comCode
      }
    });
  }

}

