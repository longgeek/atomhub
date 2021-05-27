<script>
    import Navbar from "@/components/navbar";
    import Footer from "@/components/footer";

    export default {
        data() {
            return {
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
    <div id="app">
        <Navbar v-if="doNotShowNavbar.indexOf($route.name) == -1" :navLight="true" />
        <router-view />
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
</template>
