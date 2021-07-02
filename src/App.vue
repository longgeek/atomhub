<script>
    import Navbar from "@/components/navbar";
    import Footer from "@/components/footer";
    import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

    export default {
        data() {
            return {
                locale: zhCN,
                doNotShowNavbar: ['error'],
            }
        },
        components: {
            Navbar,
            Footer,
        },
        page: {
            // All subcomponent titles will be injected into this template.
            titleTemplate(title) {
                title = typeof title === "function" ? title(this.$store) : title;
                return title ? `${title} · OpenAtom Foundation` : 'OpenAtom Foundation';
            }
        },
    }
</script>
<template>
    <a-config-provider :locale="locale">
        <div id="app">
            <Navbar v-if="doNotShowNavbar.indexOf($route.name) == -1" :navLight="true" />
            <div class="app-content">
                <router-view />
            </div>
            <Footer />

            <!-- Back to top -->
            <a
                href="javascript: void(0);"
                class="btn btn-icon btn-primary back-to-top"
                id="back-to-top"
                v-scroll-to="'#topnav'"
            >
                <i class="mdi mdi-arrow-up icons"></i>
            </a>
            <!-- Back to top -->
        </div>
    </a-config-provider>
</template>
