// Polyfills for js features used in the Dashboard but not supported in some browsers (mainly IE)
import 'src/polyfills';
import Notifications from 'src/components/NotificationPlugin';
import VeeValidate from 'vee-validate';
import GlobalComponents from './globalComponents';
import GlobalDirectives from './globalDirectives';
// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from 'src/components/SidebarPlugin';
import RTLPlugin from './RTLPlugin';

// element ui language configuration
// import lang from 'element-ui/lib/locale/lang/en';
// import locale from 'element-ui/lib/locale';
// locale.use(lang);

// asset imports
import 'src/assets/sass/black-dashboard-pro.scss';
import 'src/assets/css/bootstrap-rtl.css';
import 'src/assets/css/nucleo-icons.css';
import 'src/assets/css/custom.css';
import 'src/assets/css/demo.css';

export default {
  install(Vue) {
    Vue.use(GlobalComponents);
    Vue.use(GlobalDirectives);
    Vue.use(RTLPlugin);
    Vue.use(SideBar);
    Vue.use(Notifications);
    Vue.use(VeeValidate, {
      fieldsBagName: 'veeFields'
    });
    Vue.use(require('jalali-moment'));
  }
};
