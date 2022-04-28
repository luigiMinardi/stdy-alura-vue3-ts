<template>
  <AppBox>
    <div class="columns">
      <!-- Using || ("or" operator) to set default value-->
      <div class="column is-7">{{ task.description || 'Default Task' }}</div>
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
  components: { AppChronometer, AppBox },
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true
    },
  },
});
</script>