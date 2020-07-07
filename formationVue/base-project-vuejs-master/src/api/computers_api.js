import { axios } from "./index";

export class ComputersApi {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  create(computer) {
    return this.axios.post("/computers", computer, {
      headers: { "Content-Type": "application/json",  authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU5NDEzNjgwMiwiaWF0IjoxNTk0MTMzMjAyfQ.nANEddZSNbdKdFVqfzLg3CJh7xExsknff1bJgyHRUg2diR_QoeZeSxXDV02U1Y5G-DX_MSNZ4fjBOmwfmf7lZQ" },
    });
  }

  findAll() {
    return this.axios.get("/computers", {
      headers:{
      authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU5NDEzNjgwMiwiaWF0IjoxNTk0MTMzMjAyfQ.nANEddZSNbdKdFVqfzLg3CJh7xExsknff1bJgyHRUg2diR_QoeZeSxXDV02U1Y5G-DX_MSNZ4fjBOmwfmf7lZQ"}
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
