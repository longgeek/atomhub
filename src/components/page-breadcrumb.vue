<script>
export default {
    props: {
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
    <div class="page-breadcrumb d-flex align-items-center justify-content-between">
        <b-breadcrumb :items="navs"></b-breadcrumb>
    </div>
</template>
