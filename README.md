# StreamPay Node.js SDK

The StreamPay Node.js SDK is a tool for integrating StreamPay's checkout functionality with Solana Web3.js into your Node.js applications.

## Table of Contents

- [StreamPay Node.js SDK](#streampay-nodejs-sdk)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
  - [Examples](#examples)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

You can install the StreamPay Node.js SDK using npm:

```bash
npm install streampay-node-sdk
```

## Getting Started

Before using the SDK, you need to obtain an API key from StreamPay and have a Solana wallet to send SOL. Make sure to replace `'STREAMPAY_API_KEY'` and `'STREAMPAY_RPC_URL'` in the examples with your actual API key and Solana RPC URL.

```javascript
const StreamPay = require('streampay-node-sdk');

const apiKey = 'YOUR_API_KEY';
const solanaRPCUrl = 'STREAMPAY_RPC_URL';
const streamPay = new StreamPay(apiKey, solanaRPCUrl);
```

## Usage

The StreamPay SDK provides functionality for creating checkouts and sending SOL to wallets. Here's an example of creating a checkout:

```javascript
const checkoutData = {
  // Populate with checkout data
};

streamPay.createCheckout(checkoutData)
  .then((checkoutResponse) => {
    console.log('Checkout created:', checkoutResponse);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

## Examples

You can find example scripts in the `examples/` folder of this repository that demonstrate how to use the SDK for different use cases.

- [createCheckoutExample.js](examples/createCheckoutExample.js): Example of creating a StreamPay checkout.

To run the examples, you can use Node.js:

```bash
node examples/createCheckoutExample.js
```

## Contributing

Contributions to this SDK are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear, descriptive commit messages.
4. Push your branch to your forked repository.
5. Open a pull request with a detailed description of your changes.

## License

This SDK is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
