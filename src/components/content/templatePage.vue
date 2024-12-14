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
        <createSite @close="closeModal" :templateId="templateId"></createSite>
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
</style>