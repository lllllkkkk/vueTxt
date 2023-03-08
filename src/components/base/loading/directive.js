import Loading from './loading.vue'
import createLoadingLikeDirective from '../../../assets/js/create-loading-like-directive.js'

const loadingDirective = createLoadingLikeDirective(Loading)

export default loadingDirective

// import { createApp } from "vue"

// const loadingDirective = {
//   mounted(el,binding){
//     const app = createApp(Loading)
//     const instance = app.mount(document.createElement('div'))
//     el.instance = instance
//     if(binding.value){
//       append(el)
//     }
//   },
//   updated(el,binding){
//     if(binding.value !== binding.oldValue){
//       binding.value ? append(el) : removed(el)
//     }
//   }
// }

// function append(el){
//   el.appendChild(el.instance.$el)
// }

// function removed(el){
//   el.removeChild(el.instance.$el)
// }

// export default loadingDirective