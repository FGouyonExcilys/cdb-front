import { axios } from "./index";

export class ComputersApi {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  create(computer) {
    return this.axios.post("/computers", computer, {
      crossdomain: true,
      auth: {
        username: "admin",
        password: "admin",
      },
      headers: { "Content-Type": "application/json" },
    });
  }

  findAll() {
    return this.axios.get("/computers", {
      crossdomain: true,
      auth: {
        username: "admin",
        password: "admin",
      },
    });
  }

  findOne(id){
    return this.axios.get("/computers/" + id, {
      crossdomain: true,
      auth: {
        username: "admin",
        password: "admin",
      },
    });
  }
  update(id, computer){
    return this.axios.put("/computers/" + id, computer, {
      crossdomain: true,
      auth: {
        username: "admin",
        password: "admin",
      },
      headers: { "Content-Type": "application/json" },
    });
  }
  delete(id) {
    return this.axios.delete("/computers/" + id);
  }
}

export default new ComputersApi(axios);
