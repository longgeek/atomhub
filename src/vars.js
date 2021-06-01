/**
 * Global vars
 */
const vars = {
    loginUrl: process.env.VUE_APP_LOGIN_URL,
    logoutUrl: process.env.VUE_APP_LOGOUT_URL,
    registerUrl: process.env.VUE_APP_REGISTER_URL,
    reposFilters: [],
    reposType: [
        {
            name: 'Top Atoms',
            icon: 'mdi mdi-format-vertical-align-top',
        },
        {
            name: 'Developer',
            icon: 'mdi mdi-code-parentheses-box',
            children: [
                {
                    name: 'AI/Machine Learn',
                    check: false,
                },
                {
                    name: 'Database',
                    check: false,
                },
                {
                    name: 'Cloud tools',
                    check: false,
                },
                {
                    name: 'Analytics',
                    check: false,
                },
                {
                    name: 'Application Frameworks',
                    check: false,
                },
                {
                    name: 'Application Infrastructure',
                    check: false,
                },
                {
                    name: 'Application Services',
                    check: false,
                },
                {
                    name: 'Base Images',
                    check: false,
                },
                {
                    name: 'DevOps Tools',
                    check: false,
                },
                {
                    name: 'Featured Images',
                    check: false,
                },
                {
                    name: 'Messaging Services',
                    check: false,
                },
                {
                    name: 'Monitoring',
                    check: false,
                },
                {
                    name: 'Operating Systems',
                    check: false,
                },
                {
                    name: 'Programming Languages',
                    check: false,
                },
                {
                    name: 'Security',
                    check: false,
                },
                {
                    name: 'Storage',
                    check: false,
                },
            ]
        },
        {
            name: 'Operating Systems',
            icon: 'mdi mdi-ubuntu',
            children: [
                {
                    name: 'Linux',
                    check: false,
                },
                {
                    name: 'Windows',
                    check: false,
                },
            ]
        },
        {
            name: 'Architectures',
            icon: 'mdi mdi-trello',
            children: [
                {
                    name: 'ARM',
                    check: false,
                },
                {
                    name: 'ARM64',
                    check: false,
                },
                {
                    name: 'X86',
                    check: false,
                },
                {
                    name: 'X86-64',
                    check: false,
                },
            ]
        },
        {
            name: 'Other',
            icon: 'mdi mdi-unity',
        },
    ]
}

export default vars;
