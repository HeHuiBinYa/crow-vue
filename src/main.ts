import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import {createPinia} from "pinia";

import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'

createApp(App)
    .use(router)
    .use(createPinia())
    .use(TDesign)
    .mount('#app')
