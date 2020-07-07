import { axios } from "./index";
import authHeader from '../services/auth-header';

export class ComputersApi {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  findAll() {

    console.warn(authHeader());
    return this.axios.get("/computers", {
      crossdomain: true,
      headers: authHeader(),
    });
  }

  findOne(id){
    return this.axios.get("/computers/" + id, {
      crossdomain: true,
      headers: authHeader(),
    });
  }

  create(computer) {
    return this.axios.post("/computers", computer, {
      crossdomain: true,
      headers: authHeader() + { "Content-Type": "application/json" },
    });
  }
  delete(id) {
    return this.axios.delete("/computers/" + id);
  }
}

export default new ComputersApi(axios);
