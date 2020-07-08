<template>
  <div type="text/x-template" id="RegisterForm">
    <v-container>
      <link
        href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
        rel="stylesheet"
      />

      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-text-field v-model="username" :counter="60" :rules="nameRulesUser" clearable label="Username" required></v-text-field>

        <v-text-field v-model="password" 
        :type="showPass ? 'text' : 'password'" 
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :counter="60" 
        :rules="nameRulesPassword" 
          label="password" 
        @click:append="showPass = !showPass" required></v-text-field>

        <v-text-field v-model="passwordConfirm" 
        :type="'password'"  
        :counter="60" 
        :rules="passwordConfirmationRules" 
        label="confirmation password" 
        @click:append="showPass = !showPass" required></v-text-field>
       
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Register</v-btn>

        <v-btn color="warning" @click="resetValidation">Cancel</v-btn>
      </v-form>
    </v-container>
  </div>
</template>


<script>
import { userApi } from "../api/users_api";
export default {




  data: vm => ({
        showPass:false,
        username: "",
        password: "",
        passwordConfirm: "",
        valid: true,
        nameRulesUser: [
      v => !!v || "username is required",
      v => (v && v.length <= 60) || "Name must be less than 60 characters",
      v => (v && v.length >= 5) || "Name must be more than 4 characters"
        ],
        nameRulesPassword: [
      v => !!v || "password is required",
      v => (v && v.length <= 60) || "Name must be less than 60 characters",
      v => (v && v.length >= 9) || "Name must be more than 8 characters",
      value => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
          return (
            pattern.test(value) ||
            "Min. 8 characters with at least one capital letter, a number and a special character."
          );
        }
        ],
        isOkPasswords: false,
        lazy: false,



  }),
  computed: {
    passwordConfirmationRules() {
      return [
        () => (this.password === this.passwordConfirm) || 'password must match',
        v => !!v || 'Confirmation password is required'
      ];
    },
},

  props: {},
  methods: {
    registerMethod() {
      userApi.register(this.username, this.password).then((response) => {

        //TODO : Something to access the success
        this.$router.push('/computers');
      },
      );
    },
     reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    validate: function() {

        this.registerMethod();

    },
  
  
  
  },
    
    


  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
<style scoped></style>