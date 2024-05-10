import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import mitt from 'mitt'
import router from "./routers/index";
import 'element-plus/dist/index.css'
import App from './App.vue'
import pinia from './stores';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.config.globalProperties.Bus = mitt()

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus, {
    locale: zhCn,
})
app.use(pinia)
app.use(router)
app.mount('#app')

