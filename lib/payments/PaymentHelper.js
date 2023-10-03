// Define constants for payment currencies
const CURRENCY_USDC = 'USDC';
const CURRENCY_EURC = 'EURC';
const CURRENCY_SOL = 'SOL';
const CURRENCY_STRM = 'STRM';

// List of supported payment currencies
const SUPPORTED_CURRENCIES = [CURRENCY_USDC, CURRENCY_EURC, CURRENCY_SOL, CURRENCY_STRM];

/**
 * Validate a payment currency.
 * @param {string} currency - The currency code to validate.
 * @returns {boolean} True if the currency is valid; otherwise, false.
 */
function validatePaymentCurrency(currency) {
    return SUPPORTED_CURRENCIES.includes(currency);
}

/**
 * Validate payment data.
 * @param {object} paymentData - The data for the payment.
 * @returns {boolean} True if payment data is valid; otherwise, false.
 * @throws {Error} If payment data is invalid.
 */
function validatePaymentData(paymentData) {
    if (!paymentData || typeof paymentData !== 'object') {
        throw new Error('Invalid payment data. Payment data must be an object.');
    }

    if (typeof paymentData.amount !== 'number' || paymentData.amount <= 0) {
        throw new Error('Invalid payment amount. Amount must be a positive number.');
    }

    if (!validatePaymentCurrency(paymentData.currency)) {
        throw new Error(`Invalid payment currency: ${paymentData.currency}. Supported currencies are ${SUPPORTED_CURRENCIES.join(', ')}.`);
    }

    // Add more validation rules as needed...

    return true;
}

module.exports = {
    CURRENCY_USDC,
    CURRENCY_EURC,
    CURRENCY_SOL,
    CURRENCY_STRM,
    validatePaymentData,
};