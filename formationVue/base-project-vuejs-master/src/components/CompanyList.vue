<template>
  <div>
    
      <h1>COMPANY LIST</h1>

      <h2>{{nbCompanies}} found</h2>
      <div id="actions" class="form-horizontal">
				<div class="pull-left">
					Search a company
					<v-container fluid>
<v-row>
<v-col cols="12" sm="10"> <v-text-field v-model="search" label="Search" outlined shaped > </v-text-field></v-col>
<v-col cols="12" sm="2"> <v-btn @click="getUrlFirstSearch">Filter</v-btn> </v-col>
</v-row>
</v-container> 
					<!--<form id="searchForm"  class="form-inline">
						<label>
						<input type="text" v-model="search" id="searchbox" name="search"
							class="form-control" placeholder="ex: Mac" /> <input
							type="submit"  id="searchsubmit"
							value="Filtrer"
							class="btn btn-primary" />
						</label>
					</form>-->
				</div>
				
					<v-btn @click="handleDelete">Delete</v-btn>				
			</div>
      	<form id="deleteForm" action="dashboard /deleteComputer" method="POST">
			<input type="hidden" name="selection" value="">
		</form>

    <!--<div style="margin-top: 10px;">
			<table class="table table-striped table-bordered">
				<thead>
					<tr>

						<th class="editMode" style="width: 60px; height: 22px;"><input
							type="checkbox" id="selectall" hidden /> <span
							style="vertical-align: top;">  <a href="#"
								id="deleteSelected" > <i
									class="fa fa-trash-o fa-lg"></i>
								</a>
						</span></th>
						<th><a href="/companies?order=Name">name</a></th>
					</tr>
				</thead>

				<tbody id="results">
					<span v-for="comp in result" :key="comp.id">
						<tr class="evenOrOdd">
							<td v-show="show" class="editMode"><input type="checkbox" name="cb"
								class="cb" :value="comp.id" v-model="checkedNames"></td>
							<td><a href="editComputer?computerId=comp.id"
								>{{comp.name}}</a></td>
						</tr>
					</span>
				</tbody>



			</table>
		</div>-->
		<v-container v-for="item in companyListPaginated" :key="item.id">
      <v-card class="mx-auto" max-width="300">
        <v-list>
          <v-list-item>
            <v-list-item-content>
				<div v-show="show" class="editMode"><input type="checkbox" name="cb"
								class="cb" :value="item.id" v-model="checkedNames"></div>
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
    <footer>
		   <div class="container text-center">
			<ul class="pagination">
				<li v-if="pageIterator>0">
						<button @click="getUrlPrevious">prev</button>
				</li>
				
			</ul>

		   </div>

		   <div class="container text-center">
			<ul class="pagination">
				<li v-if="pageIterator<maxPage">
						<button @click="getUrlNext">next</button>
				</li>
				
			</ul>
			{{checkedNames}}
		   </div>
	   </footer>
	<v-row justify="center">
      <v-col cols="6">
        <v-container class="max-width">
          <v-pagination
            v-model="pagination.page"
            class="my-4"
            :length="pages"
            @input="reloadCompanyList"
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
import CompaniesApi from "../api/companies_api";


export default {
  data: function() {
    return {
		companyListPaginated: [],
		companyList: [],
		pagination: {
        	page: 1,
        	step: 10
     	 },
      nbCompanies: 0,
		result: [],
		pageIterator: 0,
		pageSize: 10,
		search: '',
		orderName: '',
		maxPage: 0,
		urlPrevious: '',
		urlNext: '',
		show: false,
		searchMod: false,
		checkedNames: [],
    };
  },
  mounted: function() {
    CompaniesApi.findAll().then(response => {
      this.nbCompanies = response.data.length;
		  this.maxPage = this.nbCompanies/this.pageSize;
		  this.companyList = response.data;
       
	});
	CompaniesApi.findFirstPage().then(response => {
		console.log('TOTOTOTOTO')
		  this.companyListPaginated = response.data;
	  });
    

    
  },
  methods: {
	      step10() {
      this.pagination.step = 10;
      this.pagination.page = 1;
      this.reloadComputerList();
      console.log(this.companyList);
    },
    step50() {
      this.pagination.step = 50;
      this.pagination.page = 1;
      this.reloadCompanyList();
    },
    step100() {
      this.pagination.step = 100;
      this.pagination.page = 1;
      this.reloadCompanyList();
    },
    reloadCompanyList() {
      CompaniesApi.findPage(
        this.pagination.page - 1,
        this.pagination.step
      ).then(response => (this.companyListPaginated = response.data));
    },
	 handleDelete() {
		 console.log('handle delete')
		 console.log(this.checkedNames)
		  if(this.show == false)
			  this.show = true;
			else {
				console.log('going to delete')
				for(var i = 0; i < this.checkedNames.length; i++) {
					CompaniesApi.delete(this.checkedNames[i]);
				}
				this.checkedNames= [];
				console.log(this.checkedNames)
				this.show = false;
			}
	  },
	 getUrlFirstSearch() {
		  this.searchMod = true;
		  this.pageIterator=0;
		  this.pageSize=10;
		  CompaniesApi.findPageSearch(this.search,this.pageIterator,this.pageSize).then(response => {
			 
			  this.companyListPaginated = response.data;
		  });
	  },
	  getUrlPrevious() {
		  if(this.search == '') {
			 console.log('getUrlPrevious search vide'); 
			  this.searchMod = false;
		  }
	  	this.pageIterator -= 1;
	  	if(this.searchMod) {
		  CompaniesApi.findPageSearch(this.search,this.pageIterator,this.pageSize).then(response => {
			 console.log('newSearch appelé dans méthode sans le créer dans data'); 
			 console.log(response.data); 
			  this.companyListPaginated = response.data;
		  });
		}
		else {
			Companies.findPage(this.pageIterator,this.pageSize).then(response => {
        		this.companyListPaginated = response.data;
			});
		}
	  },
	  getUrlNext() {
		  if(this.search == '') {
			  console.log('getUrlNext search vide');
			  this.searchMod = false;
		  }
	  this.pageIterator += 1;
	  if(this.searchMod) {
	  	CompaniesApi.findPageSearch(this.search,this.pageIterator,this.pageSize).then(response => {
			 console.log('newSearch appelé dans méthode sans le créer dans data'); 
			 console.log(response.data); 
			  this.companyListPaginated = response.data;
		  });
		}
		else {
			CompaniesApi.findPage(this.pageIterator,this.pageSize).then(response => {
        		this.companyListPaginated = response.data;
			});
		}
    
		  
	  }
  },

  computed: {
    pages() {
      return this.pagination.step
        ? Math.ceil(this.companyList.length / this.pagination.step)
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