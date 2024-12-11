<script>
import createSite from "@/components/content/modal/createSite.vue";

export default {
    data(){
        return{
            viewModal: false,
            imageSrc: '',
        }
    },
    components:{
        createSite,
    },
    methods:{
        closeModal(){
            this.viewModal = false;
        },
        openModal(){
            this.viewModal = true;
        }
    },
    mounted(){
        const storedImage = localStorage.getItem('image');
        if (storedImage) {
          this.imageSrc = `/images/${storedImage}`;
        }
    }

}
</script>
<template>
    <div v-if="viewModal" class="modal-overlay">
        <createSite @close="closeModal"></createSite>
    </div>
        <div class="container">
        <div class="profile">
            <div class="profile-image">
                <img class="profile-image" :src="imageSrc">
                <div class="profile-image-settings">⚙️</div>
            </div>
            <div class="profile-name">mysk423</div>
        </div>

        <table class="menu-table">
            <tr>
                <td class="active">내사이트</td>
                <td>상태</td>
                <td>도구</td>
            </tr>
        </table>

        <div class="content-row">
            <div class="content-cell">
                <div class="site-info">
                    <div class="site-header">
                        <span class="site-name">mysk423님의 웹사이트</span>
                        <span class="badge">Free</span>
                    </div>
                    <a href="https://mysk4239030.imweb.me" class="site-url">https://mysk4239030.imweb.me</a>
                </div>
            </div>
            <div class="content-cell">
                <div class="status-buttons">
                    <button class="status-button">무료버전</button>
                    <button class="status-button active">연장/업그레이드</button>
                </div>
            </div>
            <div class="content-cell">
                <div class="tool-buttons">
                    <button class="tool-button outline">관리</button>
                    <button class="tool-button dark">더보기</button>
                </div>
            </div>
        </div>

        <button class="create-site-button" @click="openModal">무료 사이트 개설</button>
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
    background-color: #fff;
    color: #333;
    margin: 0;
    display: flex; /* Flexbox 사용 */
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    min-height: 100vh; /* 화면 전체 높이 */
}

.container {
    max-width: 800px; /* 적절한 너비 설정 */
    width: 100%;
    padding: 20px;
    display: flex; /* Flexbox 사용 */
    flex-direction: column; /* 세로 정렬 */
    align-items: center; /* 컨텐츠 수평 가운데 정렬 */
    text-align: center; /* 텍스트 가운데 정렬 */
}

.status-buttons {
    display: flex;
    flex-direction: column; /* 세로 정렬 */
    gap: 10px; /* 버튼 간 간격 */
    align-items: center; /* 수평 가운데 정렬 */
    justify-content: center; /* 세로 가운데 정렬 */
    height: 100%; /* 부모 높이에 맞추기 */
}

.tool-buttons {
    display: flex;
    flex-direction: row; /* 가로 정렬 */
    gap: 10px; /* 버튼 간 간격 */
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
}
        /* 프로필 섹션 */
        .profile {
            text-align: center;
            margin-bottom: 40px;
        }

        .profile-image {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: #f0f0f0;
            margin: 0 auto 16px;
            position: relative;
        }

        .profile-image-settings {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 20px;
            height: 20px;
            background-color: #f0f0f0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .profile-name {
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 20px;
        }

        /* 메뉴 테이블 */
        .menu-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            table-layout: fixed;
        }

        .menu-table td {
            text-align: center;
            padding: 15px;
            border-bottom: 1px solid #eee;
            font-size: 14px;
            color: #666;
        }

        .menu-table td.active {
            color: #333;
            font-weight: 500;
            border-bottom: 2px solid #333;
        }

        /* 콘텐츠 영역 */
        .content-row {
            display: flex;
            width: 100%;
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
        }

        .content-cell {
    flex: 1;
    padding: 0 20px;
    display: flex; /* Flexbox 사용 */
    justify-content: center; /* 가로 가운데 정렬 */
    align-items: center; /* 세로 가운데 정렬 */
    flex-direction: column; /* 세로 정렬 */
    text-align: center; /* 텍스트 정렬 */
    height: 100%; /* 부모 높이에 맞추기 */
}

        .site-info {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .site-header {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .site-name {
            font-size: 16px;
            font-weight: 500;
        }

        .badge {
            font-size: 12px;
            padding: 2px 6px;
            border-radius: 4px;
            background-color: #f5f5f5;
            color: #666;
        }

        .site-url {
            color: #666;
            font-size: 14px;
            text-decoration: none;
        }

        .status-button {
            width: 130px;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 13px;
            border: 1px solid #ddd;
            background-color: #fff;
            color: #666;
            cursor: pointer;
        }

        .status-button.active {
            background-color: #ff5a5f;
            border-color: #ff5a5f;
            color: white;
        }

        .create-site-button {
            display: block;
            width: 500px;
            padding: 15px;
            background-color: #18171c;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            text-align: center;
            margin-top: 20px;
        }

        .tool-button {
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 13px;
            cursor: pointer;
        }

        .tool-button.outline {
            border: 1px solid #ddd;
            background-color: #fff;
            color: #333;
        }

        .tool-button.dark {
            background-color: #18171c;
            color: white;
            border: none;
        }
</style>