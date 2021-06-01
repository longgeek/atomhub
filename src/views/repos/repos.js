/**
 * Repos component
 */
export default {
    page: { title: '镜像仓库' },
    data() {
        return {
            searching: false,
            repos: [
                {
                    name: "Gitlab Community Edition",
                    descr: "GitLab includes Git repository management, issue tracking, code review, an IDE.",
                    url: "gitlab",
                    by: "Gitlab, Inc.",
                    logo: "Gitlab.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
                {
                    name: "Appdynamics",
                    descr: "Appdynamics is a Debian-based",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Appdynamics.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
                {
                    name: "Discord",
                    descr: "Agentless Application Performance Monitoring",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Discord.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
                {
                    name: "Gradle",
                    descr: "Linux operating system",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Gradle.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
                {
                    name: "Codepen",
                    descr: "based on free software.",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Codepen.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
                {
                    name: "Gradle",
                    descr: "several nodes on a cluster.",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Gradle.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
                {
                    name: "Eslint",
                    descr: "Gradle is a Debian-based Linux operating system based on free software.",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Eslint.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
                {
                    name: "Sketch",
                    descr: "Gradle is a Debian-based Linux operating system based on free software.",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Sketch.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
                {
                    name: "Udemy",
                    descr: "Supported tags and respective Dockerfile links",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Udemy.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
                {
                    name: "Webhooks",
                    descr: "Open Liberty multi-architecture images based on Ubuntu 18.04",
                    url: "gitlab",
                    by: "Atom Official Images",
                    logo: "Webhooks.svg",
                    update_time: "a year ago",
                    downloads: 2500,
                    stars: 389,
                    versions: 16,
                },
            ]
        }
    },
    created() { this.init() },
    watch: { '$route': "init" },
    methods: {
        init() {
            if (this.searching) { return; }

            this.searching = true;
            this.$sleep(3000).then(() => { this.searching = false });
        },
        clearSearch() {
            this.$router.push({name: this.$route.name});
        },
    },
}
