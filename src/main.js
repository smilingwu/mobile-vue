import Vue from 'vue';
import * as FastClick from 'fastclick';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible';
import '@A/normalize/normalize.css';

Vue.config.productionTip = false;
// Vue.prototype.$http = axios;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
