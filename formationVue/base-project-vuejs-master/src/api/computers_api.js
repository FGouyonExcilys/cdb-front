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
