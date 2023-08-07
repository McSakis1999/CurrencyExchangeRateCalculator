import api from './api';

export default {
    getExchangeRateByID(id){
       return api().get('specific-exchange-rate/'+id)
   }
}
