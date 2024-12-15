<script>
import { useUserStore } from '@/Store/userLoginStore';
import payDetail from './child/payDetail.vue';
import axios from 'axios';

export default{
    data(){
        return{
            receiptList : [],
        }
    },
    components:{
        payDetail,
    },  
    mounted(){
        axios.get(`http://192.168.5.10:8888/회사/회원/결제내역조회/${this.userStore.userData.userEmail}`,
                { withCredentials: true,
                //headers: {Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,}, 
                })
                .then(response => {
                    console.log("성공");
                    this.receiptList = response.data;
                })
                .catch(error => {
                    console.log("실패");
                });
    },
    computed:{
        userStore() {
            return useUserStore(); 
        },
        userName() {
            return this.userStore.userData.userName;
        },
        userNickName() {
            return this.userStore.userData.userNickname;
        },
        userPhone() {
            return this.userStore.userData.userPhone;
        },
        userEmail() {
            return this.userStore.userData.userEmail;
        },
        userImage(){
            return this.userStore.userData.userImgURL;
        }
    }
}
</script>

<template>
    <div class="container">
        <!-- 정보수정 섹션 -->
        <div class="section-info">
            <div class="section-header">
                <h2>정보수정</h2>
                <router-link to="/editPage">
                    <button class="nav-button">수정하기</button>
                </router-link>
            </div>
            <div class="profile-section">
                <div class="profile-header">
                    <div class="profile-circle">
                        <img :src="userImage" class="profile-circle">
                    </div>
                    <div class="profile-info-inline">
                        <div class="nickname">{{userNickName}}</div>
                        <div class="email">{{userEmail}}</div>
                    </div>
                </div>
                <div class="homepage left-align">
                    {{userName}}<br />
                    {{userPhone}}<br />
                    홈페이지 주소
                </div>
            </div>
        </div>

        <!-- 결제내역 섹션 -->
        <div class="section">
            <div class="section-header">
                <h2>결제 내역</h2>
                    <button class="nav-button">더보기</button>
            </div>
            <div v-for="(receipt, index) in receiptList" :key="index">
                <payDetail :receipt="receipt" />
            </div>
            <div v-if="!receiptList">
                <h2 class="section-title">이용중인 정기결제</h2>
                <div class="payment-card">
                    <p class="empty-text">정기결제 내역이 없습니다.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

/* 공통 섹션 스타일 */
.section-info {
    background: white;
    border-radius: 8px;
    border: 1px solid #eee;
    padding: 24px;
    max-height: 300px;
}

.section {
    background: white;
    border-radius: 8px;
    border: 1px solid #eee;
    padding: 24px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.section-header h2 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
}

.nav-button {
    padding: 6px 12px;
    border: 1px solid #ddd;
    background-color: white;
    border-radius: 4px;
    font-size: 13px;
    color: #333;
    cursor: pointer;
}

/* 프로필 섹션 */
.profile-section {
    display: flex;
    flex-direction: column;
}

.profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
}

.profile-circle {
    width: 60px;
    height: 60px;
    background-color: #f0f0f0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.profile-circle span {
    font-size: 20px;
    color: #666;
}

.profile-info-inline {
    display: flex;
    flex-direction: column;
}

.nickname {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 4px;
}

.email {
    font-size: 14px;
    color: #666;
}

.homepage {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
}

.homepage.left-align {
    text-align: left;
}

/* 알림 섹션 */
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
