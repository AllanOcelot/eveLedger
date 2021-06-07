import Vue from 'vue'
import VueRouter from 'vue-router'

// Website specific
import Home from '../views/Home.vue'
import FAQ from '../views/FAQ.vue'

// App specific
import Callback from '../views/Callback.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [

  // Home page dummy.
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  // Used during authenitcaiton as callback end point from the API.
  {
    path: '/callback/',
    name: 'Callback',
    component: Callback
  },

  // The Dashboard houses the majority of the application.
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },

  // FAQ Page
  {
    path: '/faq',
    name: 'faq',
    component: FAQ
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
