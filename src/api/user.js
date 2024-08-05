//����request.js����

import request from '@/utils/request.js'

//�ṩ����ע��ӿڵĺ���

export const userRegisterService = (registerData)=>{
    const params = new URLSearchParams()
    for(let key in registerData){
        params.append(key, registerData[key]);
    }
    return request.post('/user/register', params)
}


//�ṩ���õ�¼�ӿڵĺ���

export const userLoginService = (loginData)=>{
    const params = new URLSearchParams()
    for(let key in loginData){
        params.append(key, loginData[key]);
    }
    return request.post('/user/login', params)
}

//��ȡ�û�������Ϣ
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