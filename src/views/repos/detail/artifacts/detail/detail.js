/**
 * 镜像仓库 Artifacts 详情
 */

import Tags from "./tags/tags.vue";
import Attrs from "./attrs/attrs.vue";
import PageBreadcrumb from "@/components/page-breadcrumb";

export default {
    page: { title: '项目详情' },
    created() { this.init() },
    components: { Tags, Attrs, PageBreadcrumb },
    data() {
        return {
            des: {},
            // tabs 作为功能标签从左至右排序顺序
            tabs: {
                tags: 0,
                attrs: 1,
            },
            tabIndex: null,
            page_breadcrumb: {
                navs: [
                    {text: "镜像仓库", to: {name: "repos"}},
                    {text: "镜像详情"},
                    {text: "Artifacts"},
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
                        name: 'repos-artifacts-detail',
                        params: {
                            project: this.$route.params.project,
                            repo: this.$route.params.repo,
                            artifacts: this.$route.params.artifacts,
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
            this.page_breadcrumb.navs[1] = {
                text: "镜像详情",
                to: {
                    name: "repos-detail",
                    params: {
                        project: this.$route.params.project,
                        repo: this.$route.params.repo
                    }
                }
            };
        },
        // 获取项目详细信息
        getDetail() {
            this.loading = true;
            this.$http.get(this.$api.repositories.artifacts.detail(
                this.$route.params.project,
                this.$route.params.repo,
                this.$route.params.artifacts,
            )).then(rsp => {
                if (rsp && rsp.hasOwnProperty('status') && rsp.status === 200) {
                    this.des = rsp.data;
                    this.page_breadcrumb.navs[2].text = `Artifacts: ${this.$route.params.artifacts}`;
                } else {
                    this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '获取项目详情错误', variant: 'danger'});
                }
                this.loading = false;
            })
        },
    },
};
