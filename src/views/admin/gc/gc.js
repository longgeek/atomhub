/**
 * Admin gc component
 */

import Clear from "./clear/clear.vue";
import History from "./history/history.vue";
import PageIntroduction from "@/components/page-introduction";

export default {
    page: { title: '垃圾清理' },
    created() { this.init() },
    components: { Clear, History, PageIntroduction },
    data() {
        return {
            configurations: {},
            // tabs 作为功能标签从左至右排序顺序
            tabs: {
                schedule: 0,
                history: 1,
            },
            tabIndex: null,
            page_intro: {
                icon: "mdi mdi-delete-alert",
                title: '"垃圾清理"',
                content: 'AtomHub 平台垃圾清理。'
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
                        name: 'admin-gc',
                        params: {tab: key},
                    });
                }
            }
        }
    },
    methods: {
        init() {
            // 根据 URL 参数激活当前标签卡
            this.$route.params.tab ? this.tabIndex = this.tabs[this.$route.params.tab] : this.tabIndex = 0;
        },
    },
};
