import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keypair } from "@solana/web3.js";
import CryptoJS from 'crypto-js';

export const encryptAndStoreSolanaKey = (solanaPrivateKey, encryptionKey) => {
    try {
        const ciphertext = CryptoJS.AES.encrypt(solanaPrivateKey, encryptionKey).toString();

        return ciphertext
    } catch (error) {
        console.error('Error encrypting and storing Solana key:', error);
    }
};

export const solanaAddress = async() => {
    const solanaKeypair = Keypair.generate();
    const solanaAddress = solanaKeypair.publicKey.toString();
    const solanaPrivateKey = solanaKeypair.secretKey.toString();
 
    const encryptKey = process.env.ENCRYPT_KEY

    const secretKey = await encryptAndStoreSolanaKey(solanaPrivateKey, encryptKey)

    await AsyncStorage.setItem('solana_address', solanaAddress);
    await AsyncStorage.setItem('secret_key', secretKey);
}