/**
 * For API list settings
 */
const url = process.env.VUE_APP_BASE_URL;
const api = {
  systeminfo:     ()              => {return `${url}/systeminfo`},                                            // 获取后端信息
  logs:           ()              => {return `${url}/audit-logs`},                                            // 获取用户所属项目的最近日志
  users: {
    current:      ()              => {return `${url}/users/current`},                                         // 获取当前用户信息
  },
  repositories: {
    list:         ()              => {return `${url}/repositories`},                                          // 获取所有镜像仓库
    detail:       (project, repo) => {return `${url}/projects/${project}/repositories/${repo}`},              // 获取单个 Repo 详情
    artifacts:    (project, repo) => {return `${url}/projects/${project}/repositories/${repo}/artifacts`},    // 获取单个 Repo 详情
  },
  oidc: {
    onboard:      ()              => {return `/c/oidc/onboard`},                                              // 设置 OIDC 用户名
  },
}

export default api;
