import { defineStore } from "pinia"
import { ref } from 'vue'

export const useUserStore = defineStore('login',() => {
    const userEmail = ref('');
    const userImgURL = ref('');
    const userName = ref('');
    const userNickname = ref('');
    const userPhone = ref('');


    function setUserData(email, img, name, nickname, phone){
        userEmail.value = email;
        userImgURL.value = img;
        userName.value = name;
        userNickname.value = nickname;
        userPhone.value = phone;
    }

    return { userEmail, userImgURL, setUserData}
})