<template>
  <div class="flex flex-col items-center w-full text-center">
    <TokenInputCard currency="PPePe" label="You Stake:" :currencyLogo="require('@/assets/ppepe.png')" class="mb-4 text-teal"/>
    <button @click="handleStakeClick('ppepe')" class="bg-gradient-to-r from-sky-600 to sky-900 hover:bg-button text-yellow-300 px-4 py-2 rounded-xl cursor-pointer text-lg font-semibold transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 mb-6">
      <SpinnerSVG v-if="loadingPpepe" />
      <span v-else>{{ stakeButtonTextPpepe }}</span>
    </button>

    <TokenInputCard currency="PePe" label="You Stake:" :currencyLogo="require('@/assets/pepe.png')" class="mb-4 text-teal"/>
    <button @click="handleStakeClick('pepe')" class="bg-gradient-to-r from-sky-600 to sky-900 hover:bg-button text-yellow-300 px-4 py-2 rounded-xl cursor-pointer text-lg font-semibold transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 mb-6">
      <SpinnerSVG v-if="loadingPepe" />
      <span v-else>{{ stakeButtonTextPepe }}</span>
    </button>

    <TokenInputCard currency="Pond" label="You Stake:" :currencyLogo="require('@/assets/pond.png')" class="mb-4 text-teal"/>
    <button @click="handleStakeClick('pond')" class="bg-gradient-to-r from-sky-600 to sky-900 hover:bg-button text-yellow-300 px-4 py-2 rounded-xl cursor-pointer text-lg font-semibold transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 mb-2">
      <SpinnerSVG v-if="loadingPond" />
      <span v-else>{{ stakeButtonTextPond }}</span>
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
      stakeButtonClickCountPpepe: 0,
      stakeButtonTextPpepe: 'Stake PPePe',
      loadingPpepe: false,

      stakeButtonClickCountPepe: 0,
      stakeButtonTextPepe: 'Stake PePe',
      loadingPepe: false,

      stakeButtonClickCountPond: 0,
      stakeButtonTextPond: 'Stake Pond',
      loadingPond: false,
      
      alternativeNames: {
      ppepe: 'PPEPE',
      pepe: 'PEPE',
      pond: 'PNDC'
    }
    };
  },
  methods: {
    handleStakeClick(token) {
      if (token === 'ppepe') {
        this.stakeButtonClickCountPpepe += 1;
        this.updateStakeButtonText('ppepe', this.stakeButtonClickCountPpepe);
      } else if (token === 'pepe') {
        this.stakeButtonClickCountPepe += 1;
        this.updateStakeButtonText('pepe', this.stakeButtonClickCountPepe);
      } else if (token === 'pond') {
        this.stakeButtonClickCountPond += 1;
        this.updateStakeButtonText('pond', this.stakeButtonClickCountPond);
      }
    },
    updateStakeButtonText(token, count) {
      const commonResponses = [
        'Coming Soon',
        'You are Too Early',
        '2 Earl Lee',
        `${this.alternativeNames[token]} Rewards Incoming!!`,
        'COPE HARDER'
      ];

      if (count <= commonResponses.length) {
        this[`stakeButtonText${token.charAt(0).toUpperCase() + token.slice(1)}`] = commonResponses[count - 1];
      } else {
        this[`loading${token.charAt(0).toUpperCase() + token.slice(1)}`] = true;
      }
    }
      }
};
</script>
