<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <SideBar />
    </div>
    <div class="column is-three-quarter">
      <AppForm @whenSavingTask="saveTask" />
      <div class="list">
        <AppTask v-for="(task, index) in tasks" :key="index" :task="task" />
        <AppBox v-if="listIsEmpty">
          You still haven't done any task today :(
        </AppBox>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBar.vue";
import AppForm from "./components/AppForm.vue";
import AppTask from "./components/AppTask.vue";
import ITask from "./interfaces/ITask";
import AppBox from "./components/AppBox.vue";

export default defineComponent({
  name: "App", // name of the component
  components: {
    SideBar,
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
      return this.tasks.length === 0
    },
  },
  methods: {
    saveTask(task: ITask) {
      this.tasks.push(task)
    }
  }
});
</script>

<style>
.list {
  padding: 1.25rem;
}
</style>
