import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Navbar from '../views/layouts/Navbar.vue'
import Navbar2 from '../views/layouts/Navbar2.vue'
import Beranda from '../views/Beranda.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Produk from '../views/Produk.vue'
import Footer from '../views/layouts/Footer.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        components: { default: Login }
    },
    {
        path: '/beranda',
        name: 'beranda',
        components: { default: Beranda, header: Navbar },
        meta: {

        }
    },
    {
        path: '/register',
        name: 'register',
        components: { default: Register },
        // meta: {
        //     requiresAuth: true
        // }
    },
    {
        path: '/produk',
        name: 'produk',
        components: { default: Produk, header: Navbar2},
        // meta: {
        //     requiresAuth: true
        // }
    },



]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router