import Vue from 'vue'
import App from './App.vue'
import Croppa from 'vue-croppa';

import router from './router'

Vue.config.productionTip = false
Vue.use(Croppa);

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
