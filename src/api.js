/**
 * For API list settings
 */
const url = process.env.VUE_APP_BASE_URL;
const api = {
  ping: {
    oidc:           ()              => {return `${url}/system/oidc/ping`},                                      // 测试 OIDC 服务器
    email:          ()              => {return `${url}/email/ping`},                                            // 测试 EMAIL 服务器
  },
  CVEAllowlist:     ()              => {return `${url}/system/CVEAllowlist`},                                   // CVE 特赦名单
  systeminfo:       ()              => {return `${url}/systeminfo`},                                            // 获取后端信息
  schedule:         ()              => {return `${url}/system/gc/schedule`},                                    // 垃圾清理
  history:          ()              => {return `${url}/system/gc`},                                             // 垃圾清理历史记录
  historyLog:       (id)            => {return `${url}/system/gc/${id}/log`},                                   // 垃圾清理历史任务的日志
  logs:             ()              => {return `${url}/audit-logs`},                                            // 获取用户所属项目的最近日志
  users: {
    current:        ()              => {return `${url}/users/current`},                                         // 获取当前用户信息
    cli_secret:     (id)            => {return `${url}/users/${id}/cli_secret`},                                // 修改用户 cli-password
  },
  projects: {
    detail:         (id)            => {return `${url}/projects/${id}`},                                        // 获取单个 Project 详情
    repositories:   (project)       => {return `${url}/projects/${project}/repositories`},                      // 获取单个 Project 的所有镜像
    repositorie:    (project, repo) => {return `${url}/projects/${project}/repositories/${repo}`},              // 移除单个镜像
    members:        (pid, mid=null) => {
        return mid ?  `${url}/projects/${pid}/members/${mid}` : `${url}/projects/${pid}/members`
    },                                                                                                          // 获取单个 Project 的所有成员
    logs:           (project)       => {return `${url}/projects/${project}/logs`},                              // 获取单个 Project 的所有日志
  },
  repositories: {
    list:           ()              => {return `${url}/repositories`},                                          // 获取所有镜像仓库
    detail:         (project, repo) => {return `${url}/projects/${project}/repositories/${repo}`},              // 获取单个 Repo 详情
    artifacts: {
      list:         (project, repo) => {return `${url}/projects/${project}/repositories/${repo}/artifacts`},    // 获取 Repo Artifacts 列表
      detail:       (project,
                     repo,
                     artifacts)     => {return `${url}/projects/${project}/repositories/${repo}/artifacts/${artifacts}`},            // 获取 Repo Artifacts 详情
      tags:         (project,
                     repo,
                     artifacts,
                     tag=null)      => {return tag ? `${url}/projects/${project}/repositories/${repo}/artifacts/${artifacts}/tags/${tag}` : `${url}/projects/${project}/repositories/${repo}/artifacts/${artifacts}/tags`},       // 获取 Repo Artifacts 下的 Tags
    },
  },
  oidc: {
    onboard:        ()              => {return `/c/oidc/onboard`},                                              // 设置 OIDC 用户名
  },
  admin: {
    quotas:         (id=null)       => {return id ? `${url}/quotas/${id}` : `${url}/quotas`},                   // 获取配额信息
    summary:        (id)            => {return `${url}/projects/${id}/summary`},                                // 获取项目统计信息
    statistics:     ()              => {return `${url}/statistics`},                                            // 获取统计信息
    configurations: ()              => {return `${url}/configurations`},                                        // 获取配置信息
    projects:       ()              => {return `${url}/projects`},                                              // 获取所有项目列表
    users:          ()              => {return `${url}/users`},                                                 // 获取所有用户列表
    set_admin:      (id)            => {return `${url}/users/${id}/sysadmin`},                                  // 设置用户的管理员状态
    robots:         ()              => {return `${url}/robots`},                                                // 获取机器人账户列表
    groups:         (id=null)       => {return id ? `${url}/usergroups/${id}` : `${url}/usergroups`},           // 获取组列表
    projects:       (id=null)       => {return id ? `${url}/projects/${id}` : `${url}/projects`},               // 获取项目列表、详情
    labels:         (id=null)       => {return id ? `${url}/labels/${id}` : `${url}/labels`},                   // 获取标签列表

  },
}

export default api;
