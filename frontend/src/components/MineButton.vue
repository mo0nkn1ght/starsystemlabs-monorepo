<template>
  <div class="flex justify-center items-center">
    <button :disabled="insufficientFunds" @click="mine" class="mt-5 bg-blue-600 text-white px-8 py-4 rounded-xl cursor-pointer text-lg font-semibold transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700">
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
    },
    contractAddress: {
      type: String,
      required: true,
    },
  },
  computed: {
    insufficientFunds() {
      return parseFloat(this.enteredAmount) > parseFloat(this.walletBalance);
    }
  },
  methods: {
    async mineLiquidity(amountOutMinUniswap) {
      const contractAddress = this.contractAddress;
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
        await this.mineLiquidity('YOUR_AMOUNT_OUT_MIN_UNISWAP_VALUE', 2000);
      }
  
      this.loading = false;
      this.$emit('mine');
    }
  }
};
</script>