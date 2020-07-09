import { axios } from "./index";

export class ComputersApi {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  create(computer) {
    return this.axios.post("/computers", computer, {
      headers: { "Content-Type": "application/json",  authorization: sessionStorage.getItem('token') },
    });
  }

  findAll() {
    return this.axios.get("/computers", {
      headers:{
      authorization: sessionStorage.getItem('token')}
    });
  }
  findComputersPaginated(page,size){
    return this.axios.get("/computers?page=" + page + "&size=" + size, {
      headers:{
      authorization: sessionStorage.getItem('token')}
    });
  }
  findNumberOfComputers(){
    return this.axios.get("/numbers", {
      headers:{
      authorization: sessionStorage.getItem('token')}
    });
  }

  findFirstPage() {
    return this.axios.get("/computers?page=0&size=10", {
      headers:{
        authorization: sessionStorage.getItem('token')}
    });
  }

  findPage(page, size) {
    return this.axios.get('/computers?page='+page+'&size='+size, {
      headers:{
        authorization: sessionStorage.getItem('token')}
    });
  }

  findPageSearch(search,page, size) {
    return this.axios.get('/computers?search='+search+'&page='+page+'&size='+size, {
      headers:{
        authorization: sessionStorage.getItem('token')}
    });
  }

  findOne(id){
    return this.axios.get("/computers/" + id, {
      headers:{
      authorization: sessionStorage.getItem('token')}
    });
  }
  update(id, computer){
    return this.axios.put("/computers/" + id, computer, {headers: { "Content-Type": "application/json",  authorization: sessionStorage.getItem('token') }});
  }
  delete(id) {

    return this.axios.delete("/computers/" + id , {
      headers:{
      authorization: sessionStorage.getItem('token')}

    });
  }
}

export default new ComputersApi(axios);
