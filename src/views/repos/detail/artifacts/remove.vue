<template>
    <b-modal id="remove"
        centered
        size="sm"
        title="删除标签"
        title-class="font-18"
        ok-title="确认"
        cancel-title="取消"
        ok-variant="dark"
        cancel-variant="outline-dark"
        no-close-on-backdrop
        no-close-on-esc
        @ok="ok"
        @show="show"
        v-if="selects.length"
    >
        <div class="alert alert-danger mb-0">
            <span class="mdi mdi-information-outline mr-2"></span>
            确定要将标签 <b class="text-primary">{{ selects[0].name }}</b> 删除？
        </div>
    </b-modal>
</template>
<script>
    export default {
        data() {
            return {
                loading: false,
            }
        },
        props: { selects: { type: Array } },
        methods: {
            // 防止 Modal 关闭
            ok(event) {
                this.loading = true;
                event.preventDefault();
                this.submit();
            },
            // 提交表单
            submit() {
                this.$http.delete(
                    this.$api.admin.labels(this.selects[0].id),
                    {},
                    {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
                ).then((rsp) => {
                    if (rsp && rsp.hasOwnProperty('status') && rsp.status === 200) {
                        this.$bvToast.toast('删除成功', {title: '提示', variant: 'primary'});
                        this.$parent.tableData();
                        this.$nextTick(() => { this.$bvModal.hide('remove') });   // 关闭 modal
                    } else {
                        this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '删除失败', variant: 'danger'});
                    }
                    this.loading = false;
                })
            },
        },
    }
</script>
