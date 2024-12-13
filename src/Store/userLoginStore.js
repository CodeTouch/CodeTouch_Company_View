import { defineStore } from "pinia"
import { ref } from 'vue'

export const useUserStore = defineStore('login',() => {
    const userEmail = ref('');
    const userImgURL = ref('');

    function setUserData(email, img){
        userEmail.value = email;
        userImgURL.value = img;
    }

    return { userEmail, userImgURL, setUserData}
})