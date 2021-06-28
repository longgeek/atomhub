<script>
/**
 * oidc-onboard component
 */
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
    page: { title: '确认用户名' },
    data: {
        return: {
            username: '',
            loading: false,
            submitted: false,
        }
    },
    created() {
        this.username = this.$route.query.username;
    },
    methods: {
        submit() {
            if (this.loading) return;

            this.loading = true;
            this.submitted = true;

            if (this.$v.username.$invalid) {
                this.$v.$toutch();
                this.loading = false;
                return;
            }

            // 调用 api 更新 username
            this.$http.post(
                this.$api.oidc.onboard(),
                {username: this.username},
                {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
            ).then((rsp) => {
                if (rsp.status === 200) {
                    window.location.href = "/repos";
                    this.$bvToast.toast('成功设置用户名', {title: '提示', variant: 'primary'});
                } else {
                    this.$bvToast.toast(rsp.data.errors[0].message, {title: '提示', variant: 'danger'});
                }
                this.loading = false;
            })
        }
    },
    validations: {
        username: { required, minLength: minLength(3), minLength: maxLength(255) }
    }
};
</script>

<template>
<div id="oidc-onboard___BV_modal_outer_" style="position: absolute; z-index: 1040;">
    <div id="oidc-onboard" role="dialog" aria-labelledby="oidc-onboard___BV_modal_title_" aria-describedby="oidc-onboard___BV_modal_body_" class="modal fade show" aria-modal="true" style="display: block;">
        <div class="modal-dialog modal-md modal-dialog-centered">
            <span tabindex="0"></span>
            <div id="oidc-onboard___BV_modal_content_" tabindex="-1" class="modal-content">
                <header id="oidc-onboard___BV_modal_header_" class="modal-header">
                    <h5 id="oidc-onboard___BV_modal_title_" class="modal-title">
                        设置 OIDC 用户名
                    </h5>
                </header>
                <div id="oidc-onboard___BV_modal_body_" class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">
                            首次通过第三方（OIDC）进行身份验证时，您必须创建一个 AtomHub 用户名。这将在 Atomhub 内用于与项目、角色等相关联。
                            <form class="form-horizontal needs-validation mt-4">
                                <div class="form-group mb-0">
                                    <input maxlength="30" class="form-control" v-model="username" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <footer id="oidc-onboard___BV_modal_footer_" class="modal-footer">
                    <a type="button" class="btn btn-outline-dark" :href="$vars.loginUrl">取消</a>
                    <button type="submit" class="btn btn-dark" @click="submit">保存</button>
                </footer>
            </div>
            <span tabindex="0"></span>
        </div>
    </div>
    <div id="oidc-onboard___BV_modal_backdrop_" class="modal-backdrop"></div>
</div>
</template>
