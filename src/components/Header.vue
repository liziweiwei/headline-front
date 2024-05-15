<template>
  <div class="headerContainer">
    <!-- 头部左侧区域 -->
    <div class="left">
      <ul>
        <li @click="HighlightHandler(index)" v-for="(item,index) in findAllTypeList" :key="item.tid">
          <a :class="{ active: item.isHighlight }" href="javascript:;">{{ item.tname }}</a>
        </li>
      </ul>
    </div>
    <!-- 头部右侧区域 -->
    <div class="right">
      <div class="rightInput" style="margin-right: 50px;">
        <el-input v-model="keywords" placeholder="搜索最新头条"></el-input>
        <!-- <el-button   type="primary">搜索</el-button> -->
      </div>
      <!-- 用户登录以后的展示 -->
      <div class="btn-dropdown">
        <!-- 用户没有登录的时候的展示,当nickName存在时显示的布局 -->
        <div v-if="nickName" style="display: flex; justify-content: center; align-items: center;">
          <el-dropdown>
            <el-button type="primary"
                       style="background: #ffc107; color: #684802;border-color: #ffc107;
                       height: 35px;
                       font-size: 16px;
                       font-weight: 550;
                       padding: 16px 10px 16px 15px  !important;">
              {{ nickName }}
              <el-icon class="el-icon--right" style="margin-left: 20px">
                <Operation/>
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handlerNews">发布新闻</el-dropdown-item>
                <!-- <el-dropdown-item>个人中心</el-dropdown-item> -->
                <el-dropdown-item @click="handlerHistory">浏览记录</el-dropdown-item>
                <el-dropdown-item @click="Logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div v-else class="containerButton">
          <el-button style="background: #212529; color: #aea7a2" @click="toLogin">登录</el-button>
          <el-button style="background: #ffc107; color: #684802" @click="toRegister">注册</el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Header'
})
</script>

<script setup>
import {getfindAllTypes, isUserOverdue} from '../api/index'
import {ref, onMounted, getCurrentInstance, watch, onUpdated} from "vue"
import {useRouter} from 'vue-router'
import {ArrowDown} from '@element-plus/icons-vue'
import {removeToken} from '../utils/token-utils'
import pinia from '../stores/index';
import {useUserInfoStore} from '../stores/userInfo'

const userInfoStore = useUserInfoStore(pinia)
const nickName = ref("")
// 获取到 全局事件总线
const {Bus} = getCurrentInstance().appContext.config.globalProperties
const router = useRouter()
const keywords = ref("") // 收集搜索最新头条参数
//监视搜索参数的变化 ,当搜索参数变化的时候给HeadlineNews组件传递数据
watch(keywords, (newVal) => {
  Bus.emit('keyword', newVal)
})
const findAllTypeList = ref([])//所有头条分类
const toLogin = () => {
  router.push({name: "Login"});
}
//点击去注册页面
const toRegister = () => {
  router.push({name: "Register"});
}
const getList = async () => {
  let result = await getfindAllTypes()
  // 遍历数据添加高亮标识
  result.forEach((item) => {
    item.tid = item.tid
    item.tname = item.tname
    item.isHighlight = false
  })
  // 添加微头条数据
  result.unshift({
    isHighlight: true,
    tid: 0,
    tname: "每日头条"
  })
  findAllTypeList.value = result
}
// 页面挂载的生命周期回调
onUpdated(() => {
  nickName.value = userInfoStore.nickName
})
onMounted(() => {
  getList()
})

// 点击切换高亮的回调(排他思想)
const HighlightHandler = (index) => {
  findAllTypeList.value.forEach((item) => {
    item.isHighlight = false
  })
  // 切换高亮的时候把tid传给HeadlineNews组件
  findAllTypeList.value[index].isHighlight = true
  Bus.emit('tid', findAllTypeList.value[index].tid)
}

// 点击退出登录的回调
const Logout = () => {
  // 移除用户令牌
  removeToken()
  // 重置用户信息
  userInfoStore.initUserInfo()
  // 清空用户昵称
  nickName.value = ""
  // router.push 用于导航到未在历史记录中的新位置，而 router.go 用于在已经存在的历史记录之间移动
  // router.go({name: "HeadlineNews"});
  router.push({name: "HeadlineNews"});
}

// 点击发布新闻
const handlerNews = async () => {
  // 发送请求判断用户是否token过期
  await isUserOverdue()
  router.push({name: "addOrModifyNews"});
}

// 浏览历史
const handlerHistory = () => {
  router.push({name: "BrowsingHistory"});
}
</script>

<style>
.el-dropdown {
  vertical-align: top;
  width: 100px;
}

.el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>

<style lang="less" scoped>
.headerContainer {
  width: 100%;
  height: 70px;
  background: #141618;
  /*background: #212529;*/
  display: flex;
  justify-content: space-around;

  .left {

    ul {
      display: flex;
      margin-top: 22px;

      li {
        list-style: none;
        margin-left: 30px;
        font-size: 18px;

        a:-webkit-any-link {
          text-decoration: none;
          color: #cad4da;

          &.active {
            color: #ffc107;
            font-size: 20px;
            font-weight: 550;
          }
        }
      }
    }
  }

  .right {
    .containerButton {
      display: flex;
      align-items: center;
    }

    line-height: 60px;
    display: flex;
    flex-wrap: nowrap;

    .rightInput {
      display: flex;
      align-items: center;

      :deep(.el-input__inner) {
        height: 35px;
        width: 180px;
      }
    }

    .btn-dropdown {
      display: flex;
      align-items: center;
    }

    :deep(.el-button) {
      margin: 0 0 0 10px; /* 上下左右外边距，顶部0，底部0，右侧0，左侧10px */
      display: flex; /* 使用弹性布局，使得子元素沿一行排列 */
      /* 弹性布局的子元素对齐方式设置 */
      justify-content: center; /* 子元素在主轴（水平方向）上居中对齐 */
      align-items: center; /* 子元素在交叉轴（垂直方向）上居中对齐 */
    }
  }
}

.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>


















