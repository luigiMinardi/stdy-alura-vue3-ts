<template>
  <AppForm @whenSavingTask="saveTask" />
  <div class="list">
    <AppTask v-for="(task, index) in tasks" :key="index" :task="task" />
    <AppBox v-if="listIsEmpty">
      You still haven't done any task today :(
    </AppBox>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppForm from "../components/AppForm.vue";
import AppTask from "../components/AppTask.vue";
import AppBox from "../components/AppBox.vue";
import ITask from "../interfaces/ITask";

export default defineComponent({
  name: "ViewTasks", // name of the component
  components: {
    AppForm,
    AppTask,
    AppBox
  },
  data() { // data() is for return the state of the component, very simmilar to useState() from React
    return {
      tasks: [] as ITask[],
    };
  },
  computed: {
    listIsEmpty(): boolean {
      return this.tasks.length == 0
    },
  },
  methods: {
    saveTask(task: ITask) {
      this.tasks.push(task)
    }
  }
});
</script>