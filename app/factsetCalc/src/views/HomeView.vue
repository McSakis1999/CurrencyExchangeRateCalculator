<script setup>
    import calculator from '../components/calculator.vue'
    import currencyList from '../components/currencyList.vue'
</script>

<template>
  <main>
    <div class="calcWrapper">
   <div class="left-cont">
    <h2>Currency Exchange Rate Calculator</h2>
    <br/>
    <calculator/>
    <!-- side 1-->
   </div>
   <div class="right-cont">
        <h2>Currency Exchange Rate List</h2>
        <br/>
        <currencyList/>
    </div>
</div>

  </main>
</template>

<style>
    .calcWrapper{
        display: flex;
        width:100%;
        height:85vh;
    }
    h2{
        padding: 0 1rem;
    }
    .left-cont{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width:50%;
        color:#f1f3f5;
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
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .right-cont::-webkit-scrollbar{
        display: none;
    }


    @media (max-width: 1050px) {
        *{
            font-size:14px;
        }
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
          border-radius:1rem 1rem 0 0;
          overflow-y: auto;
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