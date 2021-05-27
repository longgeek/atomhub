import Vue from 'vue';
import App from './App.vue';
import router from './router/index';


/*
 * Custom Files
 */
import '@/filters';
import api from '@/api';
import http from '@/utils/http';
import vars from '@/vars';
import "@/scss/index.scss";


/*
 * Custom Global Vars
 */
Vue.prototype.$api = api;
Vue.prototype.$http = http;
Vue.prototype.$vars = vars;


/*
 * Plugins
 */
import moment from 'moment';
import BootstrapVue from 'bootstrap-vue';
import Scrollspy from 'vue2-scrollspy';
import VueMeta from 'vue-meta';
import Gravatar from 'vue-gravatar';
import animated from 'animate.css';
import Vuelidate from 'vuelidate';

var VueScrollTo = require('vue-scrollto');
Vue.config.productionTip = false;
Vue.component('v-gravatar', Gravatar);
moment.locale('zh-cn');
Vue.prototype.$moment = moment;

Vue.use(Vuelidate);
Vue.use(Scrollspy);
Vue.use(BootstrapVue);
Vue.use(VueMeta, {keyName: 'page'});
Vue.use(VueScrollTo, {duration: 3000, easing: "ease"});


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
