<template>
  <div class="computers">
    <ComputerList/>
  </div>
</template>

<script>
// @ is an alias to /src
import ComputerList from "@/components/ComputerList.vue";

export default {
  name :'Computers',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  components: {
    ComputerList
  }
};
</script>