import { defineStore } from "pinia"
import { ref } from 'vue'

export const useUserStore = defineStore('login',() => {
    const userEmail = ref('');
    const userImgURL = ref('');
    const userName = ref('');
    const userNickname = ref('');
    const userPhone = ref('');


    function setUserData(data){
        userEmail.value = data.email;
        userImgURL.value = data.img;
        userName.value = data.name;
        userNickname.value = data.nickname;
        userPhone.value = data.phone;
    }

    return { userEmail, userImgURL, setUserData}
})