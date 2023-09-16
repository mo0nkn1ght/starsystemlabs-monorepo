<template>
    <div class="main" :style="{ '--main-card-height': mainCardHeight }">
      <div class="selectors">
        <button @click="setSelectedCard('mine')" :class="{active: selectedCard === 'mine'}">Mine</button>
        <button @click="setSelectedCard('claim')" :class="{active: selectedCard === 'claim'}">Claim</button>
        <button @click="setSelectedCard('stake')" :class="{active: selectedCard === 'stake'}">Staking</button>
      </div>
      <div v-if="selectedCard === 'mine'">
        <div class="input-card-wrapper">
          <MinerCard :ethBalance="ethBalance" :ppepeBalance="ppepeBalance" :accountAddress="accountAddress" @amountChanged="someMethodInMainCard" @connect="$emit('connect')"/>
        </div>
      </div>
      <div v-if="selectedCard === 'claim'">
        <ClaimCard />
      </div>
      <div v-if="selectedCard === 'stake'">
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
    computed: {
      mainCardHeight() {
        switch (this.selectedCard) {
          case 'mine':
            return '400px';
          case 'claim':
            return '425px';
          case 'stake':
            return '250px';
          default:
            return '350px';
        }
      }
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
  
  <style scoped>
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1.5rem 2rem;
    width: 650px;
    margin: 20px auto;
    height: calc(var(--main-card-height) + 50px);
    padding-top: 70px;
    position: relative;
  }
  
  .mb-2 {
    margin-bottom: 16px;
  }
  .selector {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 20px;
  }
  
  button {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background-color: #f3f4f6;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  button.active {
    background-color: #ddd;
  }
  
  button:hover {
    background-color: #ccc;
  }
  .selectors {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0;  /* Remove margin-bottom */
    position: absolute;  /* Absolute position so it stays at the top */
    top: 10px;  /* Adjust based on desired position */
    left: 100px;
    right: 100px;
}

  .selectors button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.5); 
    border: none;
    border-radius: 8px;
    margin-right: 10px; 
}

.selectors button:hover {
    background-color: rgba(204, 204, 204, 0.5); 
}

.selectors button.active {
    background-color: rgba(209, 213, 219, 0.5);
}


  .selectors button:last-child {
    margin-right: 0;
  }

.input-card-wrapper {
  position: relative; 
  z-index: 1; 
}
  </style>  