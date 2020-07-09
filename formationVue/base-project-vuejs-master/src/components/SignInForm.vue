<template>
  <div type="text/x-template" id="SignInForm">
    <v-container>
      <link
        href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
        rel="stylesheet"
      />

      
      <AlertC v-if=isWrongCredential :message="message"  />
      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-text-field
          v-model="username"
          :counter="60"
          :rules="nameRulesUser"
          clearable
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :type="showPass ? 'text' : 'password'"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :counter="60"
          :rules="nameRulesPassword"
          clearable
          label="password"
          required
          @click:append="showPass = !showPass"
        ></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Connection</v-btn>

        <v-btn color="warning" @click="resetValidation">Cancel</v-btn>
      </v-form>
    </v-container>
  </div>
</template>


<script>
import { userApi } from "../api/users_api";
<<<<<<< HEAD
export default {
  data: vm => ({
    name: "Connection",
    username: "",
    password: "",
    valid: true,
    nameRulesUser: [
=======
import AlertC from '@/components/AlertComponent.vue';


export default {
  data: vm => ({
        name: "Connection",
        message: "Something gone wrong with credential",
        username: "",
        password: "",
        valid: true,
        nameRulesUser: [
>>>>>>> 1e602aa1cab453436c2e056889610b728e91d260
      v => !!v || "username is required",
      v => (v && v.length <= 60) || "Name must be less than 10 characters"
    ],
    nameRulesPassword: [
      v => !!v || "password is required",
      v => (v && v.length <= 60) || "Name must be less than 10 characters"
<<<<<<< HEAD
    ],
    isOk: false,
    lazy: false,
    showPass: false
  }),
  mounted: function() {
    if (sessionStorage.getItem("token")) {
      userApi.logout();
      this.$router.push("/home");
    }
  },
=======
        ],
        isOk: false,
        lazy: false,
        showPass: false,
        isWrongCredential: false,
  }),
   components: { AlertC },

      mounted: function() {
        if(sessionStorage.getItem('token')){
            userApi.logout()
            this.$router.push('/')
        }
    },
>>>>>>> 1e602aa1cab453436c2e056889610b728e91d260

  props: {},
  methods: {
    loginMethod() {
<<<<<<< HEAD
      userApi.login(this.username, this.password).then(response => {
        let token = "token";
        let StringBearer = "Bearer ".concat(response.data);
        sessionStorage.setItem(token, StringBearer);
        this.$router.push("/computers");
      });
=======

      let encodedPassword = this.CryptoJS.SHA1(this.password).toString()
      userApi.login(this.username, encodedPassword).then((response) => {
        let token = 'token';
        let StringBearer = 'Bearer '.concat(response.data);
        sessionStorage.setItem(token, StringBearer);
        this.isWrongCredential=false;
        this.$router.push('/computers');
      },
      ).catch(function(error){

      }
       );
>>>>>>> 1e602aa1cab453436c2e056889610b728e91d260
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    validate: function() {
<<<<<<< HEAD
      this.loginMethod();
    }
  }
=======

        this.loginMethod();

    },
    setWrongCredentialToTrue: function() {

       this.isWrongCredential=true;

    },
    
  
  
  
  },
    
    


  
>>>>>>> 1e602aa1cab453436c2e056889610b728e91d260
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
<style scoped></style>