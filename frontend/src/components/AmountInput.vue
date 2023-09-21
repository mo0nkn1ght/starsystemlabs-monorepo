<template>
    <div class="input-container">
      <input
        type="number"
        placeholder="0"
        v-model="amount"
        class="amount-input"
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
.input-container {
  flex: 1;  
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 275px;
}

.amount-input {
  flex: 0.7;
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  flex: 1;
  outline: none;
  font-size: 36px;
}

.amount-input::placeholder {
  font-size: 36px;
}

/* Hide spinner buttons for Firefox */
.amount-input::-webkit-inner-spin-button,
.amount-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Hide spinner buttons for Chrome, Safari, Edge, Opera */
.amount-input::-webkit-inner-spin-button,
.amount-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

</style>
