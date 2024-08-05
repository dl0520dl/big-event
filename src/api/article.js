import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token.js'
//���·����б��ѯ

export const articleCategoryListService = ()=>{
    //const tokenStore = useTokenStore();
    //pinia�ж������Ӧʽ���ݣ�������Ҫ.value
    //return request.get('/category',{headers:{'Authorization':tokenStore.token}})
    return request.get('/category')
}

export const articleCategoryAddService = (categoryData)=>{
    return request.post('category', categoryData)
}



//���·����޸�
export const articleCategoryUpdateService = (categoryData)=>{
    return request.put('/category', categoryData)
}

//���·���ɾ��
export const articleCategoryDeleteService = (id)=>{
    return request.delete ('/category?id='+id)
}

//�����б��ѯ��ͬ���ࣩ
export const articleListService = (params)=>{
    return request.get('/article', {params:params})
}

//��������
export const articleAddService = (articleData)=>{
    return request.post('/article',articleData)
}

//���������޸�
export const articleUpdateService = (articleData)=>{
    return request.put('/article',articleData)
}

export const articleDeleteService = (id)=>{
    return request.delete('/article?id='+id)
}