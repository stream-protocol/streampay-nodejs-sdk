const axios = require('axios');

class StreamPaymentGatewayClient {
    constructor(config) {
        this.apiUrl = config.apiUrl;
        this.apiKey = config.apiKey;
    }

    /**
     * Process a payment using the payment gateway.
     * @param {PaymentData} paymentData - The data for the payment.
     * @returns {Promise<PaymentResult>} The result of the payment processing.
     * @throws {PaymentError} If an error occurs during payment processing.
     */
    async processPayment(paymentData) {
        try {
            this.validatePaymentData(paymentData);
            const response = await this.sendPaymentRequest(paymentData);

            if (response.data.success) {
                return {
                    success: true,
                    transactionId: response.data.transactionId,
                    amount: paymentData.amount,
                    currency: paymentData.currency,
                };
            } else {
                throw new PaymentError(`Payment failed: ${response.data.errorMessage}`);
            }
        } catch (error) {
            throw new PaymentError(`Error processing payment: ${error.message}`);
        }
    }

    /**
     * Validate payment data.
     * @param {PaymentData} paymentData - The data for the payment.
     * @throws {ValidationError} If payment data is invalid.
     */
    validatePaymentData(paymentData) {
        if (!paymentData || typeof paymentData !== 'object') {
            throw new ValidationError('Invalid payment data. Payment data must be an object.');
        }

        if (typeof paymentData.amount !== 'number' || paymentData.amount <= 0) {
            throw new ValidationError('Invalid payment amount. Amount must be a positive number.');
        }

        if (typeof paymentData.currency !== 'string' || paymentData.currency.trim() === '') {
            throw new ValidationError('Invalid payment currency. Currency must be a non-empty string.');
        }
    }

    /**
     * Send a payment request to the payment gateway API.
     * @param {PaymentData} paymentData - The data for the payment.
     * @returns {Promise<object>} The response from the payment gateway.
     * @throws {HttpRequestError} If an error occurs during the HTTP request.
     */
    async sendPaymentRequest(paymentData) {
        try {
            const response = await axios.post(`${this.apiUrl}/processPayment`, paymentData, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });

            return response.data;
        } catch (error) {
            throw new HttpRequestError(`Error sending payment request: ${error.message}`);
        }
    }

    // Additional methods for interacting with the payment gateway can be added here
}

// Custom error types for better error handling
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

class PaymentError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PaymentError';
    }
}

class HttpRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'HttpRequestError';
    }
}

module.exports = {
    StreamPaymentGatewayClient,
    ValidationError,
    PaymentError,
    HttpRequestError,
};