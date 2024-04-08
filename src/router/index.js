import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PurchaseView from '../views/PurchaseView.vue'
import MenuView from '../views/MenuView.vue'
import SaleView from '../views/SaleView'
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/Login',
    name: 'LoginView',
    component: LoginView,
    meta: { requiresAuth: true }
  },
  {
    path: '/Purchase',
    name: 'PurchaseView',
    component: PurchaseView,
    meta: { requiresAuth: true }
  },
  {
    path: '/Menu',
    name: 'MenuView',
    component: MenuView,
    meta: { requiresAuth: true }
  },
  {
    path: '/Sale',
    name: 'SaleView',
    component: SaleView,
    meta: { requiresAuth: true }
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
