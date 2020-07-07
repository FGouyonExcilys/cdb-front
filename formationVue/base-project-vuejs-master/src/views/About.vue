<template>
  <script type="text/x-template" id="app-template">
     <v-container>
       <!-- -->Hello
       <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"     rel="stylesheet">


       <v-card
         class="mx-auto"
         max-width="800"
       >
         <v-list>
       <v-list-item three-line>
         <v-list-item-content>
         <v-list-item>
           <v-list-item-icon>
             <v-icon>mdi-desktop-classic</v-icon>
           </v-list-item-icon>
           <v-list-item-title>Mac 15</v-list-item-title>
         </v-list-item>
           <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
         </v-list-item-content>


       </v-list-item>


   </v-list>
   </v-card>

   <v-form
         ref="form"
         v-model="valid"
         :lazy-validation="lazy"
       >
         <v-text-field
           v-model="name"
           :counter="10"
           :rules="nameRules"
           label="Name"
           required
         ></v-text-field>
  <v-row>i
     <v-col cols="12" lg="6">
       <v-menu
             ref="menu1"
             v-model="menu1"
             :close-on-content-click="false"
             transition="scale-transition"
             offset-y
             max-width="290px"
             min-width="290px"
           >
             <template v-slot:activator="{ on, attrs }">
               <v-text-field
                 v-model="dateFormatted"
                 label="Date"
                 hint="MM/DD/YYYY format"
                 persistent-hint
                 prepend-icon="event"
                 v-bind="attrs"
                 @blur="date = parseDate(dateFormatted)"
                 v-on="on"
               ></v-text-field>
             </template>
             <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
           </v-menu>
           <p>Date in ISO format: <strong>{{ date }}</strong></p>
         </v-col>

           <v-col cols="12" lg="6">
             <v-menu
             v-model="menu2"
             :close-on-content-click="false"
             transition="scale-transition"
             offset-y
             max-width="290px"
             min-width="290px"
           >
             <template v-slot:activator="{ on, attrs }">
               <v-text-field
                 v-model="computedDateFormatted"
                 label="Date (read only text field)"
                 hint="MM/DD/YYYY format"
                 persistent-hint
                 prepend-icon="event"
                 readonly
                 v-bind="attrs"
                 v-on="on"
               ></v-text-field>
             </template>
             <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
           </v-menu>
           <p>Date in ISO format: <strong>{{ date }}</strong></p>
         </v-col>
       </v-row>

         <v-select
           v-model="select"
           :items="items"
           :rules="[v => !!v || 'Item is required']"
           label="Item"
           required
         ></v-select>


         <v-btn
           :disabled="!valid"
           color="success"
           class="mr-4"
           @click="validate"
         >
           Validate
         </v-btn>



         <v-btn
           color="warning"
           @click="resetValidation"
         >
           Cancel
         </v-btn>
       </v-form>
   </v-container>
  </script>
</template>

<script>
export default {};

const App = {
  template: "#app-template",
  icons: {
    iconfont: "mdiSvg" // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu2: false,
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    lazy: false
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};

new Vue({
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount("#app");
</script>