<template>
    <b-modal id="create"
        modal-class="labels-modal"
        centered
        size="sm"
        title="添加 TAG"
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
        <form class="needs-validation" @submit.stop.prevent="submit">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>* 名称</label>
                        <input v-model="form.name" type="text" class="form-control" :class="{ 'is-invalid': submitted && $v.form.name.$error }" />
                    </div>
                </div>
            </div>
        </form>
    </b-modal>
</template>
<script>
    import { required, } from "vuelidate/lib/validators";

    export default {
        data() {
            return {
                form: {
                    name: '',
                },
                loading: false,
                submitted: false,
            }
        },
        validations: {
            form: {
                name: { required },
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
                this.form.name = '';
            },
            // 提交表单
            submit() {
                this.submitted = true;
                // 判断表单是否无效
                if (this.$v.form.$invalid) {
                    this.$v.$touch();
                    this.loading = false;
                    return;
                }

                // 调用 API 创建
                this.$http.post(
                    this.$api.repositories.artifacts.tags(
                        this.$route.params.project,
                        this.$route.params.repo,
                        this.$route.params.artifacts,
                    ),
                    this.form,
                    {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
                ).then((rsp) => {
                    if (rsp && rsp.hasOwnProperty('status') && rsp.status === 201) {
                        this.$bvToast.toast(`添加 TAG ${this.form.name} 成功`, {title: '提示', variant: 'primary'});
                        this.$parent.tableData();
                        this.$nextTick(() => { this.$bvModal.hide('create') });   // 关闭 modal
                    } else {
                        this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '添加失败', variant: 'danger'});
                    }
                    this.loading = false;
                })
            },
        },
    }
</script>
