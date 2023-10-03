const { Keypair } = require('@solana/web3.js');

class WalletHelper {
    static generateKeyPair() {
        return Keypair.generate();
    }

    static isValidAddress(address) {
        // Implement address validation logic
    }

    // Other wallet-related utility functions
}

module.exports = WalletHelper;