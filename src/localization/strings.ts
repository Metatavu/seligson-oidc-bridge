import LocalizedStrings, { LocalizedStringsMethods } from "localized-strings";
import * as en from "./en.json";
import * as fi from "./fi.json";

/**
 * Interface describing localized strings
 */
export interface IStrings extends LocalizedStringsMethods {
  name: string;
  email: string;
  login: string;
  system: string;
  confirm: string;
  username: string;
  password: string;
  givenName: string;
  requiredInformations: string;
  missingCredentialsError: string
  wrongUsernameOrPasswordError: string;
  footerText: string;
  loggingOutHeader: string;
  loggingOutText: string;
  loggingOutButton: string;
  internalErrorMessage: string;
  internalErrorInstructions: string;
  internalErrorDetails: string;
}

export const strings: IStrings = new LocalizedStrings({
  en: en,
  fi: fi
});