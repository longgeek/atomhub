<template>
    <b-modal id="set-roles"
        centered
        size="sm"
        title="设置角色"
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
        <div class="alert alert-primary">
            成员 <b>{{ selects[0].entity_name }}</b>
            当前角色为：
            <b>
                <span v-for="(role, index) in roles" :key="index">
                    <span v-if="Object.keys(role)[0] == selects[0].role_id">"{{ Object.values(role)[0] }}"</span>
                </span>
            </b>
            ，如需修改请在下方选择新角色。
        </div>
        <form class="form-horizontal">
            <div class="form-group">
                <label>角色 <span class="text-danger">*</span></label>
                <div class="ml-2">
                    <div class="custom-control custom-radio" v-for="(role, index) in roles" :key="index">
                        <div class="form-group mb-0">
                            <input
                                type="radio"
                                :id="Object.keys(role)[0]"
                                v-model="form.role_id"
                                :value="Object.keys(role)[0]"
                                class="custom-control-input"
                            />
                            <label class="custom-control-label" :for="Object.keys(role)[0]">{{ Object.values(role)[0] }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </b-modal>
</template>
<script>
    export default {
        props: {
            selects: {type: Array},
        },
        data() {
            return {
                users: [],
                form: {},
                loading: false,
                roles: [
                    { 1: '项目管理员'},
                    { 2: '开发者'},
                    { 3: '访客'},
                    { 4: '维护人员'},
                    { 5: '受限访客'},
                ]
            }
        },
        methods: {
            // 防止 Modal 关闭
            ok(event) {
                this.loading = true;
                event.preventDefault();
                this.submit();
            },
            show() {
                this.form = { role_id: this.selects[0].role_id };
                this.loading = false;
            },
            // 提交表单
            submit() {
                // 调用 API
                const params = {
                    role_id: parseInt(this.form.role_id),
                };

                this.$http.put(
                    this.$api.projects.members(this.$route.params.project_id, this.selects[0].id),
                    params,
                    {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
                ).then((rsp) => {
                    if (rsp && rsp.hasOwnProperty('status') && rsp.status === 200) {
                        this.$bvToast.toast(`修改 ${this.selects[0].entity_name} 角色成功`, {title: '提示', variant: 'primary'});
                        this.$parent.tableData();
                    } else {
                        this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '创建失败', variant: 'danger'});
                    }
                    this.loading = false;
                    this.$nextTick(() => { this.$bvModal.hide('set-roles') });   // 关闭 modal
                })
            },
        },
    }
</script>
