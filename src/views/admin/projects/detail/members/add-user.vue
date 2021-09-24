<template>
    <b-modal id="add-user"
        centered
        size="sm"
        title="添加用户"
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
        <div class="alert alert-primary">添加用户到此项目中并给予相对应的角色</div>
        <form class="form-horizontal needs-validation">
            <div class="form-group">
                <label>用户名称 <span class="text-danger">*</span></label>
                <multiselect
                    :class="{ 'is-invalid': (submitted && $v.form.name.$error) || userExisted }"
                    v-model="form.name"
                    label="username"
                    track-by="user_id"
                    placeholder="请选择用户，可进行搜索"
                    :options="users"
                    :select-label="''"
                    :selectedLabel="'已选择'"
                    :deselectLabel="'点击移除'"
                    :internal-search="false"
                    :loading="userLoading"
                    @search-change="searchUsers"
                >
                    <template slot="noResult">未找到，请修改搜索关键字</template>
                    <template slot="noOptions">未找到用户列表</template>
                </multiselect>
                <div class="text-danger mt-2" v-if="submitted && $v.form.name.$error">请用户名称进行搜索，并选择用户</div>
                <div class="text-danger mt-2" v-if="submitted && userExisted">用户已存在于成员中，请重新选择</div>
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
    import { required } from "vuelidate/lib/validators";

    const form = {
        name: '',
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
                userLoading: false,
                submitted: false,
                userExisted: false,
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
                this.form = { ...form };
                this.loading = false;
                this.submitted = false;

                this.getUsers();
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
                    if (this.members[i].entity_name == this.form.name.username)  {
                        this.userExisted = true;
                        return;
                    }
                }

                // 调用 API
                const params = {
                    member_user: {username: this.form.name.username},
                    role_id: parseInt(this.form.role_id),
                };

                this.$http.post(
                    this.$api.projects.members(this.$route.params.project_id),
                    params,
                    {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
                ).then((rsp) => {
                    if (rsp && rsp.hasOwnProperty('status') && rsp.status === 201) {
                        this.$bvToast.toast(`添加 ${this.form.name.username} 成功`, {title: '提示', variant: 'primary'});
                        this.$parent.tableData();
                    } else {
                        this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '创建失败', variant: 'danger'});
                    }
                    this.loading = false;
                    this.$nextTick(() => { this.$bvModal.hide('add-user') });   // 关闭 modal
                })
            },
            // 下拉列表搜索用户
            searchUsers(str) {
                const params = {
                    page: 1,
                    page_size: 10,
                }
                if (str) params.q = `username=~${str}`;
                this.getUsers(params);
            },
            // 获取用户用于下拉列表
            getUsers(params) {
                this.userLoading = true;
                this.$http.get(this.$api.admin.users(), params)
                    .then((rsp, err) => {
                        if (rsp && rsp.hasOwnProperty('status') && rsp.status === 200) {
                            this.users = rsp.data;
                        } else {
                            this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '获取用户列表错误', variant: 'danger'});
                        }
                        this.userLoading = false;
                })
            },
        },
    }
</script>
