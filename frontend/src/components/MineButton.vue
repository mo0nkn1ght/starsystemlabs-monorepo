<template>
  <div class="flex justify-center items-center">
    <button :disabled="insufficientFunds || enterAmount" @click="mine" class="mt-5 bg-gradient-to-r from-sky-600 to sky-900 hover:bg-button font-origin focus:outline-none focus:ring-2 focus:ring-blue-700 text-yellow-300 px-6 py-2 rounded-xl cursor-pointer text-lg font-semibold transition-colors focus:outline-none">
      <SpinnerSVG v-if="loading" />
      <span v-else-if="insufficientFunds">Insufficient Funds</span>
      <span v-else-if="enterAmount">Enter Amount</span>
      <span v-else>Mine</span>
    </button>
  </div>
</template>

<script>
import MiningRigABI from '../ABI/MiningRigABI.json'
import SpinnerSVG from './SpinnerSVG.vue';
import { ethers } from "ethers";
let provider;
let contract;

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
    if (window.ethereum) {
      try {
        provider = new ethers.BrowserProvider(window.ethereum);
        contract = new ethers.Contract(
          this.contractAddress,
          MiningRigABI,
          await provider.getSigner()
        );
      } catch (error) {
        console.error("Failed to enable ethereum or create contract:", error);
      }
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  },
  computed: {
    insufficientFunds() {
      return parseFloat(this.enteredAmount) > parseFloat(this.walletBalance);
    },
    enterAmount() {
      return !parseFloat(this.enteredAmount);
    }
  },
  methods: {
    async mine() {
      this.loading = true;
      try {
        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
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

        const tx = await contract.mineLiquidity(amountOutMinUniswap, {
          value: ethers.parseEther(this.enteredAmount.toString()),
          from: account,
        });
        await tx.wait(); // Wait for transaction to be mined
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