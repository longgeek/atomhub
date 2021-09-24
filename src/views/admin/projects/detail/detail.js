/**
 * Admin Projects component
 */

import Basic from "./basic.vue";
import Repos from "./repos/repos.vue";
import Members from "./members/members.vue";
import Labels from "./labels/labels.vue";
import Logs from "./logs/logs.vue";
import PageBreadcrumb from "@/components/page-breadcrumb";

export default {
    page: { title: '项目详情' },
    created() { this.init() },
    components: { Basic, Repos, Members, Labels, Logs, PageBreadcrumb },
    data() {
        return {
            des: {name: ''},
            summary: {},
            // tabs 作为功能标签从左至右排序顺序
            tabs: {
                basic: 0,
                repos: 1,
                members: 2,
                labels: 3,
                logs: 9,
            },
            tabIndex: null,
            page_breadcrumb: {
                navs: [
                    {text: "系统管理"},
                    {text: "项目管理", to: {name: "admin-projects"}},
                    {text: "项目详情"},
                ],
            },
        }
    },
    watch: {
        // 监听激活标签
        // 标签激活时，自动修改 URL 路径
        tabIndex () {
            for (let i in Object.keys(this.tabs)) {
                const key = Object.keys(this.tabs)[i];
                if (this.tabs[key] == this.tabIndex && this.$route.params.tab != key) {
                    this.$router.push({
                        name: 'admin-projects-detail',
                        params: {
                            project_id: this.$route.params.project_id,
                            tab: key
                        }
                    });
                }
            }
        }
    },
    methods: {
        init() {
            // 根据 URL 参数激活当前标签卡
            this.$route.params.tab ? this.tabIndex = this.tabs[this.$route.params.tab] : this.tabIndex = 0;
            this.getDetail();
        },
        // 获取项目详细信息
        getDetail() {
            this.loading = true;
            this.$http.get(this.$api.admin.projects(this.$route.params.project_id))
                .then(rsp => {
                    if (rsp && rsp.hasOwnProperty('status') && rsp.status === 200) {
                        this.des = rsp.data;
                        this.page_breadcrumb.navs[2].text = `${this.des.name} 项目详情`;
                        this.getSummary();
                    } else {
                        this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '获取项目详情错误', variant: 'danger'});
                    }
                    this.loading = false;
                })
        },
        // 获取项目概要信息
        getSummary() {
            this.$http.get(this.$api.admin.summary(this.$route.params.project_id))
                .then(rsp => {
                    if (rsp && rsp.hasOwnProperty('status') && rsp.status === 200) {
                        this.summary = rsp.data;
                    } else {
                        this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '获取项目概览信息错误', variant: 'danger'});
                    }
                    this.loading = false;
                })
        },
    },
};
