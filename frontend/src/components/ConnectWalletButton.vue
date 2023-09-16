<template>
    <button @click="connect">
      Connect Wallet
    </button>
  </template>
  
  <script>
  export default {
    name: 'ConnectWalletButton',
    methods: {
      connect() {
        this.$emit('connect');
      }
    }
  }
  </script>
  
  <style scoped>
button {
  background: linear-gradient(90deg, #D67FF2, #7645D9);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s;
}

button:hover {
  opacity: 0.8;
}
</style>

  