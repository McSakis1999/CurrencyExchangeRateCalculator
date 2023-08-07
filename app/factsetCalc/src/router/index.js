import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Edit from '../views/Edit.vue'
import UpdateCurrency from '../views/UpdateCurrency.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name : 'signup',
      component: SignUp
    },
    {
      path: '/login',
      name : 'login',
      component: LogIn
    },
    {
      path: '/edit/:id',
      name : 'edit',
      component: Edit
    },
    {
      path: '/editCurrency',
      name: 'editCurrency',
      component: UpdateCurrency
    }
  ]
})

export default router
