const axios = require('axios'); // Import Axios for making HTTP requests

// Import necessary modules and classes
const StreamPayWrapper = require('./lib/streampay/StreamPay'); // Update the path as needed
const SolanaWrapper = require('./lib/solana/Solana'); // Update the path as needed

// Initialize StreamPay and Solana instances with your API keys and configurations
const streamPay = new StreamPayWrapper('your-streampay-api-key', { /* StreamPay config */ });
const solana = new SolanaWrapper('your-solana-rpc-url');

// Define the checkout data (transaction amount in USDC)
const checkoutData = {
    transactionAmount: 100.00, // Amount in USDC
    currency: 'USDC', // Use USDC as the currency
    // Add other checkout data fields as needed
};

// Define the CoinMarketCap API URL and your API key (replace with your actual API key)
const coinMarketCapApiKey = 'your-coinmarketcap-api-key';
const coinMarketCapApiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=USDC&convert=USD&CMC_PRO_API_KEY=${coinMarketCapApiKey}`;

async function fetchUSDCExchangeRate() {
    try {
        // Step 1: Fetch the USDC exchange rate from CoinMarketCap API
        const response = await axios.get(coinMarketCapApiUrl);
        const usdcExchangeRate = response.data.data.USDC.quote.USD.price;
        console.log('USDC Exchange Rate:', usdcExchangeRate);

        // Step 2: Calculate the transaction amount in USD based on the exchange rate
        const transactionAmountUSD = checkoutData.transactionAmount * usdcExchangeRate;
        console.log('Transaction Amount in USD:', transactionAmountUSD);

        // Step 3: Create a StreamPay checkout with the transaction amount in USD
        const updatedCheckoutData = {...checkoutData, transactionAmount: transactionAmountUSD };
        const checkoutResponse = await streamPay.createCheckout(updatedCheckoutData);
        console.log('StreamPay Checkout Response:', checkoutResponse);

        // Rest of the payment and order processing steps remain the same

        console.log('Order Captured and Payment Processed Successfully');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the example to fetch the exchange rate and create a checkout
fetchUSDCExchangeRate();