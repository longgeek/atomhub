/**
 * Admin GC Clear component
 */

export default {
    page: { title: '垃圾清理' },
    props: {
    },
    data() {
        return {
            loading: false,
        }
    },
    created() { this.init() },
    methods: {
        init() {
        },
        submit() {
            this.loading = true;

            // 调用 API
            this.$http.put(
                this.$api.admin.configurations(),
                params,
                {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
            ).then(rsp => {
                if (rsp && rsp.hasOwnProperty('status') && rsp.status === 200) {
                    this.$bvToast.toast('变更的配置项成功保存', {title: '提示', variant: 'primary'});
                } else {
                    this.$bvToast.toast(rsp.data.errors[0].message, {title: '修改失败', variant: 'danger'});
                }
                this.loading = false;
            })
        },
    },
};
