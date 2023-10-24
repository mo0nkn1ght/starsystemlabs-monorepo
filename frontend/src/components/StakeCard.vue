<template>
  <div class="flex flex-col items-center font-origin w-full text-center">
    <TokenInputCard
    class="mb-4 text-teal"
    currency="PPePe"
    label="You Stake:"
    :currencyLogo="require('@/assets/ppepe.png')"
    :balance="ppepeBalance"
    :isEditable="false"
    :isMaxSelectable="false"
    @amountChanged="handleAmountChanged"
    :accountAddress="accountAddress"
    />

    <ConnectWalletButton v-if="!accountAddress" @connect="$emit('connect')" class="mb-6"/>
    <button v-else @click="handleStakeClick('ppepe')" class="bg-gradient-to-r from-sky-600 to sky-900 hover:bg-button text-yellow-300 px-4 py-2 rounded-xl cursor-pointer text-lg font-semibold transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 mb-6">
      <SpinnerSVG v-if="loadingPpepe" />
      <span v-else>{{ stakeButtonTextPpepe }}</span>
    </button>

    <TokenInputCard
    currency="PePe"
    label="You Stake:"
    :currencyLogo="require('@/assets/pepe.png')"
    class="mb-4 text-teal"
    :balance="pepeBalance"
    :isEditable="false"
    :isMaxSelectable="false"
    @amountChanged="handleAmountChanged"
    :accountAddress="accountAddress"
    />
    <ConnectWalletButton v-if="!accountAddress" @connect="$emit('connect')" class="mb-6"/>
    <button v-else @click="handleStakeClick('pepe')"  class="bg-gradient-to-r from-sky-600 to sky-900 hover:bg-button text-yellow-300 px-4 py-2 rounded-xl cursor-pointer text-lg font-semibold transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 mb-6">
      <SpinnerSVG v-if="loadingPepe" />
      <span v-else>{{ stakeButtonTextPepe }}</span>
    </button>

    <TokenInputCard
    currency="Pond"
    label="You Stake:"
    :currencyLogo="require('@/assets/pond.png')"
    class="mb-4 text-teal"
    :balance="pondBalance"
    :isEditable="false"
    :isMaxSelectable="false"
    @amountChanged="handleAmountChanged"
    :accountAddress="accountAddress"
    />
    <ConnectWalletButton v-if="!accountAddress" @connect="$emit('connect')" class="mb-6"/>
    <button v-else @click="handleStakeClick('pond')"  class="bg-gradient-to-r from-sky-600 to sky-900 hover:bg-button text-yellow-300 px-4 py-2 rounded-xl cursor-pointer text-lg font-semibold transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 mb-2">
      <SpinnerSVG v-if="loadingPond" />
      <span v-else>{{ stakeButtonTextPond }}</span>
    </button>
  </div>
</template>

<script>
import ConnectWalletButton from './ConnectWalletButton.vue';
import TokenInputCard from './TokenInputCard.vue';
import SpinnerSVG from './SpinnerSVG.vue';

export default {
  name: 'StakeCard',
  components: {
    TokenInputCard,
    ConnectWalletButton,
    SpinnerSVG
  },
  props: {
    accountAddress: {
      type: String,
      default: "0.00"
    },
    ppepeBalance: {
      type: String,
      default: "0.00"
    },
    pepeBalance: {
      type: String,
      default: "0.00"
    },
    pondBalance: {
      type: String,
      default: "0.00"
    }
  },
  data() {
    return {
      enteredAmountData: '0.00',
      walletBalanceData: '0.00',

      PEPE_ADDRESS: '0xe9C5A35BefC36E8B35B93470C034caf0a8E94308',
      POND_ADDRESS: '0x11541e990036ec13D521d584F098a83bD0F4BFC3',
      PPEPE_ADDRESS: '0x11541e990036ec13D521d584F098a83bD0F4BFC3',

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
    connect() {
      console.log("Button clicked!");
      this.$emit('connect');
    },
    handleAmountChanged(value) {
      console.log("Amount Changed: ", value)
      this.enteredAmountData = value;
      this.walletBalanceData = this.ethBalance;
    },
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
  },
  watch: {
    enteredAmountData(newVal) {
      console.log("enteredAmountData updated: ", newVal);
    },
    walletBalanceData(newVal) {
      console.log("walletBalanceData updated: ", newVal)
    },
  },
  mounted() {
    this.walletBalanceData = this.ethBalance;
  },
};
</script>
