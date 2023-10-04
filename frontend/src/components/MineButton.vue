<template>
  <div class="flex justify-center items-center">
    <button :disabled="insufficientFunds" @click="mine" class="mt-5 bg-gradient-to-r from-sky-600 to sky-900 hover:bg-button focus:outline-none focus:ring-2 focus:ring-blue-700 text-yellow-300 px-6 py-2 rounded-xl cursor-pointer text-lg font-semibold transition-colors focus:outline-none">
      <SpinnerSVG v-if="loading" />
      <span v-else-if="insufficientFunds">Insufficient Funds</span>
      <span v-else>Mine</span>
    </button>
  </div>
</template>

<script>
import MiningRigABI from '../ABI/MiningRigABI.json'
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
  async created() {
    await window.web3.currentProvider.enable();
    this.web3 = new Web3(window.web3.currentProvider);
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
        if (!this.web3) {
          console.error('Web3 is not initialized.');
          return;
        }

        if (!this.contractAddress) {
          console.error('contractAddress is not initialized.');
          return;
        }

        const contract = new this.web3.eth.Contract(MiningRigABI, this.contractAddress);

        if (!contract) {
          console.error('Contract is not initialized.');
          return;
        }

        const accounts = await this.web3.eth.getAccounts();

        if (!accounts || accounts.length === 0) {
          console.error('No accounts found.');
          return;
        }

        const account = accounts[0];
        const amountOutMinUniswap = 2000;

        console.log('Sending Transaction with:', {
          from: account,
          value: this.enteredAmount,
          amountOutMinUniswap: amountOutMinUniswap,
        });

        const value = this.web3.utils.toWei(this.enteredAmount.toString(), "ether")
        await contract.methods
          .mineLiquidity(amountOutMinUniswap)
          .send({ from: account, value: value })
          .on('transactionHash', (hash) => {
            console.log('transactionHash', hash);
          })
          .on('confirmation', (confirmationNumber, receipt) => {
            console.log('confirmation', confirmationNumber);
            const quote = receipt.events.MinedTokens.returnValues.quote;
            this.$emit('quoteObtained', quote);
          })
          .on('error', console.error);

        this.$emit('mine');
      } catch (error) {
        console.error('Mining failed:', error.message || error);
      } finally {
        this.loading = false;
      }
    }
  },
};
</script>