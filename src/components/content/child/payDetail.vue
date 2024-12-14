<template>
   <div class="notification-section">
       <div class="notification-item">
           <span>사이트 노내일</span>
           <button class="confirm-button">확인중</button>
       </div>
       <div class="notification-item">요금제가 곧 만료됩니다.</div>
       <div class="notification-item">결제수단 정보가 필요합니다.</div>
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