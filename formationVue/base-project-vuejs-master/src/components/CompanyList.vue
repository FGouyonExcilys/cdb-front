<template>
  <div>
    
      <h1>COMPANY LIST</h1>

      <h2>{{nbCompanies}} trouvés</h2>
      <div id="actions" class="form-horizontal">
				<div class="pull-left">
					Chercher une compagnie
					<label>
  						<input type="text" v-model="search"> <button @click="getUrlFirstSearch">Filtrer</button>
  					</label>  
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
				
					<button @click="handleDelete">Delete</button>				
				<div class="pull-right">
					<a class="btn btn-success" id="addCompany" href="addCompany">Ajouter</a> <a class="btn btn-default"
						id="editCompany" href="#" >Éditer</a>
				</div>
			</div>
      <form id="deleteForm" action="dashboard/deleteComputer" method="POST">
			<input type="hidden" name="selection" value="">
		</form>

    <div style="margin-top: 10px;">
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
		</div>
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


  </div>
</template>

<script>
import CompaniesApi from "../api/companies_api";

export default {
  data: function() {
    return {
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
       
	});
	CompaniesApi.findFirstPage().then(response => {
		console.log('TOTOTOTOTO')
		  this.result = response.data;
	  });
    

    
  },
  methods: {
	  
	 handleDelete() {
		  if(this.show == false)
			  this.show = true;
			else {
				for(var i = 0; i < this.checkedNames.length; i++) {
					CompaniesApi.delete(this.checkedNames[i]);
				}
				this.checkedNames= [];
				this.show = false;
			}
	  },
	 getUrlFirstSearch() {
		  this.searchMod = true;
		  this.pageIterator=0;
		  this.pageSize=10;
		  CompaniesApi.findPageSearch(this.search,this.pageIterator,this.pageSize).then(response => {
			 
			  this.result = response.data;
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
			  this.result = response.data;
		  });
		}
		else {
			Companies.findPage(this.pageIterator,this.pageSize).then(response => {
        		this.result = response.data;
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
			  this.result = response.data;
		  });
		}
		else {
			CompaniesApi.findPage(this.pageIterator,this.pageSize).then(response => {
        		this.result = response.data;
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