<template>
  <div class="center-container">
    <button :disabled="insufficientFunds" @click="mine">
      <SpinnerSVG v-if="loading" />
      <span v-else-if="insufficientFunds">Insufficient Funds</span>
      <span v-else>Mine</span>
    </button>
  </div>
</template>


<script>
import SpinnerSVG from './SpinnerSVG.vue';
import Web3 from 'web3';

let web3 = new Web3(Web3.givenProvider || 'https://mainnet.infura.io/v3/b8a6136e045a4280b8d59b31f1674f06');


export default {
  components: {
    SpinnerSVG
  },
  data() {
    return {
      loading: false,
    };
  },
  props: {
    enteredAmount: {
      type: String,
      default: '0'
    },
    walletBalance: {
      type: String,
      default: '0'
    }
  },
  computed: {
    insufficientFunds() {
      return parseFloat(this.enteredAmount) > parseFloat(this.walletBalance);
    }
  },
  methods: {
    async mineLiquidity(amountOutMinUniswap) {
      const contractAddress = 'YOUR_CONTRACT_ADDRESS';
      const abi = [/* ABI of contract */];
      const account = (await web3.eth.getAccounts())[0];
      const contract = new web3.eth.Contract(abi, contractAddress);

      try {
        await contract.methods.mineLiquidity(amountOutMinUniswap).send({ from: account, value: web3.utils.toWei(this.enteredAmount, 'ether') });
        console.log('Transaction successful');
      } catch (error) {
        console.error('Error occurred:', error);
      }
    },
    async mine() {
      this.loading = true;
  
      const isConnected = await this.connectWallet();
      if (isConnected) {
        // TODO fix this with contract interaction
        await this.mineLiquidity('YOUR_AMOUNT_OUT_MIN_UNISWAP_VALUE');
      }
  
      this.loading = false;
      this.$emit('mine');
    }
  }
};
</script>
  
  <style scoped>
  button {
    margin-top: 20px;
  background-color: #2172E5; 
  color: white;
  padding: 2vh 2vw;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 535;
  line-height: 24px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: background-color 150ms ease;
  outline: none;
}

button:hover {
  background-color: #1A5BB6;
}

button:focus {
  box-shadow: 0 0 0 1pt #1A5BB6;
  background-color: #1A5BB6;
}

button:active {
  box-shadow: 0 0 0 1pt #0E3F87;
  background-color: #0E3F87;
}

button:disabled {
  background-color: #EDEEF2;
  color: #C3C5CB;
  cursor: auto;
  box-shadow: none;
  border: 1px solid transparent;
  outline: none;
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

svg {
  animation: rotate 2s linear infinite;
}

  </style>