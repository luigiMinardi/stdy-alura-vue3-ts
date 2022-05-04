<template>
  <AppForm @whenSavingTask="saveTask" />
  <div class="list">
    <AppBox v-if="listIsEmpty">
      You still haven't done any task today :(
    </AppBox>
    <AppTask v-for="(task, index) in tasks" :key="index" :task="task" @when-task-clicked="selectTask" />
    <div class="modal" :class="{ 'is-active': taskSelected }" v-if="taskSelected">
      <div class="modal-background" @click="modalClose"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editting a task</p>
          <button @click="modalClose" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="taskDescription" class="label">Description</label>
            <input type="text" class="input" v-model="taskSelected.description" id="taskDescription" />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="taskChange" class="button is-success">Save changes</button>
          <button @click="modalClose" class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppForm from "../components/AppForm.vue";
import AppTask from "../components/AppTask.vue";
import AppBox from "../components/AppBox.vue";
import { useStore } from "@/store";
import { CHANGE_TASK, CREATE_TASK, GET_PROJECTS, GET_TASKS } from "@/store/actions";
import { computed } from "@vue/reactivity";
import ITask from "@/interfaces/ITask";

export default defineComponent({
  name: "ViewTasks", // name of the component
  components: {
    AppForm,
    AppTask,
    AppBox
  },
  data() {
    return {
      taskSelected: null as ITask | null
    }
  },
  computed: {
    listIsEmpty(): boolean {
      return this.tasks.length == 0
    },
  },
  methods: {
    saveTask(task: ITask) {
      this.store.dispatch(CREATE_TASK, task)
    },
    selectTask(task: ITask) {
      this.taskSelected = task
    },
    taskChange() {
      this.store.dispatch(CHANGE_TASK, this.taskSelected)
        .then(() => this.modalClose());
    },
    modalClose() {
      this.taskSelected = null
    }
  },
  setup() {
    const store = useStore();
    store.dispatch(GET_TASKS)
    store.dispatch(GET_PROJECTS)
    return {
      tasks: computed(() => store.state.tasks),
      store
    }
  }
});
</script>