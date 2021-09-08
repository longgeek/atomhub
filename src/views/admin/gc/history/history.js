/**
  1  * Admin GC History component
 */

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
    page: { title: '标签管理' },
    data() {
        return {
            log: null,
            logId: null,
            sort: '',
            table: { rows: [], cols: [] },
            loading: false,
            logLoading: false,
            pagination: pagination,
        }
    },
    created() {
        this.user = JSON.parse(localStorage.getItem('user'));
        // 生成 table column
        for ( const field in this.$cols.admin.gcHistory ) {
            const set = this.$cols.admin.gcHistory[field];
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
        // 获取任务的日志
        getLog() {
            this.logLoading = true;
            this.$http.get(this.$api.historyLog(this.logId))
                .then(rsp => {
                    if (rsp && rsp.hasOwnProperty('status') && rsp.status === 200) {
                        this.log = rsp.data;
                    } else {
                        this.log = rsp.data.errors[0].message;
                    }
                    this.logLoading = false;
            })
        },
        // 获取列表
        tableData(page=pagination.page, page_size=pagination.pageSize) {
            // 取消选中的行
            this.pagination = { ...pagination };

            // page 为切换分页参数
            // page_size 为显示每页多少条参数
            this.pagination.page = page;
            this.pagination.pageSize = page_size;

            if ( this.loading )  return;
            this.loading = true;

            // 搜索、排序
            const params = {
                page: this.pagination.page,
                page_size: this.pagination.pageSize,
                scope: 'g',
                project_id: 0,
                sort: '-creation_time',
            };
            if (this.search) params.q = `name=~${this.search}`;
            if (this.sort) params.sort = this.sort;

            this.$http.get(this.$api.history(), params)
                .then((rsp) => {
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
