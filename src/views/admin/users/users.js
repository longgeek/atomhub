/**
 * Admin Users component
 */
import SetAdmin from "./set-admin.vue"
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
    page: { title: '用户管理' },
    data() {
        return {
            sort: '',
            search: '',
            table: { rows: [], cols: [] },
            loading: false,
            selectedRows: [],
            selectedRowKeys: [],
            pagination: pagination,
            page_intro: {
                icon: "mdi mdi-account",
                title: '"用户管理"',
                content: 'AtomHub 平台用户管理，可对用户设置和取消管理员操作。'
            },
        }
    },
    components: { SetAdmin, PageIntroduction },
    created() {
        this.user = JSON.parse(localStorage.getItem('user'));
        // 生成 table column
        for ( const field in this.$cols.admin.users ) {
            const set = this.$cols.admin.users[field];
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
        // 设置管理员
        tableSetAdmin() { this.$bvModal.show('set-admin') },
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
            if (this.search) params.q = `username=~${this.search}`;
            if (this.sort) params.sort = this.sort;

            this.$http.get(this.$api.admin.users(), params)
                .then((rsp) => {
                    if (rsp && rsp.hasOwnProperty('status') && rsp.status === 200) {
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
