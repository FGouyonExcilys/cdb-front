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

  findFirstPage() {
    return this.axios.get("/computers?page=0&size=10", {
      crossdomain: true,
      auth: {
        username: "admin",
        password: "admin",
      },
    });
  }

  findPage(page, size) {
    return this.axios.get('/computers?page='+page+'&size='+size, {
      crossdomain: true,
      auth: {
        username: "admin",
        password: "admin",
      },
    });
  }

  findPageSearch(search,page, size) {
    return this.axios.get('/computers?search='+search+'&page='+page+'&size='+size, {
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
    return this.axios.delete('/computers/' + id, {
      crossdomain: true,
      auth: {
        username: "admin",
        password: "admin",
      },
    });
  }
}

export default new ComputersApi(axios);
