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
        path: '/admin/projects',
        name: 'admin-projects',
        meta: { authRequired: true },
        component: () => import('@/views/admin/projects/projects.vue')
    },
    {
        path: '/admin/projects/:project_id/:tab?',
        name: 'admin-projects-detail',
        meta: { authRequired: true },
        component: () => import('@/views/admin/projects/detail/detail.vue')
    },
    {
        path: '/admin/users',
        name: 'admin-users',
        meta: { authRequired: true },
        component: () => import('@/views/admin/users/users.vue')
    },
    {
        path: '/admin/robot-accounts',
        name: 'admin-robot-accounts',
        meta: { authRequired: true },
        component: () => import('@/views/admin/robot-accounts/robot-accounts.vue')
    },
    {
        path: '/admin/groups',
        name: 'admin-groups',
        meta: { authRequired: true },
        component: () => import('@/views/admin/groups/groups.vue')
    },
    {
        path: '/admin/labels',
        name: 'admin-labels',
        meta: { authRequired: true },
        component: () => import('@/views/admin/labels/labels.vue')
    },
    {
        path: '/admin/manage/:tab?',
        name: 'admin-configs',
        meta: { authRequired: true },
        component: () => import('@/views/admin/configs/configs.vue')
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
