import axios from 'axios';

import { ElMessage } from 'element-plus'

import { useTokenStore } from '@/stores/token.js';
const baseURL = '/api';
const instance = axios.create({baseURL})

instance.interceptors.request.use(
    (config)=>{
        const tokenStore = useTokenStore();
        if(tokenStore.token){
            config.headers.Authorization = tokenStore.token
        }
        return config;
    },
    (err)=>{
        Promise.reject(err)
    }
)

import router from '@/router'



instance.interceptors.response.use(
    result=>{

        if(result.data.code === 0){
            return result.data;
        }

        ElMessage.error(result.data.msg ? result.data.msg : '服务异常')

        return Promise.reject(result.data)
    },
    err=>{
        //判断响应状态码，如果为401，则证明未登录，提示登录，并跳转登陆页面
        if(err.response.status === 401){
            ElMessage.error('请先登录')
            router.push('/login')
        }else{
            ElMessage.error('服务异常');
        }
      
        return Promise.reject(err);
    }
)

export default instance;