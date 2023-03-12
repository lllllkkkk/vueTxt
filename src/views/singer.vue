<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers" @select="selectSinger"></index-list>
    <router-view v-slot="{Component}">
      <transition appear name="slide">
        <component :is="Component" :singer="selectedSinger"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import IndexList from '../components/base/index-list/index-list.vue'
import storage from 'good-storage'
import { SINGER_KEY } from '../assets/js/constant'
import { getSingerList } from '../service/singer'
export default {
  name: 'singer',
  components: {
    IndexList
  },
  data () {
    return {
      singers: [],
      selectedSinger: null,
    }
  },
  async created () {
    const res = await getSingerList()
    this.singers = res.singers
  },
  methods: {
    // 点击歌手，跳转进入详情页
    selectSinger (item) {
      this.selectedSinger = item
      this.cacheSinger(item)
      this.$router.push({
        path: `/singer/${item.mid}`
      })
    },

    cacheSinger (singer) {
      storage.session.set(SINGER_KEY, singer)
    }
  },
}
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>