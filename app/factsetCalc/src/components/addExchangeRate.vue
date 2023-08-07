<template>
    <form @submit.prevent="saveAdd">
      <div class = "container">
        <div class="wrapper">
            <label for="base">Base Currency:</label>
            <select required class="form-select" @change="onChange($event,'base')" name="base" aria-label="Default select example">
                    <option selected disabled>Select Currency</option>
                    <option v-for="currency in currencies" 
                    :key="currency.id"
                    :value="currency.id">
                    {{ currency.currencyCode }}
                    </option >
            </select>
        </div>
        <div class="wrapper">
            <label for="base">Target Currency:</label>
            <select required class="form-select" @change="onChange($event,'target')" name="target" aria-label="Default select example">
                    <option selected disabled>Select Currency</option>
                    <option v-for="currency in currencies" 
                    :key="currency.id"
                    :value="currency.id">
                    {{ currency.currencyCode }}
                    </option >
            </select>
        </div>
        <div class="wrapper">
            <label for="rate">Input Exchange Rate:</label>
        <input @change="onChange($event,'input')" :placeholder="input_number" name="rate" type="number" pattern ="[0-9]+" min="1" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
        <button @click="saveAdd()" class="btn btn-outline-primary" type="button">Add</button>
        <p v-if="error">{{ error }}</p>
        
      </div>
    </form>
</template>

<script>    
     import GetAllCurrencies from '../services/getAllCurrencies'
     import AddExchangeRate from '../services/addExchangeRate'
     import CheckCurrencyPair from '../services/checkCurrencyPair'

     export default {
        data(){
            return{
                currencies: null,
                input_number:0,
                baseCurrencyId:null,
                baseSelected:false,
                targetCurrencyId:null,
                targetSelected:false,
                inputSelected:false,
                error: ''
            }
        },
         // Async request of data on component mount
         async mounted(){
            //request data
            const data = (await GetAllCurrencies.getAllCurrencies()).data
            this.currencies = data.currencies;
        },
        methods: {
            onChange(event,index){
                if(index == 'base'){
                    this.baseCurrencyId = event.target.value
                    this.baseSelected = true
                }
                if(index == 'target'){
                    this.targetCurrencyId = event.target.value
                    this.targetSelected = true
                }
                if(index == 'input'){
                    this.input_number = event.target.value
                    this.inputSelected = true
                }
            },
            async saveAdd(){
                if(  this.baseSelected == true && this.targetSelected == true && this.inputSelected == true){
                    if(this.baseCurrencyId != this.targetCurrencyId){
                       
                        var exists = true;
                        exists = (await CheckCurrencyPair.checkCurrencyPair(this.baseCurrencyId,this.targetCurrencyId)).data.exists
                        if(!exists){
                            AddExchangeRate.addExchangeRate({baseCurrencyId:this.baseCurrencyId,targetCurrencyId:this.targetCurrencyId,rate:this.input_number});
                            this.$router.push({name:'home'})
                        }else{
                            this.error = "This currency pair exchange rate already exists!"
                        }
                        
                       
                    }else{
                        this.error = "Please choose a pair of unique currencies!"
                    }
                }else{
                    this.error = "Please select all options before submiting!"
                }
            }
        }
        }
</script>

<style scoped>
 .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap:1rem;
        width:100%;
        height: 100%;
        padding: 1rem 1rem;
    }
form{
    width: 100%;
    height: auto;
}
.container .btn:hover{
        color: #212f43;
        background-color: white;;
        border:1px solid #212f43;
    }
.container .btn{
    width:8rem;
    margin: 0 0.5rem;
    color:#f1f3f5;
    border-color: #f1f3f5;
    background-color: #212f43;
    }
    .wrapper{
        width:50%;
    }
    .wrapper label{
        padding:0.5rem 0;
    }
    @media (max-width: 1050px) {
        .container{
            font-size:12px;
            gap:0.5rem;
            padding:0.2rem 1rem;
        }
        .container select,.container input{
            font-size: 12px;
        }
        .container .btn{
            width:8rem;
            font-size: 12px;
        }
        .wrapper{
            width: 90%;
        }
    }

    @media (max-width: 450px) {
        h2{
            font-size: medium;
        }
    }
</style>