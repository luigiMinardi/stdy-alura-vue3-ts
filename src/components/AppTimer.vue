<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <AppChronometer :timeInSecconds="timeInSecconds" />
    <AppButton
      icon="fas fa-play"
      text="play"
      @isClicked="startCounter"
      :disabled="chronometerIsPlaying"
    />
    <AppButton
      icon="fas fa-stop"
      text="stop"
      @isClicked="endCounter"
      :disabled="!chronometerIsPlaying"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "./AppButton.vue";
import AppChronometer from "./AppChronometer.vue";

export default defineComponent({
  components: { AppChronometer, AppButton },
  name: "AppTimer",
  data() {
    return {
      timeInSecconds: 0,
      chronometer: 0,
      chronometerIsPlaying: false,
    };
  },
  emits: ["whenTimerEnds"],
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
      this.$emit("whenTimerEnds", this.timeInSecconds);
      this.timeInSecconds = 0;
    },
  },
});
</script>