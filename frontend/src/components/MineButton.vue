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
import { MiningRigABI } from '../ABI/MiningRigABI.json'
import SpinnerSVG from './SpinnerSVG.vue';
import Web3 from 'web3';

export default {
  components: {
    SpinnerSVG
  },
  data() {
    return {
      loading: false,
      web3: null
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
  created() {
    const infuraLink = process.env.VUE_APP_INFURA_LINK || '';
    this.web3 = new Web3(Web3.givenProvider || infuraLink);
  },
  computed: {
    insufficientFunds() {
      return parseFloat(this.enteredAmount) > parseFloat(this.walletBalance);
    }
  },
  methods: {
    async mine() {
      this.loading = true;
      try {
        console.log('this.web3: ', this.web3); // Log the state of web3
        console.log('this.contractAddress: ', this.contractAddress); // Log the state of contractAddress
        console.log('this.enteredAmount: ', this.enteredAmount); // Log the state of enteredAmount
        
        if (!this.web3 || !this.contractAddress) {
          console.error('Web3 or contractAddress is not initialized.');
          return;
        }
        
        const contract = new this.web3.eth.Contract(MiningRigABI, this.contractAddress);
        const accounts = await this.web3.eth.getAccounts();

        if (!accounts || accounts.length === 0) {
          console.error('No accounts found.');
          return;
        }

        const weiAmount = this.web3.utils.toWei(this.enteredAmount, 'ether');
        console.log('weiAmount: ', weiAmount); // Log the state of weiAmount
        
        const account = accounts[0];
        const amountOutMinUniswap = 0;

        await contract.methods
          .mineLiquidity(amountOutMinUniswap)
          .send({ from: account, value: this.enteredAmount })
          .on('transactionHash', (hash) => {
            console.log('transactionHash', hash);
          })
          .on('confirmation', (confirmationNumber) => {
            console.log('confirmation', confirmationNumber);
          })
          .on('error', console.error);

        this.$emit('mine');
      } catch (error) {
        console.error('Mining failed:', error.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>