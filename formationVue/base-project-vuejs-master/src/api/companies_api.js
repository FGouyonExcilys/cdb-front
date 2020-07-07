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

  findPage(page, size) {
    return this.axios.get('/companies?page='+page+'&size='+size, {
      crossdomain: true,
      auth: {
        username: "admin",
        password: "admin",
      },
    });
  }

  findPageSearch(search,page, size) {
    return this.axios.get('/companies?search='+search+'&page='+page+'&size='+size, {
      crossdomain: true,
      auth: {
        username: "admin",
        password: "admin",
      },
    });
  }

  findOne(id){
    return this.axios.get("/companies/" + id, {
      crossdomain: true,
      auth: {
        username: "admin",
        password: "admin",
      },
    });
  }

  create(company) {
    return this.axios.post("/companies", company, {
      crossdomain: true,
      auth: {
        username: "admin",
        password: "admin",
      },
      headers: { "Content-Type": "application/json" },
    });
  }
  delete(id) {
    return this.axios.delete("/companies/" + id);
  }
}

export default new CompaniesApi(axios);
