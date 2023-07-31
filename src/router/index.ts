import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:tab',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/',
    redirect: '/Marketing',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
