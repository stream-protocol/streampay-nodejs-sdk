const { StreamPaymentGatewayClient, PaymentError } = require('./StreamPaymentGatewayClient');

class StreamPaymentGatewayModule {
    constructor(config) {
        this.paymentGatewayClient = new StreamPaymentGatewayClient(config);
    }

    /**
     * Process a payment using the payment gateway module.
     * @param {PaymentData} paymentData - The data for the payment.
     * @returns {Promise<PaymentResult>} The result of the payment processing.
     * @throws {PaymentError} If an error occurs during payment processing.
     */
    async processPayment(paymentData) {
        try {
            const result = await this.paymentGatewayClient.processPayment(paymentData);
            return result;
        } catch (error) {
            throw new PaymentError(`Payment processing failed: ${error.message}`);
        }
    }
}

module.exports = StreamPaymentGatewayModule;