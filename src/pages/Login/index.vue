<template>
  <div class="login-container">
    <div class='login-box'>
      <!-- 跑马灯 -->
      <div class='block'>
        <el-carousel height='474px' style='border-radius: 8px 0 0 8px' :interval="3000" arrow="always">
          <el-carousel-item v-for='item in 4' :key='item'>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class='login-form'>
        <el-form
            :model="loginForm"
            ref="formRef"
            label-width="80px"
            class="login-form"
            :rules="loginRules"
        >
          <div class='login-form-title'>
            <img
                src='/login.png'
                style='width: 52px; height: 52px'
                alt=''
            />
          </div>
          <el-form-item label="用户名:" prop="username" style="margin-left: 20px;">
            <el-input
                v-model="loginForm.username"
                style='width: 69%; font-size: 16px;'
                ref="username"
                name="username"
                autocomplete="off"
                placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="userPwd" style="margin-left: 20px">
            <el-input
                type="password"
                style='width: 69%;font-size: 18px;'
                v-model="loginForm.userPwd"
                autocomplete="off"
                placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item style='width: 100%; margin-bottom: 20px'>
            <el-button class='login-btn'
                       type='primary'
                       size='medium'
                       style="width:67%"
                       @click.native.prevent="login">登录
            </el-button>
          </el-form-item>
          <el-form-item style='width: 100%;'>
            <el-button
                class='register-btn'
                type="primary"
                color="#626aef"
                @click="toRegister"
                style="width:67%">注册
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Login'
})
</script>
<script lang="ts" setup>
import {ref} from "vue"
import {useUserInfoStore} from '../../stores/userInfo';

import type {FormInstance} from 'element-plus';
import {useRouter} from 'vue-router'

const userInfoStore = useUserInfoStore()
const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)
//账号密码参数
const loginForm = ref({
  username: "liziwei",
  userPwd: "123456",
})
// 校验规则
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value.length < 4) {
    callback(new Error('用户名长度不能小于4位'))
  } else {
    callback()
  }
}
// 校验规则
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.length < 6) {
    callback(new Error('密码长度不能小于6位'))
  } else {
    callback()
  }
}
// 校验规则
const loginRules = {
  username: [{required: true, validator: validateUsername}],
  userPwd: [{required: true, trigger: 'blur', validator: validatePassword}]
}
//点击登录的回调
const login = async () => {
  // console.log('点击登录');
  await formRef.value?.validate()
  loading.value = true
  try {
    // await getUserInfo(loginForm.value)
    await userInfoStore.login(loginForm.value)
    router.push({name: "HeadlineNews"});
  } finally {
    loading.value = false
  }
  // loading.value = true
  // const { username, userPwd } = loginForm.value
  // try {
  //   await userInfoStore.login(username, userPwd)
  //   router.push({ path: redirect.value || '/' })
  // } finally {
  //   loading.value = false
  // }
}

const toRegister = () => {
  router.push({name: "Register"});
}
</script>

<style scoped>

.el-carousel__item:nth-child(4n) {
  background-image: url('image/city4.jpg');
  background-size: cover; /* 背景图片覆盖整个容器，可能会裁剪图片 */
  background-position: center center;
  background-repeat: no-repeat;
}

.el-carousel__item:nth-child(4n+1) {
  background-image: url('image/city3.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.el-carousel__item:nth-child(4n+2) {
  background-image: url('image/city1.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.el-carousel__item:nth-child(4n+3) {
  background-image: url('image/city2.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /*background: #b5c2de;*/
  background-image: url('image/earth-modified.jpg');
  background-size: cover; /* 背景图片覆盖整个容器，可能会裁剪图片 */
  background-position: center center;
  background-repeat: no-repeat;
}

.login-box {
  width: 1000px;
  height: 474px;
  border-radius: 8px;
  display: flex;
}

.block {
  width: 63%;
}

.login-form {
  background: #F5F7FA;
  width: 37%;
  border-radius: 0px 8px 8px 0px; /* 设置圆角，右上角和右下角为8px，左上角为0px */

  .el-form {
    margin-top: 120px;
    width: 370px;
    height: 307px;
  }

  .el-form-item {
    margin-bottom: 35px;
  }
}

.login-form-title {
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

.login-btn {
  border-radius: 17px; /* 创建圆角效果 */
  padding: 11px 10px !important; /* 元素的顶部内边距为 11px 元素的左右侧内边距各为 10px 元素的底部内边距也为 11px*/
  /*margin-top: 10px;*/
  /*font-weight: 550;*/
  font-size: 14px;
  color: #333333;
  background-color: #ffc200;
  border-color: #ffc200;

  &:hover,
  &:focus {
    background-color: #f3d679;
    color: #282726;
    border-color: #f3d679;
  }
}

.register-btn {
  border-radius: 17px; /* 创建圆角效果 */
  padding: 11px 10px !important; /* 元素的顶部内边距为 11px 元素的左右侧内边距各为 10px 元素的底部内边距也为 11px*/
  /*margin-top: 10px;*/
  /*font-weight: 550;*/
  font-size: 14px;
  color: #ffffff;
  background-color: #282726;
  border-color: #282726;

  &:hover,
  &:focus {
    background-color: #524f4f;
    color: #ffffff;
    border-color: #524f4f;
  }
}
</style>
