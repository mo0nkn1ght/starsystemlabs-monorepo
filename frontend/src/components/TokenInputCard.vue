<template>
  <div class="token-input-card">
    <div class="input-label">{{ label }}</div>
    <div class="input-with-logo">
      <AmountInput :currency="currency" :maxAmount="balance" @inputChanged="emitAmount" @maxClicked="handleMaxClicked" ref="amountInput"/>
      <div class="right-section">
        <img :src="currencyLogo" alt="Currency Logo" class="currency-logo">
        <div class="balance-with-max" v-if="accountAddress">
          <div class="balance-label">Balance:</div>
          <div class="balance-amount">{{ balance }}</div>
          <button @click="handleMaxClicked" class="max-button">Max</button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import AmountInput from './AmountInput.vue';

export default {
  name: 'TokenInputCard',
  components: {
    AmountInput,
  },
  props: {
    accountAddress: {
      type: String,
      default: null
    },
    isEditable: {
    type: Boolean,
    default: true
    },
    currency: {
      type: String,
      default: 'ETH'
    },
    label: {
      type: String,
      default: ''
    },
    currencyLogo: {
      type: String,
      default: ''
    },
    balance: {
      type: String,
      default: '0.00'
    }
  },
  methods: {
    handleMaxClicked() {
      // Logic to fill in the maximum amount when the max button is clicked
      this.$refs.amountInput.amount = this.balance;
    },
    emitAmount(value) {
      this.$emit('amountChanged', value);
    }
  }
}
</script>

<style scoped>
.token-input-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgba(243, 244, 246, 0.5);
  padding: 10px 20px;
  border-radius: 12px;
}

.input-label {
  font-size: 14px;
  margin-bottom: 8px;
}

.input-with-logo {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.right-section {
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: flex-end; 
}

.currency-logo {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px; 
}

.currency-logo-large {
  width: 32px;
  height: 32px;
  margin: 10px auto;
  display: block;
}

.balance-label {
  font-size: 14px;
  color: #555;
}

.balance-amount {
  font-size: 14px;
  color: #555;
  margin-left: 5px;
}
.balance-with-max {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px; 
}

.balance-display {
  font-size: 14px;
  color: #555;
}

.max-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  outline: none; 
  transition: color 0.2s; 
  color: #555;
}

.max-button:hover {
  color: #333;
}

.max-button:active {
  color: #000;
}

</style>
