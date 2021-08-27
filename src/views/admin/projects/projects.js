/**
 * Admin Projects component
 */
import Create from "./create.vue";
import Remove from "./remove.vue";
import Quota from "./quota.vue";
import QuotaGlobal from "./quota-global.vue";
import PageIntroduction from "@/components/page-introduction";

const pagination = {
    total: 0,
    page: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: false,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: total => `合计: ${total} 条`,
}

export default {
    page: { title: '项目管理' },
    components: { Create, Remove, Quota, QuotaGlobal, PageIntroduction },
    data() {
        return {
            quotas: [],
            statistics: {
                private_project_count: 0,
                private_repo_count: 0,
                public_project_count: 0,
                public_repo_count: 0,
                total_project_count: 0,
                total_repo_count: 0,
                total_storage_consumption: 0
            },
            configurations: {
                storage_per_project: { value: 0 },
            },
            sort: '',
            search: '',
            table: { rows: [], cols: [] },
            loading: false,
            selectedRows: [],
            selectedRowKeys: [],
            pagination: pagination,
            page_intro: {
                icon: "mdi mdi-layers-triple",
                title: '"项目管理"',
                content: 'AtomHub 平台项目管理。'
            },
        }
    },
    created() {
        this.user = JSON.parse(localStorage.getItem('user'));
        // 生成 table column
        for ( const field in this.$cols.admin.projects ) {
            const set = this.$cols.admin.projects[field];
            const col = {
                ellipsis: true,
                title: set.title,
                sorter: set.hasOwnProperty('sorter') ? set.sorter : true,
                fixed: set.hasOwnProperty('fixed') ? set.fixed : false,
                dataIndex: set.dataIndex || field,
                scopedSlots: set.scopedSlots || { customRender: field },
            };
            this.table.cols.push(col);
        }
        this.tableData();
    },
    methods: {
        // 选中表格
        tableOnSelect(keys, rows) {
            this.selectedRows = rows;
            this.selectedRowKeys = keys;
        },
        // 创建组
        tableCreate() { this.$bvModal.show('create') },
        // 删除组
        tableRemove() { this.$bvModal.show('remove') },
        // 修改单个项目配额
        editQuota() { this.$bvModal.show('quota') },
        // 修改所有项目默认配额
        editQuotaGlobal() { this.$bvModal.show('quota-global') },
        // 获取列表
        tableData(page=pagination.page, page_size=pagination.pageSize) {
            // 取消选中的行
            this.selectedRowKeys = [];
            this.pagination = { ...pagination };

            // page 为切换分页参数
            // page_size 为显示每页多少条参数
            this.pagination.page = page;
            this.pagination.pageSize = page_size;

            if ( this.loading )  return;
            this.loading = true;

            // 搜索、排序
            const params = { page: this.pagination.page, page_size: this.pagination.pageSize };
            if (this.search) params.q = `name=~${this.search}`;
            if (this.sort) params.sort = this.sort;

            this.$http.get(this.$api.admin.projects(), params)
                .then((rsp) => {
                    if (rsp.status === 200) {
                        this.table.rows = rsp.data;
                        this.pagination.total = rsp.headers['x-total-count'];
                        this.getQuotas();
                        this.getStatistics();
                        this.getConfigurations();
                    } else {
                        this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '获取列表错误', variant: 'danger'});
                    }
                    this.loading = false;
            })
        },
        // 表格变化处理动作
        tableChange(pagination, filters, sorter) {
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;

            // 排序
            if ( sorter.order == 'ascend' ) {
                this.sort = `${sorter.field}`;
            } else if ( sorter.order == 'descend' ) {
                this.sort = `-${sorter.field}`;
            } else {
                this.sort = '';
            }

            // 触发 API 调用
            this.tableData(pagination.current, pagination.pageSize);
        },
        // 获取配额信息
        getQuotas() {
            this.$http.get(this.$api.admin.quotas())
                .then((rsp) => {
                    if (rsp.status === 200) {
                        this.quotas = rsp.data;
                    } else {
                        this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '获取配额信息错误', variant: 'danger'});
                    }
            })
        },
        // 获取统计信息
        getStatistics() {
            this.$http.get(this.$api.admin.statistics())
                .then((rsp) => {
                    if (rsp.status === 200) {
                        this.statistics = rsp.data;
                    } else {
                        this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '获取统计信息错误', variant: 'danger'});
                    }
            })
        },
        // 获取配置信息
        getConfigurations() {
            this.$http.get(this.$api.admin.configurations())
                .then((rsp) => {
                    if (rsp.status === 200) {
                        this.configurations = rsp.data;
                    } else {
                        this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '获取配置信息错误', variant: 'danger'});
                    }
            })
        },
    },
};
