<template>
    <div class="stake-card">
      <!-- PePe Token Input Card 
      <TokenInputCard currency="PePe" label="You Stake:" :currencyLogo="require('@/assets/pepe.png')" class="mb-2"/>
      <button @click="handleStakeClick" class="stake-button mb-btn">
        <SpinnerSVG v-if="loading" />
        <span v-else>{{ stakeButtonText }}</span>
      </button>

       Pond Token Input Card 
      <TokenInputCard currency="Pond" label="You Stake:" :currencyLogo="require('@/assets/pond.png')" class="mb-2"/>
      <button @click="handleStakeClick" class="stake-button mb-btn">
        <SpinnerSVG v-if="loading" />
        <span v-else>{{ stakeButtonText }}</span>
      </button> -->

      <!-- PPePe Token Input Card -->
      <TokenInputCard currency="PPePe" label="You Stake:" :currencyLogo="require('@/assets/ppepe.png')" class="mb-2"/>
      <button @click="handleStakeClick" class="stake-button">
        <SpinnerSVG v-if="loading" />
        <span v-else>{{ stakeButtonText }}</span>
      </button>
    </div>
</template>
  
<script>
import TokenInputCard from './TokenInputCard.vue';
import SpinnerSVG from './SpinnerSVG.vue';

export default {
  name: 'StakeCard',
  components: {
    TokenInputCard,
    SpinnerSVG
  },
  data() {
    return {
      stakeButtonClickCount: 0,
      stakeButtonText: 'Stake',
      loading: false // to handle spinner
    };
  },
  methods: {
    handleStakeClick() {
      this.stakeButtonClickCount += 1;
      switch (this.stakeButtonClickCount) {
        case 1:
          this.stakeButtonText = 'Coming Soon';
          break;
        case 2:
          this.stakeButtonText = 'You are Too Early';
          break;
        case 3:
          this.stakeButtonText = '2 Earl Lee';
          break;
        case 4:
          this.stakeButtonText = 'PePe Rewards Incoming!!';
          break;
        case 5:
          this.stakeButtonText = 'COPE HARDER';
          break;
        default:
          this.loading = true; // Show spinner on further clicks
          break;
      }
    }
  }
};
</script>
  
<style scoped>
.stake-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
}

.stake-button {
  background-color: #2172E5;
  color: white;
  padding: 16px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 535;
  line-height: 24px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: background-color 150ms ease;
  outline: none;
}

.stake-button:hover {
  background-color: #1A5BB6;
}

.stake-button:focus {
  box-shadow: 0 0 0 1pt #1A5BB6;
  background-color: #1A5BB6;
}

.stake-button:active {
  box-shadow: 0 0 0 1pt #0E3F87;
  background-color: #0E3F87;
}

.stake-button:disabled {
  background-color: #EDEEF2;
  color: #C3C5CB;
  cursor: auto;
  box-shadow: none;
  border: 1px solid transparent;
  outline: none;
}

.mb-2 {
  margin-bottom: 24px;
}

.mb-btn {
  margin-bottom: 28px;
}
</style>
  