//导入request.js工具

import request from '@/utils/request.js'

//提供调用注册接口的函数

export const userRegisterService = (registerData)=>{
    const params = new URLSearchParams()
    for(let key in registerData){
        params.append(key, registerData[key]);
    }
    return request.post('/user/register', params)
}


//提供调用登录接口的函数

export const userLoginService = (loginData)=>{
    const params = new URLSearchParams()
    for(let key in loginData){
        params.append(key, loginData[key]);
    }
    return request.post('/user/login', params)
}

//获取用户个人信息
export const userInfoService = ()=>{
    return request.get('/user/userInfo')

}

export const userInfoUpdateService = (userInfoData)=>{
    return request.put('/user/update', userInfoData)
}

export const userAvatarUpdateService = (avatarUrl)=>{
    const params  = new URLSearchParams();
    params.append('avatarUrl', avatarUrl) 
    return request.patch('/user/updateAvatar', params)
}


export const userPasswordUpdateService = (passwordData)=>{
 
    return request.patch('/user/updatePwd', passwordData);
} 