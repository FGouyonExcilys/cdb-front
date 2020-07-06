<template>
  <div>
    <h1>EDIT COMPUTER FORM</h1>

    <form>
      <div :class="{invalid : !lazy && !validateName}">
        <label for="name">Name </label>
        <input id="name" v-model="name" type="text" name="name"/>
      </div>

      <p>
        <label for="introduced">Introduced date </label>
        <input
          id="introduced"
          v-model="introduced"
          type="date"
          name="introduced"
          :class="[isActiveIntroduced ? activeClass : '', errorClass]"
          placeholder="Introduced Date"
        />
      </p>

      <p>
        <label for="discontinued">Discontinued </label>
        <input
          id="discontinued"
          v-model="discontinued"
          type="date"
          name="discontinued"
          v-bind:class="[isActiveDiscontinued ? activeClass : '', errorClass]"
        />
      </p>

      <p>
        <label for="companyId">Company </label>
        <select v-model="companyId" id="companyId" name="companyId">
          <option value="0" selected>--</option>
          <option
            v-for="company in companyList"
            :key="company.id"
            :value="company.id"
          >{{company.name}}</option>
        </select>
      </p>

      <button @click="validate">Validation</button>
    </form>
    {name: {{name}}, introduced: {{introduced}}, discontinued: {{discontinued}}, companyId: {{companyId}}}
  </div>
</template>

<script>
import ComputersApi from "../api/computers_api";
import CompaniesApi from "../api/companies_api";

export default {
  
  props: {
    id: Number,
  },

  data: function() {
    return {
      errors: [],
      companyList: [],
      computerToEdit: {},
      name: "",
      introduced: "",
      discontinued: "",
      companyId: "",
      activeClass: "active",
      errorClass: "text-danger",
      isActiveName: false,
      isActiveIntroduced: false,
      isActiveDiscontinued: false,
      isOk: false,
      lazy: true
    };
  },

  mounted: function() {
    CompaniesApi.findAll().then(response => (this.companyList = response.data));
    console.log(this.companyList);

    ComputersApi.findOne(this.id).then(function (response) {
      this.computerToEdit = response.data;
      this.name = this.computerToEdit.name;
      this.introduced = this.computerToEdit.introducedDate;
      this.discontinued = this.computerToEdit.discontinuedDate;
      this.companyId = this.computerToEdit.companyDTO.id;
    }.bind(this));

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
      this.isActiveName = this.computerToEdit.name && this.computerToEdit.name.length < 60;
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
        (new Date(this.introduced) < new Date(this.discontinued) ? true : false);
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
        console.log({
          id: "",
          name: this.name,
          introducedDate: this.introduced,
          discontinuedDate: this.discontinued,
          companyDTO: { id: this.companyId, name: "" }
        });
        // Méthode PUT ICI
        ComputersApi.update(this.id, {
          id: this.id,
          name: this.name,
          introducedDate: this.introduced,
          discontinuedDate: this.discontinued,
          companyDTO: { id: this.companyId, name: "" }
        }).catch(function(error) {
          console.log(error);
        });
      }
    },

    validDate: function(day) {
      var bitsDays = day.split("-");
      var yDays = bitsDays[2],
        mDays = bitsDays[1],
        dDays = bitsDays[0];
      var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (yDays % 400 === 0 || (yDays % 100 !== 0 && yDays % 4 === 0)) {
        daysInMonth[1] = 29;
      }
      return dDays <= daysInMonth[--mDays];
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
