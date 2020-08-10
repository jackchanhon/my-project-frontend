import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import axios from 'axios'
import router from './router'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(Vuex)
Vue.prototype.$http = axios


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

