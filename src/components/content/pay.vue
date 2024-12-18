<script>
import axios from "axios";
import { initializeIMP, requestPayment } from "@/JavaScript/payment.js";
import { useUserStore } from "@/Store/userLoginStore";

export default {
  data(){
    return{
        selectedPeriod: '1',
        defaultPrice: 1,
        siteList: [],
        selectedSite: null,
    }
  },
    mounted() {
        initializeIMP();

        axios.get(`http://192.168.5.10:8888/고객/회원/사이트정보/${this.userStore.userData.userEmail}`,
        { withCredentials: true })
        .then(response => {
            console.log(response);
            this.siteList = response.data.SiteList || []; // 데이터 할당
            console.log(this.siteList);

            this.siteList.forEach(element => {
                if(element.siteId == this.$route.query.siteId){
                  this.selectedSite = element;
                }
                
            });
        })
        .catch(error => {
            console.log(error);
        });

    },
    computed:{
        userStore(){
          return useUserStore();
        },
        price() {
            if (this.selectedPeriod === "12") {
                // 12개월 선택 시 할인 적용
                const discountedPrice = 14000 * 12; // 12개월 동안 할인된 가격
                return discountedPrice.toLocaleString();
            } else {
                // 1개월 선택 시 기본 가격
                const totalPrice = this.defaultPrice * this.selectedPeriod;
                return totalPrice.toLocaleString();
            }
        },
        discount() {
            if (this.selectedPeriod === "12") {
                const originalPrice = this.defaultPrice * 12; // 원래 12개월 가격
                const discountedPrice = 14000 * 12; // 할인된 12개월 가격
                return (originalPrice - discountedPrice).toLocaleString(); // 할인된 금액
            }
            return "0"; // 할인 없음
        },
        nextPaymentDate() {
            const today = new Date();
            const nextDate = new Date(today); // 새로운 Date 객체 생성
        
            if (this.selectedPeriod === "1") {
                nextDate.setMonth(nextDate.getMonth() + 1); // 1개월 뒤
            } else if (this.selectedPeriod === "12") {
                nextDate.setMonth(nextDate.getMonth() + 12); // 12개월 뒤
            }
            
            return nextDate.toISOString().split("T")[0]; // yyyy-MM-dd 형식으로 반환
        },
    },
  methods: {
    onPayment:function(){
        requestPayment({
            name: "site_id",                                //결제 상품 이름
            amount: this.selectedPeriod === "12" ? 14000 * 12 : this.defaultPrice * this.selectedPeriod, // 상품 가격
            buyerEmail: this.userStore.userData.userEmail, // 구매자 이메일
            buyerName: "테스터",                            // 구매자 이름
            buyerTel: "010-1234-5678",                      // 구매자 전화번호
            onSuccess: (response) => {                      // 성공 이후 메서드
                console.log("결제 성공", response);
                // 성공 시 처리 로직 추가

                console.log(response.merchant_uid)

                const param = {
                    email: this.userStore.userData.userEmail,
                    siteId: this.selectedSite.siteId,
                    expiry: this.nextPaymentDate,
                    merchantId: response.merchant_uid,
                }

                axios.post(`http://192.168.5.10:8888/회사/회원/결제내역저장`, param,
                { withCredentials: true,
                //headers: {Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,}, 
                })
                .then(response => {
                    this.$router.push("/mySite");
                })
                .catch(error => {
                });

            },
            onFailure: (response) => {                      // 실패 이후 메서드
                console.error("결제 실패", response);
                // 실패 시 처리 로직 추가
            },
        })
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="left-column">
      <div class="payment-section">
        <h2>서비스 선택</h2>
        <div class="select-wrapper">
          <select v-model="selectedSite">
            <option v-for="(site, index) in siteList" :key="index" :value="site">
              {{ site.siteName }} 
            </option>
          </select>
        </div>

        <h2>서비스 기간</h2>
        <div class="radio-group">
          <label class="radio-item">
            <input type="radio" name="period" value="1" v-model="selectedPeriod" />
            <span>1개월</span>
            <span class="price">20,000원/월</span>
          </label>

          <label class="radio-item">
            <input type="radio" name="period" value="12" v-model="selectedPeriod" />
            <span>12개월</span>
            <span class="price">14,000원/월</span>
            <span class="discount">30% 할인</span>
          </label>
        </div>
      </div>
    </div>

    <div class="payment-details">
      <h2>결제상세</h2>
      <div class="details-row">
        <span>결제 금액</span>
        <span>{{ price }}원</span>
      </div>
      <div class="details-row">
        <span>부가서비스 금액</span>
        <span>0원</span>
      </div>
      <div class="details-row">
        <span>할인 금액</span>
        <span class="discount">-{{ discount }}원</span>
      </div>
      <div class="total-price">
        <span>총 결제금액</span>
        <span>{{ price }}원</span>
      </div>
      <div class="details-row">
        <span>다음 결제일</span>
        <span>{{ nextPaymentDate }}</span>
      </div>
      <button class="payment-button" @click="onPayment">결제하기</button>
      <p class="info-text">
        • 결제일 기준으로 결제기간 이후 재 결재하셔야 합니다.
      </p>
    </div>
  </div>
</template>

<style scoped>
    .container {
        height: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 20px;
        display: grid;
        grid-template-columns: 1fr 400px;
        gap: 24px;
    }
    .payment-section {
        background: white;
        border-radius: 8px;
        padding: 24px;
        margin-bottom: 16px;
    }
    .payment-details {
        background: white;
        border-radius: 8px;
        padding: 24px;
        position: sticky;
        top: 24px;
        height: fit-content;
    }
    h2 {
        font-size: 18px;
        margin-bottom: 20px;
    }
    .select-wrapper {
        margin-bottom: 24px;
    }
    select {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
    }
    .radio-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .radio-item {
        display: flex;
        align-items: center;
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
    }
    .radio-item:has(input:checked) {
        border-color: #007bff;
        background-color: #f8f9ff;
    }
    .radio-item input[type="radio"] {
        margin-right: 12px;
    }
    .price {
        margin-left: auto;
        font-weight: bold;
    }
    .discount {
        color: #dc3545;
        font-size: 12px;
        margin-left: 8px;
    }
    .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 24px;
    }
    .checkbox-item {
        display: flex;
        align-items: center;
    }
    .checkbox-item input[type="checkbox"] {
        margin-right: 12px;
    }
    .details-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        font-size: 14px;
    }
    .total-price {
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid #eee;
        font-weight: bold;
        font-size: 18px;
    }
    .payment-button {
        width: 100%;
        padding: 16px;
        background-color: #000;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        margin-top: 24px;
        cursor: pointer;
    }
    .payment-button:hover {
        background-color: #333;
    }
    .info-text {
        font-size: 12px;
        color: #666;
        margin-top: 12px;
    }
</style>