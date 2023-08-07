import api from '../services/api';

export default {
   addExchangeRate(exchangeRateData){
       return api().post('addExchangeRate',exchangeRateData)
   }
}