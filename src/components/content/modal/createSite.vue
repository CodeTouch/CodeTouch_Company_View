<script>
export default {
    methods: {
        clearSiteName() {
            this.$refs.inputSiteName.value = "";
        },
        clearSiteDomain() {
            this.$refs.inputSiteDomain.value = "";
        },
        emitClose() {
            this.$emit('close');
        }
    }
};
</script>

<template>
    <div class="container">
        <button class="close-button" @click="emitClose">×</button>
        <h1 class="title">새로운 웹사이트</h1>
        
        <form>
            <div class="input-group">
                <input 
                    type="text" 
                    class="input-field" 
                    placeholder="웹사이트 이름"
                    ref="inputSiteName"   
                >
                <button type="button" class="clear-button" @click="clearSiteName">×</button>
            </div>

            <div class="input-group">
                <div class="domain-field">
                    <input 
                        type="text" 
                        class="domain-input" 
                        placeholder="URL"
                        ref="inputSiteDomain"
                    >
                    <span class="domain-suffix">.imweb.me</span>
                </div>
                <button type="button" class="clear-button" @click="clearSiteDomain">×</button>
            </div>

            <button type="submit" class="submit-button">개설하기</button>
        </form>

        <p class="help-text">웹사이트 이름과 주소(URL)는 언제든지 바꿀 수 있어요</p>
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
            background-color: rgba(0, 0, 0, 0.9);
            color: #fff;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .container {
            width: 100%;
            max-width: 400px;
            padding: 20px;
            text-align: center;
            position: relative; /* Close 버튼 위치를 부모 기준으로 설정 */
        }

        .close-button {
            position: absolute;
            top: 0px; /* 부모 컨테이너 상단 기준으로 위치 조정 */
            right: 0px; /* 부모 컨테이너 오른쪽 기준으로 위치 조정 */
            background: none;
            border: none;
            color: gray;
            font-size: 50px;
            cursor: pointer;
        }

        .close-button:hover {
            color: darkgray;
        }

        .title {
            color: #fff;
            font-size: 24px;
            font-weight: 500;
            margin-bottom: 40px;
        }

        .input-group {
            margin-bottom: 16px;
            position: relative;
        }

        .input-field {
            width: 100%;
            padding: 12px;
            background-color: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 4px;
            color: #fff;
            font-size: 14px;
        }

        .input-field::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .domain-field {
            display: flex;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
        }

        .domain-input {
            flex: 1;
            padding: 12px;
            background: none;
            border: none;
            color: #fff;
            font-size: 14px;
        }

        .domain-suffix {
            padding: 12px;
            color: rgba(255, 255, 255, 0.5);
            font-size: 14px;
            border-left: 1px solid rgba(255, 255, 255, 0.2);
        }

        .clear-button {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .submit-button {
            width: 100%;
            padding: 14px;
            background-color: #fff;
            color: #000;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            margin-top: 30px;
        }

        .submit-button:hover {
            background-color: #f0f0f0;
        }

        .help-text {
            margin-top: 20px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
        }
</style>
