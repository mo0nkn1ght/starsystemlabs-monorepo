<template>
  <div class="flex flex-col items-start bg-card-blue bg-opacity-50 p-4 rounded-xl w-full">
    <div class="text-sm mb-2">{{ label }}</div>
    <div class="flex items-center justify-between w-full">
      <AmountInput :currency="currency" :maxAmount="balance" @inputChanged="emitAmount" ref="amountInput"/>
      <div class="flex flex-col items-center justify-center">
        <img :src="currencyLogo" alt="Currency Logo" class="w-12 h-12 rounded-full">
        <div class="flex items-center space-x-2 mt-2" v-if="accountAddress">
          <div class="text-gray-600">Balance:</div>
          <div class="text-gray-600">{{ balance }}</div>
          <button @click="handleMaxClicked" class="bg-transparent border-none cursor-pointer text-xl px-2 py-1 hover:text-gray-700 focus:outline-none transition-colors">Max</button>
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
      this.$refs.amountInput.amount = this.balance;
    },
    emitAmount(value) {
      this.$emit('amountChanged', value);
    }
  }
}
</script>

