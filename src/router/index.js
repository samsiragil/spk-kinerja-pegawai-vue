import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Pegawai from '@/pages/pegawai'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/pegawai',
      name: 'Pegawai',
      component: Pegawai
    }
  ],
  mode: 'history'
})
