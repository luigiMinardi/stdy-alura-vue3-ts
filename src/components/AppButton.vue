<template>
  <button class="button" @click="isClicked" :disabled="disabled">
    <!-- 
    @ also called "v-on" is to add event listeners. 
    : also called "v-bind" is to add js into the properties (?) :y="x" accordingly to the docs the v-bind instructs Vue to
    keep element's y attribute in sync with the component's x property. If the value is null or undefined the attribute will
    not be rendered -->
    <span class="icon">
      <i :class="icon"></i>
    </span>
    <span>{{ text }}</span>
    <!-- {{ n }} is to add js in the html (?) accordingly to the docs the mustache will be replaced
    by the value of the n "property" from the corresponding component instance. Component will update when n changes -->
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppButton",
  // ⬇ Properties that the component share to the father component
  emits: ["isClicked"],
  // ⬇ Properties that the component receive from the father component
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
  // ⬇ event (actions) based funcitions that the component can execute.
  methods: {
    isClicked(): void {
      this.$emit("isClicked"); // very simmilar to Redux action but isnt redux(Vuex here)
    },
  },
});
</script>
