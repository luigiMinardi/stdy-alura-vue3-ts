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
import { defineComponent, ref } from "vue"
import useNotificator from '@/hooks/notificator';
import { CHANGE_PROJECT, CREATE_PROJECT } from "@/store/actions";
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'ViewForm',
  // data() {
  //   return {
  //     nameOfTheProject: "",
  //   };
  // },
  props: {
    id: {
      type: String
    }
  },
  // mixins: [NotifyMixin],
  // mounted() {
  //   if (this.id) {
  //     const project = this.store.state.project.projects.find(project => project.id == this.id)
  //     this.nameOfTheProject = project?.name || ""
  //   }
  // },
  // methods: {
  //   save() and success() where here.
  // },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { notify } = useNotificator();
    const nameOfTheProject = ref("");

    if (props.id) {
      const project = store.state.project.projects.find(project => project.id == props.id);
      nameOfTheProject.value = project?.name || "";
    }

    const success = () => {
      nameOfTheProject.value = "";
      notify(NotificationType.SUCESS, 'Nice!', 'The project was added without problems.');
      router.push('/projects');
    }

    const save = () => {
      if (props.id) {
        store.dispatch(CHANGE_PROJECT, {
          id: props.id,
          name: nameOfTheProject.value
        }).then(() => success());
      } else {
        store
          .dispatch(CREATE_PROJECT, nameOfTheProject.value)
          .then(() => success());
      }
    }

    return {
      // store,
      // notify,
      nameOfTheProject,
      save
    }
  }
})
</script>