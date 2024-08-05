//定义store 
import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useTokenStore = defineStore('token',()=>{

    const token = ref('')
    const setToken = (newToken)=>{
        token.value = newToken
    }

    const removeToken = ()=>{
        token.value = ''
    }
    return  {
        token, setToken, removeToken 
    }
},{
    //持久化存储
    persist:true
});

