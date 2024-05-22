<template>
  <div class="right-sidebar" v-if="show">
    <div class="title">
      <h3 style="margin-left: 35%">新闻辅助阅读助手</h3>
    </div>
    <div style="margin-right: 13px">
      <!-- 文章摘要 -->
      <el-input v-model="summary" type="textarea" rows="19" class="custom-textarea"
                placeholder="文章摘要"></el-input>
    </div>
    <div>
      <el-button v-if='!loading' type="primary" class="savebtn" @click="getSummary" style="margin-left: 133px;" round>
        总结
      </el-button>
      <el-button v-if='loading' type="primary" class="savebtn" style="margin-left: 133px;" round>
        <span slot="loading">
          <span>生成中...</span>
        </span>
      </el-button>
      <el-button @click="handlerCancel" class="quitbtn" style="margin-left: 80px;" round>取消</el-button>
    </div>
  </div>
</template>

<script>
import {getHeadlineSummary} from "../../api/index"
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      show: false,
      hid: '',
      loading: false,
      summary: '文章摘要...'
      // summary: '　　党的十八大以来，我国文化遗产保护工作取得历史性成就。从“重视文物保护”，到“全面关注文物保护、传承、利用”，再到“加强文物系统性保护和合理利用”，重视文物保护之心一脉相承，具体政策因时制宜、与时俱进。今日之中国，文化遗产保护观念深入人心，视野日渐扩大。仅以不可移动文物为例，至2023年，全国各级文物保护单位数量持续增长，省级文物保护单位总量达26629处。去年起开展的第四次全国文物普查，将1911年以前的古建筑、古遗址、古墓葬、石窟寺、石刻全部纳入普查和认定范围，再次丰富了保护对象的类型。通过这次全国文物普查，将建立国家不可移动文物资源总目录，全面掌握我国不可移动文物资源情况。文化和旅游部副部长、国家文物局局长李群认为，要强化文物和非物质文化遗产、文化和自然遗产协同保护，整体保护文物本体和周边环境。文物保护单位非孤立存在，而是与周边古建筑、老宅子、老街区，乃至山水环境共根同蒂，连枝带叶，血肉相连。世界文化遗产苏州园林，是中国古典园林的典型代表。如今，无论是漫步在拙政园、退思园、网师园，还是流连于沧浪亭、狮子林、耦园，感受古典园林的精致，赏一出园林版昆曲，看一看“园林外移”的小桥流水，让人充分领略江南水乡的雅致生活。'
    };
  },
  methods: {
    toggle(id) {
      this.show = !this.show;
      this.hid = id
    },
    getSummary() {
      // 页面按钮变成生成中...
      this.loading = true
      getHeadlineSummary(this.hid).then(res => {
        this.summary = res.headlinesummary
        ElMessage({
          showClose: true,
          message: '新闻总结完成！',
          type: 'success',
        })
        this.loading = false
      })
    },
    handlerCancel() {
      // this.summary = ''
      this.show = false
    }
  }
};
</script>

<style scoped>
.right-sidebar {
  /*position: absolute;*/
  position: fixed;
  right: 5px;
  top: 0;
  width: 500px;
  height: 100%;
  background-color: #eaeefa;
  z-index: 999;
  border-radius: 16px; /* 设置圆角，右上角和右下角为8px，左上角为0px */
}

.savebtn {
  background: #ffc200;
  color: #000000;
  border-color: #ffc200;
  margin-top: 10px;
  font-size: 17px;
  font-weight: 600;
  padding: 17px 24px !important;

  &:hover,
  &:focus {
    background: #e0cf98;
    color: #000000;
    border-color: #e0cf98;
  }
}

.quitbtn {
  background: #F56C6C;
  color: #efe7e7;
  border-color: #F56C6C;
  margin-top: 10px;
  font-size: 17px;
  font-weight: 600;
  padding: 17px 24px !important;

  &:hover,
  &:focus {
    background: #deb1b1;
    color: #efe7e7;
    border-color: #deb1b1;
  }
}

/* 在你的CSS文件中定义样式 */
.custom-textarea >>> .el-textarea__inner {
  font-size: 19px; /* 根据需要修改字体大小 */
  font-family: 宋体;
  margin-left: 6px;
  line-height: 1.7;
  color: #e70e25;
  font-weight: 600;
  height: 85vh; /* 视口高度的80% */
  resize: vertical; /* 允许用户根据需要调整大小 */
  overflow: auto; /* 确保有滚动条 */
  border-radius: 12px; /* 设置圆角*/
}

</style>

