import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  mode: 'history',
  routes, // short for routes: routes
  linkActiveClass: 'active'
});
router.beforeResolve((to, from, next) => {
  let needAuth = false;
  for (const rule of to.matched) {
    if (rule.meta.auth) {
      needAuth = true;
      break;
    }
  }
  if (router.app.$data.user) {
    if (to.name === 'Login' || to.name === 'Register' || to.name === 'Forgot Password' || to.name === 'Lock') {
      return next('');
    }
  } else if (needAuth) {
    return next('login');
  }
  next();
});

export default router;
