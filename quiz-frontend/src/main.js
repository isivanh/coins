import 'materialize-css/dist/css/materialize.min.css'
import 'material-icons/iconfont/material-icons.css';

import { createApp } from 'vue'
import router from './router/router'
import App from './App.vue'

createApp(App)
    .use(router)
    .mount('#app')
