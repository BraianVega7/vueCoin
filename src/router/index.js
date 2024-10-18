import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PurchaseView from '../views/PurchaseView.vue'
import MenuView from '../views/MenuView.vue'
import SaleView from '../views/SaleView'
import HistoryView from '../views/HistoryView.vue'
import AnalisisView from '@/views/AnalisisView.vue'
import InversionesView from '@/views/InversionesView.vue'
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    meta: { requiresAuth: true }
  },
  {
    path: '/purchase',
    name: 'PurchaseView',
    component: PurchaseView,
    meta: { requiresAuth: true }
  },
  {
    path: '/menu',
    name: 'MenuView',
    component: MenuView,
    meta: { requiresAuth: true }
  },
  {
    path: '/sale',
    name: 'SaleView',
    component: SaleView,
    meta: { requiresAuth: true }
  },
  {
    path: '/history',
    name: 'HistoryView',
    component: HistoryView,
    meta: {requiresAuth: true}
  },
  {
    path: '/analisis',
    name: 'AnalisisView',
    component: AnalisisView,
    meta: {requiresAuth: true}
  },
  {
    path:'/inversion',
    name: 'InversionesView',
    component: InversionesView,
    meta: {requiresAuth: true}
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.isLoggedIn) {
    next('/login');
  } else if (to.meta.requiresGuest && store.state.isLoggedIn) {
    next('/#');
  } else {
    next();
  }
});

export default router
