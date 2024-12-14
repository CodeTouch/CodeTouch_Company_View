<script>
export default{
    data(){
        return{
        }
    },
    methods:{
        sendToData(){
            // 템플릿 아이디 넣어줘야함
            this.$emit('open', 1)
        }
    }
}

</script>

<template>
    <div class="template-card" @click="sendToData">
        <img src=""  class="template-image">
        <div class="template-info">
                <div class="template-name">이름</div>
                <div class="template-tag">태그</div>
        </div>
    </div>
</template>

<style>

.template-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 24px;
            padding: 20px 0;
        }

        .template-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            transition: transform 0.2s;
        }

        .template-card:hover {
            transform: translateY(-4px);
        }

        .template-image {
            width: 100%;
            height: 240px;
            object-fit: cover;
        }

        .template-info {
            padding: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .template-name {
            font-size: 16px;
            font-weight: 500;
            color: #333;
        }

        .template-tag {
            padding: 4px 12px;
            background-color: #ff6b6b;
            color: white;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 500;
        }
</style>