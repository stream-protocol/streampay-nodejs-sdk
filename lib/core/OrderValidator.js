class OrderValidator {
    constructor() {
        // You can initialize any common properties or configurations here
    }

    /**
     * Validate an order before processing it.
     * @param {OrderData} orderData - The data for the order.
     * @throws {ValidationError} If the order data is invalid.
     */
    validateOrder(orderData) {
        if (!orderData || typeof orderData !== 'object') {
            throw new ValidationError('Invalid order data. Order data must be an object.');
        }

        if (typeof orderData.amount !== 'number' || orderData.amount <= 0) {
            throw new ValidationError('Invalid order amount. Amount must be a positive number.');
        }

        if (typeof orderData.productName !== 'string' || orderData.productName.trim() === '') {
            throw new ValidationError('Invalid product name. Product name must be a non-empty string.');
        }

        if (typeof orderData.customerName !== 'string' || orderData.customerName.trim() === '') {
            throw new ValidationError('Invalid customer name. Customer name must be a non-empty string.');
        }

        // You can add more specific validation rules as needed

        // Example: Validate that the product exists in your database
        // if (!isValidProduct(orderData.productName)) {
        //   throw new ValidationError('Invalid product name. Product not found.');
        // }

        // Example: Validate that the customer exists in your database
        // if (!isValidCustomer(orderData.customerName)) {
        //   throw a ValidationError('Invalid customer name. Customer not found.');
        // }
    }
}

// Custom error type for better error handling
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

module.exports = { OrderValidator, ValidationError };