const { Connection, Transaction, SystemProgram, PublicKey, sendAndConfirmTransaction } = require('@solana/web3.js');

class SolanaHelper {
    constructor(solanaRPCUrl) {
        this.connection = new Connection(solanaRPCUrl);
    }

    /**
     * Create a new Solana account and return its public key.
     * @returns {Promise<PublicKey>} The public key of the newly created account.
     * @throws {Error} If an error occurs during the account creation.
     */
    async createSolanaAccount() {
        try {
            const newAccount = new Account();
            const connection = this.connection;

            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: newAccount.publicKey,
                    newAccountPubkey: newAccount.publicKey,
                    lamports: /* INITIAL_LAMPORTS_AMOUNT */ ,
                    space: /* ACCOUNT_SPACE */ ,
                    programId: /* PROGRAM_ID */ ,
                })
            );

            await sendAndConfirmTransaction(connection, transaction, [newAccount]);

            return newAccount.publicKey;
        } catch (error) {
            throw new Error(`Error creating Solana account: ${error.message}`);
        }
    }

    // Additional Solana-related helper methods can be added here
}

module.exports = SolanaHelper;