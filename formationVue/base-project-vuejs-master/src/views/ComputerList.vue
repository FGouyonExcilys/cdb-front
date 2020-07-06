<template>
  <div class="computers">
    <ComputerList/>
  </div>
</template>

<script>
// @ is an alias to /src
import ComputerList from "@/components/ComputerList.vue";

export default {
  components: {
    ComputerList
  }
};
</script>