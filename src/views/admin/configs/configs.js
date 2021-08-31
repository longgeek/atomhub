/**
 * Admin Configs component
 */

import Auth from "./auth/auth.vue";
import PageIntroduction from "@/components/page-introduction";

export default {
    page: { title: '配置管理' },
    created() { this.init() },
    components: { Auth, PageIntroduction },
    data() {
        return {
            configurations: {},
            // tabs 作为功能标签从左至右排序顺序
            tabs: {
                auth: 0,
                mail: 1,
                system: 2,
            },
            tabIndex: null,
            page_intro: {
                icon: "mdi mdi-cogs",
                title: '"配置管理"',
                content: 'AtomHub 平台配置管理。'
            },
            loading: false,
        }
    },
    watch: {
        // 监听激活标签
        // 标签激活时，自动修改 URL 路径
        tabIndex () {
            for (let i in Object.keys(this.tabs)) {
                const key = Object.keys(this.tabs)[i];
                if (this.tabs[key] == this.tabIndex && this.$route.params.tab != key) {
                    this.$router.push({
                        name: 'admin-configs',
                        params: {tab: key},
                    });
                }
            }
        }
    },
    methods: {
        init() {
            this.loading = true;
            this.getConfigurations();

            // 根据 URL 参数激活当前标签卡
            this.$route.params.tab ? this.tabIndex = this.tabs[this.$route.params.tab] : this.tabIndex = 0;
        },
        // 获取配置信息
        getConfigurations() {
            this.$http.get(this.$api.admin.configurations())
                .then(rsp => {
                    if (rsp && rsp.hasOwnProperty('status') && rsp.status === 200) {
                        this.configurations = rsp.data;
                    } else {
                        this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '获取配置信息错误', variant: 'danger'});
                    }
                    this.loading = false;
            })
        }
    },
};
