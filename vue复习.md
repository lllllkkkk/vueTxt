# vue 原理




























# v-if 与 v-show 之间的区别？
    v-if : 条件性的渲染一块内容，这块内容只有当表达式返回值为true的时候会被渲染；拓展 ：v-else-if v-else
           绑定key值，原因是 vue 通常会复用已有元素而不是从头渲染,绑定key值用来表达这两个元素是独立的，不要复用
    v-show:用法与v-if大致相同，不同的是带有 v-show 的元素始终会被渲染并保留到 dom 中 ，v-show 只是简单切换元素的display

    区别：v-if 是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当的被销毁和重建；
         v-if 也是惰性的 ，如果初始渲染条件为假，则什么也不做，直到条件第一次变为真时才会开始渲染条件块；
         v-show 不管初始条件是什么，元素总会被渲染；
         v-if 有更高的切换开销，v-show 有更高的初始渲染开销，因此，如果需要非常频繁的切换 使用v-show较好；如果运行条件很少改变是 使用v-if

# class 与 style 如何动态绑定？
    :class : <div :class="{ active: isActive }"> 文本内容 </div>  // 表示 active 这个class 是否存在取决于 isActive 的真假值; :class 可以和一般的 class 共存
            还可以绑定多个 class <div :class="{ active: isActive, 'class-name' : isHave}"></div> 
            可以直接绑定一个对象  
```javascript
data(){
  return {
    classObject:{
      active:true
    }
  }
}
```
```html
<div :class="classObejct">文本内容</div>
```
     也可以绑定一个返回对象的计算属性
```js
data(){
  return{
    isAtive:true,
    error:null
  }
},
computed:{
  classObject(){
    return{
      active:this.isAtive && !this.error
    }
  }
}
```
```html
<div :class="classObject"></div>
```
  可以给:class绑定一个数组来渲染多个 css class
```js
data(){
  return{
    activeClass:'active',
    className:'class-name'
  }
}
```
```html
<div :class="[activeClass,className]"></div>
```
    在组件上使用 :calss 时: 当只有一个根元素的组件时，这些 class 会被添加到根元素上，并与该元素上已有的 class 合并；
                          多个根元素的组件时：可以指定某个 根元素来接收这个 class 可以通过组件的 $attrs (子组件：:class = "$attrs.class") 属性来实现指定 
    :style : 语法:```<div :style="{'font-size':fontSize + 'px'}"></div>```

# vue 响应式基础
## 修改 data 中的属性时，模版对应的插值也会渲染成新的数据，这是怎么做到的呢？




#





    
    
    
    
    
    
    
    
    
    
