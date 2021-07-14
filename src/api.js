/**
 * For API list settings
 */
const url = process.env.VUE_APP_BASE_URL;
const api = {
  systeminfo:     ()              => {return `${url}/systeminfo`},                                            // 获取后端信息
  logs:           ()              => {return `${url}/audit-logs`},                                            // 获取用户所属项目的最近日志
  users: {
    current:      ()              => {return `${url}/users/current`},                                         // 获取当前用户信息
    cli_secret:   (id)            => {return `${url}/users/${id}/cli_secret`},                                // 修改用户 cli-password
  },
  repositories: {
    list:         ()              => {return `${url}/repositories`},                                          // 获取所有镜像仓库
    detail:       (project, repo) => {return `${url}/projects/${project}/repositories/${repo}`},              // 获取单个 Repo 详情
    artifacts:    (project, repo) => {return `${url}/projects/${project}/repositories/${repo}/artifacts`},    // 获取 Repo 构建记录
  },
  oidc: {
    onboard:      ()              => {return `/c/oidc/onboard`},                                              // 设置 OIDC 用户名
  },
  admin: {
    users:        ()              => {return `${url}/users`},                                                 // 获取所有用户列表
    set_admin:    (id)            => {return `${url}/users/${id}/sysadmin`},                                  // 设置用户的管理员状态
    robots:       ()              => {return `${url}/robots`},                                                // 获取机器人账户列表
    groups:       (id=null)       => {return id ? `${url}/usergroups/${id}` : `${url}/usergroups`},           // 获取组列表
  },
}

export default api;
