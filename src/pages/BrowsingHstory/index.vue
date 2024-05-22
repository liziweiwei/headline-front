<template>
  <div class="headerContainer">
    <div class="left">
      <el-icon :size="25" :color="'#d22525'">
        <Clock/>
      </el-icon>
      <span>历史记录</span>
    </div>
    <div class="right">
      <div class="rightInput">
        <el-input v-model="keywords" placeholder="搜索历史记录"></el-input>
        <el-button type='primary'
                   class="searchbtn"
                   style="
                   margin-left: 20px;
                       height: 35px;
                       font-size: 16px;
                       font-weight: 550;
                       padding: 16px !important;"
                   @click='pageQuery'>查询
        </el-button>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="listItem">
      <!-- 每一项头条列表 -->
      <el-timeline style="max-width: 600px">
        <el-timeline-item :timestamp="item.browsingTime"
                          :size="'large'"
                          :color="item.type === 1 ? '#1c8dff' : item.type === 2 ?
                          '#6afd23' : item.type === 3 ? '#ff9d00' : item.type === 4 ? '#f54242' : '#9c0eff'"
                          placement="top"
                          v-for="item in pageData"
                          :key="item.hid">
          <el-card class="containerItem">
            <div>
          <span class="text" style="font-size: 22px;font-weight: 550;">
            {{ item.title }}
          </span>
              <el-button @click="toDetail(item.hid)"
                         type="success"
                         size="small"
                         style="float: right" plain>
                <el-icon :size="17" :color="white">
                  <More/>
                </el-icon>
              </el-button>
            </div>
            <div class="detail">
              <el-tag type="primary">{{
                  item.type === 1 ? "新闻" : item.type === 2 ? "体育" : item.type === 3 ? "娱乐" : item.type === 4 ? "科技" : "其他"
                }}
              </el-tag>
              <el-tag type="info">{{ item.pastHours }}小时前</el-tag>

              <span style="margin-left: 550px; font-size: 15px; font-weight: 550">
                {{ item.author }} |
              </span>
              <span style="margin-left: 0; font-size: 15px; font-weight: 550"> 来源
                      <a href="https://www.toutiao.com/">头条新闻</a>
              </span>
              <el-popconfirm @confirm="handlerDelete(item.id)"
                             :title="`您确定要删除${item.title}`">
                <template #reference>
                  <el-button
                      type="danger"
                      size="small"
                      style=" float: right"
                      plain>
                    <el-icon :size="17" :color="white">
                      <Delete/>
                    </el-icon>
                  </el-button>
                </template>
              </el-popconfirm>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'BrowsingHistory'
})
</script>

<script setup>
import {ref, onMounted, getCurrentInstance, watch} from "vue"
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import pinia from '../../stores/index';
import {useUserInfoStore} from '../../stores/userInfo'
import {deleteHistory, findHistory} from "../../api/index.js";
import {Clock, Delete, More} from "@element-plus/icons-vue";

const {Bus} = getCurrentInstance().appContext.config.globalProperties
const userInfoStore = useUserInfoStore(pinia)
const router = useRouter()
const uid = userInfoStore.uid
const findNewsPageInfo = ref(
    {
      keyWords: "", // 搜索标题关键字
      uid: ''       // 用户id
    }
)
// 初始化列表数据
const pageData = ref([{
  id: null,
  hid: null,
  pageViews: null,
  pastHours: null,
  publisher: null,
  title: "",
  type: null,
  browsingTime: ''
}])
const keywords = ref("")
findNewsPageInfo.value.keyWords = keywords

// 添加用户id
findNewsPageInfo.value.uid = uid

// 初始化请求分页列表数据
const getPageList = async () => {
  let result = await findHistory(findNewsPageInfo.value)
  pageData.value = result.pageInfo.pageData
}

// 组件挂载的生命周期钩子,组件挂载完成后执行的函数
onMounted(() => {
  getPageList()
})
// 点击查询的回调
const pageQuery = () => {
  getPageList()
}

// 点击查看全文的回调
const toDetail = (hid) => {
  router.push({name: "Detail", query: {hid}});
}

// 点击删除的回调
const handlerDelete = async (id) => {
  await deleteHistory(id)
  ElMessage.success('删除成功!')
  //重新获取列表请求
  getPageList()
}


//点击修改的回调
const Modify = (hid) => {
  router.push({name: "addOrModifyNews", query: {hid}});
}
</script>

<style lang="less" scoped>
.headerContainer {
  width: 100%;
  height: 70px;
  background: #EBEEF5;
  /*background: #212529;*/
  display: flex;
  justify-content: space-around;

  .left {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
      color: #000000;
      font-size: 20px;
      font-weight: 600;
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
        width: 250px;
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

.container {
  margin-top: 20px;
  width: 1200px;
  margin-left: 30vh;
  display: flex;
  flex-direction: column;
  /*align-items: center;*/

  // 列表样式
  .listItem {
    .containerItem {
      margin-top: 20px;
      border-radius: 10px;
      border: 2px solid #ebebeb;
      width: 1110px;
      height: 125px;

      .el-button {
        margin-top: 10px;
      }

      div {
        margin-top: 10px;
      }

      .text {
        margin-left: 15px;
        color: #353a3f;
      }

      .detail {
        span {
          margin-top: 12px;
          margin-left: 15px;
          color: #3b383b;
          font-size: 14px;
        }
      }
    }
  }
}

/deep/ .el-timeline-item__timestamp.is-top {
  /*  position: absolute;
    left: -117px;
    top: -3px;*/
  font-size: 16px;
  font-weight: 550;
  color: #000000;
}

.searchbtn {
  background: #ffc200;
  color: #000000;
  border-color: #ffc200;

  &:hover,
  &:focus {
    background: #e5d5ae;
    color: #000000;
    border-color: #e5d5ae;
  }
}

</style>
