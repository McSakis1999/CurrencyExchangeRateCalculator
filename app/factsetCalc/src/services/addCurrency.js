import api from '../services/api';

export default {
   addCurrency(currencyData){
       return api().post('addCurrency',currencyData)
   }
}