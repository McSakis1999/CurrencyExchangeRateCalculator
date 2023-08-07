<template>
    <div class = "container">
        <div class="wrapper">
            <label for="base">Base Currency:</label>
        <input v-model="baseCurrency" disabled name="base" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
       </div>
       <div class="wrapper">
            <label for="target">Target Currency:</label>
        <input v-model="targetCurrency" disabled name="target" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="wrapper">
            <label for="input">Input Exchange Rate:</label>
        <input @change="onChange($event)" :placeholder="input_number" type="number" pattern ="[0-9]+" min="1" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
        <button @click="saveEdit()" class="btn btn-outline-primary" type="button">Edit</button>
    </div>
</template>

<script>
    import GetExchangeRateByID from '../services/getExchangeRateByID';
    import UpdateExchangeRate from '../services/updateExchangeRate'
        
    export default {
        data(){
            return{
               exchangeRates: null,
               baseCurrency:'',
               targetCurrency:'',
               input_number:''
            }
        },
        props: ['dataProp']
        ,
        // Async request of data on component mount
        async mounted(){
            //request data
            const data = (await GetExchangeRateByID.getExchangeRateByID(this.dataProp)).data.exchangeRates
            this.baseCurrency = data[0].base_currency_code
            this.targetCurrency = data[0].target_currency_code
            this.input_number = data[0].rate
            //this.exchangeRates = data.exchangeRates;
        },
        methods:{
            onChange(event){
                this.input_number = event.target.value;
            },
            saveEdit(){
                UpdateExchangeRate.updateExchangeRate(this.input_number,this.dataProp)
                this.$router.push({name:'home'})
            }
        }
    }
</script>

<style scoped>
     .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap:1rem;
        width:100%;
        padding: 1rem 1rem;
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
        border-color: #212f43;
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
            width:90%;
        }
    }

    @media (max-width: 450px) {
        h2{
            font-size: medium;
        }
    }
</style>