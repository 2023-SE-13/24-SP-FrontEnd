import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Company from '../views/Company.vue'
import EnterpriseRegister from '../views/CompanyRegister.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/main'
  },
  {
    path:'/home',
    component:()=>import('@/views/HomeView.vue'),
    children:[
      {
        path:'/main',
        component:()=>import('@/views/HomePage')
      },
      {
        path: '/company',
        name:'Company',
        component: Company
      },
      {
        path: '/company-register',
        name: 'CompanyRegister',
        component: EnterpriseRegister
      }
    ]
  },
  {
    path: '/login',
    name:'Login',
    component: Login
  },
  {
    path: '/company',
    name:'Company',
    component: Company
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
