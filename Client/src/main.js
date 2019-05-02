import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';

// router setup
import router from './routes/router';
import CKEditor from '@ckeditor/ckeditor5-vue';
import backend from './backend';
import VuePlyr from 'vue-plyr';
import VueSweetalert2 from 'vue-sweetalert2';
import VueParticles from 'vue-particles';
import NProgress from 'nprogress';

// plugin setup
Vue.use(DashboardPlugin);
Vue.use(CKEditor);
Vue.use(VueSweetalert2);
Vue.use(VueParticles);
Vue.use(VuePlyr);
Vue.use(NProgress);

import 'vue-plyr/dist/vue-plyr.css';
import 'vue-sweetalert2/node_modules/sweetalert2/dist/sweetalert2.css';
import 'nprogress/nprogress.css';

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
const defaultBlogPosts = [
  {
    id: '5c44hddb45f5f8340747961e4',
    slug: 'introduction-into-ielts',
    category: 'IELTS',
    thumb: '/img/frontend/intro-ielts-askarya.png',
    title: 'An introduction into IELTS.',
    createdAt: '2018-05-28',
    viewCount: 47571
  },
  {
    id: '5c44hddb45f53w40747945e4',
    slug: 'lets-talk-about-numbers',
    category: 'General',
    thumb: '/img/frontend/numbers-askarya.png',
    title: "Let's talk about numbers.",
    createdAt: '2018-06-20',
    viewCount: 53485
  },
  {
    id: '5c44hddb45f53w40747961e4',
    slug: 'expressions-of-sympathy',
    category: 'General',
    thumb: '/img/frontend/sympathy-askarya.png',
    title: 'Expressions of sympathy',
    createdAt: '2018-06-29',
    viewCount: 40862
  },
  {
    id: '5c44hddb45f53w40747961e4',
    slug: 'easily-confused-words-in-english',
    category: 'General',
    thumb: '/img/frontend/32confusingwords-askarya.png',
    title: 'Easily Confused Words in English.',
    createdAt: '2018-07-06',
    viewCount: 48802
  }
];
backend
  .get('/home')
  .then(response => {
    start({
      user: response.data.user,
      topCourses: response.data.topCourses,
      //topPosts: response.data.topPosts,
      topPosts: defaultBlogPosts
    });
  })
  .catch(() => {
    start({
      user: undefined
    });
  });
