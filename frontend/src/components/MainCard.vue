<template>
  <div class="flex flex-col items-center justify-center bg-white bg-opacity-50 rounded-xl shadow-md p-6 w-full max-w-md mx-auto my-5 relative sm:max-w-xl md:max-w-xl">
    <div class="selectors flex justify-between mx-5 mb-4">
      <button @click="setSelectedCard('mine')" :class="{ 'bg-gray-300': selectedCard === 'mine' }" class="w-full h-10 flex items-center justify-center px-8 py-2 rounded-lg cursor-pointer transition-colors ease-in-out duration-300 hover:bg-gray-200">
        Mine
      </button>
      <button @click="setSelectedCard('claim')" :class="{ 'bg-gray-300': selectedCard === 'claim' }" class="w-full h-10 flex items-center justify-center px-8 py-2 rounded-lg cursor-pointer transition-colors ease-in-out duration-300 hover:bg-gray-200">
        Claim
      </button>
      <button @click="setSelectedCard('stake')" :class="{ 'bg-gray-300': selectedCard === 'stake' }" class="w-full h-10 flex items-center justify-center px-8 py-2 rounded-lg cursor-pointer transition-colors ease-in-out duration-300 hover:bg-gray-200">
        Staking
      </button>
    </div>
    <div v-if="selectedCard === 'mine'" class="w-full flex justify-center">
      <MinerCard :ethBalance="ethBalance" :ppepeBalance="ppepeBalance" :accountAddress="accountAddress" @amountChanged="someMethodInMainCard" @connect="$emit('connect')" />
    </div>
    <div v-if="selectedCard === 'claim'" class="w-full">
      <ClaimCard />
    </div>
    <div v-if="selectedCard === 'stake'" class="w-full">
      <StakeCard />
    </div>
  </div>
</template>
  
  <script>
  import ClaimCard from './ClaimCard.vue';
  import StakeCard from './StakeCard.vue';
  import MinerCard from './MinerCard.vue';
  
  export default {
    name: 'MainCard',
    components: {
      ClaimCard,
      StakeCard,
      MinerCard
    },
    data() {
      return {
        selectedCard: 'mine',  // Default option
        showCopeSequence: false
      };
    },
    props: {
      accountAddress: {
        type: String,
        default: null
      },
      ethBalance: {
        type: String,
        default: "0.00"
      },
      pepeBalance: {
        type: String,
        default: "0.00"
      }
    },
    methods: {
      setSelectedCard(card) {
        this.selectedCard = card;
        localStorage.setItem('selectedCard', card);
      },
      toggleCopeSequence() {
        this.showCopeSequence = !this.showCopeSequence;
      }
    },
    mounted() {
      const savedCard = localStorage.getItem('selectedCard');
      if (savedCard) {
        this.selectedCard = savedCard;
      }
    }
  }
  </script>