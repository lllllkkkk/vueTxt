import { PLAY_MODE } from "../assets/js/constant"
import { shuffle } from "../assets/js/util"

// 提交 选择播放
export function selectPlay({commit},{list,index}){
  commit('setPlayMode', PLAY_MODE.sequence)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen',true)
  commit('setPlaylist', list)
  commit('setCurrentIndex',index)
}


// 提交 随机播放
export function randomPlay({commit}, list){
  commit('setPlayMode', PLAY_MODE.random)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen',true)
  commit('setPlaylist', shuffle(list))
  commit('setCurrentIndex',0)
}