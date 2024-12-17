import { defineStore } from "pinia"
import { reactive } from 'vue'

export const useUserStore = defineStore('login',() => {
    const userData = reactive({
        isLogin: false,
        userEmail: '',
        userImgURL: '',
        userName: '',
        userNickname: '',
        userPhone: '',
    })

    function setUserData(data){
        userData.isLogin = true;
        userData.userEmail = data.email;
        userData.userImgURL = data.img;
        userData.userName = data.name;
        userData.userNickname = data.nickname;
        userData.userPhone = data.phone;
    }

    function resetUserData(){
        userData.isLogin = false;
        userData.userEmail = '';
        userData.userImgURL = '';
        userData.userName = '';
        userData.userNickname = '';
        userData.userPhone = '';
    }

    return {
        userData,
        setUserData,
        resetUserData
    }
}, {
    persist:{
        key: "userStore",
        Storage: localStorage,
    },
});