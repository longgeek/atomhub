<script>
/**
 * Repos component
 */
export default {
    page: { title: '镜像仓库' },
    data() {
        return {
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
                {
                    name: "Gradle",
                    descr: "Linux operating system",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Gradle.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
                {
                    name: "Codepen",
                    descr: "based on free software.",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Codepen.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
                {
                    name: "Gradle",
                    descr: "several nodes on a cluster.",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Gradle.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
                {
                    name: "Eslint",
                    descr: "Gradle is a Debian-based Linux operating system based on free software.",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Eslint.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
                {
                    name: "Sketch",
                    descr: "Gradle is a Debian-based Linux operating system based on free software.",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Sketch.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
                {
                    name: "Udemy",
                    descr: "Supported tags and respective Dockerfile links",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Udemy.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
                {
                    name: "Webhooks",
                    descr: "Open Liberty multi-architecture images based on Ubuntu 18.04",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Webhooks.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
            ]
        }
    },
    components: {}
}
</script>

<template>
<div>

    <div class="secondary-nav bg-white sticky-bar">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <b-nav>
                        <b-nav-item active>
                            <i class="icon mdi mdi-format-vertical-align-top"></i>Top Atoms
                        </b-nav-item>
                        <b-nav-item-dropdown toggle-class="nav-link-custom">
                            <template #button-content>
                                <i class="icon mdi mdi-code-parentheses-box"></i>Developer
                            </template>
                            <b-dropdown-item>Tools Runtime</b-dropdown-item>
                            <b-dropdown-item>AI/Machine Learn</b-dropdown-item>
                            <b-dropdown-item>Database</b-dropdown-item>
                            <b-dropdown-item>Cloud tools</b-dropdown-item>
                            <b-dropdown-item>Cloud tools</b-dropdown-item>
                            <b-dropdown-item>Analytics</b-dropdown-item>
                            <b-dropdown-item>Application Frameworks</b-dropdown-item>
                            <b-dropdown-item>Application Infrastructure</b-dropdown-item>
                            <b-dropdown-item>Application Services</b-dropdown-item>
                            <b-dropdown-item>Base Images</b-dropdown-item>
                            <b-dropdown-item>DevOps Tools</b-dropdown-item>
                            <b-dropdown-item>Featured Images</b-dropdown-item>
                            <b-dropdown-item>Messaging Services</b-dropdown-item>
                            <b-dropdown-item>Monitoring</b-dropdown-item>
                            <b-dropdown-item>Operating Systems</b-dropdown-item>
                            <b-dropdown-item>Programming Languages</b-dropdown-item>
                            <b-dropdown-item>Security</b-dropdown-item>
                            <b-dropdown-item>Storage</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item-dropdown toggle-class="nav-link-custom">
                            <template #button-content>
                                <i class="icon mdi mdi-ubuntu"></i>Operating Systems
                            </template>
                            <b-dropdown-item>Linux</b-dropdown-item>
                            <b-dropdown-item>Windows</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item-dropdown toggle-class="nav-link-custom">
                            <template #button-content>
                                <i class="icon mdi mdi-trello"></i>Architectures
                            </template>
                            <b-dropdown-item>ARM</b-dropdown-item>
                            <b-dropdown-item>ARM64</b-dropdown-item>
                            <b-dropdown-item>X86</b-dropdown-item>
                            <b-dropdown-item>X86-64</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item>
                            <i class="icon mdi mdi-unity"></i>Other
                        </b-nav-item>
                    </b-nav>
                </div>
            </div>
        </div>
    </div>

    <section class="section">
        <div class="container">
            <div class="row">
                <div class="col-12 mt-5 pt-2 mt-sm-0 pt-sm-0">
                    <div class="row align-items-center">
                        <div class="col-lg-9 col-md-7">
                            <div class="section-title">
                                <div class="text-muted">1 - 10 of 1,018 available images. </div>
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

                    <div class="row">
                        <div
                            class="col-lg-4 col-md-6 col-12 mt-4 pt-2"
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
                </div>
            </div>
        </div>
    </section>
</div>
</template>
