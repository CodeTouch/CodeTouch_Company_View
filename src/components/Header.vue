<script>
export default{
  data() {
        return {
          showlogin: true,
          showDropdown: false,
          userEmail: localStorage.getItem('UserEmail'),
          imageSrc: ''
        };
    },
    mounted(){
        const token = localStorage.getItem("AuthToken");
        if(token){
          this.showlogin = false;
        }else{
          this.showlogin = true;
        }
        const storedImage = localStorage.getItem('image');
        if (storedImage) {
          this.imageSrc = `/images/${storedImage}`;
        }

    },
    methods: {
      toggleDropdown(){
        this.showDropdown = !this.showDropdown;
      },
      handleClickOutside(e){
        const dropdown = document.querySelector('.profile-dropdown');
        const loginCircle = document.querySelector('.login-circle');
        if(dropdown && !dropdown.contains(e.target) && !loginCircle.contains(e.target)){
          this.showDropdown = false;
        }
      },
      logout(){
        localStorage.removeItem('AuthToken');
        localStorage.removeItem('UserEmail');
        localStorage.removeItem('image');
        this.$router.push('/');
      }
    },
    created(){
      document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy(){
      document.removeEventListener('click', this.handleClickOutside);
    }
}
</script>

<template>
  <header class="header">
    <nav class="navbar">
      <div class="container">
        <a href="/" class="navbar-brand">
          <img
            src="/images/CodeTouchTextFlex.png"
            width="100px"
            height="80px"
          />
        </a>
        <ul class="nav-menu">
          <li><router-link to="/introduce">기능소개</router-link></li>
          <li><router-link to="/template">템플릿</router-link></li>
          <li><router-link to="/payment">요금</router-link></li>
          <li><a href="/partner">팀원소개</a></li>
        </ul>
        <div class="auth-buttons">

          <div class="login-container" v-if="!showlogin">
            <router-link to="/mySite">
              <div class="login-text">내 사이트</div>
            </router-link>
          <div class="login-circle" @click="toggleDropdown">
            <img class="login-circle" :src="imageSrc">            
          </div>

          <div class="profile-dropdown" v-if="showDropdown">
              <div class="profile-header">
                <div class="profile-circle">
                  <img class="profile-circle" :src="imageSrc">
                </div>
                <div class="profile-info">
                  <div class="profile-name">test</div>
                  <div class="profile-email">{{ userEmail }}</div>
                </div>
              </div>
              <div class="profile-menu">
                <router-link to="/mypage" class="menu-item">마이페이지</router-link>
                <div class="menu-item" @click="logout">로그아웃</div>
              </div>
            </div>
          </div>

          <router-link to="/login" v-if="showlogin">
            <button class="btn btn-outline">로그인</button>
          </router-link>
          </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  position: relative;
}

.login-text {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.login-circle {
  width: 24px;
  height: 24px;
  background-color: #e0e0e0;
  border-radius: 50%;
  cursor: pointer;
}

/* 프로필 드롭다운 스타일 */
.profile-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 240px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  z-index: 1000;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.profile-circle {
  width: 48px;
  height: 48px;
  background-color: #e0e0e0;
  border-radius: 50%;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profile-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.profile-email {
  font-size: 14px;
  color: #666;
}

.profile-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  padding: 8px 0;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
}

.menu-item:hover {
  color: #666;
}

/* 기존 스타일 유지 */
.header {
  position: sticky;
  top: 0;
  background-color: #fbf6fd;
  z-index: 1000;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.container {
  width: 100%;
  margin: 0;
  padding: 0 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style-type: none;
  margin: 0 0 0 2rem;
  padding: 0;
}

.nav-menu li {
  margin-right: 1.5rem;
}

.nav-menu li a {
  color: #333;
  text-decoration: none;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  margin-left: auto;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #df9aff;
  color: #d651ff;
}

.btn-outline:hover {
  background-color: #d651ff;
  color: #ffffff;
  border-color: #d651ff;
}

.btn-primary {
  background-color: #007bff;
  border: 1px solid #007bff;
  color: #ffffff;
}
</style>
