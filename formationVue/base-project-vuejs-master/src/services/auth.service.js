import axios from 'axios';
import router from '../router';

const API_URL = 'http://localhost:8080/cdb-computer-database/login'

class AuthService {
  login(user) {

    return axios
      .post(API_URL ,{
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;

      });
  }

  logout() {
    localStorage.removeItem('user');
  }

//   register(user) {
//     return axios.post(API_URL + 'add', {
//       username: user.username,
//       password: user.password
//     });
//   }
}

export default new AuthService();
