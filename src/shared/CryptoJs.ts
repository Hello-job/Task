import CryptoJs from 'crypto-js';

/**
 * 加密密钥
 */
const CRYPT_KEY = 'lc-secret-key';

type cryptOptionType = {
  key?: string;
};

class Crypto {
  /**
   * 加密数据
   */
  encryptData(data: any, option?: cryptOptionType) {
    const { key = CRYPT_KEY } = option || {};
    const ciphertext = CryptoJs.AES.encrypt(
      JSON.stringify(data),
      key
    ).toString();
    return ciphertext;
  }
  /**
   * 解密
   */
  decryptData(data: any, option?: cryptOptionType) {
    if (!data) return;
    const { key = CRYPT_KEY } = option || {};
    const bytes = CryptoJs.AES.decrypt(data, key);
    const decryptedData = bytes.toString(CryptoJs.enc.Utf8);
    return JSON.parse(decryptedData);
  }
}

export default Crypto;
