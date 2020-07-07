import { axios } from "./index";
import authHeader from '../services/auth-header';

export class CompaniesApi {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  findAll() {
    return this.axios.get("/companies", {
      crossdomain: true,
       headers: authHeader() 
    });
  }

  create(company) {
    return this.axios.post("/companies", company, {
      headers: { "Content-Type": "application/json" },
    });
  }
  delete(id) {
    return this.axios.delete("/companies/" + id, authHeader());
  }
}

export default new CompaniesApi(axios);
