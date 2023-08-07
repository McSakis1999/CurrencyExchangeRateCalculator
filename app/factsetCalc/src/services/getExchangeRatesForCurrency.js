import api from './api';

export default {
    getExchangeRateForCurrency(id){
       return api().get('exchange-rates/'+id)
   }
}
