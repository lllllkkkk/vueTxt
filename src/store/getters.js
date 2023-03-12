export const currentSong = (state) => {
  // 根据播放列表和播放索引获取当前播放歌曲
  return state.playlist[state.surrentIndex]
}