import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Planner from '@/components/Planner'
import CreateNotes from '@/components/CreateNotes'
import ViewNote from '@/components/ViewNote'
import EditNote from '@/components/EditNote'
import Completed from '@/components/Completed'
import Week from '@/components/Week'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/planner',
      name: 'planner',
      component: Planner
    },
    {
      path: '/planner/create',
      name: 'planner-create',
      component: CreateNotes
    },
    {
      path: '/planner/:noteId',
      name: 'note',
      component: ViewNote
    },
    {
      path: '/planner/:noteId/edit',
      name: 'planner-edit',
      component: EditNote
    },
    {
      path: '/completed',
      name: 'planner-completed',
      component: Completed
    },
    {
      path: '/weekly',
      name: 'weekly',
      component: Week
    }
  ]
})
