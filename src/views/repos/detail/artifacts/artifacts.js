/**
 * 镜像 Artifacts 列表
 */
import Remove from "./remove.vue";

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
    page: { title: '构建历史 - 镜像详情' },
    props: {
        repo: { type: Object, default: {} },
        loading: { type: Boolean, default: true },
    },
    data() {
        return {
            user: {},
            sort: '',
            search: '',
            searchField: 'tags',
            table: { rows: [], cols: [] },
            loading: false,
            selectedRows: [],
            selectedRowKeys: [],
            pagination: pagination,
        }
    },
    components: { Remove },
    created() {
        this.user = JSON.parse(localStorage.getItem('user')) || { sysadmin_flat: false};

        // 生成 table column
        for ( const field in this.$cols.artifacts ) {
            if (field == 'id' && !this.user.sysadmin_flag) continue;
            const set = this.$cols.artifacts[field];
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
        // 创建
        tableCreate() { this.$bvModal.show('create') },
        // 编辑
        tableEditor() { this.$bvModal.show('editor') },
        // 删除
        tableRemove() { this.$bvModal.show('remove') },
        // 获取列表
        tableData(page=pagination.page, page_size=pagination.pageSize) {
            // 取消选中的行
            this.selectedRowKeys = [];
            this.pagination = { ...pagination };

            // page 为切换分页参数
            // page_size 为显示每页多少条参数
            this.pagination.page = page;
            this.pagination.pageSize = page_size;

            // 搜索、排序
            const params = {
                page: this.pagination.page,
                page_size: this.pagination.pageSize,
            };
            if (this.search) params.q = `${this.searchField}=~${this.search}`;
            if (this.sort) params.sort = this.sort;

            if (this.loading) return;
            this.loading = true;

            this.$http.get(
                this.$api.repositories.artifacts(
                    this.$route.params.project,
                    this.$route.params.repo,
                ),
                params
            ).then((rsp) => {
                if (rsp.status === 200) {
                    this.table.rows = rsp.data;
                    this.pagination.total = rsp.headers['x-total-count'];
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
    },
};
