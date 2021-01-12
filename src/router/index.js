import Vue from 'vue'
import Router from 'vue-router'
import Pegawai from '@/pages/pegawai'
import Kriteria from '@/pages/kriteria'
import BobotKriteria from '@/pages/bobotKriteria'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pegawai',
      component: Pegawai
    },
    {
      path: '/kriteria',
      name: 'Kriteria',
      component: Kriteria
    },
    {
      path: '/bobot-kriteria',
      name: 'BobotKriteria',
      component: BobotKriteria
    }
  ],
  mode: 'history'
})
