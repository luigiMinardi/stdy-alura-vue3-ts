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
import { NotificationType } from "@/interfaces/INotification";
// import { NotifyMixin } from "@/mixins/notify";
import { useStore } from "@/store";
import { defineComponent } from "vue"
import useNotificator from '@/hooks/notificator';
import { CHANGE_PROJECT, CREATE_PROJECT } from "@/store/actions";

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
  // mixins: [NotifyMixin],
  mounted() {
    if (this.id) {
      const project = this.store.state.project.projects.find(project => project.id == this.id)
      this.nameOfTheProject = project?.name || ""
    }
  },
  methods: {
    save() {
      if (this.id) {
        this.store.dispatch(CHANGE_PROJECT, {
          id: this.id,
          name: this.nameOfTheProject
        }).then(() => this.success())
      } else {
        this.store
          .dispatch(CREATE_PROJECT, this.nameOfTheProject)
          .then(() => this.success())
      }
    },
    success() {
      this.nameOfTheProject = "";
      this.notify(NotificationType.SUCESS, 'Nice!', 'The project was added without problems.')
      this.$router.push('/projects')
    }
  },
  setup() {
    const store = useStore();
    const { notify } = useNotificator()
    return {
      store,
      notify
    }
  }
})
</script>