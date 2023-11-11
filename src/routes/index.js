import { createRouter,  createWebHistory } from "vue-router";
import store from '../store/';

import HomeView from '../views/HomeView.vue';

const DEFAULT_TITLE = 'Replay de MERCADO';

const setTitle = (to) => {
    document.title = to.meta.title || DEFAULT_TITLE;
}

const routes = [
  { path: '/', component: HomeView },
  { path: '/profile', component: () => import('../views/ProfileView.vue'), meta: { requiresAuth: true, title: `Profile - ${DEFAULT_TITLE}`}},
  { path: '/replay', component: () => import('../views/ReplayView.vue'), meta: { requiresAuth: true, title: `Replay - ${DEFAULT_TITLE}` }},
  { path: '/login', component: () => import('../views/LoginView.vue'), meta: { title: `Login - ${DEFAULT_TITLE}`}},
  { path: '/about', component: () => import('../views/AboutView.vue'), meta: { title: `About - ${DEFAULT_TITLE}`}},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    setTitle(to);

    const currentUser = store.state.userModule.user;

    if (to.meta.requiresAuth && !currentUser.id) {
        console.log('1')
        next("/login");
    } else if (to.path == "/login" && currentUser.id) {
        console.log('2')
        next("/");
    } else {
        console.log('3')
        next();
    }
});

export default router;