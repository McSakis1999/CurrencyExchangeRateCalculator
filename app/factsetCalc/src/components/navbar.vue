<template>
     <header class="header">
        <h4 @click="()=>{ this.$router.push('/')}" class="homeBtn">MitsikostasTech</h4>
        <div v-if="this.userLoggedIn===false" class="navActionBtns">
          <button @click="()=>{ this.$router.push('/login')}" class="btn btn-outline-primary" type="button">Login</button>
          <button @click="()=>{ this.$router.push('/signup')}" type="button" class="btn btn-outline-secondary">Sign up</button>
        </div>
        <button v-if="this.userLoggedIn===true" v-on:click="logOut()" class="btn btn-outline-primary" type="button">LogOut</button>
    </header>
</template> 

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
  ...mapGetters(['userLoggedIn']),
  },
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    ...mapActions(['setUserLoggedIn']),
  
    logOut(){
      //Set state/session variable userLoggedIn to true
      this.setUserLoggedIn(false);
      this.$router.push('/')
    }
  }
  }
</script>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:15vh;
    line-height: 1.5;
    width:100%;
    padding: 0.5rem 1.5rem;
  }
  .homeBtn{
    padding: 1rem;
    color: #f1f3f5;
    border: 1px solid #f1f3f5;
    border-radius: 1rem 0 0 0 ;
    cursor: pointer;
  }
  .homeBtn:hover,.header .btn:hover{
    color: #212f43;
    background-color: #f1f3f5;;
    border:1px solid #212f43;
  }
  .navActionBtns{
    display: flex;
    width:auto;
  }
  .header .btn{
    width:8rem;
    margin: 0 0.5rem;
    color:#f1f3f5;
    border-color: #f1f3f5;
  }
  .loginBtn{
    height: fit-content;
    width: 6rem;
    color: #f1f3f5;
    border-color: #f1f3f5;
  }
  
  @media (max-width: 1050px) {
    *{
      font-size: 14px;
    }
    .header {
      height:10vh;
      padding: 0.5rem 1.5rem;
    }
    .homeBtn{
      padding: 0.6rem;
      color: #f1f3f5;
      border: 1px solid #f1f3f5;
      border-radius: 1rem 0 0 0 ;
      cursor: pointer;
      font-size: medium;
    }
    .navActionBtns {
      flex-direction: column;
      justify-content: space-evenly;
      width: min-content;
      height: 100%;
    }
    .header .btn{
      min-width: max-content;
      width: auto;
      padding: 0.1rem 1rem;
    }
  }
</style>