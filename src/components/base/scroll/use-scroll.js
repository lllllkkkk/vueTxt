import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
BScroll.use(ObserveDOM)

import { onMounted, onUnmounted, ref } from 'vue'

export default function useScroll(wrapperRef,options, emit){
  const scroll = ref(null)
  onMounted(() => {
    const scrollVal =  scroll.value = new BScroll(wrapperRef.value,{
      observeDOM:true,
      ...options
    })

    if(options.probeType > 0){
      scrollVal.on('scroll', (pos) => {
        emit('scroll' , pos)
      })
    }
    
  })
  onUnmounted(() => {
    scroll.value.destroy()
  })

  return scroll
}


// 子传父 派发事件
// setup 第二个参数是个对象，可以在这个对象里获取 emit 函数
// 传递时语法 emit('事件名称' , 传递参数) 不再需要 this.$ 形式
// 定义 emits 数组，数组内是 事件名称，emits 数组在 export default 里面声明