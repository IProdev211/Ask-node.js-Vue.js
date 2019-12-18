import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterPrefetch from 'vue-router-prefetch'
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';


// router setup
import backend from './backend';
import router from './routes/router';
import './registerServiceWorker'
import CKEditor from '@ckeditor/ckeditor5-vue';
import VuePlyr from 'vue-plyr';
import NProgress from 'nprogress';
import VueMeta from 'vue-meta';
var VueScrollTo = require('vue-scrollto');

// plugin setup
Vue.use(RouterPrefetch);
Vue.use(VueRouter);
Vue.use(DashboardPlugin);
Vue.use(VueScrollTo);
Vue.use(CKEditor);
Vue.use(VuePlyr);
Vue.use(NProgress);
Vue.use(VueMeta);

import 'nprogress/nprogress.css';
import './assets/sass/nprogress.scss';

import store from './store';

function start(data) {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    data
  });
}
backend
  .get('/home')
  .then(response => {
    start({
      user: response.data.user,
      topCourses: response.data.topCourses,
      topPosts: response.data.topPosts,
      seconds: response.data.seconds,
      courses: response.data.courses,
      episodes: response.data.episodes
    });
  })
  .catch(() => {
    start({
      user: undefined
    });
  });
