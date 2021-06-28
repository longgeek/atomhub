/**
 * Page-repo-detail component
 */
import ReposType from '../repos-type.vue';

export default {
    data() {
        return {
            repo: {},
            artifacts: {},
        }
    },
    components: { ReposType },
    created() { this.init() },
    methods: {
        init() {
            // 判断是否存在 URL 参数
            if (!this.$route.params.project || !this.$route.params.repo) this.$router.push({name: "error"});

            // 获取 repo 详细信息
            this.$http.get(
                this.$api.repositories.detail(
                    this.$route.params.project,
                    this.$route.params.repo
                )
            ).then((rsp) => {
                if (rsp.status === 200) this.repo = rsp.data;
            })

            // 获取 repo artifacts 信息
            this.$http.get(
                this.$api.repositories.artifacts(
                    this.$route.params.project,
                    this.$route.params.repo
                )
            ).then((rsp) => {
                if (rsp.status === 200) this.artifacts = rsp.data;
            })
        }
    }
}
