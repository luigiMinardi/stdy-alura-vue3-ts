<template>
  <section>
    <strong class="display" :style="styles">
      {{ timePassed }}
    </strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppChronometer",
  data() {
    return {
      styles: {
        color: '#000',
        'text-shadow': '1px 1px 1px #fff',
      }
    }
  },
  props: {
    timeInSecconds: {
      type: Number,
      default: 0,
    },
  },
  computed: { // look the state and update when state changes, very similar to 'useEffect'
    timePassed(): string {
      return new Date(this.timeInSecconds * 1000).toISOString().substr(11, 8);
    },
  },
});
</script>
