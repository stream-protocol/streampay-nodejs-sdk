class OrderModule {
    constructor(config) {
        // Initialize the module with configuration
        this.config = config;
        // Initialize an empty array to store orders (simulated database)
        this.orders = [];
    }

    async createOrder(orderData) {
        // Validate and create a new order
        const newOrder = {
            id: this.generateOrderId(),
            ...orderData,
            status: 'pending', // Initial status
            createdAt: new Date().toISOString(),
            updatedAt: null,
            orderHistory: [], // An array to store order history
        };

        this.orders.push(newOrder); // Store the order (simulated database)

        return newOrder;
    }

    async getOrder(orderId) {
        // Find an order by its ID
        const order = this.orders.find((o) => o.id === orderId);

        if (!order) {
            throw new Error(`Order not found with ID: ${orderId}`);
        }

        return order;
    }

    async updateOrderStatus(orderId, newStatus) {
        // Update the status of an order and maintain order history
        const order = this.orders.find((o) => o.id === orderId);

        if (!order) {
            throw new Error(`Order not found with ID: ${orderId}`);
        }

        // Save the previous status
        const prevStatus = order.status;

        order.status = newStatus;
        order.updatedAt = new Date().toISOString();

        // Add the status change to order history
        order.orderHistory.push({
            timestamp: order.updatedAt,
            status: newStatus,
            prevStatus,
        });

        return order;
    }

    async getOrdersByStatus(status) {
        // Retrieve orders by their status
        return this.orders.filter((order) => order.status === status);
    }

    async getOrdersByCustomer(customerId) {
        // Retrieve orders for a specific customer
        return this.orders.filter((order) => order.customerId === customerId);
    }

    // Helper method to generate a unique order ID (for simulation)
    generateOrderId() {
        return `ORD-${Math.floor(Math.random() * 10000)}`;
    }
}

module.exports = OrderModule;