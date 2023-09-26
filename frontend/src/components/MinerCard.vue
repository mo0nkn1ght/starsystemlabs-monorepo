<template>
  <div class="flex flex-col items-center justify-between bg-gray-200 bg-opacity-50 p-5 rounded-xl aspect-w-16 aspect-h-9 max-w-[100%] md:max-w-[360px] mx-auto">
    <TokenInputCard 
      class="w-[350px] mb-1"
      currency="ETH"
      label="You Supply:"
      :currencyLogo="require('@/assets/eth.png')"
      :balance="ethBalance"
      :isEditable="false"
      @amountChanged="handleAmountChanged"
      :accountAddress="accountAddress"
    />

    <transition name="expand">
      <div 
      class="cursor-pointer absolute top-[42%] left-[50%] transform translate-x-[-50%] scale-x-[1] transition-transform duration-500 ease-in-out rounded-xl cope-harder-button max-w-[32vw] flex items-center justify-center bg-gray-200 text-black font-bold border-2 border-black shadow-md z-2 overflow-hidden whitespace-nowrap"
        @click="toggleCopeSequence"
      >
        <span v-show="!showCopeSequence" class="w-full text-center sm:px-2.5 cope-harder-text">
          COPE HARDER
          </span>
        <div v-show="showCopeSequence" class="flex gap-2.5 w-full justify-center items-center px-2.5">
          <img class="w-[4.5vw] h-[4.5vw]" :src="require('@/assets/eth.png')" alt="ETH">
          <div class="arrow"></div>
          <img class="w-[7vw] h-[7vw]" :src="require('@/assets/supply.png')" alt="Supply">
          <div class="arrow"></div>
          <img class="w-[4.5vw] h-[4.5vw]" :src="require('@/assets/ppepe.png')" alt="PPePe">
        </div>
      </div>
    </transition>

    <TokenInputCard 
      class="w-[350px] mb-4"
      :currency="selectedToken"
      label="You Mine:"
      :currencyLogo="getTokenLogo(selectedToken)"
      :balance="ppepeBalance"
      :isEditable="false"
      @amountChange="handleAmountChanged"
      :accountAddress="accountAddress"
    />
    
    <!-- Show 'Connect Wallet' button when accountAddress is null/undefined -->
    <ConnectWalletButton v-if="!accountAddress" @connect="$emit('connect')" class="mt-5"/>
    <!-- Show 'Mine' button when accountAddress is available -->
    <MineButton v-else
      :enteredAmount="enteredAmountData"
      :walletBalance="walletBalanceData"
      @mine="handleMine"
      class="mt-5"
    />
  </div>
</template>
  
<script>
import ConnectWalletButton from './ConnectWalletButton.vue';
import TokenInputCard from './TokenInputCard.vue';
import MineButton from './MineButton.vue';

export default {
  components: {
    ConnectWalletButton,
    TokenInputCard,
    MineButton
  },
  props: {
    ethBalance: {
      type: String,
      default: "0.00"
    },
    ppepeBalance: {
      type: String,
      default: "0.00"
    },
    accountAddress: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      selectedToken: "PePe",
      showCopeSequence: false,
      enteredAmountData: '0.00',
      walletBalanceData: '0.00'
    };
  },
  methods: {
    handleMining() {
        this.$emit('mine');
    },
    handleAmountChanged(value) {
      this.$emit('amountChanged', value);
    },
    getTokenLogo(token) {
      if (token === "PePe") return require('@/assets/pepe.png');
      if (token === "Pond") return require('@/assets/pond.png');
      return '';
    },
    toggleCopeSequence() {
      this.showCopeSequence = !this.showCopeSequence;
    }
  }
}
</script>
  
<style scoped>
@media (max-width: 640px) {
  .cope-harder-text {
    font-size: 0.5rem;
  }
  .cope-harder-button {
    height: 2rem; /* Adjust as needed */
    padding: 0.25rem; /* Adjust as needed */
  }
}
@media (min-width: 641px) and (max-width: 768px) {
  .cope-harder-text {
    font-size: 0.75rem;
  }
  .cope-harder-button {
    height: 2.5rem; /* Adjust as needed */
    padding: 0.5rem; /* Adjust as needed */
  }
}
@media (min-width: 769px) and (max-width: 1024px) {
  .cope-harder-text {
    font-size: 1rem;
  }
  .cope-harder-button {
    height: 3rem; /* Adjust as needed */
    padding: 0.75rem; /* Adjust as needed */
  }
}
@media (min-width: 1025px) {
  .cope-harder-text {
    font-size: 1.25rem;
  }
  .cope-harder-button {
    height: 3.5rem; /* Adjust as needed */
    padding: 1rem; /* Adjust as needed */
  }
}

.arrow {
  position: relative;
  display: inline-block;
  width: 1vw; /* Adjust as needed */
  height: 0.2vw; /* Adjust as needed */
  background-color: #333;
  margin: 0 0.5vw; /* Adjust as needed */
}

.arrow::before, .arrow::after {
  content: '';
  position: absolute;
  width: 0.5vw; /* Adjust as needed */
  height: 0.2vw; /* Adjust as needed */
  background-color: #333;
}

.arrow::before {
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%) rotate(45deg);
}

.arrow::after {
  bottom: 50%;
  left: 0;
  transform: translate(-50%, 50%) rotate(-45deg);
}

@media (max-width: 640px) {
  .arrow, .arrow::before, .arrow::after {
    width: 2vw; /* Adjust as needed */
    height: 0.4vw; /* Adjust as needed */
    margin: 0 1vw; /* Adjust as needed */
  }
}

</style>
