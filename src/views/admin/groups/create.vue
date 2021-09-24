<template>
    <b-modal id="create"
        centered
        size="sm"
        title="创建组"
        title-class="font-18"
        ok-title="确认"
        cancel-title="取消"
        ok-variant="dark"
        cancel-variant="outline-dark"
        no-close-on-backdrop
        no-close-on-esc
        @ok="ok"
        @show="show"
    >
        <form class="form-horizontal needs-validation">
            <div class="form-group mb-0">
                <label>名称</label>
                <input maxlength="30" class="form-control" v-model="group_name" autofocus
                    :class="{ 'is-invalid': submitted && $v.group_name.$error }"
                />
                <div class="text-danger mt-2" v-if="submitted && $v.group_name.$error">请输入 2 - 30 个字符</div>
            </div>
        </form>
    </b-modal>
</template>
<script>
    import { required, minLength, maxLength } from "vuelidate/lib/validators";
    export default {
        data() {
            return {
                group_name: '',
                loading: false,
                submitted: false,
            }
        },
        validations: {
            group_name: { required, minLength: minLength(2), minLength: maxLength(30) }
        },
        methods: {
            // 防止 Modal 关闭
            ok(event) {
                this.loading = true;
                event.preventDefault();
                this.submit();
            },
            show() {
                this.group_name = '';
            },
            // 提交表单
            submit() {
                this.submitted = true;

                if (this.$v.group_name.$invalid) {
                    this.$v.$touch();
                    this.loading = false;
                    return;
                }

                // 调用 API 创建组
                this.$http.post(
                    this.$api.admin.groups(),
                    {group_name: this.group_name, group_type: 3},
                    {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
                ).then((rsp) => {
                    if (rsp && rsp.hasOwnProperty('status') && rsp.status === 201) {
                        this.$bvToast.toast(`创建组 ${this.group_name} 成功`, {title: '提示', variant: 'primary'});
                        this.$parent.tableData();
                    } else {
                        this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '创建失败', variant: 'danger'});
                    }
                })
                this.$nextTick(() => { this.$bvModal.hide('create') });   // 关闭 modal
            },
        },
    }
</script>
