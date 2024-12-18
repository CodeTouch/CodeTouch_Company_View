<script>
import editPW from './modal/editPW.vue';
import axios from 'axios';
import { useUserStore } from '@/Store/userLoginStore';
import { initializeIMP, certification } from "@/JavaScript/payment.js"; 

export default {
    data() {
        return {
            viewPWModal: false,
            activeTab: 'info', // 'info': 정보 수정, 'payment': 결제 내역
            userEmail: '',
            userName: '',
            userNickname: '',
            userPhone: '',
            selectedFile: null,
            selectedFileName: '',
            profileImage: '',
            receiptList: [],
        };
    },
    computed: {
        userStore() {
            return useUserStore();
        },
        viewPhoneNum(){
            return this.formatPhoneNumber(this.userStore.userData.userPhone);
        }
    },
    components: {
        editPW,
    },
    mounted() {
        initializeIMP();
        
        // Pinia 상태에서 사용자 정보 가져오기
        this.userName = this.userStore.userData.userName;
        this.userNickname = this.userStore.userData.userNickname;
        this.userEmail = this.userStore.userData.userEmail;
        this.userPhone = this.userStore.userData.userPhone;
        this.profileImage = this.userStore.userData.userImgURL;
        console.log(this.userStore.userData.userImgURL + "이미지 저장 확인");

        this.activeTab = this.$route.query.activeTab;

        axios.get(`http://192.168.5.10:8888/회사/회원/결제내역조회/${this.userStore.userData.userEmail}/${false}`,
                { withCredentials: true,
                //headers: {Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,}, 
                })
                .then(response => {
                    console.log("성공");
                    console.log(response);
                    this.receiptList = response.data;
                })
                .catch(error => {
                    console.log(error);
                    console.log("실패");
                });
    },
    methods: {
        formatPhoneNumber() {
            // 숫자만 남기기
            const phone = this.userPhone;
            const onlyNumbers = phone.replace(/\D/g, '');
            
            // 정규식을 이용한 폼 변환
            if (onlyNumbers.length <= 3) {
                return onlyNumbers; // 010
            } else if (onlyNumbers.length <= 7) {
                return onlyNumbers.replace(/(\d{3})(\d{1,4})/, '$1-$2'); // 010-5555
            } else {
                return onlyNumbers.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3'); // 010-5555-5555
            }
        },
        openModal() {
            this.viewPWModal = !this.viewPWModal;
        },
        switchTab(tabName) {
            this.activeTab = tabName; // 클릭한 탭의 이름으로 상태 변경
        },
        reAuth(e) {
            e.stopPropagation();
            certification(
                {
                    onSuccess: (response) => {
                        this.imp_uid = response.imp_uid;

                        axios.get(`http://192.168.5.10:8888/회사/패스/인증/${this.imp_uid}`, { withCredentials: true })
                        .then(response => {
                            const user = response.data.data;
                            this.userName = user.name;
                            this.userPhone = user.phone;
                        })
                        .catch(error => {
                            console.error(error);
                        });
                    },
                    onFailure: (response) => {
                        console.log("본인인증 실패");
                    }
                }
            );
        },
        submitForm(e) {
            e.stopPropagation();
            const formData = new FormData();
            if (this.selectedFile){
                    // 파일 확장자 체크
                    const fileExtension = this.selectedFileName.split('.').pop().toLowerCase(); // 확장자 추출
                    const allowedExtensions = ['jpg', 'png'];
                    if (!allowedExtensions.includes(fileExtension)) {
                        alert('파일 형식은 JPG 또는 PNG만 가능합니다.');
                        return; // 함수 종료
                    }

                formData.append('updateImageName', this.selectedFileName);
            }else{
                console.log(this.userStore.userData.userImgURL + "이미지 저장 확인");
                formData.append('updateImageName', this.userStore.userData.userImgURL);
            }
            formData.append('updateImage', this.selectedFile);
            formData.append('name', this.userName);
            formData.append('nickname', this.userNickname);
            formData.append('phone', this.userPhone);
            formData.append('email', this.userEmail);

            axios.post(`http://192.168.5.10:8888/회사/회원/개인정보수정`, formData, {   
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                console.log("성공");
                console.log(response);

                const userData = {
                                email: this.userEmail || "", 
                                name: this.userName || "",  
                                nickname: this.userNickname || "",
                                phone: this.userPhone || "",
                                img: response.data || this.userStore.userData.userImgURL,
                            };

                this.userStore.setUserData(userData);

                this.$router.push("/myPage");
            })
            .catch(error => {
                console.log("실패");
            });
        },
        selectImage() {
            this.$refs.fileInput.click();
        },
        handleImageUpload(e) {
            e.stopPropagation();
            const file = e.target.files[0];
            if (file) {
                this.selectedFile = file;
                this.selectedFileName = file.name;
                console.log(this.selectedFile);
                this.profileImage = URL.createObjectURL(file);
            }
        },
    },
};
</script>

<template>
    <div class="modal-overlay" v-if="viewPWModal">
        <editPW @close-modal="openModal"></editPW>
    </div>
    <div class="container">
        <!-- 페이지 타이틀 -->
        <h1 class="page-title">마이페이지</h1>

        <!-- 고정된 네비게이션 -->
        <nav class="nav-tabs">
            <div class="nav-tab" 
                 :class="{ active: activeTab === 'info' }" 
                 @click="switchTab('info')">
                정보수정
            </div>
            <div class="nav-tab" 
                 :class="{ active: activeTab === 'payment' }" 
                 @click="switchTab('payment')">
                결제내역
            </div>
        </nav>

        <!-- 콘텐츠 영역 -->
        <div class="tab-content">
            <!-- 정보 수정 -->
            <div v-if="activeTab === 'info'" class="tab-pane">
                <form @submit.prevent="submitForm">
                    <div class="profile-section" @click="selectImage">
                        <div class="profile-image">
                            <img :src="profileImage" class="profile-image">
                        </div>
                        <input type="file" ref="fileInput" @change="handleImageUpload" style="display: none;">
                        <div class="profile-name">{{ userEmail }}</div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">이메일</label>
                        <input type="email" class="form-input input-none" v-model="userEmail" readonly>
                    </div>


                    <div class="form-group">
                        <label class="form-label">이름</label>
                        <input type="text" class="form-input input-none" v-model="userName" readonly>
                    </div>

                    <div class="form-group">
                        <label class="form-label">닉네임</label>
                        <input type="text" class="form-input" v-model="userNickname">
                    </div>

                    <div class="form-group">
                        <label class="form-label">비밀번호</label>
                        <div class="input-group">
                            <input type="password" class="form-input input-none" placeholder="******" readonly>
                            <button type="button" class="verify-button" @click="openModal">변경</button>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">휴대폰번호</label>
                        <input type="tel" class="form-input input-none" v-model="viewPhoneNum">
                    </div>

                    <button type="button" class="reAuth-button" @click="reAuth">재 인증</button>

                    <div class="button-group">
                        <button type="submit" class="submit-button primary">변경사항 저장</button>
                        <router-link to="/myPage">
                            <button type="button" class="submit-button secondary">취소</button>
                        </router-link>
                    </div>
                </form>
            </div>

            <!-- 결제 내역 -->
            <div v-if="activeTab === 'payment'" class="tab-pane">
                <h2 class="section-title">이용중인 정기결제</h2>
                <div class="payment-card">
                    <p class="empty-text" v-if="!receiptList">정기결제 내역이 없습니다.</p>
                    
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

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #f5f6f8;
            color: #333;
            line-height: 1.5;
        }

.container {
    max-width: 800px; /* 중앙 정렬 */
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.page-title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
}

        /* 탭 네비게이션 */
        .nav-tabs {
    position: sticky; /* 상단 고정 */
    top: 0; /* 페이지 상단에 위치 */
    z-index: 100; /* 다른 요소 위에 표시 */
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    margin-bottom: 20px;
}

.nav-tab {
    flex: 1;
    text-align: center;
    font-size: 16px;
    padding: 10px 0;
    cursor: pointer;
    color: #666;
    transition: color 0.2s, border-bottom 0.2s;
}

.nav-tab.active {
    color: #333;
    font-weight: bold;
    border-bottom: 2px solid #333;
}

.tab-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.tab-pane {
    animation: fade-in 0.3s ease-in-out;
}

        /* 프로필 섹션 */
        .profile-section {
            text-align: center;
            margin-bottom: 40px;
        }

        .profile-image {
            width: 80px;
            height: 80px;
            background-color: #eee;
            border-radius: 50%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .profile-name {
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 8px;
        }

        /* 폼 스타일 */
        .form-group {
            margin-bottom: 24px;
        }

        .form-label {
            display: block;
            font-size: 14px;
            color: #666;
            margin-bottom: 8px;
        }

        .input-none{
            background: #F9ECFA ;
            pointer-events: none;
        }

        .form-input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }

        .form-input:focus {
            outline: none;
            border-color: #666;
        }

        .input-group {
            display: flex;
            gap: 8px;
        }

        .verify-button {
            padding: 12px 24px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            color: #333;
            cursor: pointer;
            white-space: nowrap;
        }

        .reAuth-button{
            padding: 12px 24px;
            width: 280px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            color: #333;
            cursor: pointer;
            white-space: nowrap;
        }

        /* 체크박스 스타일 */
        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 24px 0;
        }

        .checkbox-label {
            font-size: 14px;
            color: #666;
        }

        /* 버튼 스타일 */
        .button-group {
            display: flex;
            gap: 8px;
            margin-top: 40px;
        }

        .submit-button {
            flex: 1;
            padding: 14px;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
        }

        .submit-button.primary {
            background-color: #7C2D9F;
            color: white;
        }

        .submit-button.secondary {
            background-color: transparent;
            border: 1px solid #ddd;
            color: #666;
        }

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 최상단으로 설정 */
}

.nav-tab {
    cursor: pointer;
    transition: color 0.2s ease-in-out;
}

.nav-tab.active {
    color: #333;
    font-weight: bold;
}

</style>