<script>

</script>

<template>
    <div class="container">
        <h1 class="page-title">마이페이지</h1>

        <nav class="nav">
            <a href="#" class="nav-item active">정보수정</a>
            <a href="#" class="nav-item">결제내역</a>
            <a href="#" class="nav-item">문의내역</a>
            <a href="#" class="nav-item">수강내역</a>
        </nav>

        <div class="section">
            <h2 class="section-title">결제 비밀번호 관리</h2>
            <div class="button-group">
                <button class="button">변경하기</button>
                <button class="button">재설정하기</button>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">결제수단 관리</h2>
            <div class="card">
                <p class="card-text">등록된 결제수단이 없습니다.</p>
                <button class="button-primary">+ 카드 등록하기</button>
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

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #f5f6f8;
            color: #333;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .page-title {
            font-size: 24px;
            font-weight: 600;
            text-align: center;
            margin-bottom: 40px;
        }

        /* 네비게이션 */
        .nav {
            display: flex;
            justify-content: center;
            gap: 32px;
            margin-bottom: 48px;
        }

        .nav-item {
            font-size: 15px;
            color: #666;
            text-decoration: none;
            padding-bottom: 8px;
        }

        .nav-item.active {
            color: #0066ff;
            border-bottom: 2px solid #0066ff;
        }

        /* 섹션 스타일 */
        .section {
            margin-bottom: 32px;
        }

        .section-title {
            font-size: 15px;
            font-weight: 500;
            margin-bottom: 16px;
        }

        /* 버튼 그룹 */
        .button-group {
            display: flex;
            gap: 8px;
        }

        .button {
            flex: 1;
            padding: 12px;
            border: 1px solid #ddd;
            background-color: white;
            border-radius: 4px;
            font-size: 14px;
            color: #333;
            cursor: pointer;
        }

        .button:hover {
            background-color: #f8f8f8;
        }

        /* 카드 스타일 */
        .card {
            background-color: white;
            border-radius: 4px;
            padding: 32px;
            text-align: center;
        }

        .card-text {
            color: #666;
            font-size: 14px;
            margin-bottom: 16px;
        }

        .button-primary {
            display: inline-block;
            padding: 12px 24px;
            background-color: #0066ff;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
        }

        .button-primary:hover {
            background-color: #0052cc;
        }
</style>