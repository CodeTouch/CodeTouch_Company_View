<template>
    <div class="container">
        <!-- 정보수정 섹션 -->
        <div class="section">
            <div class="section-header">
                <h2>정보수정</h2>
                <button class="nav-button">수정하기</button>
            </div>
            <div class="profile-section">
                <div class="profile-header">
                    <div class="profile-circle">
                        <span>p.f</span>
                    </div>
                    <div class="profile-info-inline">
                        <div class="nickname">닉네임</div>
                        <div class="email">email@example.com</div>
                    </div>
                </div>
                <div class="homepage left-align">
                    이름<br />
                    전화번호<br />
                    홈페이지 주소
                </div>
            </div>
        </div>

        <!-- 결제내역 섹션 -->
        <div class="section">
            <div class="section-header">
                <h2>결제 내역</h2>
                <button class="nav-button">더보기</button>
            </div>
            <div class="notification-section">
                <div class="notification-item">
                    <span>사이트 노내일</span>
                    <button class="confirm-button">확인중</button>
                </div>
                <div class="notification-item">요금제가 곧 만료됩니다.</div>
                <div class="notification-item">결제수단 정보가 필요합니다.</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

/* 공통 섹션 스타일 */
.section {
    background: white;
    border-radius: 8px;
    border: 1px solid #eee;
    padding: 24px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.section-header h2 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
}

.nav-button {
    padding: 6px 12px;
    border: 1px solid #ddd;
    background-color: white;
    border-radius: 4px;
    font-size: 13px;
    color: #333;
    cursor: pointer;
}

/* 프로필 섹션 */
.profile-section {
    display: flex;
    flex-direction: column;
}

.profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
}

.profile-circle {
    width: 60px;
    height: 60px;
    background-color: #f0f0f0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
}

.profile-circle span {
    font-size: 20px;
    color: #666;
}

.profile-info-inline {
    display: flex;
    flex-direction: column;
}

.nickname {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 4px;
}

.email {
    font-size: 14px;
    color: #666;
}

.homepage {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
}

.homepage.left-align {
    text-align: left;
}

/* 알림 섹션 */
.notification-section {
    padding: 24px;
    background: white;
    border-radius: 8px;
    border: 1px solid #eee;
}

.notification-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #eee;
}

.notification-item:last-child {
    border-bottom: none;
}

.confirm-button {
    padding: 4px 12px;
    background-color: #f5f5f5;
    border: none;
    border-radius: 12px;
    font-size: 12px;
    color: #666;
}
</style>
