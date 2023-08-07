import api from '../services/api';

export default {
   checkCurrencyPair(baseCurrencyId,targetCurrencyId){
    let data = {
        BaseCurrencyId:baseCurrencyId,
        TargetCurrencyId:targetCurrencyId
    }
       return api().post('currency-pairs/exist',data)
   }
}