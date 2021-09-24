<template>
    <b-modal id="create"
        centered
        size="sm"
        title="新建项目（Projects）"
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
            <div class="form-group">
                <label>项目名称 <span class="text-danger">*</span></label>
                <input maxlength="30" class="form-control" v-model="form.name"
                    :class="{ 'is-invalid': submitted && $v.form.name.$error }"
                />
                <div class="text-danger mt-2" v-if="submitted && $v.form.name.$error">请输入项目名称，限制 2 - 30 个字符</div>
            </div>
            <div class="form-group">
                <label>访问级别</label>
                <p class="text-muted">当项目设为公开后，任何人都有此项目下镜像的读权限。命令行用户不需要“docker login”就可以拉取此项目下的镜像。</p>
                <div class="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        class="custom-control-input form-control"
                        id="customCheck1"
                        v-model="form.public"
                    />
                    <label class="custom-control-label" for="customCheck1">公开</label>
                </div>
            </div>
            <div class="form-group">
                <label>
                    存储容量
                    <i class="mdi mdi-information pointer" v-b-tooltip.hover.right title="如果你想要对存储不设置上限，请输入 -1"></i>
                    <span class="text-danger ml-1">*</span>
                </label>
                <div class="row">
                    <div class="col-9">
                        <input type="number" min=-1 class="form-control" v-model="form.storage"
                            :class="{ 'is-invalid': submitted && $v.form.storage.$error }"
                        />
                    </div>
                    <div class="col-3 pl-0">
                        <select class="form-control custom-select" v-model="form.storageUnit">
                            <option value="MB">MB</option>
                            <option value="GB">GB</option>
                            <option value="TB">TB</option>
                        </select>
                    </div>
                    <div class="col-12">
                        <div class="text-danger mt-2" v-if="submitted && $v.form.storage.$error">请输入 -1 至 1024 之间的数字</div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>
                    镜像代理
                    <i class="mdi mdi-information pointer" v-b-tooltip.hover.right title="开启此项，以使得该项目成为目标仓库的镜像代理.仅支持 DockerHub, Docker Registry, Harbor, Aws ECR, Azure ACR, Quay 和 Google GCR 类型的仓库"></i>
                </label>
                <div class="custom-control custom-switch">
                    <div class="form-group mb-0">
                        <input
                            type="checkbox"
                            class="custom-control-input"
                            id="customSwitch1"
                            v-model="registryProxy"
                        />
                        <label class="custom-control-label" for="customSwitch1">
                            <span v-if="!form.registryProxy">未开启</span>
                            <span v-else class="text-primary">请在下方选择要使用的镜像代理：</span>
                        </label>
                    </div>
                </div>
            </div>
        </form>
    </b-modal>
</template>
<script>
    import { required, numeric, between, minLength, maxLength } from "vuelidate/lib/validators";

    const form = {
        name: '',
        public: false,
        storage: 10,
        storageUnit: 'GB',
        registry_id: null,
        registryProxy: false,
    }

    export default {
        data() {
            return {
                form: form,
                loading: false,
                submitted: false,
            }
        },
        validations: {
            form: {
                name: { required, minLength: minLength(2), minLength: maxLength(30) },
                storage: { required, numeric, between: between(-1, 1024) },
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

                // 调用 API 创建项目
                const params = {
                    project_name: this.form.name,
                    metadata: { public: `${this.form.public}` },
                    registry_id: this.form.registry_id,
                };

                // 转化存储单位
                if (this.form.storage == -1) {
                    params.storage_limit = -1;
                } else {
                    if (this.form.storageUnit == "MB") {
                        params.storage_limit = this.form.storage * 1024 * 1024;
                    } else if (this.form.storageUnit == "GB") {
                        params.storage_limit = this.form.storage * 1024 * 1024 * 1024;
                    } else if (this.form.storageUnit == "TB") {
                        params.storage_limit = this.form.storage * 1024 * 1024 * 1024 * 1024;
                    }
                }
                this.$http.post(
                    this.$api.admin.projects(),
                    params,
                    {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
                ).then((rsp) => {
                    if (rsp && rsp.hasOwnProperty('status') && rsp.status === 201) {
                        this.$bvToast.toast(`创建项目 ${this.form.name} 成功`, {title: '提示', variant: 'primary'});
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
