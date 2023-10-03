const StreamPOS = require('./StreamPOS'); // Import your StreamPOS module
const StreamPaymentGateway = require('./StreamPaymentGateway'); // Import your Stream Payment Gateway module

// Initialize StreamPOS and Stream Payment Gateway with your configurations
const streamPOSConfig = {
    // StreamPOS configuration
    // ...
};

const paymentGatewayConfig = {
    // Stream Payment Gateway configuration
    // ...
};

const streamPOS = new StreamPOS(streamPOSConfig);
const paymentGateway = new StreamPaymentGateway(paymentGatewayConfig);

// Define order details
const orderData = {
    customerName: 'John Doe',
    items: [
        { product: 'Product A', quantity: 2, price: 10.99 },
        { product: 'Product B', quantity: 1, price: 19.99 },
    ],
    total: 41.97,
    paymentMethod: 'credit_card',
};

// Create an order in StreamPOS
async function createOrder(orderData) {
    try {
        // Create the order in StreamPOS
        const newOrder = await streamPOS.createOrder(orderData);

        // Process the payment using the Stream Payment Gateway
        const paymentResult = await paymentGateway.processPayment({
            amount: orderData.total,
            currency: 'USD',
            orderId: newOrder.id,
            paymentMethod: orderData.paymentMethod,
        });

        // Check if the payment was successful
        if (paymentResult.success) {
            console.log(`Order ${newOrder.id} successfully processed.`);
            console.log(`Transaction ID: ${paymentResult.transactionId}`);
        } else {
            console.error(`Payment failed: ${paymentResult.error}`);
        }
    } catch (error) {
        console.error(`Error creating order: ${error.message}`);
    }
}

// Call the createOrder function with the orderData
createOrder(orderData);