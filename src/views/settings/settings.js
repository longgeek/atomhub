/**
 * Shop-products component
 */
export default {
    page: { title: '账户设置' },
    data() {
        return {
            user: {},
        }
    },
    components: {},
    created() {
        // 获取用户信息
        this.user = JSON.parse(localStorage.getItem('user'));
    },
    methods: {
        /**
         * Logout
         */
        logout() {
            this.$http.get(this.$vars.logoutUrl)
                .then((rsp) => {
                    if (rsp.status === 200) {
                        window.location.href = "/repos";
                    }
            })
        }
    }
}
