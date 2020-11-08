const CryptoJS = require('crypto-js');
const key = CryptoJS.enc.Utf8.parse('{60F9sG3*vpfCknu');
const iv = CryptoJS.enc.Utf8.parse('0123456789123456');

export function encrypt(plaintext: string): string {
  return CryptoJS.AES.encrypt(plaintext, key, {
    iv,
  }).toString();
}

export function decrypt(encryptedText: string): string {
  return CryptoJS.AES.decrypt(encryptedText, key, {
    iv,
  }).toString(CryptoJS.enc.Utf8);
}
