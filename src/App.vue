<template>
  <div>
    <Header v-show="isHeader"></Header>
    <router-view></router-view>
  </div>
</template>


<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
<script setup>
import Header from './components/Header.vue'
import {computed} from "vue"
import {useRoute} from 'vue-router'

const route = useRoute() // 路由信息对象
// 判断是否显示header组件
const isHeader = computed(() => {
  return route.name !== "Login" && route.name !== "Register" && route.name !== "addOrModifyNews" && route.name !== "Detail" && route.name !== "BrowsingHistory";
})

</script>

<style lang="less" scoped>

</style>
