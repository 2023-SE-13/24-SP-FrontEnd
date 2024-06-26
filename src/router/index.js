import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Company from '../views/Company.vue'
import EnterpriseRegister from '../views/CompanyRegister.vue';
import User from "@/views/User.vue";
import EnterpriseEditer from '../views/CompanyEditer.vue';
import Register from "@/views/Register.vue";
import Password from "@/views/Password.vue";
import EnterpriseSearch from '../views/CompanySearch.vue';
import CompanyListView from '@/views/CompanyListView.vue';
import UserListView from '@/views/UserListView.vue'


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
      },
      {
        path:'/company-list',
        component:CompanyListView
      },
      {
        path:'/user-list',
        component:UserListView
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
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path:'/password',
    name:'Password',
    component: Password
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
