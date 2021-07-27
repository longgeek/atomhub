<template>
    <b-modal id="create"
        modal-class="labels-modal"
        centered
        size="sm"
        title="创建标签"
        title-class="font-18"
        ok-title="确认"
        cancel-title="取消"
        ok-variant="dark"
        cancel-variant="outline-dark"
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
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>* 描述</label>
                        <input v-model="form.description" type="text" class="form-control" :class="{ 'is-invalid': submitted && $v.form.description.$error }" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>* 标签颜色</label>
                        <input v-model="form.color" type="color" class="form-control" :class="{ 'is-invalid': submitted && $v.form.color.$error }" />
                        <br />
                        <Compact :value="color" @input="updateColor" />
                    </div>
                </div>
            </div>
        </form>
    </b-modal>
</template>
<script>
    import { Compact } from 'vue-color';
    import { required, } from "vuelidate/lib/validators";

    export default {
        data() {
            return {
                color: '#FCDC00',
                form: {
                    name: '',
                    color: '#FCDC00',
                    description: '',
                    project_id: 0,
                    scope: 'g',
                },
                loading: false,
                submitted: false,
            }
        },
        components: { Compact },
        validations: {
            form: {
                name: { required },
                color: { required },
                description: { required },
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
                this.form.color = '#FCDC00';
                this.form.description = '';
            },
            updateColor(value) {
                this.color = value.hex;
                this.form.color = value.hex;
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

                // 调用 API 创建组
                this.$http.post(
                    this.$api.admin.labels(),
                    this.form,
                    {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
                ).then((rsp) => {
                    if (rsp.status === 201) {
                        this.$bvToast.toast(`创建标签 ${this.form.name} 成功`, {title: '提示', variant: 'primary'});
                        this.$parent.tableData();
                    } else {
                        this.$bvToast.toast(rsp.data.msg, {title: '创建失败', variant: 'danger'});
                    }
                })
                this.$nextTick(() => { this.$bvModal.hide('create') });   // 关闭 modal
            },
        },
    }
</script>
