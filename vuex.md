## vuex 是什么，什么情况下使用vuex？
vuex 是专为vue 提供的状态管理模式；采用集中式存储管理应用的所有组件状态，并以相应的规则保证状态以一种可预测的方式发生变化；
当构建一个中大型单页应用时，多个组件进行复杂传值很困难的时候，可以将组件的共享状态抽取出来存储在一个公共的存储空间去存储，更好的在组件外部管理状态；

## 核心概念
state: 需要共享的属性定义在这里。在组件中这样调用：import { mapState } from 'vuex' ; 在计算属性里添加 ...mapState(['属性名'])
getters: 在内部定义方法，接受一个参数，这个参数就是 state 里定义的属性，方法会有个返回值。
         在组件中这样调用：import { mapGetters } from 'vuex' ; 在计算属性里添加 ...mapGetters(['方法名'])
         可以这样理解，getters 相当于 state 的计算属性；
mutations：定义个方法，接收两个参数，参数一：就是 state 支持共享的属性，参数二：接收组件传来的属性；
           作用：修改 state 中的值，可以将传递过来的参数二赋值给state中的某个属性；要想修改 state 中的值，只能在 mutations 里进行修改；
action：类似于 mutation ，但是action最终提交的是 mutation 而不是直接变更状态， 支持任意异步操作；在组件中通过 dispatch 触发
module：当 store 对象变得臃肿，难以维护的时候，可以使用 module 进行分割，将不同功能的 store 存储在不同的module内；