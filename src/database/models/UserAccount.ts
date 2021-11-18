import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UserAccountAttributes {
  id: number;
  userName: string;
  hash: string;
  random?: string;
  comCode: number;
  __contractID?: number;
  disabled: boolean;
  readOnly: boolean;
  notificationEnabled: boolean;
  contractUpdateOverride: boolean;
  lastPasswordChange?: Date;
  notificationEmail?: string;
  lastRedemptionExitPollResponse?: Date;
  portfolioCreateEnabled?: number;
  contractUpdateDate?: Date;
  bankAccountChangeDisabled?: boolean;
  bankIdRedemptionValidation?: string;
  accountStatus?: number;
  notificationEnabledMobile?: boolean;
  traditionalLoginDisabled?: number;
}

export type UserAccountPk = "id";
export type UserAccountId = UserAccount[UserAccountPk];
export type UserAccountOptionalAttributes = "id" | "random" | "__contractID" | "disabled" | "readOnly" | "notificationEnabled" | "contractUpdateOverride" | "lastPasswordChange" | "notificationEmail" | "lastRedemptionExitPollResponse" | "portfolioCreateEnabled" | "contractUpdateDate" | "bankAccountChangeDisabled" | "bankIdRedemptionValidation" | "accountStatus" | "notificationEnabledMobile" | "traditionalLoginDisabled";
export type UserAccountCreationAttributes = Optional<UserAccountAttributes, UserAccountOptionalAttributes>;

export class UserAccount extends Model<UserAccountAttributes, UserAccountCreationAttributes> implements UserAccountAttributes {
  id!: number;
  userName!: string;
  hash!: string;
  random?: string;
  comCode!: number;
  __contractID?: number;
  disabled!: boolean;
  readOnly!: boolean;
  notificationEnabled!: boolean;
  contractUpdateOverride!: boolean;
  lastPasswordChange?: Date;
  notificationEmail?: string;
  lastRedemptionExitPollResponse?: Date;
  portfolioCreateEnabled?: number;
  contractUpdateDate?: Date;
  bankAccountChangeDisabled?: boolean;
  bankIdRedemptionValidation?: string;
  accountStatus?: number;
  notificationEnabledMobile?: boolean;
  traditionalLoginDisabled?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof UserAccount {
    UserAccount.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING(48),
      allowNull: false,
      unique: "userName"
    },
    hash: {
      type: DataTypes.STRING(48),
      allowNull: false
    },
    random: {
      type: DataTypes.CHAR(22),
      allowNull: true
    },
    comCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "comCode"
    },
    __contractID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: "contractID"
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    readOnly: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    notificationEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    contractUpdateOverride: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    lastPasswordChange: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notificationEmail: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    lastRedemptionExitPollResponse: {
      type: DataTypes.DATE,
      allowNull: true
    },
    portfolioCreateEnabled: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    contractUpdateDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    bankAccountChangeDisabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    bankIdRedemptionValidation: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    accountStatus: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    notificationEnabledMobile: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    traditionalLoginDisabled: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'UserAccount',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "userName",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userName" },
        ]
      },
      {
        name: "comCode",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "comCode" },
        ]
      },
      {
        name: "contractID",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "__contractID" },
        ]
      },
      {
        name: "userName_2",
        using: "BTREE",
        fields: [
          { name: "userName", length: 8 },
        ]
      },
      {
        name: "accountStatus",
        using: "BTREE",
        fields: [
          { name: "accountStatus" },
        ]
      },
      {
        name: "contractUpdateDate",
        using: "BTREE",
        fields: [
          { name: "contractUpdateDate" },
        ]
      },
    ]
  });
  return UserAccount;
  }
}
