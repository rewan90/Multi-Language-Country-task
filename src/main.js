import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './App.vue'
import router from './router'
// import store from './stores'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import i18n from "./i18n"

const app = createApp(App)


app.use(router)
app.use(i18n)
// app.use(store)

app.mount('#app')
