<script>
/**
 * Navbar component
 */
export default {
    data() {
        return {
            user: {},
            isCondensed: false,
            homeUrl: process.env.VUE_APP_BASE_URL || '/',
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
         * 获取登录状态
         */
        getLoginStatus() {
            this.$http.get(this.$api.users.current())
                .then((rsp) => {
                    if (rsp.status === 200) {
                        this.user = rsp.data;
                        localStorage.setItem('user', JSON.stringify(rsp.data));
                    } else {
                        localStorage.removeItem('user');
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
        }
    },
};
</script>

<template>
    <div>
        <!-- Navbar STart -->
        <header
            id="topnav"
            class="defaultscroll sticky nav-sticky"
            :class="{ 'bg-white': isWhiteNavbar === true }"
        >
            <div class="container">
                <!-- Logo container-->
                <a class="logo" :href="homeUrl" v-if="navLight !== true">
                    <img src="@/assets/images/logo-light.svg" height="50" alt="" />
                </a>
                <a class="logo" :href="homeUrl" v-else>
                    <img src="@/assets/images/logo-light.svg" class="l-dark" height="50" alt="" />
                    <img
                        src="@/assets/images/logo-light.svg"
                        class="l-light"
                        height="50"
                        alt=""
                    />
                </a>
                <form class="global-search">
                    <div class="position-relative">
                        <input type="text" class="form-control" placeholder="搜索镜像仓库，例如 CentOS、MySQL..." />
                        <span class="mdi mdi-magnify icon"></span>
                    </div>
                </form>
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
                        <li>
                            <router-link :to="{name: 'repos'}" class="side-nav-link-ref">Home</router-link>
                        </li>
                        <li :class="{ active: $route.name === 'repos' || $route.name === 'repos-detail'}">
                            <router-link :to="{name: 'repos'}" class="side-nav-link-ref">Repositories</router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'repos'}" class="side-nav-link-ref">About</router-link>
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
                <!--end navigation-->
            </div>
            <!--end container-->
        </header>
        <!--end header-->
        <!-- Navbar End -->
    </div>
</template>
