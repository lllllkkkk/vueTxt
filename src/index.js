import {createApp} from 'vue';
import App from './App.vue';
import store from './store/index'
import router from './router/router.js';
import lazyPlugin from 'vue3-lazy';
import loadingDirective from './components/base/loading/directive';
import noResultDirective from './components/base/no-result/directive';


import './assets/scss/index.scss'



createApp(App).use(store).use(router).use(lazyPlugin,{
  loading:require('./assets/images/default.png')
}).directive('loading',loadingDirective).directive('no-result',noResultDirective).mount('#app')