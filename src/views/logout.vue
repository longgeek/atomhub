<script>
/**
 * Logout component
 */
export default {
    page: { title: '首页' },
    data() {
        return {
            projects: [],
        };
    },
    created() {
        localStorage.removeItem('user');
        localStorage.removeItem('logintoken');
        window.location.href = this.$vars.loginUrl;
    }
};
</script>
