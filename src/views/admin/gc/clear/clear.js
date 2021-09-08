/**
 * Admin GC Clear component
 */

export default {
    page: { title: '垃圾清理' },
    props: {
    },
    data() {
        return {
            cron: '',
            policy: 'None',
            crons: {
                Hourly: '0 0 * * * *',
                Daily: '0 0 0 * * *',
                Weekly: '0 0 0 * * 0',
            },
            delete_untagged: false,
            loading: false,
        }
    },
    created() {
        this.loading = true;
        this.$http.get(this.$api.schedule())
            .then(rsp => {
                if (rsp && rsp.hasOwnProperty('status') && rsp.status === 200) {
                    this.schedule = rsp.data;
                    this.policy = Object.keys(this.schedule).length ? this.schedule.schedule.type : 'None';
                } else {
                    this.$bvToast.toast(rsp.data.errors[0].message, {title: '提示', variant: 'danger'});
                }
                this.loading = false;
        })
    },
    methods: {
        dry() {
            this.loading = true;
            this.$http.post(
                this.$api.schedule(),
                {
                    parameters: {
                        delete_untagged: this.delete_untagged,
                        dry_run: true,
                    },
                    schedule: {type: 'Manual'},
                },
                {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
            ).then(rsp => {
                if (rsp && rsp.hasOwnProperty('status') && rsp.status === 201) {
                    this.$bvToast.toast('触发模拟运行成功', {title: '提示', variant: 'primary'});
                } else {
                    this.$bvToast.toast(rsp.data.errors[0].message, {title: '失败', variant: 'danger'});
                }
                this.loading = false;
            })
        },
        clear() {
            this.loading = true;
            this.$http.post(
                this.$api.schedule(),
                {
                    parameters: {
                        delete_untagged: this.delete_untagged,
                        dry_run: false,
                    },
                    schedule: {type: 'Manual'},
                },
                {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
            ).then(rsp => {
                if (rsp && rsp.hasOwnProperty('status') && rsp.status === 201) {
                    this.$bvToast.toast('垃圾回收成功', {title: '提示', variant: 'primary'});
                } else {
                    this.$bvToast.toast(rsp.data.errors[0].message, {title: '失败', variant: 'danger'});
                }
                this.loading = false;
            })
        },
        submit() {
            this.loading = true;

            // 调用 API
            this.$http.put(
                this.$api.schedule(),
                {
                    parameters: {
                        delete_untagged: this.delete_untagged,
                        dry_run: false,
                    },
                    schedule: {
                        type: this.policy,
                        cron: this.crons.hasOwnProperty(this.policy) ? this.crons[this.policy] : this.cron,
                    },
                },
                {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
            ).then(rsp => {
                if (rsp && rsp.hasOwnProperty('status') && rsp.status === 200) {
                    this.$bvToast.toast('修改垃圾清理定时任务成功', {title: '提示', variant: 'primary'});
                } else {
                    this.$bvToast.toast(rsp.data.errors[0].message, {title: '修改失败', variant: 'danger'});
                }
                this.loading = false;
            })
        },
    },
};
