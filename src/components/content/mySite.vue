<script>
import SiteRow from "./child/siteElement.vue";
import axios from "axios";

export default {
    data(){
        return{
            viewModal: false,
            imageSrc: '',
            siteList: [],
        }
    },
    components:{
        SiteRow,
    },
    methods:{

    },
    mounted(){
        const storedImage = localStorage.getItem('image');
        if (storedImage) {
          this.imageSrc = `/images/${storedImage}`;
        }

        axios.get(`http://192.168.5.10:8888/고객/회원/사이트정보/${localStorage.getItem('email')}`,
            { withCredentials: true,
            //headers: {Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,}, 
            })
            .then(response => {
                this.siteList = response.data.SiteList || [];
            })
            .catch(error => {
            });
    }

}
</script>
<template>
    <div class="container">
        <div class="profile">
            <div class="profile-image">
            <router-link to="/myPage">
                <img class="profile-image" :src="imageSrc" alt="프로필 이미지">
                <div class="profile-image-settings">⚙️</div>
            </router-link>
            </div>
            <div class="profile-name">mysk423</div>
        </div>

        <table class="menu-table">
            <thead>
                <tr>
                    <td class="active">내사이트</td>
                    <td class="active">상태</td>
                    <td class="active">도구</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(site, index) in siteList" :key="index">
                    <td colspan="3">
                        <SiteRow :site="site" />
                    </td>
                </tr>
            </tbody>
        </table>
        <router-link to="/template">
            <button class="create-site-button">무료 사이트 개설</button>
        </router-link>
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



</style>