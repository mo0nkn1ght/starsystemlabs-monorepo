<template>
    <div class="claim-card">
        <video width="480" height="360" autoplay loop ref="videoElement" muted>
            <source :src="selectedVideo" type="video/mp4">
            Not Supported.
        </video>
      <button @click="handleClick" class="claim-button">
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

  
<style scoped>
.claim-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 500px;
  height: 400px;
  border-radius: 15px;
  gap: 20px;
}

video {
  object-fit: cover;
  border-radius: 20px;
}

/* Button styles */
.claim-button {
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

.claim-button:hover {
  background-color: #1A5BB6;
}

.claim-button:focus {
  box-shadow: 0 0 0 1pt #1A5BB6;
  background-color: #1A5BB6;
}

.claim-button:active {
  box-shadow: 0 0 0 1pt #0E3F87;
  background-color: #0E3F87;
}

.claim-button:disabled {
  background-color: #EDEEF2;
  color: #C3C5CB;
  cursor: auto;
  box-shadow: none;
  border: 1px solid transparent;
  outline: none;
}
</style>
