import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ADDRESSrahAttributes {
  CON_CODE?: string;
  ADDRESS1?: string;
  ADDRESS2?: string;
  ZIP?: string;
  ADDRESS3?: string;
  ADDRESS4?: string;
  PHONE?: string;
  TELEFAX?: string;
  TELEX?: string;
  DEF_ADDR?: string;
  ADDR_NR?: number;
  COM_CODE?: string;
  EMAIL?: string;
  TRADEACCLIMITED?: string;
  PHONE2?: string;
  CONTACT?: string;
  OWNER_TYPE?: string;
  ADDRESS_TYPE?: string;
  ADDRESS_CODE?: number;
  MOBILE?: string;
  USER_ID?: string;
  PORID?: string;
  BEGIN_DATE?: Date;
  END_DATE?: Date;
  DUAL_USER?: string;
  A_COM_CODE?: string;
  ACC_CODE?: string;
  COM_TYPE?: string;
  EXT_SYSTEM_ID?: number;
  EXT_SYSTEM_UNIQUE_ID?: string;
}

export type ADDRESSrahOptionalAttributes = "CON_CODE" | "ADDRESS1" | "ADDRESS2" | "ZIP" | "ADDRESS3" | "ADDRESS4" | "PHONE" | "TELEFAX" | "TELEX" | "DEF_ADDR" | "ADDR_NR" | "COM_CODE" | "EMAIL" | "TRADEACCLIMITED" | "PHONE2" | "CONTACT" | "OWNER_TYPE" | "ADDRESS_TYPE" | "ADDRESS_CODE" | "MOBILE" | "USER_ID" | "PORID" | "BEGIN_DATE" | "END_DATE" | "DUAL_USER" | "A_COM_CODE" | "ACC_CODE" | "COM_TYPE" | "EXT_SYSTEM_ID" | "EXT_SYSTEM_UNIQUE_ID";
export type ADDRESSrahCreationAttributes = Optional<ADDRESSrahAttributes, ADDRESSrahOptionalAttributes>;

export class ADDRESSrah extends Model<ADDRESSrahAttributes, ADDRESSrahCreationAttributes> implements ADDRESSrahAttributes {
  CON_CODE?: string;
  ADDRESS1?: string;
  ADDRESS2?: string;
  ZIP?: string;
  ADDRESS3?: string;
  ADDRESS4?: string;
  PHONE?: string;
  TELEFAX?: string;
  TELEX?: string;
  DEF_ADDR?: string;
  ADDR_NR?: number;
  COM_CODE?: string;
  EMAIL?: string;
  TRADEACCLIMITED?: string;
  PHONE2?: string;
  CONTACT?: string;
  OWNER_TYPE?: string;
  ADDRESS_TYPE?: string;
  ADDRESS_CODE?: number;
  MOBILE?: string;
  USER_ID?: string;
  PORID?: string;
  BEGIN_DATE?: Date;
  END_DATE?: Date;
  DUAL_USER?: string;
  A_COM_CODE?: string;
  ACC_CODE?: string;
  COM_TYPE?: string;
  EXT_SYSTEM_ID?: number;
  EXT_SYSTEM_UNIQUE_ID?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof ADDRESSrah {
    ADDRESSrah.init({
    CON_CODE: {
      type: DataTypes.STRING(12),
      allowNull: true,
      primaryKey: true
    },
    ADDRESS1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ADDRESS2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ZIP: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    ADDRESS3: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ADDRESS4: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    PHONE: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    TELEFAX: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    TELEX: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    DEF_ADDR: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    ADDR_NR: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    COM_CODE: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    EMAIL: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TRADEACCLIMITED: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    PHONE2: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    CONTACT: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    OWNER_TYPE: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    ADDRESS_TYPE: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    ADDRESS_CODE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    MOBILE: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    USER_ID: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    PORID: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    BEGIN_DATE: {
      type: DataTypes.DATE,
      allowNull: true
    },
    END_DATE: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DUAL_USER: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    A_COM_CODE: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ACC_CODE: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    COM_TYPE: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    EXT_SYSTEM_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EXT_SYSTEM_UNIQUE_ID: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ADDRESSrah',
    timestamps: false,
    indexes: [
      {
        name: "DEF_ADDR",
        using: "BTREE",
        fields: [
          { name: "DEF_ADDR" },
        ]
      },
      {
        name: "ADDR_NR",
        using: "BTREE",
        fields: [
          { name: "ADDR_NR" },
        ]
      },
      {
        name: "COM_CODE",
        using: "BTREE",
        fields: [
          { name: "COM_CODE" },
        ]
      },
      {
        name: "PORID",
        using: "BTREE",
        fields: [
          { name: "PORID" },
        ]
      },
      {
        name: "A_COM_CODE",
        using: "BTREE",
        fields: [
          { name: "A_COM_CODE" },
        ]
      },
      {
        name: "ACC_CODE",
        using: "BTREE",
        fields: [
          { name: "ACC_CODE" },
        ]
      },
      {
        name: "COM_TYPE",
        using: "BTREE",
        fields: [
          { name: "COM_TYPE" },
        ]
      },
    ]
  });
  return ADDRESSrah;
  }
}
