<template>
  <div type="text/x-template" id="app-template">
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
    <v-container v-for="item in computerList" :key="item.id">
      <v-card class="mx-auto" max-width="300">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item>
                <v-list-item-title>{{item.name}}</v-list-item-title>
              </v-list-item>
              <v-list-item-subtitle
                v-if="item.introducedDate"
              >Introduced Date: {{item.introducedDate}}</v-list-item-subtitle>
              <v-list-item-subtitle v-else>No introduced date</v-list-item-subtitle>
              <br />
              <v-list-item-subtitle
                v-if="item.discontinuedDate"
              >Discontinued Date: {{item.discontinuedDate}}</v-list-item-subtitle>
              <v-list-item-subtitle v-else>No discontinued date</v-list-item-subtitle>
              <br />
              <v-list-item-subtitle v-if="item.companyDTO">Company: {{item.companyDTO.name}}</v-list-item-subtitle>
              <v-list-item-subtitle v-else>No company assigned</v-list-item-subtitle>
              <br />
            </v-list-item-content>
          </v-list-item>
          <br />
        </v-list>
      </v-card>
    </v-container>

    <v-row justify="center">
      <v-col cols="6">
        <v-container class="max-width">
          <v-pagination v-model="page" class="my-4" :length="nbPages"></v-pagination>
        </v-container>
      </v-col>
    </v-row>
    <v-row align="right">
      <div class="my-2">
        <v-btn small>Normal</v-btn>
      </div>
    </v-row>
  </div>
  <!-- <h1>COMPUTER LIST</h1>

  <li v-for="computer in result" :key="computer.id">{{computer.name}}</li>-->
</template>

<script>
import ComputersApi from "../api/computers_api";

export default {
  data: function() {
    return {
      computerList: [],
      page: 1,
      step: 10,
      nbComputers: 1,
      nbPages: Math.ceil(nbComputers/step),
    };
  },
  mounted: function() {
    ComputersApi.findComputersPaginated(this.page, this.size).then(
      response => (this.computerList = response.data)
    );
    console.log(this.computerList);
    ComputersApi.findNumberOfComputers().then(response => this.nbComputers = response.date);
  },

  computed: {
    computedStep10() {
      this.step = 10;
    },
    computedStep50() {
      this.step = 50;
    },
    computedStep100() {
      this.step = 100;
    },
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