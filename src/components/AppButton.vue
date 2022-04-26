<template>
  <button class="button" @click="isClicked" :disabled="disabled">
    <span class="icon">
      <i :class="icon"></i>
    </span>
    <span>{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppButton",
  emits: ["isClicked"],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    isClicked(): void {
      this.$emit("isClicked");
    },
  },
});
</script>
