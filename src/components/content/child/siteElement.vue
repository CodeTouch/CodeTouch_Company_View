<template>
    <div class="content-row">
        <div class="content-cell">
            <div class="site-info">
                <div class="site-header">
                    <span class="site-name">{{ site.siteName }}</span>
                    <span class="badge">{{ site.status }}</span>
                </div>
            </div>
        </div>
        <div class="content-cell">
            <div class="status-buttons">
                <div class="status-label">무료버전</div>
                <button class="status-button active">연장/업그레이드</button>
            </div>
        </div>
        <div class="content-cell">
            <div class="tool-buttons">
                <button class="tool-button outline">관리</button>
                <button class="tool-button dark" @click="toggleDropdown">더보기</button>
                <div v-if="showDropdown" class="dropdown-menu">
                    <div class="menu-item">사이트 관리</div>
                    <div class="menu-item">디자인 모드</div>
                    <div class="divider"></div>
                    <div class="menu-item">템플릿 변경</div>
                    <div class="divider"></div>
                    <div class="menu-item danger" @click="deleteSite">사이트 삭제</div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { useUserStore } from '@/Store/userLoginStore';
import axios from 'axios';

export default {
    name: "SiteRow",
    props: {
        site: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showDropdown: false, // 드롭다운 메뉴 상태
        };
    },
    computed:{
      userStore(){
        return useUserStore();
      }
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown; // 드롭다운 토글
        },
        deleteSite(){
          //const userEmail = this.userStore.userEmail;
          const userEmail = localStorage.getItem('email');
          console.log(userEmail);
          console.log(this.site.siteId);

          axios.delete(`http://192.168.5.10:8888/고객/회원/사이트삭제/${userEmail}/${this.site.siteId}`,
                    { withCredentials: true }
                )
                .then(response => {
                  console.log("성공");
                })
                .catch(error => {
                });
        }
    }
};
</script>


<style scoped>
.tool-buttons {
  position: relative; /* 드롭다운 메뉴가 부모 위치를 기준으로 배치됨 */
}

.dropdown-menu {
  position: absolute;
  top: 100%; /* 버튼 아래로 배치 */
  left: 0;
  margin-top: 8px;
  width: 160px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
}

.menu-item {
  padding: 12px 16px;
  font-size: 10px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item.danger {
  color: #ff4444;
}

.menu-item.danger:hover {
  background-color: #fff5f5;
}

.divider {
  height: 1px;
  background-color: #eee;
  margin: 4px 0;
}

.status-label {
  width: 130px; /* 버튼과 동일한 가로 크기 */
  padding: 10px 20px;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  color: #333;
  background-color: transparent; /* 배경 투명 */
  border: none; /* 테두리 없음 */
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
  padding-right: 130px;
}

.site-header {
  display: flex;
  align-items: center;
  
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
.status-button {
  width: 130px;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.3s ease-in-out;
}

.status-button {
  background-color: #f0f0f0;
  color: #333;
}

.status-button:hover {
  background-color: #e6e6e6;
  color: #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status-button.active {
  background-color: #007bff;
  color: white;
  border: 1px solid #007bff;
}

.status-button.active:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.tool-button {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.3s ease-in-out;
}

.tool-button.outline {
  background-color: #fff;
  color: #333;
  border: 1px solid #ddd;
}

.tool-button.outline:hover {
  background-color: #f0f0f0;
  color: #000;
}

.tool-button.dark {
  background-color: #18171c;
  color: white;
  border: none;
}

.tool-button.dark:hover {
  background-color: #000;
}


</style>
