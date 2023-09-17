require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require('hardhat-abi-exporter');
require('dotenv').config({ path: '.env' });
require('hardhat-deploy');

module.exports = {
  networks: {
    localhost: {
      gas: 12000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      timeout: 1800000
    },
    mainnet: {
      url: 'https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}',
      accounts: [process.env.MAINNET_PRIVATE_KEY],
      gasPrice: 9000000000,
      gas: 10000000,
    },
    sepolia: {
      url: 'https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}',
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
      gasPrice: 20000000000, // 20 Gwei
      gas: 12000000,
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  solidity: {
    compilers: [
      {
        version: "0.8.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 5000
          },
          viaIR: true
        }
      },
      {
        version: "0.8.15",
        settings: {
          optimizer: {
            enabled: true,
            runs: 5000
          },
          viaIR: true
        }
      },
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 5000
          },
          viaIR: true
        }
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 5000
          },
          viaIR: true
        }
      }
    ],
    abiExporter: {
      path: './data/abi',
      runOnCompile: true,
      clear: true,
      flat: true,
      spacing: 2,
      pretty: true,
      format: "minimal",
    }
  }
};
