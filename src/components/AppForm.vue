<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Form to create a new task"
      >
        <input
          type="text"
          class="input"
          placeholder="Which task you want to start?"
        />
      </div>
      <div class="column">
        <div
          class="is-flex is-align-items-center is-justify-content-space-between"
        >
          <section>
            <strong>
              {{ timePassed }}
            </strong>
          </section>
          <button class="button" @click="startCounter">
            <span class="icon">
              <i class="fas fa-play"></i>
            </span>
            <span>play</span>
          </button>
          <button class="button" @click="endCounter">
            <span class="icon">
              <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppForm",
  data() {
    return {
      timeInSecconds: 0,
      chronometer: 0
    };
  },
  computed: {
    timePassed(): string {
      return new Date(this.timeInSecconds * 1000).toISOString().substr(11, 8);
    },
  },
  methods: {
    startCounter() {
      this.chronometer = setInterval(() => {
        this.timeInSecconds += 1;
      }, 1000);
    },
    endCounter() {
      clearInterval(this.chronometer)
    },
  },
});
</script>
