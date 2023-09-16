<template>
  <div class="appnavbar">
    <div class="appnavbar-content">
      <div class="title">Star System Labs</div>
      <div v-if="accountAddress" class="wallet-info">
        {{ shortenedAddress }}
        <div class="balance-details">
          <div>Balance: {{ ethBalance }} ETH</div>
          <div>PePe Token Balance: {{ formattedPepeBalance }} PEPE</div>
          <div>Pond Token Balance: {{ formattedPndcBalance }} PNDC</div>
          <div :class="networkClass">
            {{ networkName }} 
            <img v-if="networkIcon" :src="networkIcon" alt="Network Icon" class="network-icon">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['accountAddress', 'networkIcon', 'balance', 'pepeBalance', 'pndcBalance', 'networkName'],
  computed: {
  shortenedAddress() {
    if (this.accountAddress) {
      return `${this.accountAddress.slice(0, 6)}...${this.accountAddress.slice(-4)}`;
    }
    return null;
  },
  networkClass() {
    return [
      'network-text', 
      this.networkName === 'Sepolia' ? 'testnet' : ''
    ];
  },
  ethBalance() {
    return this.balance || "0";
  },
  formattedPepeBalance() {
    return this.pepeBalance || "0";
  },
  formattedPndcBalance() {
    return this.pndcBalance || "0";
  }
},
  name: 'AppNavbar'
};
</script>
  
<style scoped>
.appnavbar {
  background-color: rgba(30, 30, 30, 0.5);
  color: #fff;
  padding: 10px 0;
  margin: 0;
}

.appnavbar-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wallet-info, .balance-details {
  display: flex;
  align-items: center;  
  gap: 10px;
  flex-wrap: wrap;
}

.network-text {
  display: flex;
  align-items: center; 
}

.network-icon {
  margin-left: 10px;
  margin-bottom: 2px;
}

.testnet {
  color: #d1b7f1;
}

</style>