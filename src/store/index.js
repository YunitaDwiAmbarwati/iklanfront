import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { //bisa dibaca oleh semua komponen //menyimpan data secara sementara selama user menggunakan  
        status: '',
        token: localStorage.getItem('Authorization') || '', //menyimpan token ke dalam local storage
        user: {}
    },
    mutations: { //mengubah isi dari state
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, logged) {
            state.status = 'success'
            state.token = token
            state.logged = logged
        },
        userDetail(state, user) {
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
    },
    actions: { //mengeksekusi vuex ct : ketika login berhasil menguabh status
        login({ commit }, user) { //commit memmannggil mutation
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: '/login', data: user, method: 'POST' })
                    .then(response => {
                        const token = response.data.token
                        const logged = response.data.logged
                        localStorage.setItem('Authorization', token)
                            // Add the following line:
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, logged)
                            //get detail user
                        let conf = { headers: { "Authorization": "Bearer" + token } }
                        axios.get("/login/check", conf)
                            .then(response => {
                                commit('userDetail', response.data.user)
                            })
                        resolve(response)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('Authorization')
                        reject(err)
                    })
            })
        },
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: 'http://localhost:8000/register', data: user, method: 'POST' })
                    .then(response => {
                        const token = response.data.token
                        const logged = response.data.logged
                        localStorage.setItem('Authorization', token)
                            // Add the following line:
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, logged)
                        resolve(response)
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('Authorization')
                        reject(err)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('Authorization')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        userDetail: state => state.user
    }
})