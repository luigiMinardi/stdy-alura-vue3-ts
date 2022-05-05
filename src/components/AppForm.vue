<template>
  <div class="box form">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Form to create a new task">
        <input type="text" class="input" placeholder="Which task do you want to start?" v-model="description" />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProject">
            <option value="">Select the Project</option>
            <option :value="project.id" v-for="project in projects" :key="project.id">
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <AppTimer @whenTimerEnds="endTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import AppTimer from "./AppTimer.vue";

export default defineComponent({
  name: "AppForm",
  emits: ['whenSavingTask'],
  components: { AppTimer },
  setup(props, { emit }) {
    const store = useStore(key);
    const description = ref("");
    const idProject = ref("");

    const projects = computed(() => store.state.project.projects);

    const endTask = (timeInSecconds: number): void => {
      emit('whenSavingTask', {
        timeInSecconds: timeInSecconds,
        description: description.value,
        project: projects.value.find(project => project.id == idProject.value)
      });
      description.value = "";
    }

    return {
      projects,
      description,
      idProject,
      endTask
    }
  },
});
</script>

<style>
.form {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}
</style>