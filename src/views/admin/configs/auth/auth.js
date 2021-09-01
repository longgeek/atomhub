/**
 * Admin Configs Auth component
 */

import { required } from "vuelidate/lib/validators";

export default {
    page: { title: '配置管理' },
    props: {
        configs: { type: Object },
        getConfigs: { type: Function },
    },
    data() {
        return {
            form: {
                // auth_mode: 'oidc_auth',     // 认证模式
                // oidc_name: '',              // OIDC 供应商
                // oidc_endpoint: '',          // OIDC Endpoint
                // oidc_client_id: '',         // OIDC 客户端标识
                // oidc_client_secret: '',     // OIDC 客户端标识
                // oidc_groups_claim: '',      // 组名称
                // oidc_admin_group: '',       // OIDC 管理员组
                // oidc_scope: '',             // OIDC Scope
                // oidc_verify_cert: '',       // 验证证书
                // oidc_auto_onboard: '',      // 自动登录
            },
            loading: false,
            submitted: false,
        }
    },
    validations: {
        form: {
            auth_mode: { value: { required } },
            oidc_name: { value: { required } },
            oidc_endpoint: { value: { required } },
            oidc_client_id: { value: { required } },
            oidc_client_secret: { value: { required } },
            oidc_scope: { value: { required } },
        }
    },
    created() { this.init() },
    methods: {
        init() {
            this.form = JSON.parse(JSON.stringify(this.configs));
        },
        ping() {
            if (this.loading) return;
            this.loading = true;
            this.$http.post(
                this.$api.ping('oidc'),
                {
                    url: this.form.oidc_endpoint.value,
                    verify_cert: this.form.oidc_verify_cert.value,
                },
                {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
            ).then((rsp) => {
                if (rsp && rsp.hasOwnProperty('status') && rsp.status === 201) {
                    this.$bvToast.toast(`测试成功`, {title: '提示', variant: 'primary'});
                    this.$parent.tableData();
                } else {
                    this.$bvToast.toast(rsp.data.errors[0].message, {title: '测试失败', variant: 'danger'});
                }
                this.loading = false;
            })
        },
        cancel() {
            this.form = JSON.parse(JSON.stringify(this.configs));
        },
        submit() {
            this.getConfigs();
            this.loading = true;
            this.submitted = true;

            if (this.$v.form.$invalid) {
                this.$v.$touch();
                this.loading = false;
                return;
            }

            // 对比表单是否有变化
            const params = {};
            for (let k in this.form) {
                const value = this.form[k].value;
                if (value != this.configs[k].value) {
                    params[k] = value;
                }
            }

            if (!Object.keys(params).length) {
                this.loading = false;
                this.$bvToast.toast('表单内容无变化，请修改表单后提交', {title: '提示', variant: 'warning'});
                return;
            }

            // 调用 API
            this.$http.put(
                this.$api.admin.configurations(),
                params,
                {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
            ).then(rsp => {
                if (rsp && rsp.hasOwnProperty('status') && rsp.status === 200) {
                    this.$bvToast.toast('变更的配置项成功保存', {title: '提示', variant: 'primary'});
                } else {
                    this.$bvToast.toast(rsp.data.errors[0].message, {title: '修改失败', variant: 'danger'});
                }
                this.loading = false;
            })
        },
    },
};
