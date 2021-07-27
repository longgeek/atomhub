<script>
/**
 * Home component
 */
export default {
    page: { title: 'AtomHub 首页' },
};
</script>

<template>
<div>
    <div
        class="bg-half-260 d-table w-100"
        style="background: url('temporary/bg/bg.jpg') center center"
    >
        <div class="bg-overlay" style="opacity: 0.65; background-color: rgb(32 64 85);"></div>
        <div class="container">
            <div class="row mt-5 mt-md-4">
                <div class="col-12">
                    <div class="title-heading">
                        <h4 class="display-4 mb-4 font-weight-bold text-white title-dark">
                            AtomHub<br />
                            可信镜像仓库平台
                        </h4>
                        <p class="para-desc text-white-50">
                            基础镜像由 AtomHub (Open Container Hub) 官方维护，通过溯源各开源软件上游社区，使用开源社区 Dockerfile 进行构建
                        </p>
                        <div class="mt-4 pt-2">
                            <router-link :to="{name: 'repos'}" class="btn btn-lg btn-dark">
                                查看镜像仓库
                                <i class="mdi mdi-arrow-right ml-2"></i>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section bg-dark">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="features-absolute rounded bg-dark-light">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 my-4">
                                <div class="row">
                                    <div class="col-md-6 col-12">
                                        <div class="media features p-4">
                                            <div class="icon text-center rounded-circle mr-3 mt-2">
                                                <i class="mdi mdi-dice-4-outline align-middle h4 mb-0 text-muted"></i>
                                            </div>
                                            <div class="media-body">
                                                <h4 class="title">中立平台</h4>
                                                <p class="text-muted para mb-0">
                                                    由开放原子基金会牵头发起，初期由基金会成员联合建设，后续考虑社区化管理维护（或IT外包）实现社区自治
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-12">
                                        <div class="media features p-4">
                                            <div class="icon text-center rounded-circle mr-3 mt-2">
                                                <i class="mdi mdi-shield-check-outline align-middle h4 mb-0 text-muted"></i>
                                            </div>
                                            <div class="media-body">
                                                <h4 class="title">可信平台</h4>
                                                <p class="text-muted para mb-0">
                                                    项目源头提供官方镜像构建，对贡献者进行审核，对镜像进行漏洞扫描并进行认证标签
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-12">
                                        <div class="media features p-4">
                                            <div class="icon text-center rounded-circle mr-3 mt-2">
                                                <i class="mdi mdi-nature-people align-middle h4 mb-0 text-muted"></i>
                                            </div>
                                            <div class="media-body">
                                                <h4 class="title">共建平台</h4>
                                                <p class="text-muted para mb-0">
                                                    发起官方的基金会、项目团队、开发者共同参与建设
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-12">
                                        <div class="media features p-4">
                                            <div
                                                class="icon text-center rounded-circle mr-3 mt-2"
                                            >
                                                <i class="mdi mdi-gate-open align-middle h4 mb-0 text-muted"></i>
                                            </div>
                                            <div class="media-body">
                                                <h4 class="title">生态开放</h4>
                                                <p class="text-muted para mb-0">
                                                    用户可上传自定义容器镜像；涉及新增的开源项目，托管到基金会，实现从技术到平台运营的开放性
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mt-100 mt-60">
            <div class="row align-items-center">
                <div class="col-lg-6 col--6 col-12 mt-4 pt-2 mt-lg-0 pt-lg-0">
                    <div class="section-title ml-lg-4">
                        <h5 class="mb-3 text-primary">Open Container Hub (AtomHub) 工作组</h5>
                        <p class="text-muted">
                            AtomHub 工作组主要包含：安全 SIG、平台开发 SIG、镜像管理 SIG 和社区运营 SIG。
                            <br />
                            <br />
                            <ul class="text-muted">
                                <li>
                                    作为开源项目在开放原子基金会孵化，按照基金会的规则进行周期性审视和统一管理。
                                </li>
                                <li>
                                    项目内部协作采用 Maintainer + SIG 的模式，便于灵活适应项目队伍的大小。
                                </li>
                                <li>
                                    各成员单位可凭兴趣投入，同时也欢迎非成员单位参与社区贡献。
                                </li>
                            </ul>
                            <p class="text-muted mb-0">
                                <a href="https://gitee.com/atomhub/opencontainerhub/blob/master/constitution/%E5%B7%A5%E4%BD%9C%E7%BB%84%E7%AB%A0%E7%A8%8B.md" target="_blank" class="text-primary">
                                    阅读我们工作组章程
                                </a>
                            </p>
                        </p>
                    </div>
                </div>
                <div class="col-lg-6 col--6 col-12">
                    <div class="row mr-lg-4" id="counter">
                        <div class="col-md-6 col-12">
                            <div class="row">
                                <div class="col-12 mt-4 mt-lg-0 pt-2 pt-lg-0">
                                    <div class="card explore-feature border-0 rounded text-center bg-dark-light shadow">
                                        <div class="card-body">
                                            <span class="h1 icon2">
                                                <i class="mdi mdi-security"></i>
                                            </span>
                                            <h6 class="mt-3 title">安全 SIG</h6>
                                            <p class="text-muted mb-0">安全漏洞检测，漏洞检查服务开发，安全特征库建设</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 mt-4 pt-2">
                                    <div class="card explore-feature border-0 rounded text-center bg-dark-light shadow">
                                        <div class="card-body">
                                            <span class="h1 icon2">
                                                <i class="mdi mdi-git"></i>
                                            </span>
                                            <h6 class="mt-3 title">平台开发 SIG</h6>
                                            <p class="text-muted mb-0">负责镜像托管平台的前后端开发，包括 Web 界面开发、基金会及第三方账号系统对接、权限管理、组织管理、Repo 管理等</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-12">
                            <div class="row pt-lg-4 mt-lg-4">
                                <div class="col-12 mt-4 pt-2">
                                    <div class="card explore-feature border-0 rounded text-center bg-dark-light shadow">
                                        <div class="card-body">
                                            <span class="h1 icon2">
                                                <i class="mdi mdi-docker"></i>
                                            </span>
                                            <h6 class="mt-3 title">镜像管理 SIG</h6>
                                            <p class="text-muted mb-0">负责平台官方容器镜像的 自动化构建和上线</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 mt-4 pt-2">
                                    <div class="card explore-feature border-0 rounded text-center bg-dark-light shadow">
                                        <div class="card-body">
                                            <span class="h1 icon2">
                                                <i class="mdi mdi-chart-bell-curve-cumulative"></i>
                                            </span>
                                            <h6 class="mt-3 title">社区运营 SIG</h6>
                                            <p class="text-muted mb-0">
                                                负责社区运营推广及外部合作，吸引国内开发者使用，邀请各开源社区入驻平台
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mt-100 mt-60">
            <div class="card rounded bg-white shadow border-0">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-sm-7">
                            <div class="text-sm-left">
                                <h6 class="mb-0">开始使用 OpenAtom 镜像仓库、构建自己专用镜像。</h6>
                            </div>
                        </div>

                        <div class="col-sm-5 mt-4 mt-sm-0">
                            <div class="text-sm-right">
                                <router-link :to="{name: 'repos'}" class="btn btn-dark">
                                    <i class="mdi mdi-file-document-outline"></i> 立即探索
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
