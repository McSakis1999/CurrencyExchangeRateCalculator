import api from '../services/api';

export default {
   checkUserCredentials(userData){
       return api().post('login',userData)
   }
}