import { PLAY_MODE } from '../assets/js/constant'

const state = {
  // 顺序播放列表
  sequenceList:[],
  // 真实播放列表(顺序播放，循环播放，随机播放)
  playList:[],
  // 是否正在播放
  playing:false,
  // 播放模式
  playMode:PLAY_MODE.sequence,
  // 当前播放索引
  currentIndex:0,
  // 播放状态 (全屏/收缩在底部)
  fullScreen:false
}

export default state