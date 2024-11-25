import { createRouter, createWebHistory } from 'vue-router';

// Định nghĩa các route
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/in-game',
    name: 'In game room',
    component: () => import('../views/InGame.vue'),
  },
];

// Tạo router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
