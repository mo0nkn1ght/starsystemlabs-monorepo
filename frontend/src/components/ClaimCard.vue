<template>
  <div class="flex flex-col items-center justify-center overflow-hidden w-128 h-100 rounded-lg space-y-5">
    <video width="480" height="360" autoplay loop playsinline ref="videoElement" muted class="object-cover rounded-lg">
      <source :src="selectedVideo" type="video/mp4">
      Not Supported.
    </video>
    <button @click="handleClick" class="bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer text-lg font-semibold transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700">
      <SpinnerSVG v-if="loading" />
      <span v-else>{{ buttonText }}</span>
    </button>
  </div>
</template>


<script>
import SpinnerSVG from './SpinnerSVG.vue';

export default {
  name: 'ClaimCard',
  components: {
    SpinnerSVG
  },
  data() {
    return {
      videos: [
        require('@/assets/planet_1.mp4'),
        require('@/assets/planet_2.mp4'),
        require('@/assets/planet_3.mp4'),
        require('@/assets/planet_4.mp4'),
        require('@/assets/planet_5.mp4'),
        require('@/assets/planet_6.mp4'),
        require('@/assets/planet_7.mp4'),
      ],
      selectedVideo: '',
      buttonText: 'Claim',
      loading: false
    };
  },
  created() {
    this.selectRandomVideo();
  },
  methods: {
    selectRandomVideo() {
      const randomIndex = Math.floor(Math.random() * this.videos.length);
      this.selectedVideo = this.videos[randomIndex];
    },
    handleClick() {
      if (this.buttonText === 'Claim') {
        this.buttonText = 'Coming Soon';
      } else if (this.buttonText === 'Coming Soon') {
        this.buttonText = 'COPE HARDER';
      } else {
        this.loading = true;
      }
    }
  }
};
</script>
