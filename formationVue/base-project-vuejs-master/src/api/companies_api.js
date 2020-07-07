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
