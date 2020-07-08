import { axios } from "./index";

export class CompaniesApi {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  findAll() {
    return this.axios.get("/companies", {
      headers:{
        authorization: sessionStorage.getItem('token')}
    });
  }

  findPage(page, size) {
    return this.axios.get('/companies?page='+page+'&size='+size, {
      headers:{
        authorization: sessionStorage.getItem('token')}
    });
  }

  findFirstPage() {
    return this.axios.get("/companies?page=0&size=10", {
      headers:{
        authorization: sessionStorage.getItem('token')}
    });
  }

  findPageSearch(search,page, size) {
    return this.axios.get('/companies?search='+search+'&page='+page+'&size='+size, {
      headers:{
        authorization: sessionStorage.getItem('token')}
    });
  }

  findOne(id){
    return this.axios.get("/companies/" + id, {
      headers:{
        authorization: sessionStorage.getItem('token')}
    });
  }

  create(company) {
    return this.axios.post("/companies", company, {

      headers: { "Content-Type": "application/json",  authorization: sessionStorage.getItem('token') },
    });
  }
  delete(id) {
    return this.axios.delete("/companies/" + id, {
      headers:{
        authorization: sessionStorage.getItem('token')}

    });
  }
}

export default new CompaniesApi(axios);
