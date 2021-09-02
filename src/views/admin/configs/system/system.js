/**
 * Admin Configs Auth component
 */

import { required } from "vuelidate/lib/validators";

export default {
    page: { title: '系统设置 - 配置管理' },
    props: {
        configs: { type: Object },
        getConfigs: { type: Function },
    },
    data() {
        return {
            form: {},
            loading: false,
            submitted: false,
        }
    },
    validations: {
        form: {
            token_expiration: { value: { required } },
            robot_name_prefix: { value: { required } },
            robot_token_duration: { value: { required } },
        }
    },
    created() { this.init() },
    methods: {
        init() {
            this.form = JSON.parse(JSON.stringify(this.configs));
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
                    params[k] = parseInt(value) ? parseInt(value) : value;
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
