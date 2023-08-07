import api from '../services/api';

export default {
   deleteCurrency(id){
       return api().delete('delete-currency/'+id)
   }
}
