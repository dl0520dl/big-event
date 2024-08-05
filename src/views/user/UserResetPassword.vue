<script setup>
import { ref } from 'vue'
import { userPasswordUpdateService } from '@/api/user'
import { ElMessage ,ElMessageBox} from 'element-plus'

import { useRouter } from 'vue-router';
const router = useRouter();

const passwordInfo = ref({
    oldPwd: '',
    newPwd: '',
    rePwd: ''
})

const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('确认密码不能为空'))
    } else if (value !== passwordInfo.value.newPwd) {
        callback(new Error('两次密码不一致'))
    } else {
        callback()
    }
}

const rules = {
    oldPwd: [
        { required: true, message: '请输入原密码', trigger: 'blur' },
        {
            pattern: /^\S{6,20}$/,
            message: '原密码必须是6-20位的非空字符串',
            trigger: 'blur'
        }
    ],
    newPwd: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        {
            pattern: /^\S{6,20}$/,
            message: '新密码必须是6-20位的非空字符串',
            trigger: 'blur'
        }
    ],
    rePwd: [
        { required: true, message: '请确认新密码', trigger: 'blur' },
        { validator: checkRePassword, trigger: 'blur' },
        {
            pattern: /^\S{6,20}$/,
            message: '新密码必须是6-20位的非空字符串',
            trigger: 'blur'
        }
    ]
}

const loading = ref(false)

const updatePassword = async () => {
    ElMessageBox.confirm(
    '确认修改密码？',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
        const formattedData = {
        old_pwd: passwordInfo.value.oldPwd,
        new_pwd: passwordInfo.value.newPwd,
        re_pwd: passwordInfo.value.rePwd
    }
    loading.value = true;
    try {
        let result = await userPasswordUpdateService(formattedData)
        if (result.code === 0) {
            ElMessage.success(result.msg ? result.msg : '修改成功')
            passwordInfo.value = { oldPwd: '', newPwd: '', rePwd: '' }
            router.push('/login')
        } else {
            ElMessage.error(result.msg ? result.msg : '修改失败')
        }
    } catch (error) {
        ElMessage.error('修改失败')
    } finally {
        loading.value = false
    }
    })
}


//     const formattedData = {
//         old_pwd: passwordInfo.value.oldPwd,
//         new_pwd: passwordInfo.value.newPwd,
//         re_pwd: passwordInfo.value.rePwd
//     }

//     loading.value = true
//     try {
//         let result = await userPasswordUpdateService(formattedData)
//         if (result.code === 0) {
//             ElMessage.success(result.msg ? result.msg : '修改成功')
//             passwordInfo.value = { oldPwd: '', newPwd: '', rePwd: '' }
//             router.push('/login')
//         } else {
//             ElMessage.error(result.msg ? result.msg : '修改失败')
//         }
//     } catch (error) {
//         ElMessage.error('修改失败，请稍后再试')
//     } finally {
//         loading.value = false
//     }
// }
</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span><strong>密码修改</strong></span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="passwordInfo" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="原密码" prop="oldPwd">
                        <el-input v-model="passwordInfo.oldPwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPwd">
                        <el-input v-model="passwordInfo.newPwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="rePwd">
                        <el-input v-model="passwordInfo.rePwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updatePassword" :loading="loading">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>
