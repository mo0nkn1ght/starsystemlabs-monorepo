<template>
  <div class="flex flex-col items-center justify-center border-button bg-card-blue bg-opacity-50 rounded-xl shadow-md p-6 w-full max-w-md mx-auto my-5 relative sm:max-w-xl md:max-w-xl">
    <div class="selectors flex space-x-4 justify-between mx-5 mb-4 w-full font-origin">
      <button 
        @click="setSelectedCard('mine')" 
        :class="{
          'bg-button border-button text-yellow-300 font-medium shadow-button': selectedCard === 'mine', 
          'text-button-inactive bg-button-inactive': selectedCard !== 'mine' 
        }" 
        class="border-button w-full h-10 flex items-center justify-center px-2 sm:px-8 py-2 text-xs sm:text-base rounded-lg cursor-pointer transition-colors ease-in-out duration-300 hover:bg-button-hover active:bg-button-active"
      >
        Mine
      </button>
      <button 
        @click="setSelectedCard('claim')" 
        :class="{
          'bg-button border-button text-yellow-300 font-medium shadow-button': selectedCard === 'claim',
          'text-button-inactive bg-button-inactive': selectedCard !== 'claim'
        }" 
        class="border-button w-full h-10 flex items-center justify-center px-2 sm:px-8 py-2 text-xs sm:text-base rounded-lg cursor-pointer transition-colors ease-in-out duration-300 hover:bg-button-hover active:bg-button-active"
      >
        Claim
      </button>
      <button 
        @click="setSelectedCard('stake')" 
        :class="{
          'bg-button border-button text-yellow-300 font-medium shadow-button': selectedCard === 'stake',
          'text-button-inactive bg-button-inactive': selectedCard !== 'stake'
        }" 
        class="border-button w-full h-10 flex items-center justify-center px-2 sm:px-8 py-2 text-xs sm:text-base rounded-lg cursor-pointer transition-colors ease-in-out duration-300 hover:bg-button-hover active:bg-button-active"
      >
        Stake
      </button>
    </div>

      <div v-if="selectedCard === 'mine'" class="flex justify-center w-full">
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