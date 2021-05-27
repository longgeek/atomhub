<script>
/**
 * Page-error component
 */
export default {
    data() {
        return {}
    },
    components: {}
}
</script>

<template>
<div>
    <div class="back-to-home rounded d-none d-sm-block">
        <router-link to="/" class="btn btn-icon btn-soft-primary">
            <i class="mdi mdi-home icons"></i>
        </router-link>
    </div>

    <!-- ERROR PAGE -->
    <section class="bg-home d-flex align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-12 text-center">
                    <img src="@/assets/images/404.svg" class="img-fluid" alt="">
                    <div class="text-capitalize text-dark mb-4 error-page">无法找到该网页</div>
                    <p class="text-muted para-desc mx-auto">
                    请检查输入的 <b class="text-primary">URL</b> 地址是否正确，也可通过下面按钮进行页面跳转。
                    </p>
                </div>
                <!--end col-->
            </div>
            <!--end row-->

            <div class="row">
                <div class="col-md-12 text-center">
                    <router-link to="/" class="btn btn-outline-primary mt-4">返回</router-link>
                    <router-link to="/" class="btn btn-primary mt-4 ml-2">去首页</router-link>
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!--end container-->
    </section>
    <!--end section-->
    <!-- ERROR PAGE -->
</div>
</template>
