<script>
export default{
    data(){
        return {

        }
    },
    props:{
        receipt:Object,
    },
    computed:{

    }
}
</script>

<template>
   <div class="notification-section">
       <div class="notification-item">
           <span>{{  receipt.siteName  }}</span>
           <button class="confirm-button">{{ receipt.payState }}</button>
       </div>
       <div class="notification-item">{{ receipt.expiry }}</div>
       <div class="notification-item">{{ receipt.amount }}</div>
       <div class="notification-item">{{ receipt.payMethod }}, {{ receipt.createAt }} </div> 
   </div>
</template>
<style scoped>
.notification-section {
    padding: 24px;
    background: white;
    border-radius: 8px;
    border: 1px solid #eee;
}

.notification-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #eee;
}

.notification-item:last-child {
    border-bottom: none;
}

.confirm-button {
    padding: 4px 12px;
    background-color: #f5f5f5;
    border: none;
    border-radius: 12px;
    font-size: 12px;
    color: #666;
}
</style>