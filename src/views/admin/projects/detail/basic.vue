<script>
/**
 * 镜像详情-概要
 */
export default {
    props: {
        des: { type: Object },
        loading: { type: Boolean },
        summary: { type: Object },
    },
    data: {
        return: {
            summary: {},
            loading: false,
        }
    },
    methods: {
        // 获取镜像详细信息
        getSummary() {
            this.loading = true;
            this.$http.get(this.$api.admin.summary(this.$route.params.project_id))
                .then(rsp => {
                    if (rsp.status === 200) {
                        this.summary = rsp.data;
                    } else {
                        this.$bvToast.toast(rsp.data.msg, {title: '获取项目概览信息错误', variant: 'danger'});
                    }
                    this.loading = false;
                })
        },
    },
};
</script>

<template>
<div>
    <div class="page-statistics p-2">
        <div class="loading-text" v-if="loading">
            <p>正在加载...</p>
        </div>
        <div class="row" v-if="!loading">
            <div class="col-12">
                <div class="page-toolbar pt-0 pl-0">
                    <div class="loading-layer" v-if="loading"></div>
                    <button type="button" class="btn btn-dark" @click="getSummary()" :disabled="loading">
                        <i class="mdi mdi-refresh align-middle"></i>
                    </button>
                    <button type="button" class="btn btn-dark" disabled>
                        <i class="mdi mdi-circle-edit-outline"></i>
                        配置管理
                    </button>
                </div>
            </div>
        </div>
        <div class="row" v-if="!loading">
            <div class="col-md-4">
                <div class="base-item no-shadow border gray">
                    <div class="content card-body">
                        <h4 class="text-primary"><i class="mdi mdi-layers-triple mr-2"></i>{{ des.name }}</h4>
                        <hr />
                        <dl class="dl-horizontal">
                            <dt>ID</dt>
                            <dd>{{ des.project_id }}</dd>
                            <dt>访问级别</dt>
                            <dd>
                                <span v-if="
                                    Object.keys(des).length &&
                                    des.hasOwnProperty('metadata') &&
                                    des.metadata.public == 'true'
                                ">公开</span>
                                <span v-else>私有</span>
                            </dd>
                            <dt>属主</dt>
                            <dd>{{ des.owner_name }}</dd>
                            <dt>角色</dt>
                            <dd>{{ des.current_user_role_id }}</dd>
                            <dt>创建时间</dt>
                            <dd>{{ des.creation_time | toLocalTime }}</dd>
                            <dt>更新时间</dt>
                            <dd>{{ des.update_time | toLocalTime }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="row">
                    <div class="col-12 mb-4">
                        <div class="card mini-stats-wid">
                            <div class="card-body">
                                <div class="media">
                                    <div class="media-body">
                                        <p class="text-muted font-weight-medium">
                                            <i class="mdi mdi-account-multiple"></i>
                                            成员
                                        </p>
                                        <div class="row">
                                            <div class="col-2">
                                                <h5 class="mb-0">{{ summary.hasOwnProperty('project_admin_count') ? summary.project_admin_count : 0 }}</h5>
                                                <p class="text-muted mb-0">管理员</p>
                                            </div>
                                            <div class="col-2">
                                                <h5 class="mb-0">{{ summary.hasOwnProperty('maintainer_count') ? summary.maintainer_count : 0 }}</h5>
                                                <p class="text-muted mb-0">维护人员</p>
                                            </div>
                                            <div class="col-2">
                                                <h5 class="mb-0">{{ summary.hasOwnProperty('developer_count') ? summary.developer_count : 0 }}</h5>
                                                <p class="text-muted mb-0">开发者</p>
                                            </div>
                                            <div class="col-2">
                                                <h5 class="mb-0">{{ summary.hasOwnProperty('guest_count') ? summary.guest_count : 0 }}</h5>
                                                <p class="text-muted mb-0">访客</p>
                                            </div>
                                            <div class="col-2">
                                                <h5 class="mb-0">{{ summary.hasOwnProperty('limited_guest_count') ? summary.limited_guest_count : 0 }}</h5>
                                                <p class="text-muted mb-0">受限访客</p>
                                            </div>
                                            <div class="col-2">
                                                <h5 class="mb-0 text-primary">
                                                    {{
                                                        (summary.hasOwnProperty('project_admin_count') ? summary.project_admin_count : 0) +
                                                        (summary.hasOwnProperty('maintainer_count') ? summary.maintainer_count : 0) +
                                                        (summary.hasOwnProperty('developer_count') ? summary.developer_count : 0) +
                                                        (summary.hasOwnProperty('guest_count') ? summary.guest_count : 0) +
                                                        (summary.hasOwnProperty('limited_guest_count') ? summary.limited_guest_count : 0)
                                                    }}
                                                    人
                                                </h5>
                                                <p class="text-primary mb-0">总成员人数</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
                                        <span class="avatar-title">
                                            <i class="bx bx-copy-alt font-size-24"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card mini-stats-wid">
                            <div class="card-body">
                                <div class="media">
                                    <div class="media-body">
                                        <p class="text-muted font-weight-medium">
                                            <i class="mdi mdi-cloud-alert"></i>
                                            已使用的存储空间（Used Space）
                                        </p>
                                        <div v-if="Object.keys(summary).length">
                                            <span v-if="summary.quota.hard.storage == -1">
                                                <h5 class="mb-0 font-weight-400 text-primary">已使用 {{ (summary.quota.used.storage / 1024 / 1024 / 1024).toFixed(2) }} GB</h5>
                                                <p class="text-muted mb-0">不设限</p>
                                            </span>
                                            <span v-else>
                                                <h5 class="mb-0 font-weight-400 text-primary">已使用 {{ (summary.quota.used.storage / 1024 / 1024 / 1024).toFixed(2) }} GB</h5>
                                                <p class="text-muted mb-0">总 {{ (summary.quota.hard.storage / 1024 / 1024 / 1024).toFixed(2) }} GB</p>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
                                        <span class="avatar-title">
                                            <i class="bx bx-copy-alt font-size-24"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-4 mb-4">
                    <div class="col-4">
                        <div class="card mini-stats-wid">
                            <div class="card-body">
                                <div class="media">
                                    <div class="media-body">
                                        <p class="text-muted font-weight-medium">
                                            <img src="/res/img/none-box.6eb53cd2.svg" alt="" height="12" width="12">
                                            镜像仓库
                                        </p>
                                        <h5 class="mb-0 text-primary">
                                            {{ des.repo_count }}<small>&nbsp;个</small>
                                        </h5>
                                    </div>
                                    <div class="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
                                        <span class="avatar-title">
                                            <i class="bx bx-copy-alt font-size-24"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card mini-stats-wid">
                            <div class="card-body">
                                <div class="media">
                                    <div class="media-body">
                                        <p class="text-muted font-weight-medium">
                                            <i class="mdi mdi-lock-open-variant"></i>
                                            访问级别
                                        </p>
                                        <h5 class="mb-0 text-primary font-weight-400">
                                            <span v-if="Object.keys(des).length && des.hasOwnProperty('metadata') && des.metadata.public == 'true'">公开</span>
                                            <span v-else>私有</span>
                                        </h5>
                                    </div>
                                    <div class="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
                                        <span class="avatar-title">
                                            <i class="bx bx-copy-alt font-size-24"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card mini-stats-wid">
                            <div class="card-body">
                                <div class="media">
                                    <div class="media-body">
                                        <p class="text-muted font-weight-medium">
                                            <i class="mdi mdi-chart-timeline-variant"></i>
                                            Helm Charts
                                        </p>
                                        <h5 class="mb-0 text-primary">
                                            {{ des.chart_count }}<small>&nbsp;个</small>
                                        </h5>
                                    </div>
                                    <div class="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
                                        <span class="avatar-title">
                                            <i class="bx bx-copy-alt font-size-24"></i>
                                        </span>
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
</template>
