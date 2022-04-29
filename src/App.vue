<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkThemeActive }">
    <div class="column is-one-quarter">
      <SideBar @when-changing-theme="changeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBar.vue";

export default defineComponent({
  name: "App", // name of the component
  components: {
    SideBar,
  },
  data() { // data() is for return the state of the component, very simmilar to useState() from React
    return {
      darkThemeActive: false
    };
  },
  methods: {
    changeTheme(darkThemeActive: boolean) {
      this.darkThemeActive = darkThemeActive
    }
  }
});
</script>

<style>
main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}

.list {
  padding: 1.25rem;
}

.content {
  background-color: var(--bg-primary);
}
</style>
