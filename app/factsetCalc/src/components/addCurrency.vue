<template>
    <div class="container">
        <form @submit="handleSubmitForm">
            <div class="form-group">
                <label for="name">Currency Name</label>
                <input v-model="name" required type="text" pattern="[A-Za-z]+" class="form-control" id="name" title="Letters from a-z and A-Z">
            </div>
            <div class="form-group">
                <label for="code">Currency Code</label>
                <input v-model="code" required type="text" pattern ="[A-Za-z]+" min="0" maxlength="3" class="form-control" id="code" title="3 letters from A-Z">
            </div>
            <div class="form-group">
                <label for="symbol">Currency symbol</label>
                <input v-model="symbol" required type="text"  maxlength="1" class="form-control" id="symbol">
            </div>
            <button ref="submit" type="submit" class="btn btn-outline-primary">Submit</button>
        </form>
    </div>
</template>

<script>
    import AddCurrency from '../services/addCurrency'
    export default {
        data(){
            return{
                name:'',
                code:'',
                symbol:''
            }
        },
        methods: {
            async submitForm(){
                await (AddCurrency.addCurrency({name:this.name,code:this.code,symbol:this.symbol}))
                this.$router.push('/')
            },
            handleSubmitForm(e){
                if(this.name!='' && this.code!='' && this.symbol!=''){
                    e.preventDefault();
                    this.submitForm();
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
        width:100%;
        height: auto;
        padding: 1rem 1rem;   
    }
    .container .btn:hover{
        color: #212f43;
        background-color: white;;
        border:1px solid #212f43;
    }
    .container .btn{
        width:8rem;
        color:#f1f3f5;
        border-color: #f1f3f5;
        background-color: #212f43;
        align-self: center;
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