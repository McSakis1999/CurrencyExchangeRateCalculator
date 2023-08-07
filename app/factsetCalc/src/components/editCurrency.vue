<template>
    <div class="container">
        <select class="form-select" @change="onChange($event)" aria-label="Default select example">
                    <option selected disabled>Select Currency</option>
                    <option v-for="currency in currencies" 
                    :key="currency.id"
                    :value="currency.id">
                    {{ currency.currencyCode }}
                    </option >
                </select>
        <button @click="deleteCurrency" type="button" class="btn btn-outline-primary">Delete</button>
        <form @submit="handleSubmitForm">
            <div class="form-group">
                <label for="name">Currency Name</label>
                <input v-model="name" type="text" pattern="[A-Za-z]+" class="form-control" id="name" title="Letters from a-z and A-Z">
            </div>
            <div class="form-group">
                <label for="code">Currency Code</label>
                <input v-model="code" type="text" pattern ="[A-Za-z]+" min="0" maxlength="3" class="form-control" id="code" title="3 letters from A-Z">
            </div>
            <div class="form-group">
                <label for="symbol">Currency symbol</label>
                <input v-model="symbol" type="text"  maxlength="1" class="form-control" id="symbol">
            </div>
            <button ref="submit" type="submit" class="btn btn-outline-primary">Submit</button>
        </form>
    </div>
</template>

<script>
    import GetAllCurrencies from '../services/getAllCurrencies';
    import UpdateCurrency from '../services/updateCurrency'
    import DeleteCurrency from '../services/deleteCurrency'

    export default {
        data(){
            return{
                currencies:null,
                name:'',
                code:'',
                symbol:'',
                index:null,
                selectedId: null
            }
        },
        async mounted(){
            //request data
            const data = (await GetAllCurrencies.getAllCurrencies()).data
            this.currencies = data.currencies;
        },
        methods: {
            async submitForm(){
                await (UpdateCurrency.updateCurrency({name:this.name,code:this.code,symbol:this.symbol},this.selectedId))
                this.$router.push('/')
            },
            onChange(event){
                this.index = this.findIndexById(this.currencies,event.target.value)
                this.selectedId = event.target.value
                this.name = this.currencies[this.index].name
                this.code = this.currencies[this.index].currencyCode
                this.symbol = this.currencies[this.index].symbol
            }
            ,
            handleSubmitForm(e){
                if(this.name==''){
                    this.name = this.currencies[this.index].name
                }
                if(this.code==''){
                    this.code = this.currencies[this.index].currencyCode
                }
                if(this.symbol==''){
                    this.symbol = this.currencies[this.index].symbol
                }
                e.preventDefault();
                this.submitForm();
            },
            findIndexById(json,id){
                var fIndex = -1;
                json.forEach((value,index) => {
                    if(value.id == id){
                        fIndex = index;
                    }
                });
                return fIndex;  
            }
            ,
            async deleteCurrency(){
                await (DeleteCurrency.deleteCurrency(this.selectedId))
                this.$router.push('/')
            }
        }
        }
</script>

<style scoped>
    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        width:100%;
        height: auto;
        padding: 1rem 1rem;   
    }
    .container select{
        width: 50%;
        margin: 1rem 0;
    }
    .container .btn:hover{
        color: #212f43;
        background-color: white;;
        border:1px solid #212f43;
    }
    .container .btn{
        align-self: center;
        width:8rem;
        color:#f1f3f5;
        border-color: #212f43;
        background-color: #212f43;
     }
    .container form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap:1rem;
        width:50%;
    }
    #code{
        text-transform: uppercase;
    }
</style>