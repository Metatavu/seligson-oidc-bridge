import * as child_process from "child_process";
import Config from "../config";

/**
 * Encryption utils
 */
export default class Encryption {

  /**
   * Creates hashed password
   * 
   * @param password password 
   * @param salt salt
   * @returns hashed password
   */
   public static createPasswordhash = async (password: string, salt: string): Promise<string> => {
    const processResult = child_process.spawnSync("php", {
      input: Encryption.createPhpScript(password, salt, Config.PASSWORD_HASH_SETTINGS)
    });

    if (processResult.error) {
      throw new Error("Failed to create password hash");
    }

    const result = JSON.parse(processResult.stdout.toString());
    if (!result.hash) {
      throw new Error("Failed to create password hash");
    }
    
    return result.hash;
  }

  /**
   * Generates PHP script for encrypting passwords
   * 
   * @param password password
   * @param random random
   * @param prefix prefix
   * @returns encrypted password in a JSON object
   */
  private static createPhpScript = (password: string, random: string, prefix: string) => {
    return `
      <?php
      $password = urldecode("${encodeURIComponent(password)}");
      $random = base64_decode(urldecode("${encodeURIComponent(random)}"));
      $random = substr(str_replace(array('$', "\0"), array('', ''), $random), 0, 16);
      $prefix = urldecode("${encodeURIComponent(prefix)}");
      $postfix = '$';
      $hash = substr(crypt($password, $prefix . $random . $postfix), strlen($prefix . $postfix) + strlen($random));
      echo json_encode(["hash" => $hash]);
      ?>
    `;
  }

}