import api from '../services/api';

export default {
   updateExchangeRate(newRate,id){
       return api().put('update-exchange-rate/'+id,{rate: newRate})
   }
}
