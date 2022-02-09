import Vue from 'vue'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import BaseService from './services/BaseService'

Vue.config.productionTip = false
BaseService.init(process.env.VUE_APP_API_BASE_URL)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
