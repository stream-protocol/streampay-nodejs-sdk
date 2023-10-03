const { Keypair } = require('@solana/web3.js');

class Wallet {
    constructor() {
        this.keypair = Keypair.generate();
    }

    getPublicKey() {
        return this.keypair.publicKey;
    }

    // Other wallet-related methods
}

module.exports = Wallet;