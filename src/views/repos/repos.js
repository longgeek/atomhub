/**
 * Repos component
 */
import ReposType from './repos-type.vue';

export default {
    page: { title: '镜像仓库' },
    data() {
        return {
            sort: 'creation_time',
            search: '',
            repos: [],
            filters: [],
            searching: false,
        }
    },
    created() { this.init() },
    components: { ReposType },
    watch: {
        '$route': "init",
    },
    methods: {
        init() {
            if (this.searching) { return; }
            this.searching = true;
            this.search = this.$route.query.search || '';

            // 搜索、排序
            const params = { page: 1, page_size: 15 };
            if (this.search) params.q = `name=~${this.search}`;
            if (this.sort) params.sort = this.sort;

            this.$http.get(this.$api.repositories.list(), params)
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
}
