<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" width="400px" />
    <HelloWorld />
    <h4>
      To connect or register, please use this button:
      <v-icon>mdi-account</v-icon>
    </h4>
    <h4>To use the features of the application, please use this button:
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </h4>
    <br/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
