/**
 * 镜像仓库 Artifacts 下的扩展属性
 */

export default {
    page: { title: '属性 - Artifacts' },
    props: {
        des: { type: Object },
        loading: { type: Boolean },
        getDetail: { type: Function },
    },
    data() {
        return {
            loading: false,
        }
    },
    created() {
    },
    methods: {
    },
};
