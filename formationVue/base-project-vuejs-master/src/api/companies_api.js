import { axios } from "./index";

export class CompaniesApi {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  findAll() {
    return this.axios.get("/companies", {
      crossdomain: true,
      auth: {
        username: "admin",
        password: "admin",
      },
    });
  }

  create(company) {
    return this.axios.post("/companies", company, {
      headers: { "Content-Type": "application/json" },
    });
  }
  delete(id) {
    return this.axios.delete("/companies/" + id);
  }
}

export default new CompaniesApi(axios);
