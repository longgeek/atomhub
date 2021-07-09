import Vue from 'vue';
import App from './App.vue';
import router from './router/index';


/*
 * Custom Files
 */
import '@/filters';                                             // 过滤器
import api from '@/api';                                        // 所有 API 列表
import http from '@/utils/http';                                // HTTP 拦截器
import vars from '@/vars';                                      // 全局静态变量
import cols from '@/columns/main';                              // 表格列头
import "@/scss/index.scss";                                     // 样式入口文件


/*
 * Custom Global Vars
 */
Vue.prototype.$api = api;
Vue.prototype.$http = http;
Vue.prototype.$vars = vars;
Vue.prototype.$cols = cols;
Vue.prototype.$sleep = function(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


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
import Clipboard from 'v-clipboard';
import { Table, Pagination } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.min.css';

var VueScrollTo = require('vue-scrollto');
Vue.config.productionTip = false;

moment.locale('zh-cn');
Vue.prototype.$moment = moment;

Vue.component('v-gravatar', Gravatar);
Vue.prototype.$gravatar = {
    host: 'gravatar.zeruns.tech',
    defaultImg: 'monsterid',
}

Vue.use(Vuelidate);
Vue.use(Scrollspy);
Vue.use(BootstrapVue);
Vue.use(VueMeta, {keyName: 'page'});
Vue.use(VueScrollTo, {duration: 3000, easing: "ease"});
Vue.use(Clipboard);
Vue.use(Table);
Vue.use(Pagination);


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
