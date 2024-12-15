<script>
import templates from './child/templates.vue';
import createSite from './modal/createSite.vue';

export default{
    data(){
        return {
            viewModal: false,
            templateId: 0,
        }
    },
    components:{
        createSite,
        templates,
    },
    computed:{
        isLogin(){
            if (localStorage.getItem('AuthToken')){
                return true;
            }else{
                return false;
            }
        }
    },
    methods:{
        closeModal(){
            this.viewModal = false;
        },
        openModal(templateId){
            this.templateId = templateId;
            this.viewModal = true;
        }
    }
}

</script>

<template>
    <div v-if="viewModal" class="modal-overlay">
        <div v-if="isLogin">
            <createSite @close="closeModal" :templateId="templateId"></createSite>
        </div>
        <div class="modal" v-if="!isLogin">
            <h2>로그인이 필요한 서비스입니다. 로그인 하시겠습니까?</h2>
            <button class="cancel-button" @click="closeModal()">취소</button>
            <router-link to="/login">
                <button class="move-button">로그인 이동</button>
            </router-link>
        </div>
    </div>

    <div class="container">
        <div class="header">
            <h1 class="title">사이트 개설</h1>
            <p class="subtitle">내 사이트에 사용할 템플릿을 선택해 주세요.</p>
            <button class="filter-button">
                전체보기 
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 9l6 6 6-6"/>
                </svg>
            </button>
        </div>

        <div class="template-grid" id="templateGrid">
            <templates @close="closeModal" @open="openModal"></templates>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 최상단으로 설정 */
}
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #f8f9fa;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
        }

        .title {
            font-size: 28px;
            font-weight: 600;
            color: #333;
            margin-bottom: 16px;
        }

        .subtitle {
            font-size: 16px;
            color: #666;
        }

        .filter-button {
            position: absolute;
            right: 20px;
            top: 20px;
            padding: 8px 16px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            color: #333;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
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
</style>