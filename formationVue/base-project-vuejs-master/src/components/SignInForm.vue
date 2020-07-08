<template>
  <div type="text/x-template" id="SignInForm">
    <v-container>
      <link
        href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
        rel="stylesheet"
      />

      
      <AlertC v-if=isWrongCredential :message="message"  />
      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-text-field v-model="username" :counter="60" :rules="nameRulesUser" clearable label="Username" required></v-text-field>

        <v-text-field v-model="password"
        :type="showPass ? 'text' : 'password'"  
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" 
        :counter="60" 
        :rules="nameRulesPassword" 
        clearable label="password" required
        @click:append="showPass = !showPass"></v-text-field>
       
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Connection</v-btn>

        <v-btn color="warning" @click="resetValidation">Cancel</v-btn>
      </v-form>
    </v-container>
  </div>
</template>


<script>
import { userApi } from "../api/users_api";
import AlertC from '@/components/AlertComponent.vue';


export default {
  data: vm => ({
        name: "Connection",
        message: "Something gone wrong with credential",
        username: "",
        password: "",
        valid: true,
        nameRulesUser: [
      v => !!v || "username is required",
      v => (v && v.length <= 60) || "Name must be less than 10 characters"
        ],
        nameRulesPassword: [
      v => !!v || "password is required",
      v => (v && v.length <= 60) || "Name must be less than 10 characters"
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

  props: {},
  methods: {
    loginMethod() {
      userApi.login(this.username, this.password).then((response) => {
        try{
        let token = 'token';
        let StringBearer = 'Bearer '.concat(response.data);
        sessionStorage.setItem(token, StringBearer);
        this.isWrongCredential=false;
        this.$router.push('/computers');
        }catch(error){
          this.isWrongCredential=true;
        }
      },
      ).catch(function (error) {
        

      });
    },
     reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    validate: function() {

      const encryptedText = this.CryptoJS.AES.encrypt("Hi There!", "Secret Passphrase").toString()

      console.log(encryptedText);
      const decryptedText = this.CryptoJS.AES.decrypt(encryptedText, "Secret Passphrase").toString(this.CryptoJS.enc.Utf8)

      console.log(decryptedText);

        this.loginMethod();

    },
    
  
  
  
  },
    
    


  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
<style scoped></style>