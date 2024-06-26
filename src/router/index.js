import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Company from '../views/Company.vue'
import EnterpriseRegister from '../views/CompanyRegister.vue';
import User from "@/views/User.vue";
import EnterpriseEditer from '../views/CompanyEditer.vue';
import EnterpriseSearch from '../views/CompanySearch.vue';

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
      },
      {
        path: '/company-editer',
        name: 'CompanyEditer',
        component: EnterpriseEditer
      },
      {
        path: '/company-search',
        name: 'CompanySearch',
        component: EnterpriseSearch
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
  },
  {
    path: '/user',
    name: 'User',
    component: User
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
