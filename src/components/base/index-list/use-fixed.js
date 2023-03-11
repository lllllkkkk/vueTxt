

import { ref, watch, nextTick, computed } from "vue";

export default function useFixed(props){
  const TITLE_HEIGHT = 30
  const groupRef = ref(null)
  const listHeights = ref([])
  const scrollY = ref(0)
  const currentIndex = ref(0)
  const distance = ref(0)
  

  // 返回该高度对应的 title
  const fixedTitle = computed(() => {
    if(scrollY.value < 0){
      return ''
    }
    const currentGroup = props.data[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })

  // 当当前高度距上个title的距离小于30的时候添加动画样式
  const fixedSty = computed(() => {
    const distanceVal = distance.value
    const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT) ? distanceVal - TITLE_HEIGHT : 0
    return{
      transform:`translate3d(0,${diff}px,0)`
    }
  })

  watch(() => props.data, async () => {
    await nextTick()
    calculate()
  })


  // 监听 y 值 的变化
  watch(scrollY,(newY) => {
    const listHeightsVal = listHeights.value
    for(let i = 0; i < listHeightsVal.length - 1; i++){
      const heightTop = listHeightsVal[i] // 模块顶部的值
      const heightBottom = listHeightsVal[i+1] // 模块底部的值
      if(newY >= heightTop && newY <= heightBottom){ // 判断是否在此区间
        currentIndex.value = i // 获取index值
        distance.value = heightBottom - newY // 计算偏移量,在滚动过程中计算距离

      }
    }
  })

  // 计算高度
  // 获取每个模块的高度
  function calculate(){
    const list = groupRef.value.children
    const listHeightsVal = listHeights.value
    let height = 0
    listHeightsVal.length = 0
    
    listHeightsVal.push(height)
    for(let i = 0; i < list.length; i++){
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
  }

  // 获取 y 值 由子组件 scroll 传递而来
  function onScroll(pos){
    scrollY.value = -pos.y
  }

  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedSty,
    currentIndex
  }
}