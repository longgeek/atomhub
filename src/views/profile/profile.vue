<script>

/**
 * Account-profile component
 */
export default {
    page: { title: '个人主页' },
    data() {
        return {
            nav: 'repo',
            repos: [
                {
                    name: "Gitlab Community Edition",
                    descr: "GitLab includes Git repository management, issue tracking, code review, an IDE.",
                    url: "gitlab",
                    by: "Gitlab, Inc.",
                    logo: "Gitlab.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
                {
                    name: "Appdynamics",
                    descr: "Appdynamics is a Debian-based",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Appdynamics.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
                {
                    name: "Discord",
                    descr: "Agentless Application Performance Monitoring",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Discord.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
            ]
        }
    },
    created() {
        // 获取用户信息
        this.user = JSON.parse(localStorage.getItem('user'));
    },
    methods: {}
}
</script>

<template>
<div>
    <div class="bg-profile d-table w-100 bg-dark">
        <div class="container">
            <div class="row align-items-center mt-5">
                <div class="col-lg-2 col-md-3 text-md-left text-center">
                    <v-gravatar :email="user.email"
                        alt="null"
                        size=140
                        :default-img="$gravatar.defaultImg"
                        :hostname="$gravatar.host"
                        class="avatar avatar-large rounded-circle shadow d-block mx-auto"
                    />
                </div>

                <div class="col-lg-10 col-md-9">
                    <div class="row align-items-end">
                        <div class="col-md-7 text-md-left text-center mt-4 mt-sm-0">
                            <h3 class="title mb-0 text-white">{{ user.username }}</h3>
                            <small class="text-muted h6 mr-2">{{ user.email }}</small>
                            <div class="text-muted mt-3">
                                <i class="mdi mdi-comment"></i>
                                {{ user.comment }}
                            </div>
                        </div>
                        <div class="col-md-5 text-md-right text-center">
                            <ul class="list-unstyled social-icon social mb-0 mt-4">
                                <li class="list-inline-item text-muted">
                                    <i class="mdi mdi-clock"></i>
                                    {{ user.creation_time | toLocalTime }} 加入
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="secondary-nav bg-dark border-top mt-0">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10 col-mg-10">
                    <b-nav>
                        <b-nav-item :active="nav == 'repo'" @click="nav = 'repo'" exact>
                            我的仓库
                        </b-nav-item>
                        <b-nav-item :active="nav == 'starred'" @click="nav = 'starred'" exact>
                            个人收藏
                        </b-nav-item>
                        <b-nav-item :active="nav == 'contributed'" @click="nav = 'contributed'" exact>
                            我的贡献
                        </b-nav-item>
                    </b-nav>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-4">
        <div class="container">
            <div class="row justify-content-center">
                <!-- div class="col-lg-10 col-mg-10" v-if="nav == 'repo'">
                    <div class="row align-items-center">
                        <div class="col-lg-9 col-md-7">
                            <div class="section-title">
                                <div class="text-muted">未找到个人仓库</div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-5 mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <div class="form custom-form">
                                <div class="form-group mb-0">
                                    <select class="form-control custom-select" disabled>
                                        <option>Sort by latest</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-5">
                        <div
                            class="col-lg-6 col-md-6 col-12 mt-4 pt-2"
                            v-for="(item, index) in repos" :key="index"
                        >
                            <router-link :to="{name: 'repos-detail', params: {repo: item.url}}">
                                <div class="repo-card media key-feature align-items-center p-4 rounded shadow bg-white">
                                    <img :src="`temporary/company/${item.logo}`" class="avatar avatar-md-sm" alt="">
                                    <div class="media-body ml-3">
                                        <div class="text-dark mb-3 font-size-14">{{ item.name }}</div>
                                        <div class="text-muted mb-3">
                                            <div><span class="opacity-4">-</span> By <span class="text-primary">{{ item.by }}</span></div>
                                            <div><span class="opacity-4">-</span> Updated {{ item.update_time }}</div>
                                        </div>
                                        <p class="text-dark descr">{{ item.descr }}</p>
                                        <ul class="list-unstyled d-flex justify-content-between border-top mt-3 pt-3 mb-0">
                                            <li class="text-muted small">
                                                {{ item.downloads }} <span class="opacity-6">Downloads</span>
                                            </li>
                                            <li class="text-muted small ml-3">
                                                {{ item.stars }} <span class="opacity-6">Stars</span>
                                            </li>
                                            <li class="text-muted small ml-3">
                                                {{ item.versions }} <span class="opacity-6">Versions</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div -->
                <div class="col-lg-10 col-mg-10 text-center" v-if="nav == 'repo'">
                    <br />
                    <br />
                    <br />
                    <br />
                    <img
                        src="@/assets/images/none-box.svg"
                        class="avatar avatar-md-sm h1 mt-3" alt=""
                    />
                    <p class="mt-2"><b>我的仓库为空</b></p>
                    <p class="text-muted">该账号下未找到任何镜像仓库</p>
                </div>
                <div class="col-lg-10 col-mg-10 text-center" v-if="nav == 'starred'">
                    <br />
                    <br />
                    <br />
                    <br />
                    <i class="mdi mdi-account-star h1 opacity-5"></i>
                    <p><b>收藏为空</b></p>
                    <p class="text-muted">该账号下未找到任何收藏的镜像仓库</p>
                </div>
                <div class="col-lg-10 col-mg-10 text-center" v-if="nav == 'contributed'">
                    <br />
                    <br />
                    <br />
                    <br />
                    <i class="mdi mdi-hand-heart h1 opacity-5"></i>
                    <p><b>暂无贡献</b></p>
                    <p class="text-muted">该账号下未找到贡献记录</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
