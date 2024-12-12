<script>
import axios from 'axios';

export default{
    data(){
        return{
            
        }
    },
    computed:{
        modal(){
            return document.getElementById("customModal");
        }
    },
    methods:{
        checkSite(){
            axios.get(`http://192.168.5.10:8888/고객/회원/사이트정보/${localStorage.getItem('UserEmail')}`,
            { withCredentials: true,
            //headers: {Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,}, 
            })
            .then(response => {
                const siteList = response.data.SiteList;
                if(siteList){

                    localStorage.setItem('siteList', JSON.stringify(siteList));
           
                    this.$router.push("/pay");
                }else{
                    this.openModal();
                }
            })
            .catch(error => {
                this.openModal();
            });
        },
        openModal(){
            this.modal.classList.add("active");
        },
        closeModal(){
            this.modal.classList.remove("active");
        },
        moveToPage(){
            this.$router.push("/");
        }
    }
}
</script>
<template>
    <div class="modal-overlay" id="customModal">
        <div class="modal">
            <h2>생성된 사이트가 없습니다. 생성하시겠습니까?</h2>
            <button class="cancel-button" @click="closeModal()">취소</button>
            <button class="move-button" @click="moveToPage()">이동하기</button>
        </div>
    </div>

    <div class="container">
        <h1>요금제 비교</h1>
        <div class="pricing-plans">
            <div class="plan free">
                <h2>Free 요금제</h2>
                <p class="price">₩0 / 월</p>
                <ul>
                    <li>기본 기능 사용 가능</li>
                    <li>1GB 저장 공간</li>
                    <li>이메일 지원</li>
                    <li>광고 포함</li>
                </ul>
                <div class="plan-footer">
                    <button>무료로 시작하기</button>
                </div>
            </div>
            <div class="plan pro">
                <h2>Pro 요금제</h2>
                <p class="price">₩9,900 / 월</p>
                <ul>
                    <li>모든 기능 사용 가능</li>
                    <li>무제한 저장 공간</li>
                    <li>24/7 고객 지원</li>
                    <li>광고 없음</li>
                    <li>고급 분석 도구</li>
                    <li>맞춤형 보고서</li>
                </ul>
                <div class="plan-footer">
                    <button @click="checkSite">Pro로 업그레이드</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
        /* 모달의 배경 */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        /* 모달이 활성화될 때 스타일 */
        .modal-overlay.active {
            visibility: visible;
            opacity: 1;
        }

        /* 모달 박스 */
        .modal {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 300px;
        }

        .modal h2 {
            margin-bottom: 20px;
        }

        .modal button {
            padding: 10px 20px;
            margin: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }

        .modal .cancel-button {
            background-color: #f0f0f0;
            color: #333;
        }

        .modal .cancel-button:hover {
            background-color: #e0e0e0;
        }

        .modal .move-button {
            background-color: #007bff;
            color: white;
        }

        .modal .move-button:hover {
            background-color: #0056b3;
        }

.container {
    width: 100%;
    margin: auto;
    overflow: hidden;
    padding: 20px;
}

h1 {
    text-align: center;
    color: #333;
}

.pricing-plans {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

.plan {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    width: 500px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* 상단과 하단의 콘텐츠를 공간 분배 */
}

.plan h2 {
    text-align: center;
    color: #333;
}

.price {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 10px;
    padding-left: 20px;
    position: relative;
}

li::before {
    content: "✓";
    color: #4CAF50;
    position: absolute;
    left: 0;
}

.plan-footer {
    margin-top: auto; /* 버튼을 하단으로 밀기 */
}

button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #45a049;
}

.pro {
    background-color: #e6f2ff;
    border: 2px solid #3498db;
}

.pro h2, .pro .price {
    color: #3498db;
}

.pro button {
    background-color: #3498db;
}

.pro button:hover {
    background-color: #2980b9;
}

</style>