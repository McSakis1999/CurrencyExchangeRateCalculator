import api from '../services/api';

export default {
   addUser(userData){
       return api().post('signup',userData)
   }
}