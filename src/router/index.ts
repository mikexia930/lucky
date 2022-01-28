import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from) => {
  // (document.title as any) = to.meta.title;
});

export default router;
