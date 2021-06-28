/**
 * Repos component
 */
import ReposType from './repos-type.vue';

export default {
    page: { title: '镜像仓库' },
    data() {
        return {
            filters: [],
            searching: false,
            repos: [],
        }
    },
    created() { this.init() },
    watch: {
        '$route': "init",
    },
    methods: {
        init() {
            if (this.searching) { return; }
            this.searching = true;

            this.$http.get(this.$api.repositories.list())
                .then((rsp) => {
                    if (rsp.status === 200) {
                        this.repos = rsp.data;
                    }
                    this.searching = false;
            })
        },
        // 移除搜索关键字
        clearSearch() {
            this.$router.push({name: this.$route.name});
        },
        // 移除过滤条件
        filterRemove(index, filter) {
            if (this.searching) { return; }

            this.$vars.reposFilters.splice(index, 1);
            this.$vars.reposType[filter.parent].children[filter.index].check = false;
            this.init();
        },
    },
    components: { ReposType }
}
