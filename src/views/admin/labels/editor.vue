<template>
    <b-modal id="editor"
        modal-class="labels-modal"
        centered
        size="sm"
        title="编辑标签"
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
        props: { selects: { type: Array } },
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
                this.form.name = this.selects[0].name;
                this.form.color = this.selects[0].color;
                this.form.description = this.selects[0].description;
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
                this.$http.put(
                    this.$api.admin.labels(this.selects[0].id),
                    this.form,
                    {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
                ).then((rsp) => {
                    if (rsp && rsp.hasOwnProperty('status') && rsp.status === 200) {
                        this.$bvToast.toast(`编辑标签 ${this.form.name} 成功`, {title: '提示', variant: 'primary'});
                        this.$parent.tableData();
                        this.$nextTick(() => { this.$bvModal.hide('editor') });   // 关闭 modal
                    } else {
                        this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '创建失败', variant: 'danger'});
                    }
                    this.loading = false;
                })
            },
        },
    }
</script>
