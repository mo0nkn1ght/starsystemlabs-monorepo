<template>
  <button @click="connect" class="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl border-none font-semibold cursor-pointer transition-opacity hover:opacity-80">
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

  