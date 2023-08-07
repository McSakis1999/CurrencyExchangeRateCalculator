<template>
    <table class="rateList table table-borderless table-hover">
  <thead>
    <tr>
      <th scope="col"><strong>#</strong></th>
      <th scope="col"><strong>Base Currency</strong></th>
      <th scope="col"><strong>Target Currency</strong></th>
      <th scope="col"><strong>Rate</strong></th>
      <th :class="{'hidden':!this.userLoggedIn}" scope="col"><strong>Update</strong></th>
      <th :class="{'hidden':!this.userLoggedIn}" scope="col"><strong>Delete</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="rate in exchangeRates">
      <th scope="row">{{ rate.exchange_rate_id }}</th>
      <td>{{ rate.base_currency_code   }}</td>
      <td>{{ rate.target_currency_code }}</td>
      <td>{{ rate.rate }}</td>
      <td :class="{'hidden':!this.userLoggedIn,'edit':true}" v-on:click="editEntry(rate.exchange_rate_id)">Add/Edit</td>
      <td :class="{'hidden':!this.userLoggedIn,'delete':true}" v-on:click="deleteEntry(rate.exchange_rate_id)">Delete</td>
    </tr>
   
  </tbody>
</table>
</template>

<script>
    import GetAllExchangeRates from '../services/getAllExchangeRates'
    import DeleteExchangeRate from '../services/deleteExchangeRate'
    import { mapGetters, mapActions } from 'vuex';

    // Army of probably unneeded variables
    export default {
        computed: {
          ...mapGetters(['userLoggedIn']),
        },
        data(){
            return{
               exchangeRates: null,
            }
        },
        // Async request of data on component mount
        async mounted(){
            //request data
            const data = (await GetAllExchangeRates.getAllExchangeRates()).data
            this.exchangeRates = data.exchangeRates;
        },
        async activated(){
             //request data
            const data = (await GetAllExchangeRates.getAllExchangeRates()).data
            this.exchangeRates = data.exchangeRates;
            window.location.reload();
        },
        methods:{
            ...mapActions(['setUserLoggedIn']),
            editEntry(id) {
                this.$router.push({path:`edit/${id}`})
            },
            async deleteEntry(id){
                var result = (await DeleteExchangeRate.deleteExchangeRate(id))
                const data = (await GetAllExchangeRates.getAllExchangeRates()).data
                this.exchangeRates = data.exchangeRates;
            }
        }   
    }
</script>

<style scoped>
    .rateList{
        text-align: center;
        overflow-y: auto;
    }
    .edit{
        color:blue;
    }
    .delete{
        color:red;
    }
    .edit,.delete{
        cursor: pointer;
    }
    .hidden{
        display: none;
    }
</style>
