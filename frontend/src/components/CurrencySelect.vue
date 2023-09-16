<template>
    <div class="currency-select">
      <select @change="handleTokenChange">
        <option value="PePe">PePe</option>
        <option value="Pond">Pond</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      handleTokenChange(event) {
        this.$emit("tokenSelected", event.target.value);
      }
    }
  }
  </script>
  
  <!-- Styles inspired by Uniswap's currency selector -->
  <style scoped>
    .currency-select select {
      /* Style the dropdown */
      appearance: none;
      padding: 10px 20px;
      border: none;
      border-radius: 16px;
      background-color: rgba(243, 244, 246, 0.5);
      cursor: pointer;
    }
  </style>
  