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
        path: '/repos/:project/:repo',
        name: 'repos-detail',
        component: () => import('@/views/repos/detail/detail.vue')
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
        path: '/logs',
        name: 'logs',
        meta: { authRequired: true },
        component: () => import('@/views/logs/logs.vue')
    },
    {
        // 用户第一次登录需要确认用户名
        // 该 url 由后端 redirect 过来
        path: '/oidc-onboard:username?',
        name: 'oidc-onboard',
        component: () => import('@/views/oidc-onboard.vue')
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
