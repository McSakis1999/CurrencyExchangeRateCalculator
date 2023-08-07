<template>
    <div class = "container">
        <div class="selects">
            <div class="selectA">
                <select class="form-select" @change="onChange($event,'base')" aria-label="Default select example">
                    <option selected disabled>Select Currency</option>
                    <option v-for="currency in currencies" 
                    :key="currency.id"
                    :value="currency.id">
                    {{ currency.currencyCode }}
                    </option >
                </select>
                <div class="currencyA">{{ baseName }} : {{ baseSymbol }} </div>
                <div class="rateA">Rate : {{ baseExchangeRate }}</div>
                <div class="input-group mb-3 inputA">
                    <input v-model=input_number @change="onChange($event,'input')" type="number" pattern ="[0-9]+" min="1" class="form-control inputA" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                 </div>
                 <div :class="{'hidden':!this.userLoggedIn}" class="btnWrap">    
                    <button @click="()=>{ this.$router.push('/editCurrency')}" type="button" class="btn btn-outline-secondary">Update Currencies</button>
                </div>
            </div>
            <div class="selectB">
                <select class="form-select" @change="onChange($event,'target')" :disabled="!baseIsSelected" aria-label="Default select example">
                    <option selected disabled>Select Currency</option>
                    <option v-for="(value,key) in targetData"
                    :value="key">
                    {{ value.target_currency_code }}
                    </option>
              </select>
                <div class="currencyB"> {{ targetName }} : {{ targetSymbol }} </div>
                <div class="rateB">Rate : {{ targetExchangeRate }}</div>
                <div class="input-group mb-3 inputB">
                    <input v-model="result" disabled type="text" class="form-control inputB" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GetAllCurrencies from '../services/getAllCurrencies'
    import GetExchangeRateForCurrency from '../services/getExchangeRatesForCurrency'
    import { mapGetters, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapGetters(['userLoggedIn']),
        },
        data(){
            return{
                currencies: null,
                exchangeRates : null,
                targetData : null,
                // Base Currency Variables
                baseIsSelected: false,
                baseName: '',
                baseExchangeRate:'',
                baseSymbol:'',
                baseCode: '',
                // Target Currency Variables
                targetIsSelected:false,
                targetName: '',
                targetExchangeRate:'',
                targetSymbol:'',
                targetCode: '',
                // Input Variables
                inputIsSelected : false,
                input_number:null,
                result: 0,
            }
        },
         // Async request of data on component mount
         async mounted(){
            //request data
            const data = (await GetAllCurrencies.getAllCurrencies()).data
            this.currencies = data.currencies;
        },
        methods: {
            ...mapActions(['setUserLoggedIn']),
            findIndexById(json,id){
                var fIndex = -1;
                json.forEach((value,index) => {
                    if(value.id == id){
                        fIndex = index;
                    }
                });
                return fIndex;  
            },
            async onChange(event,index){
                if(index == 'base'){
                    this.baseIsSelected = true;
                    //set info
                    const index = this.findIndexById(this.currencies,event.target.value) // find currency index in currencies json by searching its id
                    if(index != -1)
                    {
                        this.baseName = this.currencies[index].name;
                        this.baseCode = this.currencies[index].code;
                        this.baseSymbol = this.currencies[index].symbol;
                        this.baseExchangeRate = '1';
                        //get target values
                        this.targetData = (await GetExchangeRateForCurrency.getExchangeRateForCurrency(event.target.value)).data.exchangeRates
                        if(Object.keys(this.targetData).length === 1){
                            const index = this.findIndexById(this.currencies, this.targetData[0].target_currency_id)
                            if(index!=-1){
                                this.targetIsSelected=true;
                                this.targetName = this.currencies[index].name
                                this.targetSymbol= this.currencies[index].symbol
                                this.targetCode= this.currencies[index].currencyCode
                                this.targetExchangeRate = this.targetData[0].rate;

                                if(this.inputIsSelected){
                                    this.result = (this.input_number *  this.targetExchangeRate).toFixed(3);
                                }
                            }
                        }else{
                            this.targetSymbol = ''
                            this.targetExchangeRate= ''
                            this.targetName = ''
                            this.targetIsSelected = false
                            this.result=0;
                        }
                    }
                }
                if(index == 'target'){
    
                    const index = this.findIndexById(this.currencies, this.targetData[event.target.value].target_currency_id)
                    if(index!=-1){
                        this.targetIsSelected=true;
                        this.targetName = this.currencies[index].name
                        this.targetSymbol= this.currencies[index].symbol
                        this.targetCode= this.currencies[index].currencyCode
                        this.targetExchangeRate = this.targetData[event.target.value].rate;
                        if(this.inputIsSelected){
                            this.result =  (this.targetExchangeRate * this.input_number).toFixed(3);
                        }
                    }
                }
                if(index == 'input'){
                    this.inputIsSelected = true;
                    if(this.targetIsSelected){
                        this.input_number = parseInt(event.target.value);
                        this.result = (this.input_number *  this.targetExchangeRate).toFixed(3);
                    }
                }
            }
        }
    }

</script>

<style scoped>
    .container{
        display: flex;
        flex-direction: column;
        gap:1rem;
        width:100%;
        padding: 1rem 1rem;
        
    }
    .selects{
        display: flex;
        justify-content:space-evenly ;
        width:100%;
    }
    .selectA,.selectB,.inputA,.inputB{
        max-width: 15rem;
    }
    .select{
        cursor: pointer;
    }
    .selectA,.selectB{
        display: flex;
        flex-direction: column;
        gap:1rem;
    }
    .btnWrap{
        display: flex;
        gap:1rem;
    }
    .btnWrap button{
        padding:0.3rem 1.5rem;
    }
    .hidden{
        display: none;
    }
    .btn{
        width:auto;
        color:#f1f3f5;
        border-color: #f1f3f5;
    }
    .btn:hover{
        background-color: #f1f3f5 ;
        color:#212f43;
    }

    @media (max-width: 1050px) {
        .container{
            padding:0;
        }
        .selectA,.selectB{
            gap:0.5rem;
        }
        .input-group input{
            width:5rem;
        }
    }
    @media (max-width: 450px) {
        .selectA,.selectB,.inputA,.inputB{
            font-size: 5px;
        }
    }
</style>