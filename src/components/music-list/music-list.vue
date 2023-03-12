<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div :style="filterSty" class="filter"></div>
    </div>
    <scroll class="list" :style="scrollSty" @scroll="onScroll" :probe-type="3" v-loading="loading" v-no-result:[noResultText]="noResult">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../base/scroll/scroll.vue'
import SongList from '../base/song-list/song-list.vue'
const RESERVED_HEIGHT = 40
export default {
  name: 'music-list',
  components: {
    Scroll,
    SongList
  },
  props:{
    songs:{
      type:Array,
      default:() => []
    },
    pic:String,
    title:String,
    loading:Boolean,
    noResultText:{
      type:String,
      default:'抱歉，没有找到可播放的歌曲'
    }
  },
  data(){
    return{
      imageHeight:0,
      scrollY:0,
      maxTranslateY:0
    }
  },
  computed:{
    // 计算属性中，当需要用到 data 中某个属性值 大于一次的时候，我们可以将这个属性 通过赋值变量缓存起来
    // 原因：每次访问data中属性时，vue会进行依赖收集，如果多次触发依赖收集会影响性能
    noResult(){
      return !this.loading && !this.songs.length
    },
    bgImageStyle(){
      const scrollY = this.scrollY
      let zIndex = 0
      let paddingTop = '70%'
      let height = 0
      let translateZ = 0
      // 上移时距离顶部80 固定
      if(scrollY > this.maxTranslateY){
        zIndex = 10
        paddingTop = 0
        height = `${RESERVED_HEIGHT}px`
        translateZ = 1
      }

      // 下拉变大
      let scale = 1
      if(scrollY < 0){
        scale = 1 + Math.abs(scrollY / this.imageHeight)
      }
      return{
        paddingTop,
        height,
        zIndex,
        backgroundImage:`url(${this.pic})`,
        transform: `scale(${scale})translateZ(${translateZ}px)`
      }
    },

    scrollSty(){
      return{
        top:`${this.imageHeight}px`
      }
    },
    filterSty(){
      let blur = 0
      const scrollY = this.scrollY
      const imageHeight = this.imageHeight
      if(scrollY >= 0){
        blur = Math.min(this.maxTranslateY / imageHeight, scrollY / imageHeight * 30)
      }
      return{
        backdropFilter:`blur(${blur}px)`
      }
    }
  },
  mounted(){
    // 获取图片高度
      this.imageHeight = this.$refs.bgImage.clientHeight
      // 获取滚动距离
      this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT
  },
  methods:{
    goBack(){
      this.$router.back()
    },
    onScroll(pos){
      this.scrollY = -pos.y
    }
  }
}
</script>


<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    // .play-btn-wrapper {
    //   position: absolute;
    //   bottom: 20px;
    //   z-index: 10;
    //   width: 100%;

    //   .play-btn {
    //     box-sizing: border-box;
    //     width: 135px;
    //     padding: 7px 0;
    //     margin: 0 auto;
    //     text-align: center;
    //     border: 1px solid $color-theme;
    //     color: $color-theme;
    //     border-radius: 100px;
    //     font-size: 0;
    //   }

    //   .icon-play {
    //     display: inline-block;
    //     vertical-align: middle;
    //     margin-right: 6px;
    //     font-size: $font-size-medium-x;
    //   }

    //   .text {
    //     display: inline-block;
    //     vertical-align: middle;
    //     font-size: $font-size-small;
    //   }
    // }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    // overflow: hidden;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}</style>