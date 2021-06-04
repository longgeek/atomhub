/**
 * For API list settings
 */
const url = process.env.VUE_APP_BASE_URL;
const api = {
    users: {
        current:            ()              => { return url + '/users/current' },       // 获取当前用户信息
    },
    repositories: {
        list:               ()              => { return url + '/repositories' },        // 获取所有镜像仓库
    }
}

export default api;
