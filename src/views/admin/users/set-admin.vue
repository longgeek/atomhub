<template>
    <b-modal id="set-admin"
        centered
        size="sm"
        title="删除用户"
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
        <div class="alert alert-danger" v-if="selects[0].sysadmin_flag">
            <span class="mdi mdi-information-outline mr-2"></span>
            确定要将用户 <b class="text-primary">{{ selects[0].username }}</b> 取消管理员？
        </div>
        <div class="alert alert-success" v-else>
            <span class="mdi mdi-information-outline mr-2"></span>
            确定要将用户 <b class="text-primary">{{ selects[0].username }}</b> 设置管理员？
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
                this.$http.put(
                    this.$api.admin.set_admin(this.selects[0].user_id),
                    {user_id: this.selects[0].user_id, sysadmin_flag: !this.selects[0].sysadmin_flag},
                    {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
                ).then((rsp) => {
                    if (rsp && rsp.hasOwnProperty('status') && rsp.status === 200) {
                        this.$bvToast.toast('修改成功', {title: '提示', variant: 'primary'});
                        this.$parent.tableData();
                    } else {
                        this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '修改失败', variant: 'danger'});
                    }
                    this.loading = false;
                    this.$nextTick(() => { this.$bvModal.hide('set-admin') });   // 关闭 modal
                })
            },
        },
    }
</script>
