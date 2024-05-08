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
    <div style="margin-bottom: 10px; float: right">
      <span>编辑 : {{ detailList.author }}</span>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Detail'
})
</script>
<script setup>
import {getshowHeadlineDetail} from "../../api/index"
import {ref, onMounted} from "vue"
import {useRoute} from 'vue-router'
import {useUserInfoStore} from "../../stores/userInfo.js";
import pinia from "../../stores/index.js";

const route = useRoute() // 路由信息对象

const userInfoStore = useUserInfoStore(pinia)
const nickName = userInfoStore.nickName

const detailList = ref({}) //详情数据
//获取详情初始化数据
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
</style>
