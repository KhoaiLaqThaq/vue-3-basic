import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createApp } from 'vue';
import App from '@/App.vue';
import store from '@/store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  } from '@/assets/plugins/font-awesome';

import router from '@/router';

createApp(App)
    .use(store)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app');
