<script>
/**
 * 账号设置- Cli 密码 component
 */
export default {
    props: {
        user: { type: Object },
    },
    data() {
        return {
            eye: false,
            secret: '',
            reg: /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])).{8,30}$/,
        }
    },
    created() {
        this.secret = this.user.oidc_user_meta.secret;
    },
    methods: {
        submit() {
            if (this.reg.test(this.secret)) return;

            this.$http.put(
                this.$api.users.cli_secret(this.user.user_id),
                {secret: this.secret},
                {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
            ).then((rsp) => {
                if (rsp.status === 200) {
                    this.$bvToast.toast('修改 Cli 密码成功', {title: '提示', variant: 'primary'});
                    this.user.oidc_user_meta.secret = this.secret;
                    localStorage.setItem('user', JSON.stringify(this.user));
                } else {
                    this.$bvToast.toast(rsp.data.msg, {title: '修改 Cli 密码失败', variant: 'danger'});
                }
            })
        },
    }
}
</script>

<template>
<div class="card-body">
    <h6 class="text-md-left text-center">Cli 密码</h6>
    <p class="text-muted mt-3">使用 Docker 或 Heml 命令行访问 AtomHub 时，可以使用该 Cli 密码作为密码。</p>
    <form>
        <div class="row mt-4">
            <div class="col-md-6">
                <div class="form-group">
                    <div class="position-relative input-group">
                        <input
                            name="password"
                            type="password"
                            class="form-control"
                            v-model="secret"
                            v-if="!eye"
                            :class="{'is-invalid': reg.test(secret)}"
                        />
                        <input
                            name="password"
                            type="text"
                            class="form-control"
                            v-model="secret"
                            v-else
                            :class="{'is-invalid': reg.test(secret)}"
                        />
                        <div class="input-group-append">
                            <button type="button" class="btn btn-light" v-clipboard="secret">
                                <i class="mdi mdi-content-copy text-muted"></i>
                            </button>
                            <button type="button" class="btn btn-light" @click="eye = !eye">
                                <i class="mdi mdi-eye text-muted" :class="{'mdi-eye': !eye, 'mdi-eye-off': eye}"></i>
                            </button>
                        </div>
                    </div>
                    <div class="text-danger mt-3" v-if="reg.test(secret)">Cli 密码必须包含大小写字母、数字，不支持特殊字符，8-30 个字符</div>
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-6">
                <button
                    class="btn btn-dark"
                    type="button"
                    :disabled="user.oidc_user_meta.secret == secret || reg.test(secret)"
                    v-b-modal.confirm
                >修改密码</button>
            </div>
            <b-modal id="confirm"
                centered
                size="sm"
                title="提示"
                title-class="font-18"
                ok-title="确认"
                ok-variant="dark"
                cancel-variant="outline-dark"
                cancel-title="取消"
                @ok="submit"
            >确定需要重新设置 Cli 密码吗，重新设置后，就的 Cli 密码将会被弃用。</b-modal>
        </div>
    </form>
</div>
</template>
