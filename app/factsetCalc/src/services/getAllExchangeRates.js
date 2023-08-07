import api from './api';

export default {
    getAllExchangeRates(){
       return api().get('exchange-rates')
   }
}
