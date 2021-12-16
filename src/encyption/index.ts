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
    try {
      const script = Encryption.createPhpScript(password, salt, Config.PASSWORD_HASH_SETTINGS.trim());

      if (Config.DEBUG) {
        console.log("Create password script", script);
      }
      
      const processResult = child_process.spawnSync("php", {
        input: script
      });

      if (processResult.error) {
        throw new Error("Failed to create password hash");
      }

      const output = processResult.stdout.toString();
      try {
        const result = JSON.parse(output);
        if (!result.hash) {
          throw new Error("Failed to create password hash");
        }

        return result.hash;
      } catch (e) {
        console.error("Failed to process password hash output", {
          output: output,
          error: e
        });
        
        throw e;
      };
    } catch (e) {
      console.error("Failed to create password hash", e);
      throw e;
    }
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
      $random = urldecode("${encodeURIComponent(random)}");
      $random = substr(str_replace(array('$', "\0"), array('', ''), $random), 0, 16);
      $prefix = urldecode("${prefix}");
      $postfix = '$';
      $hash = substr(crypt($password, $prefix . $random . $postfix), strlen($prefix . $postfix) + strlen($random));
      echo json_encode(["hash" => $hash]);
      ?>
    `;
  }

}