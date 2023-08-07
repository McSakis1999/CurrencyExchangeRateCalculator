<template>
     <div class="calcWrapper">
        <div class="left-cont">
            <h2>Add New Currency</h2>
            <br/>
            <addCurrency/>
            <!-- side 1-->
        </div>
        <div class="right-cont">
            <h2>Edit or Delete Currency</h2>
            <br/>
           <editCurrency/>
    </div>
</div>
</template>
<script setup>
    import addCurrency from '../components/addCurrency.vue'
    import editCurrency from '../components/editCurrency.vue'
</script>
<style scoped>
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
            font-size: 14px;
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