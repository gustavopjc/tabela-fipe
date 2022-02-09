import Vue from 'vue'
import VueRouter from 'vue-router'
import ConsultaFipe from '../views/ConsultaFipe.vue'
import Teste from '../views/Teste.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ConsultaFipe
  },
  {
    path: '/teste',
    name: 'Teste',
    component: Teste
  },
]

const router = new VueRouter({
  routes
})

export default router
