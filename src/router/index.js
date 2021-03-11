import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'

import Home from '@/views/home'
import List from '@/views/home/home'
import Lists from '@/views/list'
import open from '@/views/open'

// 引入 nprogress 进度条
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入


Nprogress.configure({
  showSpinner: false
})
Vue.use(VueRouter)
const routes = [{
    path: '/',
    component: Home,
    children: [{
        path: '/',
        component: List,
        meta: {
          icon: 'el-icon-house',
          name: '首页',
          index: 0
        }
      },

      {
        path: '/open',
        component: open,
        meta: {
          icon: 'el-icon-house',
          name: '投票管理',
          index: 2,
          path: '/open'
        }
      },


      {
        path: '',
        component: Lists,
        meta: {
          icon: 'el-icon-platform-eleme',
          name: '高级',
          index: 0,
        },
        children: [{
          path: '/lists',
          component: List,
          meta: {
            name: '投票',
            index: 1,
            path: '/lists'
          }
        }]
      },

    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  Nprogress.start()
  next()
})

router.beforeEach((to, from, next) => {
  Nprogress.done()
  next()
})
export default router