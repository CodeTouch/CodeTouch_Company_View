<script>
import axios from 'axios';

export default{
    data(){
        return{
            password: '',
            passwordError: '',
            newPassword: '',
            newPasswordError: '',
            checkPassword: '',
            checkPasswordError: '',
            inputPass: false,
        }
    },
    methods: {
        validatePassword(){
            const requestData = {
                "email": localStorage.getItem('email'),
                "password": this.password,
            }

            axios.post(`http://192.168.5.10:8888/회사/회원/비밀번호확인`, 
            requestData,
            { withCredentials: true }
            )
            .then(response => {
                if(response.status == 200){
                    this.inputPass = true;
                }
            })
            .catch(error => {
                this.passwordError = "비밀번호가 일치하지 않습니다.";
            });
        },
        validateNewPassword() {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
            if (!this.newPassword) {
                this.newPasswordError = "비밀번호를 입력해주세요.";
            } else if (!passwordRegex.test(this.newPassword)) {
                this.newPasswordError = "비밀번호는 6자리 이상, 숫자와 영어 조합이어야 합니다.";
            } else {
                this.newPasswordError = null;
            }
        },
        confirmPassword(){
          if (this.newPassword != this.checkPassword){
            this.checkPasswordError = "비밀번호가 일치하지 않습니다.";
          } else {
                this.checkPasswordError = null;
          }
        },

        submitForm() {
        // 폼 검증
        this.validatePassword();
        this.confirmPassword();

        if (this.passwordError || this.checkPasswordError || this.inputPass) {
            alert('폼을 올바르게 작성해주세요.');
            return;
        }

        const requestData = {
            "email": localStorage.getItem('email'),
            "password": this.newPassword
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
        <h1 class="title">새 비밀번호를 입력해 주세요</h1>
        
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label class="form-label">현재 비밀번호</label>
                <input 
                    type="password" 
                    class="form-input" 
                    placeholder="영문,숫자,특수문자가 모두 들어간 8-20자"
                    v-model="password"
                    @blur="validatePassword"
                >
                <span v-if="passwordError" class="error-text">{{ passwordError }}</span>
            </div>

            <div class="form-group">
                <label class="form-label">새 비밀번호</label>
                <input 
                    type="password" 
                    class="form-input" 
                    placeholder="영문,숫자,특수문자가 모두 들어간 8-20자"
                    v-model="newPassword"
                    @blur="validateNewPassword"
                >
                <span v-if="newPasswordError" class="error-text">{{ newPasswordError }}</span>
            </div>

            <div class="form-group">
                <label class="form-label">비밀번호를 한 번 더 입력해 주세요</label>
                <input 
                    type="password" 
                    class="form-input" 
                    placeholder="비밀번호를 한 번 더 입력해 주세요"
                    v-model="checkPassword"
                    @blur="confirmPassword"
                >
                <span v-if="checkPasswordError" class="error-text">{{ checkPasswordError }}</span>
            </div>

            <div class="checkbox-group">
                <input type="checkbox" id="owner-password">
                <label for="owner-password" class="checkbox-label">
                    내 사이트의 소유자 비밀번호도 변경
                </label>
            </div>

            <div class="button-group">
                <button type="button" class="button secondary">닫기</button>
                <button type="submit" class="button primary">비밀번호 변경</button>
            </div>
        </form>
    </div>
</div>
</template>

<style scoped>
    .wrapper {
        background-color: #fff; /* 전체 박스 배경 */
        border-radius: 8px; /* 둥근 모서리 */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
        padding: 40px;
        width: 100%;
        max-width: 500px;
    }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #fff;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            padding: 40px 20px;
        }

        .container {
            width: 100%;
            max-width: 400px;
        }

        .title {
            font-size: 20px;
            font-weight: 600;
            color: #333;
            margin-bottom: 32px;
        }

        .form-group {
            margin-bottom: 24px;
        }

        .form-label {
            display: block;
            font-size: 14px;
            color: #333;
            margin-bottom: 8px;
        }

        .form-input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }

        .form-input::placeholder {
            color: #999;
        }

        .form-input:focus {
            outline: none;
            border-color: #666;
        }

        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 24px 0;
        }

        .checkbox-label {
            font-size: 14px;
            color: #333;
        }

        .button-group {
            display: flex;
            gap: 8px;
        }

        .button {
            flex: 1;
            padding: 14px;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
        }

        .button.primary {
            background-color: #18171c;
            color: white;
        }

        .button.secondary {
            background-color: transparent;
            border: 1px solid #ddd;
            color: #666;
        }

        .error-text {
            color: #ff4444;
            font-size: 12px;
            margin-top: 4px;
        }
</style>
