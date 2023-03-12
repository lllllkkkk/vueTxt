<template>
  <div class="singer-detail">
    <music-list :loading="loading" :songs="songs" :pic="pic" :title="title"></music-list>
  </div>
</template>

<script>
import { getSingerDetail } from '../service/singer'
import { processSongs } from '../service/song'
import MusicList from '../components/music-list/music-list.vue'
import storage from 'good-storage'
import { SINGER_KEY } from '../assets/js/constant'
export default {
  name: "singer-detail",
  props: {
    singer: Object
  },
  components: {
    MusicList
  },
  data () {
    return {
      songs: [],
      loading: true
    }
  },
  computed: {
    computedSinger () {
      let ret = null
      const singer = this.singer
      if (singer) {
        ret = singer
      } else {
        const cacheSinger = storage.session.get(SINGER_KEY)
        if (cacheSinger && cacheSinger.mid === this.$route.params.id) {
          ret = cacheSinger
        }
      }
      return ret
    },
    pic () {
      const singer = this.computedSinger
      return singer && singer.pic
    },
    title () {
      const singer = this.computedSinger
      return singer && singer.name
    },
  },
  async created () {
    if(!this.computedSinger){
      const path = this.$route.mtched[0].path
      this.$router.push({path})
      return 
    }
    const res = await getSingerDetail(this.computedSinger)
    // 获取歌曲列表
    this.songs = await processSongs(res.songs)
    this.loading = false
  }
}
</script>


<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>