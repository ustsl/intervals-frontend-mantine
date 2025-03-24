import CryptoJS from 'crypto-js';

export const CRYPTO_KEY = process.env.CRYPTO_KEY as string

export function encryptPassword(password: string): string {
    return CryptoJS.AES.encrypt(password, CRYPTO_KEY).toString();
}

export function decryptPassword(encrypted: string): string {
    try {
        const bytes = CryptoJS.AES.decrypt(encrypted, CRYPTO_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch {
        return '';
    }
}
