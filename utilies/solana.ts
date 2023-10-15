import AsyncStorage from "@react-native-async-storage/async-storage";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";
import { createMint, createTransferCheckedInstruction, getAccount, getMint, getOrCreateAssociatedTokenAccount, mintTo} from '@solana/spl-token';
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


// export const proceedTransaction = async () => {
//     const connection = new web3.Connection('https://api.mainnet-beta.solana.com');

//     // Your wallet's secret key
//     const myWallet = web3.Keypair.fromSecretKey(myWalletSecretKey);

//     // User's wallet address
//     const userWalletAddress = new web3.PublicKey('user_wallet_public_key');

//     // Amount of tokens to transfer
//     const amount = 100; // Adjust as needed

//     // Build and send the transaction
//     const transaction = new web3.Transaction().add(
//         web3.SystemProgram.transfer({
//             fromPubkey: myWallet.publicKey,
//             toPubkey: userWalletAddress,
//             lamports: web3.LAMPORTS_PER_SOL * amount, // Convert SOL to lamports
//         })
//     );

//     (async () => {
//         try {
//             // Send the transaction and get the transaction signature
//             const signature = await web3.sendAndConfirmTransaction(
//                 connection,
//                 transaction,
//                 [myWallet]
//             );

//             console.log('Transaction sent. Signature:', signature);

//             // You can now start monitoring the transaction status
//             const status = await web3.waitForSignatureConfirmation(
//                 signature,
//                 {
//                     confirmations: 1, // Number of confirmations to wait for (you can adjust this)
//                     commitment: 'singleGossip', // Commitment level
//                 }
//             );

//             console.log('Transaction confirmed. Status:', status);
//         } catch (error) {
//             console.error('Transaction failed:', error);
//         }
//     })();
// }

export const createToken = async () => {
    const payer = Keypair.generate();
    const mintAuthority = Keypair.generate();
    const freezeAuthority = Keypair.generate();

    const connection = new Connection(
        clusterApiUrl('devnet'),
        'confirmed'
    );

    const airdropSignature = await connection.requestAirdrop(
        payer.publicKey,
        LAMPORTS_PER_SOL,
    );

    await connection.confirmTransaction(airdropSignature);

    const mint = await createMint(
        connection,
        payer,
        mintAuthority.publicKey,
        freezeAuthority.publicKey,
        9 // We are using 9 to match the CLI decimal default exactly
    );


    const mintInfo = await getMint(
        connection,
        mint
    )

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        payer.publicKey
    )

    await mintTo(
        connection,
        payer,
        mint,
        tokenAccount.address,
        mintAuthority,
        100000000000n
    )

    const tokenAccountInfo = await getAccount(
        connection,
        tokenAccount.address
    );
    console.log("account info: ", tokenAccountInfo)
    console.log("account token info: ", tokenAccount)
    console.log("account mint: ", mint)
    console.log("account mintAuthority: ", mintAuthority)
    console.log("account payer: ", payer)
}


// export const transferTokens = async (mint, mintAuthority, fromTokenAccount, toTokenAccount, amount) => {
//     try {
//         const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

//         const mintInfo = await getMint(connection, mint);

//         // Build and send the transaction to transfer tokens
//         const transaction = new Transaction().add(
//             createTransferCheckedInstruction(
//                 mintAuthority.publicKey,
//                 fromTokenAccount,
//                 toTokenAccount,
//                 mint,
//                 undefined,
//                 amount,
//                 mintInfo.decimals
//             )
//         );

//         const payer = Keypair.generate();

//         const signature = await sendAndConfirmTransaction(connection, transaction, [payer]);

//         return signature;
//     } catch (error) {
//         console.error('Token transfer failed:', error);
//         throw error;
//     }
// };


// export const transferTokens = async (mint, mintAuthority, fromTokenAccount, toTokenAccount, amount) => {

//     const keys = process.env.DETAILS_SOL
//     try {
//         const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
//         const senderPrivateKey = Uint8Array.from([keys.publicKey]);
//         const senderKeypair = Keypair.fromSecretKey(senderPrivateKey);

//         const recipientPublicKey = new PublicKey('/* Replace with recipient's public key * /');

// const tokenMintPublicKey = new PublicKey('/* Replace with the token mint public key */');

//         // Build and send the transaction to transfer tokens
//         const transaction = new Transaction().add(
//             createTransferCheckedInstruction(
//                 mintAuthority.publicKey,
//                 fromTokenAccount,
//                 toTokenAccount,
//                 mint,
//                 undefined,
//                 amount,
//                 mintInfo.decimals
//             )
//         );

//         const payer = Keypair.generate();

//         const signature = await sendAndConfirmTransaction(connection, transaction, [payer]);

//         return signature;
//     } catch (error) {
//         console.error('Token transfer failed:', error);
//         throw error;
//     }
// };

// // export const payers = async() => {
// //     const payer = Keypair.generate();
// //     console.log(payer)
// // }



// const senderPrivateKey = Uint8Array.from([/* Replace with your sender's private key bytes */]);
// const senderKeypair = Keypair.fromSecretKey(senderPrivateKey);

// const recipientPublicKey = new PublicKey('/* Replace with recipient's public key * /');

// const tokenMintPublicKey = new PublicKey('/* Replace with the token mint public key */');
// const fromTokenAccountPublicKey = new PublicKey('/* Replace with the sender's token account public key * /');
// const toTokenAccountPublicKey = new PublicKey('/* Replace with the recipient's token account public key * /');

// const amount = 10; // The number of tokens to transfer

// const transaction = new Transaction().add(
//     createTransferCheckedInstruction(
//         TOKEN_PROGRAM_ID,
//         fromTokenAccountPublicKey,
//         tokenMintPublicKey,
//         toTokenAccountPublicKey,
//         senderKeypair.publicKey,
//         [],
//         amount,
//         9, // The number of decimal places for your token
//     )
// );

// // Sign and send the transaction
// (async () => {
//     const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
//     console.log(`Transaction confirmed. Signature: ${signature}`);
// })();
