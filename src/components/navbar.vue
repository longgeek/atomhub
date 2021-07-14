<script>
/**
 * Navbar component
 */
export default {
    data() {
        return {
            user: {},
            search: '',
            isCondensed: false,
        };
    },
    props: {
        isWhiteNavbar: {
            type: Boolean,
        },
        navLight: {
            type: Boolean,
        },
    },
    created() {
        // 获取用户状态
        this.getLoginStatus();
    },
    mounted: () => {
        window.onscroll = function () {
            onwindowScroll();
        };

        function onwindowScroll() {
            if (
                document.body.scrollTop > 100 ||
                document.documentElement.scrollTop > 100
            ) {
                document.getElementById("back-to-top").style.display = "inline";
            } else {
                document.getElementById("back-to-top").style.display = "none";
            }
        }

        var links = document.getElementsByClassName("side-nav-link-ref");
        var matchingMenuItem = null;
        for (var i = 0; i < links.length; i++) {
            if (window.location.pathname === links[i].pathname) {
                matchingMenuItem = links[i];
                break;
            }
        }
    },
    methods: {
        /**
         * Toggle menu
         */
        toggleMenu() {
            this.isCondensed = !this.isCondensed;
            if (this.isCondensed) {
                document.getElementById("navigation").style.display = "block";
            } else document.getElementById("navigation").style.display = "none";
        },

        /**
         * Menu clicked show the submenu
         */
        onMenuClick(event) {
            event.preventDefault();
            const nextEl = event.target.nextSibling.nextSibling;

            if (nextEl && !nextEl.classList.contains("open")) {
                const parentEl = event.target.parentNode;
                if (parentEl) {
                    parentEl.classList.remove("open");
                }
                nextEl.classList.add("open");
            } else if (nextEl) {
                nextEl.classList.remove("open");
            }
            return false;
        },
        /**
         * 获取登录状态和系统信息
         */
        getLoginStatus() {
            // 获取用户登录状态
            // 将用户信息写入到 localStorage 以便其他页面用到
            this.$http.get(this.$api.users.current())
                .then((rsp) => {
                    if (rsp.status === 200) {
                        this.user = rsp.data;
                        localStorage.setItem('user', JSON.stringify(rsp.data));
                    } else {
                        localStorage.removeItem('user');
                    }
            })

            // 获取系统信息，同时写入 __csrf 到 LocalStorage 中
            // 用户在第一次登录设置用户名时调用 api 需要传递 __csft
            this.$http.get(this.$api.systeminfo())
                .then((rsp) => {
                    if (rsp.status === 200) {
                        localStorage.setItem('systeminfo', JSON.stringify(rsp.data));
                        localStorage.setItem('__csrf', rsp.headers['x-harbor-csrf-token']);
                    } else {
                        localStorage.removeItem('__csrf');
                        localStorage.removeItem('systeminfo');
                    }
            })
        },
        /**
         * Logout
         */
        logout() {
            this.$http.get(this.$vars.logoutUrl)
                .then((rsp) => {
                    if (rsp.status === 200) {
                        window.location.href = "/repos";
                    }
            })
        },
        /**
         * 搜索动作
         */
        globalSearch() {
            // 判断搜索内容是否为空
            if ( !this.search) return;

            // 跳转页面到 /repos
            // this.$router.push({ name: 'repos'});
            this.$sleep(100).then(() => {
                this.$router.push({ name: 'repos', query: { search: this.search } });
                this.search = '';
            })
        },
    },
};
</script>

<template>
    <div>
        <header
            id="topnav"
            class="defaultscroll sticky nav-sticky"
            :class="{ 'bg-white': isWhiteNavbar === true }"
        >
            <div class="container">
                <!-- Logo container-->
                <router-link class="logo" :to="{name: 'home'}" v-if="navLight !== true">
                    <img src="@/assets/images/logo-light.svg" height="50" alt="" />
                </router-link>
                <router-link class="logo" :to="{name: 'home'}" v-else>
                    <img src="@/assets/images/logo-light.svg" class="l-dark" height="50" alt="" />
                    <img
                        src="@/assets/images/logo-light.svg"
                        class="l-light"
                        height="50"
                        alt=""
                    />
                </router-link>
                <div class="global-search">
                    <div class="position-relative">
                        <input
                            type="text"
                            class="form-control"
                            v-model="search"
                            @keydown.13="globalSearch($event)"
                            placeholder="搜索镜像仓库，例如 CentOS、MySQL..."
                        />
                        <span class="mdi mdi-magnify icon"></span>
                    </div>
                </div>
                <div class="auth-button" v-if="Object.keys(user).length === 0">
                    <a
                        :href="$vars.loginUrl"
                        class="btn mr-2"
                        :class="{
                            'btn-light': navLight === true,
                            'btn-primary': navLight !== true,
                        }"
                        >登录</a
                    >
                    <a
                        :href="$vars.registerUrl"
                        class="btn"
                        :class="{
                            'btn-light': navLight === true,
                            'btn-primary': navLight !== true,
                        }"
                        >注册</a
                    >
                </div>
                <ul class="auth-button list-inline mb-0" v-else>
                    <li class="list-inline-item mb-0">
                        <b-dropdown
                            class="btn-group mr-2"
                            variant="soft-primary"
                        >
                            <template #button-content>
                                <v-gravatar :email="user.email"
                                    alt="null"
                                    :default-img="$gravatar.defaultImg"
                                    :hostname="$gravatar.host"
                                    class="rounded-circle avatar avatar-ex-sm mx-auto"
                                />
                                <span class="ml-2">{{ user.realname }}</span>
                            </template>
                            <b-dropdown-item to="/profile">个人主页</b-dropdown-item>
                            <b-dropdown-item to="/settings">账号设置</b-dropdown-item>
                            <b-dropdown-item to="/logs">操作日志</b-dropdown-item>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item @click="logout">退出登录</b-dropdown-item>
                        </b-dropdown>
                    </li>
                </ul>
                <!--end login button-->
                <!-- End Logo container-->
                <div class="menu-extras">
                    <div class="menu-item">
                        <!-- Mobile menu toggle-->
                        <a
                            class="navbar-toggle"
                            @click="toggleMenu()"
                            :class="{ open: isCondensed === true }"
                        >
                            <div class="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </a>
                        <!-- End mobile menu toggle-->
                    </div>
                </div>

                <div id="navigation" class="float-right">
                    <ul
                        class="navigation-menu"
                        :class="{ 'nav-light': navLight === true }"
                    >
                        <li :class="{active: $route.name === 'home'}">
                            <router-link :to="{name: 'home'}" class="side-nav-link-ref">首页</router-link>
                        </li>
                        <li :class="{active: $route.name === 'repos' || $route.name === 'repos-detail'}">
                            <router-link :to="{name: 'repos'}" class="side-nav-link-ref">镜像仓库</router-link>
                        </li>
                        <li class="has-submenu" :class="{active: $route.name.startsWith('admin')}" v-if="user.sysadmin_flag">
                            <a href="javascript:void(0)" @click="onMenuClick">系统管理</a>
                            <span class="menu-arrow"></span>
                            <ul class="submenu">
                                <li>
                                    <router-link :to="{name: 'admin-users'}" class="side-nav-link-ref">
                                        <i class="mdi mdi-account mr-2"></i>用户管理
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{name: 'admin-robot-accounts'}" class="side-nav-link-ref">
                                        <i class="mdi mdi-robot mr-2"></i>机器人账户
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{name: 'admin-groups'}" class="side-nav-link-ref">
                                        <i class="mdi mdi-account-multiple mr-2"></i>组管理
                                    </router-link>
                                </li>
                                <!-- li>
                                    <router-link :to="{name: 'admin-users'}" class="side-nav-link-ref">
                                        <i class="mdi mdi-checkbox-multiple-blank mr-2"></i>仓库管理
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{name: 'admin-users'}" class="side-nav-link-ref">
                                        <i class="mdi mdi-content-copy mr-2"></i>复制管理
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{name: 'admin-users'}" class="side-nav-link-ref">
                                        <i class="mdi mdi-view-week mr-2"></i>分布式分发
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{name: 'admin-users'}" class="side-nav-link-ref">
                                        <i class="mdi mdi-tag mr-2"></i>标签
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{name: 'admin-users'}" class="side-nav-link-ref">
                                        <i class="mdi mdi-hexagon-slice-5 mr-2"></i>项目定额
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{name: 'admin-users'}" class="side-nav-link-ref">
                                        <i class="mdi mdi-shield-alert mr-2"></i>审查服务
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{name: 'admin-users'}" class="side-nav-link-ref">
                                        <i class="mdi mdi-trash-can mr-2"></i>垃圾清理
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{name: 'admin-users'}" class="side-nav-link-ref">
                                        <i class="mdi mdi-cogs mr-2"></i>配置管理
                                    </router-link>
                                </li -->
                            </ul>
                        </li>
                    </ul>
                    <div v-if="Object.keys(user).length === 0">
                        <div class="auth-menu-btn d-none">
                            <a :href="$vars.loginUrl" class="btn btn-outline-primary">登录</a>
                        </div>
                        <div class="auth-menu-btn d-none mb-4">
                            <a :href="$vars.registerUrl" class="btn btn-primary">注册</a>
                        </div>
                    </div>
                    <div class="auth-menu-btn d-none" v-else>
                        <ul class="buy-menu-button list-inline">
                            <li class="list-inline-item mb-0">
                                <b-dropdown
                                    class="btn-group mr-2"
                                    variant="soft-primary"
                                >
                                    <template #button-content>
                                        <v-gravatar :email="user.email"
                                            alt="null"
                                            :default-img="$gravatar.defaultImg"
                                            :hostname="$gravatar.host"
                                            class="rounded-circle avatar avatar-ex-sm mx-auto"
                                        />
                                        <span class="ml-2">{{ user.realname }}</span>
                                    </template>
                                    <!-- b-dropdown-item to="/profile">个人主页</b-dropdown-item>
                                    <b-dropdown-item to="/settings">账号设置</b-dropdown-item>
                                    <b-dropdown-divider></b-dropdown-divider -->
                                    <b-dropdown-item to="/logout">退出登录</b-dropdown-item>
                                </b-dropdown>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>
