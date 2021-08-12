<template>
    <b-modal id="quota"
        centered
        size="sm"
        title="修改项目配额（Quota）"
        title-class="font-18"
        ok-title="确认"
        cancel-title="取消"
        ok-variant="dark"
        cancel-variant="outline-dark"
        @ok="ok"
        @show="show"
        v-if="selects.length"
    >
        <div class="alert alert-primary">
            设置项目 <span class="text-warning">{{ selects[0].name }}</span> 的项目配额
        </div>
        <form class="form-horizontal needs-validation">
            <div class="form-group">
                <label>
                    默认配额存储
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
        </form>
    </b-modal>
</template>
<script>
    import { required, numeric, between, minLength, maxLength } from "vuelidate/lib/validators";

    const form = {
        storage: 10,
        storageUnit: 'GB',
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
                storage: { required, numeric, between: between(-1, 1024) },
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
            show() {
                this.form = { ...form };
                for (let i in this.$parent.quotas) {
                    let quo = this.$parent.quotas[i];
                    if (quo.ref.id == this.selects[0].project_id) {
                        const storage = quo.hard.storage;
                        if (storage == -1) break;
                        if (storage / 1024 / 1024 / 1024 < 1) {
                            this.form.storageUnit = 'MB';
                            this.form.storage = storage / 1024 / 1024;
                        }
                        if (storage / 1024 / 1024 / 1024 > 1 && storage / 1024 / 1024 / 1024 < 1024) {
                            this.form.storageUnit = 'GB';
                            this.form.storage = storage / 1024 / 1024 / 1024;
                        }
                        if (storage / 1024 / 1024 / 1024 > 1024) {
                            this.form.storageUnit = 'TB';
                            this.form.storage = storage / 1024 / 1024 / 1024 / 1024;
                        }
                    }
                }
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

                const params = {};

                // 转化存储单位
                if (this.form.storage == -1) {
                    params.storage = -1;
                } else {
                    if (this.form.storageUnit == "MB") {
                        params.storage = this.form.storage * 1024 * 1024;
                    } else if (this.form.storageUnit == "GB") {
                        params.storage = this.form.storage * 1024 * 1024 * 1024;
                    } else if (this.form.storageUnit == "TB") {
                        params.storage = this.form.storage * 1024 * 1024 * 1024 * 1024;
                    }
                }

                // 调用 API 修改全局存储配额
                this.$http.put(
                    this.$api.admin.quotas(this.selects[0].project_id),
                    { hard: params },
                    {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
                ).then((rsp) => {
                    if (rsp.status === 200) {
                        this.$parent.tableData();
                        this.$sleep(2000).then(() => {
                            this.$bvToast.toast(`修改项目配额成功`, {title: '提示', variant: 'primary'});
                            this.$nextTick(() => { this.$bvModal.hide('quota') });   // 关闭 modal
                        })
                    } else {
                        this.$bvToast.toast(rsp.data.msg, {title: '修改失败', variant: 'danger'});
                    }
                })
            },
        },
    }
</script>
