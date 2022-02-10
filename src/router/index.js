import Vue from 'vue'
import VueRouter from 'vue-router'
import ConsultaFipe from '../views/ConsultaFipe.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ConsultaFipe
  },
]

const router = new VueRouter({
  routes
})

export default router
