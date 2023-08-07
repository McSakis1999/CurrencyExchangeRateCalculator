import api from '../services/api';

export default {
   updateCurrency(newCurrency,id){
       return api().put('/update-currency/'+id,newCurrency)
   }
}
