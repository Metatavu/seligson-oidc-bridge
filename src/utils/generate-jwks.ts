import * as jose from "node-jose";

const keystore = jose.JWK.createKeyStore();
const props = {
  use: 'sig'
};

keystore.generate("RSA", 2048, props).then(() => {
  console.log(JSON.stringify(keystore.toJSON(true).keys, null, 2));
});