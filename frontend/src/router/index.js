import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Profile from '@/components/Profile'
import Login from '@/components/Login'
import Logout from '@/components/Logout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {
        requireAuth: true
      },
      component: Profile
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
})
