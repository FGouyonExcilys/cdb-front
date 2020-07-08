import { axios } from "./index";

export default class UserApi {

    constructor(axiosInstance) {
        this.axios = axiosInstance
    }

    login(user, passwordlog) {
        return this.axios.post('/login',{
            username: user,
            password: passwordlog
            
            }
         );
    }

    logout(){
        sessionStorage.removeItem('token')
    }

    register(user, passwordlog){
        return this.axios.post('/users',{
            username: user,
            password: passwordlog
            }
         );
    }

}

export const userApi = new UserApi(axios) 
