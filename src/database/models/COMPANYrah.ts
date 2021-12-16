import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface COMPANYrahAttributes {
  COM_CODE?: string;
  SHORTNAME?: string;
  NAME1?: string;
  NAME2?: string;
  NAME3?: string;
  SO_SEC_NR?: string;
  LANGCODE?: string;
  CNTRY_CODE?: string;
  COM_CLASS?: string;
  REMARK?: string;
  CREA_DATE?: Date;
  REF?: string;
  NATIONALITY?: string;
  FIRST_NAME?: string;
  LAST_NAME?: string;
  IDENT_METH_ID?: number;
}

export type COMPANYrahOptionalAttributes = "COM_CODE" | "SHORTNAME" | "NAME1" | "NAME2" | "NAME3" | "SO_SEC_NR" | "LANGCODE" | "CNTRY_CODE" | "COM_CLASS" | "REMARK" | "CREA_DATE" | "REF" | "NATIONALITY" | "FIRST_NAME" | "LAST_NAME" | "IDENT_METH_ID";
export type COMPANYrahCreationAttributes = Optional<COMPANYrahAttributes, COMPANYrahOptionalAttributes>;

export class COMPANYrah extends Model<COMPANYrahAttributes, COMPANYrahCreationAttributes> implements COMPANYrahAttributes {
  COM_CODE?: string;
  SHORTNAME?: string;
  NAME1?: string;
  NAME2?: string;
  NAME3?: string;
  SO_SEC_NR?: string;
  LANGCODE?: string;
  CNTRY_CODE?: string;
  COM_CLASS?: string;
  REMARK?: string;
  CREA_DATE?: Date;
  REF?: string;
  NATIONALITY?: string;
  FIRST_NAME?: string;
  LAST_NAME?: string;
  IDENT_METH_ID?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof COMPANYrah {
    COMPANYrah.init({
    COM_CODE: {
      type: DataTypes.STRING(20),
      allowNull: true,
      primaryKey: true
    },
    SHORTNAME: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    NAME1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    NAME2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    NAME3: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    SO_SEC_NR: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    LANGCODE: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    CNTRY_CODE: {
      type: DataTypes.CHAR(3),
      allowNull: true
    },
    COM_CLASS: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    REMARK: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    CREA_DATE: {
      type: DataTypes.DATE,
      allowNull: true
    },
    REF: {
      type: DataTypes.CHAR(3),
      allowNull: true
    },
    NATIONALITY: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    FIRST_NAME: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    LAST_NAME: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    IDENT_METH_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'COMPANYrah',
    timestamps: false,
    indexes: [
      {
        name: "COM_CODE",
        using: "BTREE",
        fields: [
          { name: "COM_CODE" },
        ]
      },
    ]
  });
  return COMPANYrah;
  }
}
