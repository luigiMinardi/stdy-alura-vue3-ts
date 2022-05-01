<template>
  <section>
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
  </section>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { EDIT_PROJECT, ADD_PROJECT } from "@/store/mutations";
import { defineComponent } from "vue"

export default defineComponent({
  name: 'ViewForm',
  data() {
    return {
      nameOfTheProject: "",
    };
  },
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find(project => project.id === this.id)
      this.nameOfTheProject = project?.name || ""
    }
  },
  methods: {
    save() {
      if (this.id) {
        this.store.commit(EDIT_PROJECT, {
          id: this.id,
          name: this.nameOfTheProject
        })
      } else {
        this.store.commit(ADD_PROJECT, this.nameOfTheProject)
      }
      this.nameOfTheProject = "";
      this.$router.push('/projects')
    }
  },
  setup() {
    const store = useStore();
    return {
      store,
    }
  }
})
</script>