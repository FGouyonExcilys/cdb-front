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
        <v-menu
          transition="slide-x-transition"
          bottom
          right
          :close-on-content-click="false"
          :nudge-width="80"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </v-btn>
          </template>
          <v-list v-if="isLogged">
            <v-list-items>
              <v-list-item-title>
                <router-link to="/" class="router-link">Home</router-link>
              </v-list-item-title>

              <v-list-item-title>
                <router-link to="/computers" class="router-link">Computers</router-link>
              </v-list-item-title>
              <v-list-item-title>
                <router-link to="/companies" class="router-link">Companies</router-link>
              </v-list-item-title>
              <v-list-item-title>
                <router-link to="/addComputer" class="router-link">Add Computer</router-link>
              </v-list-item-title>
              <v-list-item-title>
                <router-link to="/editComputer" class="router-link">Edit Computer</router-link>
              </v-list-item-title>
            </v-list-items>
          </v-list>
        </v-menu>

        <v-toolbar-title>Application Database</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu
          transition="slide-x-transition"
          bottom
          right
          :close-on-content-click="false"
          :nudge-width="50"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-btn icon>
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </v-btn>
          </template>

          <v-list flat>
            <!--<v-list-item
                  v-for="(item, i) in itemsConnection"
                  :key="i"
                  @click=""
                >
                  <v-list-item-title><router-link to="/">{{ item.title }}</router-link> </v-list-item-title>
            </v-list-item>-->
            <v-list-items>
              <v-list-item-title v-if="!isLogged">
                <router-link to="/login" class="router-link">Login</router-link>
              </v-list-item-title>
              <v-list-item-title v-else>
                <router-link to="/login" class="router-link">Logout</router-link>
              </v-list-item-title>

              <v-list-item-title>
                <router-link to="/" class="router-link">Home</router-link>
              </v-list-item-title>
              <v-list-item-title>
                <router-link to="/register" class="router-link">Register</router-link>
              </v-list-item-title>
            </v-list-items>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="55">
        <v-container style="height: 1500px;"></v-container>
      </v-sheet>
    </v-card>

    <router-view />
    <Header />
  </v-app>
</template>

<script>
export default {
  data: vm => ({
    isLogged: false,
    itemsPages: [
      { title: "Computers" },
      { title: "Companies" },
      { title: "Home" }
    ],
    itemsConnection: [
      { title: "Register" },
      { title: "Login" },
      { title: "Logout" }
    ]
  }),
  beforeUpdate: function() {
    if (sessionStorage.getItem("token")) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
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

.router-link {
  background-color: white;
  border-radius: 30px;
  color: black;
  border: none;
  color: white;
  padding: 1px 32px;
  margin: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-family:monaco;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;
}
.router-link:hover {
  background-color: #e7e7e7;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
