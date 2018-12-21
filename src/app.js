import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Home from './views/Home.vue'

// Store
import store from '../store'

// Css
//require('./style/main.scss')

Vue.use(VueRouter)

const router = new VueRouter({
    //mode: 'history',
    linkExactActiveClass: 'active',
    routes: [
        {path: '/', component: Home}
    ]
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')