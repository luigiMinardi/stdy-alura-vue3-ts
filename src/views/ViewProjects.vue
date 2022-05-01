<template>
  <section class="projects">
    <h1 class="title">Projects</h1>
    <form @submit.prevent="save">
      <div class="field">
        <label for="nameOfTheProject" class="label">
          Name of the Project
        </label>
        <input type="text" class="input" v-model="nameOfTheProject" id="nameOfTheProject">
      </div>
      <div class="field">
        <button class="button" type="submit">
          Save
        </button>
      </div>
    </form>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>
            ID
          </th>
          <th>
            Name
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>
            {{ project.id }}
          </td>
          <td>
            {{ project.name }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed } from "@vue/reactivity";
import { defineComponent } from "vue"

export default defineComponent({
  name: 'ViewProjects',
  data() {
    return {
      nameOfTheProject: "",
    };
  },
  methods: {
    save() {
      // const project: IProject = {
      //   id: new Date().toISOString(),
      //   name: this.nameOfTheProject
      // }
      // this.projects.push(project);
      this.store.commit('ADD_PROJECT', this.nameOfTheProject)
      this.nameOfTheProject = "";
    }
  },
  setup() {
    const store = useStore();
    return {
      store,
      projects: computed(() => store.state.projects)
    }
  }
})
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>