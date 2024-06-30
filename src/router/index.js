import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Company from '../views/CompanyView.vue'
import EnterpriseRegister from '../views/CompanyRegister.vue';
import User from "@/views/User.vue";
import ShareWrite from "@/views/ShareWrite.vue";
import EnterpriseEditor from '../views/CompanyEditor.vue';
import Register from "@/views/Register.vue";
import Password from "@/views/Password.vue";
import EnterpriseSearch from '../views/CompanySearch.vue';
import CompanyListView from '@/views/CompanyListView.vue';
import UserListView from '@/views/UserListView.vue'
import PostView from "@/views/PostView.vue";
import CompanyEditorTemp from '@/views/CompanyEditorTemp.vue';
import Tweet from '@/views/Tweet.vue'


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
        path: '/company-editor',
        name: 'CompanyEditer',
        component: EnterpriseEditor
      },
      {
        path: '/company-temp',
        component: CompanyEditorTemp
      }
      ,
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
      },
      {
        path: '/tweet/:id',
        name: 'Tweet',
        component: Tweet
      },
      {
        path:'/postview/:id',
        name:'PostView',
        component: PostView
      },
      {
        path: '/user/:name',
        name: 'User',
        component: User
      },
      {
        path: '/user/:name/shareWrite',
        name: 'ShareWrite',
        component: ShareWrite
      },
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
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path:'/password',
    name:'Password',
    component: Password
  },
  {
    path:'/postview',
    name:'PostView',
    component: PostView
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
