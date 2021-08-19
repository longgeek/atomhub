/**
 * Logs component
 */
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
    page: { title: '操作日志' },
    data() {
        return {
            user: {},
            sort: '',
            table: { rows: [], cols: [] },
            loading: false,
            pagination: pagination,
            page_intro: {
                icon: "mdi mdi-math-log",
                title: '"操作日志"',
                content: '最近的操作日志记录'
            },
        }
    },
    components: { PageIntroduction },
    created() {
        this.user = JSON.parse(localStorage.getItem('user'));
        // 生成 table column
        for ( const field in this.$cols.logs ) {
            // 普通用户无需展示 username 字段
            if (field == 'username' && !this.user.sysadmin_flag) continue;

            const set = this.$cols.logs[field];
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
        // 获取日志
        tableData(page=pagination.page, page_size=pagination.pageSize) {
            this.pagination = { ...pagination };

            // page 为切换分页参数
            // page_size 为显示每页多少条参数
            this.pagination.page = page;
            this.pagination.pageSize = page_size;

            if ( this.loading )  return;
            this.loading = true;
            this.search = this.$route.query.search || '';

            // 搜索、排序
            const params = { page: this.pagination.page, page_size: this.pagination.pageSize };
            if (this.search) params.q = `name=~${this.search}`;
            if (this.sort) params.sort = this.sort;

            this.$http.get(this.$api.logs(), params)
                .then((rsp) => {
                    if (rsp.status === 200) {
                        this.table.rows = rsp.data;
                        this.pagination.total = rsp.headers['x-total-count'];
                    } else {
                        this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '获取日志错误', variant: 'danger'});
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
