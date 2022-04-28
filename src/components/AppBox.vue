<template>
  <div class="box has-text-weight-bold">
    <slot></slot> <!-- Return whatever is inside the component here. Equivalent to {props.children} in React.-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: 'AppBox'
})
</script>

<style scoped>
.box {
  background: #faf0ca;
}
</style>