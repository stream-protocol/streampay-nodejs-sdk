const { generateMnemonic, Keypair } = require('@solana/web3.js');

class StreamPayHelper {
    constructor() {
        // You can initialize any common properties or configurations here
    }

    /**
     * Generate a random Solana wallet address.
     * @returns {string} A random Solana wallet address.
     */
    generateRandomSolanaWalletAddress() {
        // Generate a random Solana wallet address using the web3.js library
        const keypair = Keypair.generate();
        return keypair.publicKey.toBase58();
    }

    /**
     * Generate a random StreamPay checkout ID.
     * @returns {string} A random StreamPay checkout ID.
     */
    generateRandomCheckoutID() {
        // Generate a random checkout ID logic here (for demonstration purposes, we use a placeholder)
        const randomCheckoutID = 'RANDOM_CHECKOUT_ID';
        return randomCheckoutID;
    }

    /**
     * Generate a random Solana wallet mnemonic phrase.
     * @returns {string} A random Solana wallet mnemonic phrase.
     */
    generateRandomSolanaMnemonic() {
        // Generate a random 24-word mnemonic phrase for Solana wallet
        return generateMnemonic();
    }

    // You can add more helper functions here as needed

    // Example:
    // async generateRandomPrivateKey() {
    //   // Generate a random private key logic here
    // }
}

module.exports = StreamPayHelper;