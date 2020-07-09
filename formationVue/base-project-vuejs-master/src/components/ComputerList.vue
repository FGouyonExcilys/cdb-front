<template>
  <div type="text/x-template" id="app-template">
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
    <v-container v-for="item in computerListPaginated" :key="item.id">
      <v-card class="mx-auto" max-width="300">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item>
                <v-list-item-title>
                  <!-- <router-link :to="{name: 'EditComputer', params: {id: item.id}}"> -->
					{{item.name}}
				  <!-- </router-link> -->
                </v-list-item-title>
              </v-list-item>
              <v-list-item-subtitle v-if="item.introducedDate">
                <u>Introduced Date</u>
                : {{item.introducedDate}}
              </v-list-item-subtitle>
              <v-list-item-subtitle v-else>
                <u>Introduced Date</u>: Ø
              </v-list-item-subtitle>
              <br />
              <v-list-item-subtitle v-if="item.discontinuedDate">
                <u>Discontinued Date</u>
                : {{item.discontinuedDate}}
              </v-list-item-subtitle>
              <v-list-item-subtitle v-else>
                <u>Discontinued Date</u>: Ø
              </v-list-item-subtitle>
              <br />
              <v-list-item-subtitle v-if="item.companyDTO">
                <u>Company</u>
                : {{item.companyDTO.name}}
              </v-list-item-subtitle>
              <v-list-item-subtitle v-else>
                <u>Company</u>: Ø
              </v-list-item-subtitle>
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
          <v-pagination
            v-model="pagination.page"
            class="my-4"
            :length="pages"
            @input="reloadComputerList"
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
    <v-row justify="center">
      <div class="my-2 text-center">
        <v-btn small @click="step10()">10</v-btn>
        <v-btn small @click="step50()">50</v-btn>
        <v-btn small @click="step100()">100</v-btn>
      </div>
    </v-row>
  </div>
</template>

<script>
import ComputersApi from "../api/computers_api";

export default {
  data: function() {
    return {
      computerListPaginated: [],
      computerList: [],
      pagination: {
        page: 1,
        step: 10
      }
    };
  },
  mounted: function() {
    ComputersApi.findComputersPaginated(0, 10).then(
      response => (this.computerListPaginated = response.data)
    );
    ComputersApi.findAll().then(
      response => (this.computerList = response.data)
    );
  },
  methods: {
    step10() {
      this.pagination.step = 10;
      this.pagination.page = 1;
      this.reloadComputerList();
      console.log(this.computerList);
    },
    step50() {
      this.pagination.step = 50;
      this.pagination.page = 1;
      this.reloadComputerList();
    },
    step100() {
      this.pagination.step = 100;
      this.pagination.page = 1;
      this.reloadComputerList();
    },
    reloadComputerList() {
      ComputersApi.findComputersPaginated(
        this.pagination.page - 1,
        this.pagination.step
      ).then(response => (this.computerListPaginated = response.data));
    }
  },
  computed: {
    pages() {
      return this.pagination.step
        ? Math.ceil(this.computerList.length / this.pagination.step)
        : 10;
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