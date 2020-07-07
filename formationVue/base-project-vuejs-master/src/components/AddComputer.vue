<template>
  <div type="text/x-template" id="addComputer">
    <v-container>
      <link
        href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
        rel="stylesheet"
      />

      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-text-field v-model="name" :counter="60" :rules="nameRules" clearable label="Name" required></v-text-field>
        <v-row>
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
                  v-model="introduced"
                  label="Date"
                  hint="YYYY-MM-DD format"
                  persistent-hint
                  prepend-icon="event"
                  readonly
                  v-bind="attrs"
                  @blur="introduced = parseDate(introducedFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="introduced" no-title @input="menu1 = false" color="green lighten-1"></v-date-picker>
            </v-menu>
            <p>
              Date in ISO format:
              <strong>{{ introduced }}</strong>
            </p>
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
                  v-model="discontinued"
                  label="Discontinued date"
                  hint="YYYY-MM-DD format"
                  persistent-hint
                  prepend-icon="event"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="discontinued" no-title @input="menu2 = false" color="green lighten-1" header-color="primary"></v-date-picker>
            </v-menu>
            <p>
              Date in ISO format:
              <strong>{{ discontinued }}</strong>
            </p>
          </v-col>
        </v-row>

        <v-select
          v-model="companyId"
          item-value="id"
          :items="companyList"
          item-text="name"
          :rules="[v => !!v || 'Item is required']"
          label="Company"
          required
        ></v-select>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>

        <v-btn color="warning" @click="resetValidation">Cancel</v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import ComputersApi from "../api/computers_api";
import CompaniesApi from "../api/companies_api";

export default {
  template: "#addComputer",
  icons: {
    iconfont: 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  data: vm => ({
    errors: [],
    companyList: [],

    introducedFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    discontinuedFormatted: vm.formatDate(
      new Date().toISOString().substr(0, 10)
    ),
    valid: true,
    menu1: false,
    menu2: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 60) || "Name must be less than 10 characters"
    ],

    introduced: "",
    discontinued: "",
    companyId: "",
    checkbox: false,
    select: null,
    activeClass: "active",
    errorClass: "text-danger",
    isActiveName: false,
    isActiveIntroduced: false,
    isActiveDiscontinued: false,
    isOk: false,
    lazy: false
  }),

  computed: {
    computedIntroducedFormatted() {
      return this.formatDate(this.introduced);
    },
    computedDiscontinuedFormatted() {
      return this.formatDate(this.discontinued);
    }
  },

  watch: {
    date(val) {
      this.introcudedFormatted = this.formatDate(this.introduced);
    },
    date(val) {
      this.discontinuedFormatted = this.formatDate(this.discontinued);
    }
  },

  mounted: function() {
    CompaniesApi.findAll().then(response => (this.companyList = response.data));
    console.log(this.companyList);
  },

  methods: {
    show() {
      alert(
        "Name : " +
          this.name +
          "\n Introduced date : " +
          this.introduced +
          "\n Discontinued date : " +
          this.discontinued
      );
    },
    validateName() {
      console.log("Validate Name");
      this.isActiveName = this.name && this.name.length < 60;
    },
    validateIntroduced() {
      console.log("Validate Introduced");
      this.isActiveIntroduced =
        this.introduced &&
        new Date(this.introduced) > new Date(1971, 1, 1) &&
        new Date(this.introduced) < new Date();
    },
    validateDiscontinued() {
      console.log("Validate Discontinued");
      this.isActiveDiscontinued =
        this.discontinued &&
        new Date(this.discontinued) > new Date(1971, 1, 1) &&
        new Date(this.discontinued) < new Date() &&
        (new Date(this.introduced) < new Date(this.discontinued)
          ? true
          : false);
    },
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

    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    validate: function() {
      this.validateName();
      this.validateIntroduced();
      this.validateDiscontinued();
      console.log(this.isActiveName);
      console.log(this.isActiveIntroduced);
      console.log(this.isActiveDiscontinued);

      if (
        this.isActiveName &&
        this.isActiveIntroduced &&
        this.isActiveDiscontinued
      ) {
        // Méthode POST ICI
        console.log({
          id: "",
          name: this.name,
          introducedDate: this.introduced,
          discontinuedDate: this.discontinued,
          companyDTO: { id: this.companyId, name: "" }
        });
        ComputersApi.create({
          name: this.name,
          introducedDate: this.introduced,
          discontinuedDate: this.discontinued,
          companyDTO: { id: this.companyId, name: "" }
        }).catch(function(error) {
          console.log(error);
        });
      }
    }
  }
};
</script>

<style>
tr:nth-of-type(odd) {
  background-color: #fff;
}

tr:nth-of-type(even) {
  background-color: #ccc;
}
</style>
