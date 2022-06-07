import Vue from 'vue'
import App from './App.vue'
import Croppa from 'vue-croppa';
import Note from './components/Note.vue';

import router from './router'

Vue.config.productionTip = false
Vue.use(Croppa);
Vue.component('Note', Note);

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
