<template>
    <b-modal id="add-group"
        centered
        size="sm"
        title="新建组成员"
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
        <div class="alert alert-primary">添加一个组作为具有指定角色的此项目的成员</div>
        <form class="form-horizontal needs-validation">
            <div class="form-group">
                <label>组名称 <span class="text-danger">*</span></label>
                <input maxlength="30" class="form-control" v-model="form.group_name"
                    :class="{ 'is-invalid': (submitted && $v.form.group_name.$error) || groupExisted }"
                />
                <div class="text-danger mt-2" v-if="submitted && $v.form.group_name.$error">请输入组名称，限制 2 - 30 个字符</div>
                <div class="text-danger mt-2" v-if="submitted && groupExisted">组已存在于成员中，请重新选择</div>
            </div>
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
    import { required, minLength, maxLength } from "vuelidate/lib/validators";

    const form = {
        group_name: '',
        role_id: 1,
    }

    export default {
        props: {
            members: { type: Array },
        },
        data() {
            return {
                users: [],
                form: form,
                loading: false,
                submitted: false,
                groupExisted: false,
                roles: [
                    { 1: '项目管理员'},
                    { 2: '开发者'},
                    { 3: '访客'},
                    { 4: '维护人员'},
                    { 5: '受限访客'},
                ]
            }
        },
        validations: {
            form: {
                group_name: { required, minLength: minLength(2), minLength: maxLength(30) },
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
                this.form = { ...form };
                this.loading = false;
                this.submitted = false;
            },
            // 提交表单
            submit() {
                this.submitted = true;

                if (this.$v.form.$invalid) {
                    this.$v.$touch();
                    this.loading = false;
                    return;
                }

                // 检测用户是否已存在于成员中
                for (let i in this.members) {
                    const obj = this.members[i];
                    if (obj.entity_name == this.form.group_name && obj.entity_type == 'g')  {
                        this.groupExisted = true;
                        return;
                    }
                }

                // 调用 API
                const params = {
                    member_group: {group_type: 3, group_name: this.form.group_name},
                    role_id: parseInt(this.form.role_id),
                };

                this.$http.post(
                    this.$api.projects.members(this.$route.params.project_id),
                    params,
                    {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
                ).then((rsp) => {
                    if (rsp && rsp.hasOwnProperty('status') && rsp.status === 201) {
                        this.$bvToast.toast(`添加 ${this.form.group_name} 成功`, {title: '提示', variant: 'primary'});
                        this.$parent.tableData();
                    } else {
                        this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '创建失败', variant: 'danger'});
                    }
                    this.loading = false;
                    this.$nextTick(() => { this.$bvModal.hide('add-group') });   // 关闭 modal
                })
            },
        },
    }
</script>
