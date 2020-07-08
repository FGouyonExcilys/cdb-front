<template>
  <v-app class="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <div v-if=!isLogged><router-link to="/login" >Login</router-link></div>
      <div v-else>
         <router-link to="/login">Logout</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/computers">Computers</router-link> |
      <router-link to="/addComputer">Add Computer</router-link> |
      <router-link to="/editComputer">Edit Computer</router-link> |
        </div>
        
       <router-link to="/register">Register</router-link> 
    </div>
    <router-view />
  </v-app>
</template>

<script>
export default {
  
  data: vm => ({
        isLogged: false,

  }),
  beforeUpdate: function() {
    if(sessionStorage.getItem('token')){
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }
  }
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
