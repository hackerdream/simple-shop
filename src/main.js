// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false;
Vue.prototype.$http = axios

Vue.use(VueLazyLoad,{
  loading:"/static/loading-svg/loading-bars.svg" 
})
Vue.use(infiniteScroll);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  //render: h => h(App),
  components: {
    App
  }
}); //.$mount('#app')
