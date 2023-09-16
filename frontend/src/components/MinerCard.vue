<template>
    <div class="miner-card">
      <TokenInputCard 
        class="token-input-card mb-2"
        currency="ETH"
        label="You Supply:"
        :currencyLogo="require('@/assets/eth.png')"
        :balance="ethBalance"
        :isEditable="false"
        @amountChanged="handleAmountChanged"
        :accountAddress="accountAddress"
      />

      <transition name="expand">
        <div class="cope-container" @click="toggleCopeSequence">
          <span v-show="!showCopeSequence" class="cope-button-content">COPE HARDER</span>
            <div v-show="showCopeSequence" class="cope-sequence-content">
              <img class="cope-image" :src="require('@/assets/eth.png')" alt="ETH">
              <div class="arrow"></div>
              <img class="cope-image-supply" :src="require('@/assets/supply.png')" alt="Supply">
              <div class="arrow"></div>
              <img class="cope-image" :src="require('@/assets/ppepe.png')" alt="PPePe">
            </div>
        </div>
      </transition>

      <TokenInputCard
        class="token-input-card mb-2"
        :currency="selectedToken"
        label="You Mine:"
        :currencyLogo="getTokenLogo(selectedToken)"
        :balance="ppepeBalance"
        :isEditable="false"
        @amountChange="handleAmountChanged"
        :accountAddress="accountAddress"
      />
      
      <!-- Show 'Connect Wallet' button when accountAddress is null/undefined -->
      <ConnectWalletButton v-if="!accountAddress" @connect="$emit('connect')" />
      <!-- Show 'Mine' button when accountAddress is available -->
      <MineButton v-else
        :enteredAmount="enteredAmountData"
        :walletBalance="walletBalanceData"
        @mine="handleMine"
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
.miner-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(243, 244, 246, 0.5);
  padding: 20px 20px;
  border-radius: 12px;
  height: 325px;
  width: 625px;
}

.token-input-card {
  width: 85%;
}

.selected-token-logo {
  width: 32px;
  height: 32px;
  margin: 8px 0;
}

  /* Container for COPE HARDER button and sequence */
  .cope-container {
  cursor: pointer;
  position: absolute;
  top: 36.5%;
  left: 50%;
  transform: translate(-50%, -50%) scaleX(1);
  transition: transform 0.5s ease-in-out; 
  border-radius: 12px;
  height: 30px;
  max-width: 320px; 
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  font-weight: bold;
  color: #333;
  z-index: 2;
  border: 2px solid #333;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  transition: max-width 0.75s; 
  white-space: nowrap;
  overflow: hidden;
}

/* Content styles for COPE HARDER button */
.cope-button-content {
  width: 100%;
  text-align: center;
  font-size: 11px;
  padding: 0 10px;
}

/* Content styles for sequence */
.cope-sequence-content {
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
}

/* Transition styles */
.cope-container.expand-enter-active, .cope-container.expand-leave-active {
    transition: transform 0.5s ease-in-out;
}
.cope-container.expand-enter, .cope-container.expand-leave-to {
  transform: translate(-50%, -50%) scaleX(2); 
}

  .cope-button, .cope-sequence {
    border-radius: 12px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f4f6;
    font-weight: bold;
    color: #333;
    z-index: 2;
    border: 2px solid #333;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    transition: all 0.5s;
}

.cope-button {
  width: 120px;
  font-size: 11px; 
}

.cope-sequence {
  gap: 10px;
  padding: 0 10px;
  width: auto; 
  max-width: 300px; 
}

.cope-image {
    width: 20px;
    height: 20px;
}

.cope-image-supply {
  width: 38px;
  height: 38  px;
}


/* Right-facing arrow */
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

.mb-2 {
    margin-bottom: 16px;
  }
</style>
