import api from './api';

export default {
    getAllCurrencies(){
       return api().get('currencies')
   }
}
