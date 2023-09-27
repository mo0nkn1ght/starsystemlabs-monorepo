<template>
  <div class="flex flex-col items-center justify-between bg-card-blue bg-opacity-50 p-5 rounded-xl aspect-w-16 aspect-h-9 max-w-[100%] md:max-w-[360px] mx-auto">
    <div class="rig-toggle flex cursor-pointer mb-4 rounded-xl overflow-hidden border-2 border-button shadow-md relative" @click="toggleMiningRig">
      <div class="absolute left-0 top-0 h-full w-1/2 bg-button-active rounded-xl transition-all duration-300" 
        :class="selectedMiningRig === 'PePe' ? 'left-0' : 'left-1/2'"></div>
      <div 
        :class="selectedMiningRig === 'PePe' ? 'text-button' : 'text-button-inactive'" 
        class="flex-1 text-center py-2 px-8 transition-colors duration-300 ease-in-out z-10"
      >PePe</div>
      <div 
        :class="selectedMiningRig === 'Pond' ? 'text-button' : 'text-button-inactive'" 
        class="flex-1 text-center py-2 px-8 transition-colors duration-300 ease-in-out z-10"
      >Pond</div>
    </div>
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
      class="cursor-pointer absolute top-[42%] left-[50%] transform translate-x-[-50%] scale-x-[1] transition-transform duration-500 ease-in-out rounded-xl h-[5vh] max-w-[32vw] flex items-center justify-center bg-gray-200 text-black font-bold border-2 border-black shadow-md z-2 overflow-hidden whitespace-nowrap"
        @click="toggleCopeSequence"
      >
        <span v-show="!showCopeSequence" class="w-full text-center sm:px-2.5 cope-harder-text">
          COPE HARDER
          </span>
        <div v-show="showCopeSequence" class="flex gap-2.5 w-full justify-center items-center px-2.5">
          <img class="w-[3vw] h-[3vw]" :src="require('@/assets/eth.png')" alt="ETH">
          <div class="arrow"></div>
          <img class="w-[3vw] h-[3vw]" :src="require('@/assets/supply.png')" alt="Supply">
          <div class="arrow"></div>
          <img class="w-[3vw] h-[3vw]" :src="require('@/assets/ppepe.png')" alt="PPePe">
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
      :contractAddress="selectedContractAddress"
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
      walletBalanceData: '0.00',
      selectedMiningRig: 'PePe', // Default
      PEPE_ADDRESS: '0xe9C5A35BefC36E8B35B93470C034caf0a8E94308',
      POND_ADDRESS: '0x11541e990036ec13D521d584F098a83bD0F4BFC3',
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
    },
    toggleMiningRig() {
      this.selectedMiningRig = this.nextMiningRig;
    },
  },
  computed: {
    selectedContractAddress() {
      return this.selectedMiningRig === 'PePe' ? this.PEPE_ADDRESS : this.POND_ADDRESS;
    },
    nextMiningRig() {
      return this.selectedMiningRig === 'PePe' ? 'Pond' : 'PePe';
    },
  },
}
</script>
  
<style scoped>
@media (max-width: 640px) {
  .cope-harder-text {
    font-size: 0.5rem;
  }
  .cope-harder-button {
    height: 2rem;
    padding: 0.25rem;
  }
}
@media (min-width: 641px) and (max-width: 768px) {
  .cope-harder-text {
    font-size: 0.75rem;
  }
  .cope-harder-button {
    height: 2.5rem;
    padding: 0.5rem;
  }
}
@media (min-width: 769px) and (max-width: 1024px) {
  .cope-harder-text {
    font-size: 1rem;
  }
  .cope-harder-button {
    height: 3rem; 
    padding: 0.75rem;
  }
}
@media (min-width: 1025px) {
  .cope-harder-text {
    font-size: 1.25rem;
  }
  .cope-harder-button {
    height: 3.5rem;
    padding: 1rem;
  }
}

.arrow {
  position: relative;
  display: inline-block;
  width: 9px;
  height: 1px;
  background-color: #333;
  margin: 0 4px;
}

.arrow::before, .arrow::after {
  content: '';
  position: absolute;
  right: 0;
  width: 3px;
  height: 1px;
  background-color: #333;
}

.arrow::before {
  top: -1.5px;
  transform: rotate(45deg);
}

.arrow::after {
  bottom: -1.5px;
  transform: rotate(-45deg);
}

</style>
