import crypto from "crypto";

const secretKey = "my-secret-key";

const encryptString = (inputString: string) => {
  const cipher = crypto.createCipher("aes-256-cbc", secretKey);
  let encryptedString = cipher.update(inputString, "utf8", "hex");
  encryptedString += cipher.final("hex");
  return encryptedString;
};

const decryptString = (encryptedString: string) => {
  const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
  let decryptedString = decipher.update(encryptedString, "hex", "utf8");
  decryptedString += decipher.final("utf8");
  return decryptedString;
};

export { encryptString, decryptString };
