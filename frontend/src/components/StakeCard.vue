<template>
  <div class="flex flex-col items-center w-full text-center">
    <TokenInputCard currency="PPePe" label="You Stake:" :currencyLogo="require('@/assets/ppepe.png')" class="mb-6"/>
    <button @click="handleStakeClick" class="bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer text-lg font-semibold transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700">
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
  