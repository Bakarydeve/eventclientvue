import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AboutView from '../views/AboutView.vue'
import Login from '../views/Login.vue'
import Evenement from '../views/Evenement.vue'
import Membre from '../views/Membre.vue'
import Deconnexion from '../views/Deconnexion.vue'
import Lieu from '../views/Lieu.vue'
import Gestion from '../views/Gestion.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView

  },
  {
    path: '/login',
    name: 'Login',
    component: Login

  },
  {
    path: '/events',
    name: 'Evenement',
    component: Evenement

  },
  {
    path: '/membres',
    name: 'Membre',
    component: Membre

  },
  {
    path: '/logout',
    name: 'Deconnexion',
    component: Deconnexion

  },
  {
    path: '/lieu',
    name: 'Lieu',
    component: Lieu

  },
  {
    path: '/gestion',
    name: 'Gestion',
    component: Gestion

  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
