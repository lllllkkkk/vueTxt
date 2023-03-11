import { computed, ref } from "vue";

export default function useShortcut (props, groupRef) {
  const ANCHOR_HEIGHT = 18
  const scrollRef = ref(null)

  const touch = {}

  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })

  // 手指点击右侧导航栏对应效果
  function onShortcutTouchStart (e) {
    const anchorIndex = parseInt(e.target.dataset.index)
    touch.y1 = e.touches[0].pageY
    touch.anchorIndex = anchorIndex
    scrollTo(anchorIndex)
  }

  // 手指滑动右侧导航栏效果
  function onShortcutTouchMove (e) {
    touch.y2 = e.touches[0].pageY
    const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
    const anchorIndex = touch.anchorIndex + delta
    scrollTo(anchorIndex)

  }

  // 封装相同逻辑代码
  // 获取索引
  function scrollTo(index){
    if (isNaN(index)) {
      return
    }
    index = Math.max(0,Math.min(shortcutList.value.length - 1,index))
    const targetEl = groupRef.value.children[index]
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(targetEl, 0)
  }
  return {
    shortcutList,
    onShortcutTouchStart,
    scrollRef,
    onShortcutTouchMove
  }
}