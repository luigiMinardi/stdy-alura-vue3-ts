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
import { computed } from "@vue/reactivity";
import { defineComponent } from "vue";
import { useStore } from "vuex";
import AppTimer from "./AppTimer.vue";

export default defineComponent({
  name: "AppForm",
  emits: ['whenSavingTask'],
  components: { AppTimer },
  data() {
    return {
      description: '',
      idProject: ''
    };
  },
  methods: {
    endTask(timeInSecconds: number): void {
      this.$emit('whenSavingTask', {
        timeInSecconds: timeInSecconds,
        description: this.description,
        project: this.projects.find(project => project.id == this.idProject)
      })
      this.description = "";
    },
  },
  setup() {
    const store = useStore(key)
    return {
      projects: computed(() => store.state.projects)
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