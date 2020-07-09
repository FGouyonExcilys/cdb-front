import Axios from "axios";

export const axios = Axios.create({
 // baseURL: "http://10.0.1.173:8080/cdb-computer-database"
   baseURL: "http://localhost:8080/cdb-computer-database"
});
