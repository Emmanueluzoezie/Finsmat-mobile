import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keypair } from "@solana/web3.js";

export const solanaAddress = async() => {
    const solanaKeypair = Keypair.generate();
    const solanaAddress = solanaKeypair.publicKey.toString();
    console.log("Generated Solana Address:", solanaAddress);
    const solanaPrivateKey = solanaKeypair.secretKey.toString();
    console.log("Generated Solana Private Key:", solanaPrivateKey);

    const solanaInfo = JSON.stringify({
        address: solanaAddress,
        privateKey: solanaPrivateKey
    })

    await AsyncStorage.setItem('solana', solanaInfo);
}