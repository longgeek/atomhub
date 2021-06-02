import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home.vue')
    },
    {
        path: '/repos:search?',
        name: 'repos',
        component: () => import('@/views/repos/repos.vue')
    },
    {
        path: '/repos/:repo',
        name: 'repos-detail',
        component: () => import('@/views/repos/detail')
    },
    {
        path: '/profile',
        name: 'profile',
        meta: { authRequired: true },
        component: () => import('@/views/profile/profile.vue')
    },
    {
        path: '/settings',
        name: 'settings',
        meta: { authRequired: true },
        component: () => import('@/views/settings/settings.vue')
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
