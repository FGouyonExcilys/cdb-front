<template>
  <div type="text/x-template" id="app-template">
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
	<v-card>
		<v-container fluid>
      		<v-row  align="center"
          justify="center">
		  		<v-col cols="12" md="8"> <v-text-field v-model="search"  @keydown.enter="reloadComputerList" label="Search" outlined shaped > </v-text-field></v-col>
				<v-col cols="12" md="4">
				 <v-text-field  :value="message" outlined shaped :disabled="true" filled >  </v-text-field>
				</v-col>
        	<v-col cols="12" md="12" >
        		<v-chip-group active-class="primary--text" v-model="order" >
          			<v-chip value="name" >name</v-chip>
        			<v-chip value="introduced">Introduced Date</v-chip>
        			<v-chip value="discontinued" >Discontinued Date</v-chip>
         			<v-chip value="company" >Company</v-chip>
       			</v-chip-group>
				</v-col>
        </v-row>

        <!-- <v-col cols ="10">
          <v-row  align="center"
          justify="center">      		 
        <v-btn v-on:click="handleDelete"><span>Delete</span></v-btn>
        <v-text-field v-if="show"  :value="checkedNames" :disabled="true" filled >  </v-text-field> 
        </v-row>
        </v-col>  -->
     	
       	


         	  <v-row justify="center" align="center">
        </v-row>

			 <v-col cols="12" md="18"> <v-btn v-on:click="reloadComputerList"><span>Filtrer</span></v-btn> </v-col>

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


    <v-container v-for="item in computerListPaginated" :key="item.id" justify="center" align="center">
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
        <v-container v-if="show" align="center" justify="center">
          <v-switch label="To delete" :value="item.id" v-model="checkedNames"></v-switch>
       </v-checkbox>
          </v-container>
       
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
	 ComputersApi.findNumberOfComputers().then(
      response => (this.nbComputers = response.data)
	);
	

    
  },
  methods: {
    step10() {
      this.pagination.step = 10;
      this.pagination.page = 1;
      this.reloadComputerList();
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
		console.info(this.order);

		if(this.search && !this.order){
			ComputersApi.findPageSearch(this.search,
     		   this.pagination.page - 1,
 		       this.pagination.step
			  ).then(response => (this.computerListPaginated = response.data)).catch(this.computerListPaginated = null);
			  ComputersApi.findNumberOfComputersSearch(this.search).then(response => { this.nbComputers = response.data});

		}else if(this.order && !this.search){
			ComputersApi.findPageOrder(this.pagination.page - 1,
				this.pagination.step,
				this.order
        ).then(response => (this.computerListPaginated = response.data)).catch(this.computerListPaginated = null);
         ComputersApi.findNumberOfComputers().then(response => { this.nbComputers = response.data});
		}else if(this.order && this.search ){
			ComputersApi.findPageSearchOrder(this.search,
				this.pagination.page - 1,
				this.pagination.step,
				this.order
        ).then(response => (this.computerListPaginated = response.data)).catch(this.computerListPaginated = null);
         ComputersApi.findNumberOfComputersSearch().then(response => { this.nbComputers = response.data});
		}else {
     		 ComputersApi.findComputersPaginated(
     		   this.pagination.page - 1,
 		       this.pagination.step
          ).then(response => (this.computerListPaginated = response.data));
          ComputersApi.findNumberOfComputers().then(response => { this.nbComputers = response.data});
		}

	},
	handleDelete() {
		  if(this.show === false)
			  this.show = true;
			else {
				for(var i = 0; i < this.checkedNames.length; i++) {
          console.log("joie et bonheur");
					ComputersApi.delete(this.checkedNames[i]);
				}
				this.checkedNames= [];
				this.show = false;
			}
	  },

	   getUrlFirstSearch() {

		  this.searchMod = true;
		  ComputersApi.findNumberOfComputersSearch(this.search).then(response => { this.nbComputers = response.data});
		  ComputersApi.findPageSearch(this.search,0,this.pagination.step).then(response => {
        this.computerListPaginated = response.data;
        console.log(this.computerListPaginated); 
			  this.pagination
		  });
	  },

	   

  },
  computed: {
    pages() {
      return this.pagination.step
        ? Math.ceil(this.nbComputers / this.pagination.step)
        : 10;
	},
	message(){
		  return "Computers in Database = " + this.nbComputers
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