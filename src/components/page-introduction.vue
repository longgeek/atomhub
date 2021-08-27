<script>
export default {
    props: {
        intro: {
            type: Object,
        }
    },
}
</script>

<template>
    <div class="row">
        <div class="col-12">
            <div class="page-introduction">
                <i class="_icon" :class="intro.icon"></i>
                <span class="_box">
                    <div class="_title">{{ intro.title }}</div>
                    <div class="_content">{{ intro.content }}</div>
                </span>
            </div>
        </div>
    </div>
</template>
