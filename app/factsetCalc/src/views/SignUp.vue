<template>
    <div class="calcWrapper">
            <div class="left-cont">
                <h2>Currency Exchange Rate Calculator</h2>
                <br/>
                <!-- side 1-->
            </div>
            <div class="right-cont">
                <div class="loginFormCont">
                  <form class="loginForm" @submit.prevent="signup">
                    <div>
                    <label for="username">Username:</label>
                    <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" id="username" v-model="username" required>
                  </div>
                  <div>
                    <label for="password">Password:</label>
                    <input type="password" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" id="password" v-model="password" required>
                  </div>
                  <div>
                    <label for="confirmPassword">Confirm Password:</label>
                    <input type="password" class="form-control" placeholder="Confirm Password" aria-label="Username" aria-describedby="basic-addon1" id="confirmPassword" v-model="confirmPassword" required>
                  </div>
                  <section class="actionBtns">
                    <button class="btn btn-primary" type="submit">Sign Up</button>
                    <button @click="navToLogin" type="button" class="btn btn-secondary">Log In</button>
                  </section>
                  <p v-if="error">{{ error }}</p>
                  </form>
                </div>  
            </div>
        </div>
  </template>
  
  <script>
  import axios from 'axios'
  import AddUser from '../services/addUser'
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: '',
        error: ''
      };
    },
    methods: {
      signup() {
        if (this.password !== this.confirmPassword) {
          this.error = 'Passwords do not match';
          return;
        }
  
        const userData = {
          username: this.username,
          password: this.password
        };
 
        // Make a POST request using axios (you can use other libraries like fetch or jQuery)
        AddUser.addUser(userData)
          .then((response) => {
            const data = response.data;
            if (data.data.username) {
              this.error = '';
              alert('Sign up successful! You can now log in.');
              this.$router.push('login');
              // You can redirect to the login page or perform other actions after successful sign up
            } else {
              this.error = data.data.message;
            }
          })
          .catch((error) => {
            this.error = 'Error occurred while signing up';
          });
      },
      navToLogin() {
        this.$router.push('/login');
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