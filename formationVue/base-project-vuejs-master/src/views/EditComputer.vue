<template>
  <div class="computers">
    <EditComputer :id="575"/>
  </div>
</template>

<script>
// @ is an alias to /src
import EditComputer from "@/components/EditComputer.vue";

export default {
  components: {
    EditComputer
  }
};
</script>