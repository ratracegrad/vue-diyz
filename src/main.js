import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import Icon from 'vue-awesome/';
import VueProgressiveImage from 'vue-progressive-image';
import './registerServiceWorker';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import 'vue-material/dist/theme/default.css';

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(VueProgressiveImage);
Vue.component('icon', Icon);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
