/**
 * Repos component
 */
import ReposType from './repos-type.vue';

const pagination = {
    total: 0,
    page: 1,
    page_size: 10,
    showSizeChanger: true,
    showQuickJumper: false,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: total => `合计: ${total} 条`,
}

export default {
    page: { title: '镜像仓库' },
    data() {
        return {
            sort: '-pull_count',
            search: '',
            repos: [],
            filters: [],
            searching: false,
            pagination: pagination,
        }
    },
    created() { this.init() },
    components: { ReposType },
    watch: {
        '$route': function() { this.init() },
    },
    methods: {
        // 初始化, 搜索、分页都会触发该方法
        init(page=pagination.page, page_size=pagination.page_size) {
            this.pagination = { ...pagination };

            // page 为切换分页参数
            // page_size 为显示每页多少条参数
            this.pagination.page = page;
            this.pagination.page_size = page_size;

            if (this.searching) { return; }
            this.searching = true;
            this.search = this.$route.query.search || '';

            // 搜索、排序
            const params = { page: this.pagination.page, page_size: this.pagination.page_size };
            if (this.search) params.q = `name=~${this.search}`;
            if (this.sort) params.sort = this.sort;

            this.$http.get(
                this.$api.repositories.list(),
                params,
            ).then((rsp) => {
                if (rsp != undefined && rsp.hasOwnProperty('status') && rsp.status === 200) {
                    this.repos = rsp.data;
                    this.pagination.total = rsp.headers['x-total-count'];
                }
                this.searching = false;
            })
        },
        // 移除搜索关键字
        clearSearch() {
            this.$router.push({name: this.$route.name});
            this.$sleep(10).then(() => this.init() );
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
