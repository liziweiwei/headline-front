<template xmlns:white-space="http://www.w3.org/1999/xhtml">
  <div class="Details">
    <div class="seeDetails">
      <div>
        <h1>{{ detailList.title }}</h1>
      </div>
      <div>
        <div>
          <span>{{ detailList.updateTime }} |</span>
          <span> 来源
          <a href="https://www.toutiao.com/">头条新闻</a>
        </span>
        </div>
      </div>
      <div style="width: 860px; margin: 0px 0px 0px 0px">
        <p>
          {{ detailList.article }}
        </p>
      </div>
    </div>

    <div style="margin-bottom: 60px; margin-top:15px; float: right">
      <span>（ 责任编辑 : {{ detailList.author }} ）</span>
    </div>

    <!-- 回到顶部 -->
    <div>
      <el-backtop
          style="
      background-color:#ffffff;
      color: #ffc200"
          :right="100" :bottom="100"/>
      <!--
      自定义回到顶部
      <el-backtop :bottom="100">
        <div style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;">
          <el-icon :size="38" style="margin-top: 3px; margin-right: 3px">
            <Top/>
          </el-icon>
        </div>
      </el-backtop>
      -->
    </div>
  </div>

  <div>
    <!-- 其他内容 -->
    <right-sidebar ref="rightSidebar"/>
    <el-button type='primary' style='background-color: #ffc200; color: #332f2f; border-color: #ffc200;'
               title='启用' size="large" class="float-button" circle
               @click="showRightSidebar(detailList.hid)">
      <el-icon :size="25" :color="white">
        <Promotion/>
      </el-icon>
    </el-button>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import RightSidebar from "./RightSidebar.vue";

export default defineComponent({
  name: 'Detail',
  components: {
    RightSidebar
  },
  methods: {
    showRightSidebar(id) {
      this.$refs.rightSidebar.toggle(id);
    }
  }
})
</script>

<script setup>
import {getshowHeadlineDetail} from "../../api/index"
import {ref, onMounted} from "vue"
import {useRoute} from 'vue-router'

const route = useRoute() // 路由信息对象
const detailList = ref({}) //详情数据

// 获取详情初始化数据
const getDetailList = async () => {
  let result = await getshowHeadlineDetail(route.query.hid)
  detailList.value = result.headline
}

// 页面初始化钩子
onMounted(() => {
  getDetailList()
})

</script>

<style lang="less" scoped>
.Details {
  width: 860px;
  margin: 0 auto;
}

.seeDetails {
  width: 860px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    white-space: pre-wrap; /*保留编辑器中的换行符*/
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;
    /*text-indent: 2em;*/ /* 首行缩进 */
    line-height: 1.8; /* 这将使行高为字体大小的1.5倍 */
    font-size: 20px;
  }
}

.float-button {
  position: fixed;
  top: 100px;
  left: 100px;
}

</style>
