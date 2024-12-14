<script>
import editPW from './modal/editPW.vue';

export default{
    data(){
        return {
            userEmail: '',
            viewPWModal: '',
        }
    },
    components:{
        editPW,
    },
    mounted(){
        this.userEmail = localStorage.getItem('email');
    },
    methods:{
        editProfile(){


            axios.post(`http://192.168.5.10:8888/회사/회원/개인정보수정`, 
            requestData,
            { withCredentials: true }
            )
            .then(response => {
              if(response.status == 200){
                
              }
            })
            .catch(error => {
              console.error(error);
            });
        },
        openModal(){
            this.viewPWModal = !this.viewPWModal;
        }
    }
}


</script>
<template>
    <div class="modal-overlay" v-if="viewPWModal">
        <editPW></editPW>
    </div>
    <div class="container">
        <h1 class="page-title">마이페이지</h1>

        <nav class="nav-tabs">
            <a href="#" class="nav-tab active">정보수정</a>
            <a href="#" class="nav-tab">결제내역</a>
        </nav>

        <div class="profile-section">
            <div class="profile-image">
                😊
            </div>
            <div class="profile-name">{{userEmail}}</div>
        </div>

        <form>
            
            <div class="form-group">
                <label class="form-label">이름</label>
                <input type="text" class="form-input" placeholder="이름을 입력하세요">
            </div>

            <div class="form-group">
                <label class="form-label">이메일</label>
                <input type="email" class="form-input" :value="userEmail" readonly>
            </div>
            
            <div class="form-group">
                <label class="form-label">닉네임</label>
                <input type="text" class="form-input" value="닉네임">
            </div>

            <div class="form-group">
                <label class="form-label">비밀번호</label>
                <div class="input-group">
                    <input type="password" class="form-input" placeholder="******" readonly>
                    <button type="button" class="verify-button" @click="openModal">변경</button>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">휴대폰번호</label>
                <input type="tel" class="form-input" placeholder="01012345678">
            </div>

            <div class="button-group">
                <button type="submit" class="submit-button primary">변경사항 저장</button>
                <router-link to="/myPage">
                    <button type="button" class="submit-button secondary">취소</button>
                </router-link>
            </div>

        </form>
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
            max-width: 560px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .page-title {
            font-size: 24px;
            font-weight: 600;
            text-align: center;
            margin-bottom: 40px;
        }

        /* 탭 네비게이션 */
        .nav-tabs {
            display: flex;
            border-bottom: 1px solid #eee;
            margin-bottom: 40px;
        }

        .nav-tab {
            padding: 16px 24px;
            color: #666;
            text-decoration: none;
            font-size: 15px;
            position: relative;
        }

        .nav-tab.active {
            color: #333;
            font-weight: 500;
        }

        .nav-tab.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #333;
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
            margin: 0 auto 16px;
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
            background-color: #18171c;
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
}

</style>