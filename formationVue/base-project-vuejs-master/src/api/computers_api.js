import { axios } from "./index";

export class ComputersApi {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  findAll() {
    return this.axios.get("/computers", {
      crossdomain: true,
      headers: {
        'authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU5NDA0MzU5NiwiaWF0IjoxNTk0MDM5OTk2fQ.glEdshwvblY7Rwr3UCz3Uct2JrbAot5VBmEf5tIQZV1lEVQV1AiP7YgP8Nt-BljFaCnA8XijLbYKIRuTlC7cUA'
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
