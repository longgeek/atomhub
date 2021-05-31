<script>
/**
 * Logout component
 */
export default {
    page: { title: '退出登录' },
    created() {
        localStorage.removeItem('user');
        this.$router.push({name: 'repos'});
    }
};
</script>
