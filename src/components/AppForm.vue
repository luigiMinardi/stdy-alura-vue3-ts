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
          placeholder="Which task do you want to start?"
          v-model="description"
        />
      </div>
      <div class="column">
        <AppTimer @whenTimerEnds="endTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppTimer from "./AppTimer.vue";

export default defineComponent({
  name: "AppForm",
  emits: ['whenSavingTask'],
  components: { AppTimer },
  data() {
    return {
      description: "",
    };
  },
  methods: {
    endTask(timeInSecconds: number): void {
      this.$emit('whenSavingTask',{
        timeInSecconds: timeInSecconds,
        description: this.description
      })
      this.description = "";
    },
  },
});
</script>
