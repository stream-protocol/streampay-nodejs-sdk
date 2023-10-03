const { Connection, Transaction, SystemProgram, PublicKey, Account, sendAndConfirmTransaction } = require('@solana/web3.js');

class Solana {
    constructor(solanaRPCUrl) {
        this.connection = new Connection(solanaRPCUrl);
    }

    /**
     * Create a new Solana account and return its public key.
     * @param {number} lamports - The initial lamports for the new account.
     * @param {number} space - The account space.
     * @param {PublicKey} programId - The program ID for the account.
     * @returns {Promise<Account>} The newly created Solana account.
     * @throws {Error} If an error occurs during the account creation.
     */
    async createAccount(lamports, space, programId) {
        try {
            const newAccount = new Account();

            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: newAccount.publicKey,
                    newAccountPubkey: newAccount.publicKey,
                    lamports,
                    space,
                    programId,
                })
            );

            await sendAndConfirmTransaction(this.connection, transaction, [newAccount]);

            return newAccount;
        } catch (error) {
            throw new Error(`Error creating Solana account: ${error.message}`);
        }
    }

    // Other Solana-related methods can be added here
}

module.exports = Solana;