const OrderModule = require('./OrderModule');
const WalletModule = require('./WalletModule'); // Optional wallet integration
const EmailService = require('./services/EmailService');
const { ValidationError, PaymentError } = require('./errors');

// Configuration
const orderConfig = require('./config/orderConfig');
const walletConfig = require('./config/walletConfig');
const emailConfig = require('./config/emailConfig');

// Initialize modules
const orderModule = new OrderModule(orderConfig);
const walletModule = new WalletModule(walletConfig);
const emailService = new EmailService(emailConfig);

async function processOrder() {
    try {
        // Create a new order
        const orderData = {
            // Order data here
        };
        const newOrder = await orderModule.createOrder(orderData);

        // Perform wallet transaction if needed (optional)
        const transactionData = {
            // Transaction data here
        };
        await walletModule.performTransaction(transactionData);

        // Update order status
        const updatedOrder = await orderModule.updateOrderStatus(newOrder.id, 'processing');

        // Send order confirmation email
        const emailData = {
            to: newOrder.customerEmail,
            subject: 'Order Confirmation',
            body: `Thank you for your order! Your order ID is ${newOrder.id}.`,
        };
        await emailService.sendEmail(emailData);

        console.log('Order processed successfully.');
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Validation Error:', error.message);
        } else if (error instanceof PaymentError) {
            console.error('Payment Error:', error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
    }
}

// Run the example
processOrder();