<template>
  <div>
    <m-header></m-header>
    <m-tab></m-tab>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/header/header.vue';
import Tab from './components/tab/tab.vue'
export default {
  components:{
    MHeader:Header,
    MTab:Tab
  }
}
</script>