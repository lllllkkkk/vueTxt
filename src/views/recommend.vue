<template>
  <div class="recommend">
    tuijian
  </div>
</template>

<script>
import { getRecommend } from '../service/recommend';
  export default {
    name:'recommend',
    async created(){
      const res = await getRecommend()
      console.log(res,'请求数据')
    }
  }
</script>

<style lang="scss" scoped>

</style>