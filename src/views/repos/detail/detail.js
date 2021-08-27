/**
 * Page-repo-detail component
 */
import ReposType from '../repos-type.vue';
import Artifacts from './artifacts/artifacts.vue';
import Description from './description.vue';
import PageBreadcrumb from "@/components/page-breadcrumb";

export default {
    page: { title: '镜像详情' },
    data() {
        return {
            nav: 'markdown',
            repo: {},
            artifacts: [],
            loading: false,
            loadingArtifacts: false,
            page_breadcrumb: {
                navs: [
                    {text: "镜像仓库", to: {name: "repos"}},
                    {text: "镜像详情"},
                ],
            },
        }
    },
    components: { ReposType, Artifacts, Description, PageBreadcrumb },
    created() { this.init() },
    methods: {
        init() {
            // 判断是否存在 URL 参数
            if (!this.$route.params.project || !this.$route.params.repo) this.$router.push({name: "error"});

            this.getDescription();
            this.getArtifacts();
        },
        // 获取 repo 详细信息
        getDescription() {
            this.loading = true;
            this.$http.get(
                this.$api.repositories.detail(
                    this.$route.params.project,
                    this.$route.params.repo
                )
            ).then((rsp) => {
                if (rsp.status === 200) {
                    this.repo = rsp.data;
                    this.page_breadcrumb.navs[1].text = `${this.repo.name} 镜像详情`;

                    // 获取 repo 所属 project 详情
                    this.$http.get(
                        this.$api.projects.detail(this.repo.project_id)
                    ).then((rsp) => {
                        if (rsp.status === 200) this.project = rsp.data;
                        this.loading = false;
                    })
                }
            })
        },
        // 获取 repo artifacts 信息
        getArtifacts() {
            this.loadingArtifacts = true;
            this.$http.get(
                this.$api.repositories.artifacts(
                    this.$route.params.project,
                    this.$route.params.repo
                )
            ).then((rsp) => {
                if (rsp.status === 200) this.artifacts = rsp.data;
                this.loadingArtifacts = false;
            })
        },
    }
}
