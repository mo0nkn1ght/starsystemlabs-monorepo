<template>
  <div class="flex items-center justify-center w-full max-w-[260px]"> <!-- changed justify-between to justify-center -->
    <input
      type="number"
      placeholder="0"
      v-model="amount"
      class="p-2 border-none bg-transparent w-full outline-none text-4xl overflow-hidden whitespace-nowrap text-overflow-ellipsis text-center"
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
      this.$emit('inputChanged', event.target.value);
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
