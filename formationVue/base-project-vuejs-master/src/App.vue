<template>
  <v-app class="app">
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        color="primary"
        dark
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
      >
        <v-menu transition="slide-x-transition"
        bottom
        right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-app-bar-nav-icon></v-app-bar-nav-icon>
                </v-btn>
              </template>
                 <div v-if=isLogged>
              <v-list>
               <v-list-items>
      
      <v-list-item-title><router-link to="/">Home</router-link></v-list-item-title>
      <v-list-item-title><router-link to="/computers">Computers</router-link></v-list-item-title>
      <v-list-item-title><router-link to="/companies">Companies</router-link></v-list-item-title>
      <v-list-item-title><router-link to="/addComputer">Add Computer</router-link></v-list-item-title>
      <v-list-item-title><router-link to="/editComputer">Edit Computer</router-link></v-list-item-title>
    </v-list-items>
              
      
              </v-list>
              </div>
            </v-menu>
        
 
        <v-toolbar-title>Application Database</v-toolbar-title>
 
        <v-spacer></v-spacer> 
 
       
       
        <v-menu transition="slide-x-transition"
        bottom
        right>
        <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
                </v-btn>
              </template>
  
              <v-list>
                <!--<v-list-item
                  v-for="(item, i) in itemsConnection"
                  :key="i"
                  @click=""
                >
                  <v-list-item-title><router-link to="/">{{ item.title }}</router-link> </v-list-item-title>
                </v-list-item>-->
    <v-list-items>
      
      <div v-if=!isLogged><v-list-item-title><router-link to="/login" >Login</router-link></v-list-item-title></div>
      <div v-else>
         <v-list-item-title><router-link to="/login">Logout</router-link></v-list-item-title> 
        </div>
        
       <v-list-item-title><router-link to="/register">Register</router-link></v-list-item-title> 
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques-7"
        class="overflow-y-auto"
        max-height="55" 
      >
        <v-container style="height: 1500px;">
 
        </v-container>
      </v-sheet>
    </v-card>

    
  
    <router-view />
    <Header/>
  </v-app>
</template>

<script>
export default {
  data: vm => ({
        isLogged: false,
        itemsPages: [
          { title: 'Computers' },
          { title: 'Companies' },
          {title: 'Home'},
        ],
        itemsConnection: [
          { title: 'Register' },
          { title: 'Login' },
          { title: 'Logout' },
        ],

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
