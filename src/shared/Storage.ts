import Crypto from './CryptoJs';

const { encryptData, decryptData } = new Crypto();

interface optionType {
  isEncrypt: boolean;
}

interface StorageProps {
  storageType: 'localStorage' | 'sessionStorage';
}
class Storage {
  storageType;
  constructor(props: StorageProps) {
    const { storageType } = props;
    this.storageType = storageType;
  }
  get(key: string, option?: optionType) {
    const { isEncrypt = true } = option || {};
    const value = window?.[this.storageType].getItem(key);
    const decrypted = value && isEncrypt ? decryptData(value) : value;
    try {
      return decrypted ? JSON.parse(decrypted) : null;
    } catch (err) {
      return decrypted;
    }
  }
  set(key: string, value: any, option?: optionType) {
    const { isEncrypt = true } = option || {};
    const encrypt = isEncrypt ? encryptData(value) : JSON.stringify(value);
    window?.[this.storageType].setItem(key, encrypt);
  }
  remove(key: string) {
    window?.[this.storageType].removeItem(key);
  }
  clear() {
    window?.[this.storageType].clear();
  }
}

export default {
  local: new Storage({ storageType: 'localStorage' }),
  session: new Storage({ storageType: 'sessionStorage' })
};
