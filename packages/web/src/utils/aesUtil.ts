const CryptoJS = require('crypto-js');

export function encrypt(plaintext: string): string {
  const key = CryptoJS.enc.Utf8.parse('{60F9sG3*vpfCknu');
  const iv = CryptoJS.enc.Utf8.parse('0123456789123456');
  return CryptoJS.AES.encrypt(plaintext, key, {
    iv,
  }).toString();
}
