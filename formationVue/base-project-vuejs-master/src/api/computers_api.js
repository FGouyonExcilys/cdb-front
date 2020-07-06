import { axios } from "./index";

export class ComputersApi {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
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
  delete(id) {
    return this.axios.delete("/computers/" + id);
  }
}

export default new ComputersApi(axios);
