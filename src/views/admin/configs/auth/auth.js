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
                auth_mode: 'oidc_auth',     // 认证模式
                oidc_name: '',              // OIDC 供应商
                oidc_endpoint: '',          // OIDC Endpoint
                oidc_client_id: '',         // OIDC 客户端标识
                oidc_client_secret: '',     // OIDC 客户端标识
                oidc_groups_claim: '',      // 组名称
                oidc_admin_group: '',       // OIDC 管理员组
                oidc_scope: '',             // OIDC Scope
                oidc_verify_cert: '',       // 验证证书
                oidc_auto_onboard: '',      // 自动登录
            },
            loading: false,
            submitted: false,
        }
    },
    validations: {
        form: {
            auth_mode: { required },
            oidc_name: { required },
            oidc_endpoint: { required },
            oidc_client_id: { required },
            oidc_client_secret: { required },
            oidc_scope: { required },
        }
    },
    created() { this.init() },
    methods: {
        init() {
            this.form = this.configs;
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

            // // 调用 API 创建组
            // this.$http.post(
            //     this.$api.admin.groups(),
            //     {group_name: this.group_name, group_type: 3},
            //     {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
            // ).then((rsp) => {
            //     if (rsp.status === 201) {
            //         this.$bvToast.toast(`创建组 ${this.group_name} 成功`, {title: '提示', variant: 'primary'});
            //         this.$parent.tableData();
            //     } else {
            //         this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '创建失败', variant: 'danger'});
            //     }
            // })
        },
    },
};
