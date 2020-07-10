import { axios } from "./index";
export class ComputersApi {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  create(computer) {
    return this.axios.post("/computers", computer, {
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    });
  }


  getNbComput(){
        return this.axios.post("/computers", computer, {
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    });
  }

  findAll() {
    return this.axios.get("/computers", {
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    });
  }
  findComputersPaginated(page, size) {
    return this.axios.get("/computers?page=" + page + "&size=" + size, {
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    });
  }
  findNumberOfComputers() {
    return this.axios.get("/computers/numbers", {
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    });
  }

  findNumberOfComputersSearch(search) {
    return this.axios.get("/computers?search=" + search, {
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    });
  }

  findFirstPage() {
    return this.axios.get("/computers?page=0&size=10", {
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    });
  }

  findPage(page, size) {
    return this.axios.get("/computers?page=" + page + "&size=" + size, {
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    });
  }

  findPageSearch(search, page, size) {
    return this.axios.get(
      "/computers?search=" + search + "&page=" + page + "&size=" + size,
      {
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
      }
    );
  }

  findPageSearchOrder(search, page, size, order) {
    return this.axios.get(
      "/computers?search=" + search + "&page=" + page + "&size=" + size + "&orderBy=" + order,
      {
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
      }
    );
  }

  findPageOrder(page, size, order) {
    return this.axios.get(
      "/computers?page=" + page + "&size=" + size + "&orderBy=" + order,
      {
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
      }
    );
  }

  findOne(id) {
    return this.axios.get("/computers/" + id, {
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    });
  }

  update(computer) {
    return this.axios.put("/computers/" + computer.id, computer, {
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    });
  }

  delete(id) {
    return this.axios.delete("/computers/" + id, {
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    });
  }
}

export default new ComputersApi(axios);
