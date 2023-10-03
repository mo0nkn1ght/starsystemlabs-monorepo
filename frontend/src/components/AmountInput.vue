<template>
  <div class="flex items-center justify-left w-full max-w-[260px]">
    <input
      type="number"
      placeholder="0"
      v-model="amount"
      class="border-none bg-transparent w-full outline-none text-4xl text-yellow-300 overflow-hidden whitespace-nowrap text-overflow-ellipsis text-left placeholder-blue"
      ref="amountInput"
      @input="emitInputValue"
    />
  </div>
</template>

<script>
export default {
  name: 'AmountInput',
  props: {
    maxAmount: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      amount: null
    };
  },
  methods: {
    emitInputValue(event) {
      this.$emit('inputChanged', parseFloat(event.target.value));
    }
  }
}
</script>

<style scoped>
input {
  max-width: 240px;
  -webkit-appearance: textfield; /* for chrome, safari */
  -moz-appearance: textfield; /* for firefox */
}

input::-webkit-inner-spin-button, input::-webkit-outer-spin-button {
  -webkit-appearance: none; /* for chrome, safari */
  margin: 0;
}
</style>
