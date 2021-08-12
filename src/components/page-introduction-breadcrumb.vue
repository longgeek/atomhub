/**
 *  在 introduction 中嵌套 breadcrumb 导航
 */

<script>
export default {
    props: {
        icon: {
            type: String,
        },
        navs: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
}
</script>

<template>
    <div class="row">
        <div class="col-12">
            <div class="page-introduction">
                <i class="_icon" :class="icon"></i>
                <span class="_box">
                    <div class="page-breadcrumb">
                        <b-breadcrumb :items="navs"></b-breadcrumb>
                    </div>
                </span>
            </div>
        </div>
    </div>
</template>
