import axios from "axios";
import {ElMessage} from 'element-plus';
import pinia from '../stores/index';
import {useUserInfoStore} from '../stores/userInfo';
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "../routers/index.js";
// 配置新建一个 axios 实例
const service = axios.create({
    baseURL: "/app-dev/",
    timeout: 50000,
});

// 添加请求拦截器
service.interceptors.request.use((config) => {
    NProgress.start()// 开启进度条
    // 如果有token, 通过请求头携带给后台
    const userInfoStore = useUserInfoStore(pinia) // 如果不是在组件中调用,必须传入pinia
    const token = userInfoStore.token
    if (token) {
        // config.headers['token'] = token  // 报错: headers对象并没有声明有token, 不能随便添加
        (config.headers)['token'] = token
    }
    return config;
});

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        // 关闭进度条
        NProgress.done()

        // if(response.data.code !== 200){
        // // 判断响应状态码
        // if (response.data.code == 501)  return  Promise.reject(ElMessage.error("用户名有误"))
        // else if (response.data.code == 503) return  Promise.reject(ElMessage.error("密码有误"))
        // else if (response.data.code == 504) return  Promise.reject(ElMessage.error("登录已过期"))
        // else if (response.data.code == 505) return  Promise.reject(ElMessage.error("用户名占用"))
        // } else {
        //   return response.data.data; /* 返回成功响应数据中的data属性数据 */
        // }

        if (response.data.code !== 200) {
            // 判断响应状态码(全局异常处理,response.data.code统一返回为0)
            if (response.data.code === 0) return Promise.reject(ElMessage.error(response.data.message))
            else if (response.data.code === 504) {
                // 跳转到登陆界面
                router.push("/login")
                return Promise.reject(ElMessage.error("登录已过期,请登录"))
            }
        } else {
            // 返回成功响应数据中的data属性数据
            return response.data.data;
        }
    },
    (error) => {
        // 关闭进度条
        NProgress.done()
        return Promise.reject(error.message);
    }
);

export default service;
