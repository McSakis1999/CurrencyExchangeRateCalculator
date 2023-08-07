<template>
    <main>
        <div class="calcWrapper">
            <div class="left-cont">
                <h2>Currency Exchange Rate Calculator</h2>
                <br/>
                <!-- side 1-->
            </div>
            <div class="right-cont">
                <div class="loginFormCont">
                    <form class="loginForm" @submit.prevent="login">
                        <div>
                            <label for="username">Username:</label>
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" id="username" v-model="username" required>
                        </div>
                        <div>
                        <label for="password">Password:</label>
                        <input type="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" id="password" v-model="password" required>
                        </div>
                        <section class="actionBtns">
                            <button class="btn btn-primary" type="submit">Login</button>
                            <button @click="navToRegister" type="button" class="btn btn-secondary">Sign up</button>
                        </section>
                        <p v-if="error">{{ error }}</p>
                    </form>
                </div>  
            </div>
        </div>

  </main>
  </template>
  
  <script>
  import CheckUserCredentials from '../services/checkUserCredentials.js'
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
      login() {
        const userData = {
          username: this.username,
          password: this.password
        };

        CheckUserCredentials.checkUserCredentials(userData)
          .then((response) => {
            const data = response.data;
            if (data.user) {
              this.error = '';
              alert('Login successful!');

              //Set state/session variable userLoggedIn to true
              this.setUserLoggedIn(true);    
              // You can redirect to another page here or perform other actions after successful login
              this.$router.push('/');
            } else {
              this.error = data.message;
            }
          })
          .catch((error) => {
            this.error = 'Error occurred while logging in';
          });
      },
      navToRegister(){
        console.warn(this.userLoggedIn);
        this.$router.push('/signup');
      }
    }
  };
  </script>
  
  <style scoped>
  .calcWrapper{
        display: flex;
        width:100%;
        height:85vh;
    }
    .left-cont{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width:50%;
        color:#f1f3f5;
    }
    h2{
        padding: 0 1rem;
    }
    .right-cont{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width:50%;
        background:white;
        color:#212f43;
        border-radius:1rem 0 0 0;
        overflow-y: auto;
    }
    .loginFormCont{
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        height: 100%;
        width: 100%;
    }
    .loginForm{
        display: flex;
        flex-direction: column;
        gap: 2  rem;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    .loginForm div{
        width: 50%;
    }
    .loginForm input{
        margin: 1rem 0;
    }
    .loginForm button{
        width: 8rem;
    }
    .loginForm p{
        padding: 1rem;
        color: red;
    }
    .actionBtns{
        display: flex;
        justify-content: space-evenly;
        width: 50%;
        margin: 1rem 0;
    }
    @media (max-width: 1050px) {
        .calcWrapper{
            flex-direction: column;
            align-items: center;
            gap:2rem;
            height: 90vh;
        }
        .left-cont{
            justify-content: start;
            width:100%;
            height: auto;
        }   
        .right-cont{
          justify-content: flex-start;
          align-items: center;
          width:80%;
          height: 70%;
          padding:1rem;
          border-radius:1rem;
          overflow-y: auto;
        }
        .actionBtns {
            flex-direction: column;
            align-items: center;
            width: 100%;
            gap: 1rem;
        }
    }

    @media (max-width: 450px) {
        h2{
            font-size: medium;
        }
        .calcWrapper{
            font-size:5px;
        }
        .left-cont{justify-content: start;}
        .right-cont{
            height: 100%;
        }
    }
  </style>