<template>
  <div type="text/x-template" id="app-template">
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
	<v-card>
		<v-container fluid>
      		<v-row>
		  		<v-col cols="12" sm="10"> <v-text-field v-model="search" label="Search" outlined shaped > </v-text-field></v-col>
		  		<v-col cols="12" sm="2"> <v-btn v-on:click="getUrlFirstSearch">Filtrer</v-btn> </v-col>
      		</v-row>

			<v-row justify="center" align="center">
				<v-col cols="12" sm="10" >
        		<v-chip-group active-class="primary--text" v-model="order">
          			<v-chip value="name">name</v-chip>
        			<v-chip value="introduced">Introduced Date</v-chip>
        			<v-chip value="discontinued">Discontinued Date</v-chip>
         			<v-chip value="company">Company</v-chip>
       			</v-chip-group>
				</v-col>
				<v-col cols="12" sm="2">
				Nb Computer : {{NbComputers}}
				</v-col>
     		</v-row>
    	</v-container>

	<v-row justify="center">
      <v-col cols="6">
        <v-container >
          <v-pagination
            v-model="pagination.page"
            class="my-4"
            :length="pages"
            @input="reloadComputerList"
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>

	</v-card>


    <v-container v-for="item in computerListPaginated" :key="item.id">
      <v-card class="mx-auto" max-width="300">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item>
                <v-list-item-title>
					{{item.name}}
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
	  },
		nbComputers: 0,
		nbpages: 0,
		show: false,
		searchMod: false,
		orderMod: false,
		order: "",
		search: "",
		checkedNames: [],
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

		if(this.searchMod && !this.orderMod){

		}else if(this.orderMod && !this.searchMod){

		}else if(this.orderMod && this.searchMod ){

		}else {
     		 ComputersApi.findComputersPaginated(
     		   this.pagination.page - 1,
 		       this.pagination.step
     		 ).then(response => (this.computerListPaginated = response.data));
		}

	},
	handleDelete() {
		  if(this.show == false)
			  this.show = true;
			else {
				for(var i = 0; i < this.checkedNames.length; i++) {
					ComputersApi.delete(this.checkedNames[i]);
				}
				this.checkedNames= [];
				this.show = false;
			}
	  },

	   getUrlFirstSearch() {

		  this.searchMod = true;
		  ComputersApi.findPageSearch(this.search,0,this.pagination.step).then(response => {
			 console.log(response.data); 
			  this.computerListPaginated = response.data;
			  this.pagination
		  });
	  },
	//   getUrlPrevious() {
	// 	  if(this.search == '') {
	// 		 console.log('getUrlPrevious search vide'); 
	// 		  this.searchMod = false;
	// 	  }
	//   	this.pageIterator -= 1;
	//   	if(this.searchMod) {
	// 	  ComputersApi.findPageSearch(this.search,this.pageIterator,this.pageSize).then(response => {
	// 		 console.log('newSearch appelé dans méthode sans le créer dans data'); 
	// 		 console.log(response.data); 
	// 		  this.result = response.data;
	// 	  });
	// 	}
	// 	else {
	// 		ComputersApi.findPage(this.pageIterator,this.pageSize).then(response => {
    //     		this.result = response.data;
	// 		});
	// 	}
	//   },
	//   getUrlNext() {
	// 	  if(this.search == '') {
	// 		  console.log('getUrlNext search vide');
	// 		  this.searchMod = false;
	// 	  }
	//   this.pageIterator += 1;
	//   if(this.searchMod) {
	//   	ComputersApi.findPageSearch(this.search,this.pageIterator,this.pageSize).then(response => {
	// 		 console.log('newSearch appelé dans méthode sans le créer dans data'); 
	// 		 console.log(response.data); 
	// 		  this.result = response.data;
	// 	  });
	// 	}
	// 	else {
	// 		ComputersApi.findPage(this.pageIterator,this.pageSize).then(response => {
    //     		this.result = response.data;
	// 		});
	// 	}
    
		  
	//   }

  },
  computed: {
    pages() {
		this.nbComputers = this.computerList.length ;
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