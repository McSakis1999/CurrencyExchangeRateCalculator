 import api from '../services/api';

 export default {
    deleteExchangeRate(id){
        return api().delete('exchange-rates/'+id)
    }
 }
