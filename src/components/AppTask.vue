<template>
  <AppBox>
    <div class="columns clickable" @click="taskClicked">
      <!-- Using || ("or" operator) to set default value-->
      <div class="column is-4">{{ task.description || 'Default Task' }}</div>
      <div class="column is-3">
        {{ task.project?.name || 'N/A' }}
      </div>
      <div class="column">
        <AppChronometer :timeInSecconds="task.timeInSecconds" />
      </div>
    </div>
  </AppBox>
</template>

<script lang="ts">
import ITask from "@/interfaces/ITask";
import { defineComponent, PropType } from "vue";
import AppChronometer from "./AppChronometer.vue";
import AppBox from "./AppBox.vue";

export default defineComponent({
  name: "AppTask",
  emits: ['whenTaskClicked'],
  components: { AppChronometer, AppBox },
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true
    },
  },
  methods: {
    taskClicked(): void {
      this.$emit('whenTaskClicked', this.task)
    }
  }
});
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>