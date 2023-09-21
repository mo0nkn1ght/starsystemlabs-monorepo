<template>
  <div id="app">
    <video autoplay muted loop id="backgroundVideo">
      <source src="@/assets/POC.mp4" type="video/mp4">
        Not Supported.
    </video>

    <AppNavbar 
      :accountAddress="accountAddress"
      :networkIcon="networkIcon"
      :balance="balance"
      :ppepeBalance="ppepeBalance"
      :pepeBalance="pepeBalance"
      :pndcBalance="pndcBalance"
      :networkName="networkName"
    />
    <div class="main-container">
      <MainCard 
        :accountAddress="accountAddress" 
        :ethBalance="balance" 
        :ppepeBalance="ppepeBalance"
        @connect="connectWallet" 
      />
    </div>
  </div>
</template>

<script>
import { formatEther, Contract, BrowserProvider } from "ethers";
import AppNavbar from '@/components/AppNavbar.vue';
import MainCard from '@/components/MainCard.vue';


const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [{
      "name": "_owner",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "name": "balance",
      "type": "uint256"
    }],
    "type": "function"
  }
];

export default {
  name: 'App',
  components: {
    MainCard,
    AppNavbar
  },
  data() {
    return {
      accountAddress: null,
      balance: null,
      ppepeBalance: null,
      pepeBalance: null,
      pndcBalance: null,
      networkName: null,
      networkIcon: null,
      contractAddresses: {
        mainnet: {
          pepe: '0x6982508145454ce325ddbe47a25d4ec3d2311933',
          pndc: '0x423f4e6138E475D85CF7Ea071AC92097Ed631eea'
        },
        sepolia: {
          pepe: '0x2BddD10ed278b9420519D7F00aa6989486482764',
          pndc: '0x2BddD10ed278b9420519D7F00aa6989486482764'
        }
      },
      currentContractAddresses: {
        pepe: null,
        pndc: null
      }
    };
  },
  methods: {
    formatBalance(balance) {
      return parseFloat(balance).toFixed(2);
    },
    abbreviateNumber(value) {
      let newValue = parseFloat(value);
      if (newValue >= 1e12) {
        newValue /= 1e12;
        return newValue.toFixed(2) + "T";
      } else if (newValue >= 1e9) {
        newValue /= 1e9;
        return newValue.toFixed(2) + "B";
      } else if (newValue >= 1e6) {
        newValue /= 1e6;
        return newValue.toFixed(2) + "M";
      } else {
        return this.formatBalance(value);
      }
    },
    async getNetworkVersion() {
      if (window.ethereum) {
        const networkId = await window.ethereum.request({ method: 'net_version' });
        this.setNetwork(networkId);
      }
    },
    async connectWallet() {
      if (window.ethereum) {
        console.log("Connecting to wallet...");

        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          this.accountAddress = accounts[0];
          await this.getNetworkVersion();
          const provider = new BrowserProvider(window.ethereum);
          const weiBalance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [this.accountAddress, 'latest']
          });
          this.balance = this.formatBalance(formatEther(weiBalance));

          const pepeContract = new Contract(this.currentContractAddresses.pepe, ERC20_ABI, provider);
          try {
            const pepeTokenBalance = await pepeContract.balanceOf(this.accountAddress);
            console.log("Raw PEPE balance:", pepeTokenBalance.toString());
            this.pepeBalance = this.abbreviateNumber(formatEther(pepeTokenBalance));
        } catch (error) {
            console.error("Error fetching PEPE balance:", error);
            this.pepeBalance = "0";
        }


          const pndcContract = new Contract(this.currentContractAddresses.pndc, ERC20_ABI, provider);
          try {
            const pndcTokenBalance = await pndcContract.balanceOf(this.accountAddress);
            console.log("Raw PNDC balance:", pndcTokenBalance.toString());
            this.pndcBalance = this.abbreviateNumber(formatEther(pndcTokenBalance));
        } catch (error) {
            console.error("Error fetching PNDC balance:", error);
            this.pndcBalance = "0";
        }

          const networkId = window.ethereum.networkVersion;
          this.setNetwork(networkId);


        } catch (error) {
          console.error("Error connecting to wallet:", error);
        }
      } else {
        console.error("Ethereum provider not detected");
      }
    
      window.ethereum.on('chainChanged', async (chainId) => {
        this.setNetwork(Number(chainId));
        await this.updateBalance();
      });


      window.ethereum.on('accountsChanged', async (accounts) => {
        if (accounts.length === 0) {
          console.log('Please connect to MetaMask.');
        } else {
          this.accountAddress = accounts[0];
          this.updateBalance();
        }
      });
    },

    
    
    async updateBalance() {
      const provider = new BrowserProvider(window.ethereum);

      const weiBalance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [this.accountAddress, 'latest']
      });
      this.balance = this.formatBalance(formatEther(weiBalance));

      const pepeContract = new Contract(this.currentContractAddresses.pepe, ERC20_ABI, provider);
      try {
          const pepeTokenBalance = await pepeContract.balanceOf(this.accountAddress);
          console.log("Raw PEPE balance:", pepeTokenBalance.toString());
          this.pepeBalance = this.formatBalance(formatEther(pepeTokenBalance));
      } catch (error) {
          console.error("Error fetching PEPE balance:", error);
          this.pepeBalance = "0";
      }

      const pndcContract = new Contract(this.currentContractAddresses.pndc, ERC20_ABI, provider);
      try {
          const pndcTokenBalance = await pndcContract.balanceOf(this.accountAddress);
          console.log("Raw PNDC balance:", pndcTokenBalance.toString());
          this.pndcBalance = this.formatBalance(formatEther(pndcTokenBalance));
      } catch (error) {
          console.error("Error fetching PNDC balance:", error);
          this.pndcBalance = "0";
      }

    },

  setNetwork(chainId) {
    const networkIdStr = String(chainId);
    switch (networkIdStr) {
      case "1":
        this.networkName = "Mainnet";
        this.networkIcon = require('@/assets/eth.png');
        this.currentContractAddresses = this.contractAddresses.mainnet;
        break;
      case "11155111":
        this.networkName = "Sepolia";
        this.networkIcon = require('@/assets/eth.png');
        this.currentContractAddresses = this.contractAddresses.sepolia;
        break;
      default:
        this.networkName = "Unknown Network";
        this.currentContractAddresses.pepe = null; 
        this.currentContractAddresses.pndc = null;  
    }
  }
},

  mounted() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
        this.accountAddress = null;
    } else {
        this.accountAddress = accounts[0];
        this.updateBalance();
    }
  });

      window.ethereum.on('chainChanged', (chainId) => {
        this.setNetwork(Number(chainId));
      });

      window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
        if (accounts && accounts[0]) {
        console.log("Selected address found:", accounts[0]);
        this.accountAddress = accounts[0];
        this.connectWallet(); 
      } else {
        console.log("No selected address found");
      }
    });


      this.getNetworkVersion();  // Fetch the current network version
    }
  }
}
</script>

<style>
/* Global styles */
html, body {
  margin: 0;
  padding: 0;
}

#app {
  position: relative;
  z-index: 1;
  font-family: 'Arial', sans-serif;
  background-color: #f7f7f7;
  padding-top: 0;
  margin-top: 0;
  text-align: center;
  max-width: 375px;
}

#backgroundVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
  background-size: cover;
}

.card {
  max-width: 400px;
  margin: 20px auto;
}

.input-wrapper {
  display: flex;
  flex-direction: column; /* Stack the inputs vertically */
  gap: 10px;              /* Add some space between the inputs */
}

.network-icon {
  width: 16px;
  height: 16px;
}

img, .logo {
  width: 100%;
  height: auto; 
}

.main-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
  padding-top: 20px;
}

  .card {
    width: 100%;
    max-width: 350px;
  }
</style>
