import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/repos',
    },
    {
        path: '/repos',
        name: 'repos',
        component: () => import('@/views/repos/repos')
    },
    {
        path: '/repos/:repo',
        name: 'repos-detail',
        component: () => import('@/views/repos/detail')
    },
    {
        path: '*',
        name: 'error',
        component: () => import('@/views/error')
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import('@/views/logout')
    },
]

export default routes
