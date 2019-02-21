import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';

// router setup
import router from './routes/router';
import i18n from './i18n';
import VuePlyr from 'vue-plyr';
import VueSweetalert2 from 'vue-sweetalert2';
import VueParticles from 'vue-particles';
import VueCarousel from 'vue-carousel';

// plugin setup
Vue.use(DashboardPlugin);
Vue.use(VuePlyr);
Vue.use(VueSweetalert2);
Vue.use(VueParticles);
Vue.use(VueCarousel);

import 'vue-plyr/dist/vue-plyr.css';
import 'vue-sweetalert2/node_modules/sweetalert2/dist/sweetalert2.css';

import store from './store';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  i18n
});
