<template>
  <header>
    <div class="has-text-centered">
      <h1>
        <img src="../assets/logo.png" alt="Logo Alura Tracker" />
      </h1>
      <button class="button" @click="changeTheme">
        {{ buttonText }}
      </button>
    </div>

    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks">
              Tasks
            </i>
          </router-link>
        </li>
        <li>
          <router-link to="/projects" class="link">
            <i class="fas fa-project-diagram">
              Projects
            </i>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideBar",
  emits: ['whenChangingTheme'],
  data() {
    return {
      darkThemeActive: false
    }
  },
  computed: {
    buttonText() {
      if (this.darkThemeActive) {
        return 'Deactivate Dark Mode'
      }
      return 'Activate Dark Mode'
    }
  },
  methods: {
    changeTheme() {
      this.darkThemeActive = !this.darkThemeActive;
      this.$emit('whenChangingTheme', this.darkThemeActive);
    }
  }
});
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}

.panel li {
  margin: 8px 0;
}

.link {
  color: #fff;
}

.link:hover {
  color: #faf0ca;
}

.link.router-link-active {
  color: #faf0ca;
}
</style>