<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <AppChronometer :timeInSecconds="timeInSecconds" />
    <button
      class="button"
      @click="startCounter"
      :disabled="chronometerIsPlaying"
    >
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button
      class="button"
      @click="endCounter"
      :disabled="!chronometerIsPlaying"
    >
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppChronometer from "./AppChronometer.vue";

export default defineComponent({
  components: { AppChronometer },
  name: "AppTimer",
  data() {
    return {
      timeInSecconds: 0,
      chronometer: 0,
      chronometerIsPlaying: false,
    };
  },
  emits: ['whenTimerEnds'],
  methods: {
    startCounter() {
      this.chronometerIsPlaying = true;
      this.chronometer = setInterval(() => {
        this.timeInSecconds += 1;
      }, 1000);
    },
    endCounter() {
      this.chronometerIsPlaying = false;
      clearInterval(this.chronometer);
      this.$emit('whenTimerEnds', this.timeInSecconds)
      this.timeInSecconds = 0
    },
  },
});
</script>