import { axios } from "./index";

export class CompaniesApi {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  findAll() {
    return this.axios.get("/companies", {
      headers:{
      crossdomain: true,
      authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU5NDEzNjgwMiwiaWF0IjoxNTk0MTMzMjAyfQ.nANEddZSNbdKdFVqfzLg3CJh7xExsknff1bJgyHRUg2diR_QoeZeSxXDV02U1Y5G-DX_MSNZ4fjBOmwfmf7lZQ"}
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
