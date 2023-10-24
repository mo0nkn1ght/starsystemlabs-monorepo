<template>
    <transition name="fade">
        <div v-if="show" class="fixed bottom-10 right-10 bg-card-blue bg-opacity-80 border border-custom-blue p-4 rounded-lg shadow-md flex flex-col items-center space-x-4 z-50">
            <div class="flex items-center space-x-4 w-full">
                <img :src="image" alt="Status Image" class="w-12 h-12">
                <span class="text-yellow-300">{{ message }}</span>
            </div>
            <div class="relative w-full mx-auto h-1 mt-2 rounded-full bg-button">
                <div class="absolute h-1 bg-yellow-300 rounded-full" :style="{'width': progress + '%'}"></div>
            </div>
        </div>
    </transition>
</template>
  
  <script>
  export default {
    data() {
      return {
        show: false,
        message: '',
        image: '',
        progress: 100,
        timer: null
      };
    },
    methods: {
      showNotification(type) {
        if (this.timer) {
            clearInterval(this.timer);
            this.progress = 100;
        }
        if (type === "success") {
          this.message = "PrimordialPePe Mined!";
          this.image = require("@/assets/ppepe.png");
        } else {
          this.message = "Failed Transaction";
          this.image = require("@/assets/error.png");
        }
        this.show = true;
        this.timer = setInterval(() => {
          if (this.progress <= 0) {
            clearInterval(this.timer);
            this.show = false;
          } else {
            this.progress -= 1;
          }
        }, 35);
      }
    },
    beforeUnmount() {
      if (this.timer) clearInterval(this.timer);
    }
  };
  </script>
  
  <style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>
  