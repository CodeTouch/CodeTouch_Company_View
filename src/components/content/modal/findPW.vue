<script>
import axios from 'axios';
const { IMP } = window;       

export default{
    data(){
        return{
            password: '',
            passwordError: '',
            checkPassword: '',
            checkPasswordError: '',
        }
    },
    props:{
        findId: String,
    },
    mounted() {
        if(IMP){
            IMP.init("imp22383085"); // 결제 대행사에서 발급받은 아이디
        }else{
            console.log("SDK 로드 안됨.");
        }
    },
    methods: {
        validatePassword() {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
            if (!this.password) {
                this.passwordError = "비밀번호를 입력해주세요.";
            } else if (!passwordRegex.test(this.password)) {
                this.passwordError = "비밀번호는 6자리 이상, 숫자와 영어 조합이어야 합니다.";
            } else {
                this.passwordError = null;
            }
        },
        confirmPassword(){
          if (this.password != this.checkPassword){
            this.checkPasswordError = "비밀번호가 일치하지 않습니다.";
          } else {
                this.checkPasswordError = null;
          }
        },

        submitForm() {
        // 폼 검증
        this.validatePassword();
        this.confirmPassword();

        if (this.passwordError || this.checkPasswordError) {
            alert('폼을 올바르게 작성해주세요.');
            return;
        }

        const requestData = {
            "email": this.findId,
            "password": this.password
        };

        console.log(requestData);

        axios.post(`http://192.168.5.10:8888/회사/회원/비번재설정`, 
        requestData,
        { withCredentials: true }
        )
            .then(response => {
                if(response.status == 200){
                    this.$router.push('/login');
                }
            })
            .catch(error => {
                console.error(error);
            });
        },
    }
}

</script>
<template>
    <div class="wrapper">
        <div class="container">
            <div class="lock-icon">
                <svg viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
                </svg>
            </div>
            <h1 class="title">비밀번호를 재설정해 주세요</h1>
            
            <form @submit.prevent="submitForm">
                <div class="input-group">
                    <label class="input-label">새 비밀번호</label>
                    <input 
                        class="input-field" 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="비밀번호를 입력하세요" 
                        @blur="validatePassword"
                        :class="{ 'invalid': passwordError }" 
                        v-model="password"
                        required>

                        <span v-if="passwordError" class="error">{{ passwordError }}</span>
                </div>

                <div class="input-group">
                    <label class="input-label">새 비밀번호 확인</label>
                    <input 
                        class="input-field" 
                        type="password" 
                        id="confirm-password" 
                        name="confirm-password" 
                        placeholder="비밀번호를 다시 입력하세요" 
                        v-model="checkPassword"
                        @blur="confirmPassword"
                        required>

                        <span v-if="checkPasswordError" class="error">{{ checkPasswordError }}</span>
                </div>

                <div class="checkbox-group">
                    <input type="checkbox" id="owner-password" class="checkbox-input">
                    <label for="owner-password" class="checkbox-label">
                        내 사이트의 소유자 비밀번호도 변경
                    </label>
                </div>

                <button type="submit" class="submit-button">비밀번호 변경</button>
            </form>
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
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #f5f5f5; /* 흰 박스 외부 배경색 */
    }

    .wrapper {
        background-color: #fff; /* 전체 박스 배경 */
        border-radius: 8px; /* 둥근 모서리 */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
        padding: 40px;
        width: 100%;
        max-width: 500px;
    }

    .container {
        text-align: center;
    }

    .lock-icon {
        width: 48px;
        height: 48px;
        margin: 0 auto 16px; /* 자동으로 가운데 정렬 */
    }

    .lock-icon svg {
        width: 100%;
        height: 100%;
        fill: #00c4ff;
    }

    .title {
        font-size: 18px;
        color: #333;
        margin-bottom: 32px;
        font-weight: 500;
    }

    .input-group {
        margin-bottom: 24px;
    }

    .input-label {
        display: block;
        text-align: left;
        font-size: 14px;
        color: #333;
        margin-bottom: 8px;
    }

    .input-field {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
    }

    .input-field::placeholder {
        color: #999;
    }

    .checkbox-group {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
    }

    .checkbox-input {
        margin-right: 8px;
    }

    .checkbox-label {
        font-size: 14px;
        color: #333;
    }

    .submit-button {
        width: 100%;
        padding: 14px;
        background-color: #18171c;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
    }

    .submit-button:hover {
        background-color: #000;
    }
</style>
