import Vue from 'vue'
import Router from 'vue-router'
import login from './views/Login'
import register from './views/Register'
import allQuestion from './views/Allquestion'
import addQuestion from './views/Addquestion'
import detailQuestion from './views/Detailquestion'
import editQuestion from './views/Editquestion'
import editAnswer from './views/Editanswer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login

    },
    {
      path: '/register',
      name: 'register',
      component: register

    },
    {
      path: '/question',
      name: 'allquestion',
      component: allQuestion

    },
    {
      path: '/question/add',
      name: 'addquestion',
      component: addQuestion

    },
   {
    path:'/question/:id',
    name:'detailquestion',
    component: detailQuestion
   },
   {
    path:'/',
    name:'home',
    component:allQuestion
   },
   {
     path:'/edit/question/:id',
     name:'editquestion',
     component:editQuestion
   },
   {
    path:'/edit/answer/:id',
    name:'editanswer',
    component:editAnswer
  }


  ]
})
