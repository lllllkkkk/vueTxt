import {createApp} from 'vue';
import App from './App.vue';
import router from './router/router.js';
import lazyPlugin from 'vue3-lazy';
import loadingDirective from './components/base/loading/directive';


import './assets/scss/index.scss'



createApp(App).use(router).use(lazyPlugin,{
  loading:require('./assets/images/default.png')
}).directive('loading',loadingDirective).mount('#app')