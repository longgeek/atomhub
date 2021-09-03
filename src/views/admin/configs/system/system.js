/**
 * Admin Configs Auth component
 */

import { required } from "vuelidate/lib/validators";

function equar(a, b) {
    // 判断数组的长度
    if (a.length !== b.length) return false

    // 循环遍历数组的值进行比较
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false
        }
    }
    return true;
}

export default {
    page: { title: '系统设置 - 配置管理' },
    props: {
        configs: { type: Object },
        getConfigs: { type: Function },
    },
    data() {
        return {
            cve: {},
            formCveItems: [],
            formCveItemsNew: [],
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

            this.$http.get(this.$api.CVEAllowlist())
                .then(rsp => {
                    if (rsp && rsp.hasOwnProperty('status') && rsp.status === 200) {
                        this.cve = rsp.data;
                        if (!this.cve.hasOwnProperty('expires_at')) this.cve.expires_at = null;

                        for (let i in this.cve.items) {
                            const obj = this.cve.items[i];
                            this.formCveItems.push(obj.cve_id);
                        }
                        this.formCveItemsNew = JSON.parse(JSON.stringify(this.formCveItems));
                    } else {
                        this.$bvToast.toast(
                            rsp ? rsp.data.msg : '请联系管理员',
                            {title: '获取配置信息错误', variant: 'danger'}
                        );
                    }
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
                    params[k] = parseInt(value) ? parseInt(value) : value;
                }
            }

            if (!Object.keys(params).length && equar(this.formCveItems, this.formCveItemsNew)) {
                this.loading = false;
                this.$bvToast.toast('表单内容无变化，请修改表单后提交', {title: '提示', variant: 'warning'});
                return;
            }

            // 修改表单
            if (Object.keys(params).length)  {
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
            }

            // 修改 CVE 名单
            if (!equar(this.formCveItems, this.formCveItemsNew)) {
                const params = JSON.parse(JSON.stringify(this.cve));
                params.items = [];
                for (let i in this.formCveItemsNew) {
                    const obj = this.formCveItemsNew[i];
                    params.items.push({cve_id: obj});
                }

                this.$http.put(
                    this.$api.CVEAllowlist(),
                    params,
                    {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
                ).then(rsp => {
                    if (rsp && rsp.hasOwnProperty('status') && rsp.status === 200) {
                        this.$bvToast.toast('修改 CVE 名单成功', {title: '提示', variant: 'primary'});
                    } else {
                        this.$bvToast.toast(rsp.data.errors[0].message, {title: '修改失败', variant: 'danger'});
                    }
                    this.loading = false;
                })
            }
        },
    },
};
