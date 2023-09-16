<template>
    <div>
      Balance: {{ balance }}
    </div>
  </template>
  
  <script>
  export default {
    name: 'BalanceDisplay',
    props: {
      balance: {
        type: String,
        default: '0'
      }
    }
  }
  </script>
  