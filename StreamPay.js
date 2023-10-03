const { Connection, Transaction, PublicKey, SystemProgram, Token, Account, sendAndConfirmTransaction } = require('@solana/web3.js');

class StreamPay {
    constructor(config) {
        this.apiKey = config.apiKey;
        this.solanaRPCUrl = config.solanaRPCUrl;
        this.customRPCUrl = config.customRPCUrl || null;
        this.feeWalletAddress = config.feeWalletAddress;
        this.usdcTokenMintAddress = config.usdcTokenMintAddress;
        this.eurcTokenMintAddress = config.eurcTokenMintAddress;
        this.solanaTxFeePercentage = config.solanaTxFeePercentage;
        this.connection = new Connection(config.customRPCUrl || config.solanaRPCUrl);
    }

    async createCheckout(checkoutData) {
        try {
            // Calculate the Solana transaction fee based on the percentage
            const solanaTxFee = checkoutData.transactionAmount * (this.solanaTxFeePercentage / 100);

            // Calculate the operational fee (1.5% of the transaction amount)
            const operationalFee = checkoutData.transactionAmount * 0.015;

            // Calculate the total amount to send, including transaction amount, Solana transaction fee, and operational fee
            const totalAmountToSend = checkoutData.transactionAmount + solanaTxFee + operationalFee;

            // Determine the token mint address based on the selected currency
            let tokenMintAddress;
            if (checkoutData.currency === 'USDC') {
                tokenMintAddress = this.usdcTokenMintAddress;
            } else if (checkoutData.currency === 'EURC') {
                tokenMintAddress = this.eurcTokenMintAddress;
            } else {
                throw new Error(`Unsupported currency: ${checkoutData.currency}`);
            }

            // Step 1: Create a checkout on StreamPay API
            const checkoutResponse = await this.createCheckoutOnStreamPay({
                ...checkoutData,
                operationalFee: totalAmountToSend - checkoutData.transactionAmount, // Operational fee is the difference
                solanaTxFee, // Include Solana transaction fee in the request
            });

            // Step 2: Generate a Solana transaction and send tokens to the provided Solana wallet
            await this.sendTokensToWallet(checkoutResponse.solanaWalletAddress, totalAmountToSend, tokenMintAddress);

            // Step 3: Deduct the operational fee and transfer it to the fee wallet
            await this.transferOperationalFee(checkoutData.transactionAmount, totalAmountToSend);

            return checkoutResponse;
        } catch (error) {
            throw new Error(`Error creating checkout: ${error.message}`);
        }
    }

    async calculateTotalAmount(transactionAmount) {
        try {
            // Calculate the Solana transaction fee based on the percentage
            const solanaTxFee = transactionAmount * (this.solanaTxFeePercentage / 100);

            // Calculate the operational fee (1.5% of the transaction amount)
            const operationalFee = transactionAmount * 0.015;

            // Calculate the total amount to send (transaction amount + Solana transaction fee + operational fee)
            const totalAmountToSend = transactionAmount + solanaTxFee + operationalFee;

            return totalAmountToSend;
        } catch (error) {
            throw new Error(`Error calculating total amount: ${error.message}`);
        }
    }

    async sendTokensToWallet(solanaWalletAddress, amountToSend, tokenMintAddress) {
        try {
            // Fetch the sender's wallet and private key (you should securely manage this)
            const senderWallet = new PublicKey('YOUR_SENDER_WALLET_ADDRESS');
            const senderPrivateKey = Uint8Array.from([ /* YOUR_PRIVATE_KEY_BYTES */ ]);

            // Create a Solana connection and account objects
            const connection = this.connection;
            const senderAccount = new Account(senderPrivateKey);

            // Initialize the token
            const token = new Token(connection, tokenMintAddress, senderAccount);

            // Build a Solana transaction to send tokens to the provided wallet
            const transaction = new Transaction().add(
                Token.createTransferInstruction(
                    tokenMintAddress,
                    senderWallet,
                    new PublicKey(solanaWalletAddress),
                    senderAccount.publicKey, [],
                    amountToSend * 10 ** 6 // Convert tokens to their smallest unit (6 decimal places)
                )
            );

            // Sign and send the transaction
            const signature = await sendAndConfirmTransaction(connection, transaction, [senderAccount]);

            return signature;
        } catch (error) {
            throw new Error(`Error sending tokens to the wallet: ${error.message}`);
        }
    }

    async transferOperationalFee(transactionAmount, totalAmountToSend) {
        try {
            // Calculate the operational fee
            const operationalFee = totalAmountToSend - transactionAmount;

            // Fetch the sender's wallet and private key (you should securely manage this)
            const senderWallet = new PublicKey('YOUR_SENDER_WALLET_ADDRESS');
            const senderPrivateKey = Uint8Array.from([ /* YOUR_PRIVATE_KEY_BYTES */ ]);

            // Create a Solana connection and account objects
            const connection = this.connection;
            const senderAccount = new Account(senderPrivateKey);

            // Initialize the token
            const token = new Token(connection, tokenMintAddress, senderAccount);

            // Build a Solana transaction to transfer the operational fee to the fee wallet
            const transaction = new Transaction().add(
                Token.createTransferInstruction(
                    tokenMintAddress,
                    senderWallet,
                    new PublicKey(this.feeWalletAddress), // Fee wallet address
                    senderAccount.publicKey, [],
                    operationalFee * 10 ** 6 // Convert tokens to their smallest unit (6 decimal places)
                )
            );

            // Sign and send the transaction
            const signature = await sendAndConfirmTransaction(connection, transaction, [senderAccount]);

            return signature;
        } catch (error) {
            throw new Error(`Error transferring operational fee: ${error.message}`);
        }
    }

    async createSolanaAccount() {
        try {
            // Fetch the sender's wallet and private key (you should securely manage this)
            const senderWallet = new PublicKey('YOUR_SENDER_WALLET_ADDRESS');
            const senderPrivateKey = Uint8Array.from([ /* YOUR_PRIVATE_KEY_BYTES */ ]);

            // Create a new account
            const newAccount = new Account();

            // Initialize the Solana connection
            const connection = this.connection;

            // Build a Solana transaction to create the new account
            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: senderWallet,
                    newAccountPubkey: newAccount.publicKey,
                    lamports: /* INITIAL_LAMPORTS_AMOUNT */ ,
                    space: /* ACCOUNT_SPACE */ ,
                    programId: /* PROGRAM_ID */ ,
                })
            );

            // Sign and send the transaction
            const signature = await sendAndConfirmTransaction(connection, transaction, [newAccount]);

            return {
                publicKey: newAccount.publicKey.toString(),
                signature,
            };
        } catch (error) {
            throw new Error(`Error creating Solana account: ${error.message}`);
        }
    }

    async createCheckoutOnStreamPay(checkoutData) {
        // Implement the logic to create a checkout on StreamPay API
        // ...

        return checkoutResponse; // Return the response from StreamPay API
    }

    // Other methods...

    // Helper methods for handling HTTP requests, logging, etc.
}

module.exports = StreamPay;