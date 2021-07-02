<script>
/**
 * Repos-type component
 */
export default {
    props: {
        load: { type: Function },
    },
    data() {
        return {
            types: this.$vars.reposType,
            filters: this.$vars.reposFilters,
        }
    },
    methods: {
        // 点击过滤条件动作
        filterClick(child, idx, parent) {
            let index = this.filters.indexOf(child.name);
            if (child.check) {
                this.filters.splice(index, 1);
            } else {
                this.filters.push({
                    name: child.name,
                    index: idx,
                    parent: parent,
                });
            }
            child.check = !child.check;

            this.$route.name == 'repos' ? this.load() : this.$router.push({name: 'repos'});
        },
    }
}
</script>
<template>
    <div class="secondary-nav bg-white sticky-bar" v-if="types.length">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <b-nav>
                        <span v-for="(item, index) in types" :key="index">
                            <b-nav-item v-if="!item.hasOwnProperty('children')">
                                <i :class="'icon ' + item.icon"></i>{{ item.name }}
                            </b-nav-item>
                            <b-nav-item-dropdown toggle-class="nav-link-custom" v-else>
                                <template #button-content>
                                    <i :class="'icon ' + item.icon"></i>{{ item.name }}
                                </template>
                                <ul class="list-unstyled">
                                    <li v-for="(child, idx) in item.children" :key="idx">
                                        <a class="dropdown-item" @click="filterClick(child, idx, index)">
                                            <span v-if="child.check" class="mdi mdi-check-box-outline mdi-18px mr-2 text-primary vertical-align-middle"></span>
                                            <span v-else class="mdi mdi-square-outline mdi-18px mr-2 vertical-align-middle"></span>
                                            {{ child.name }}
                                        </a>
                                    </li>
                                </ul>
                            </b-nav-item-dropdown>
                        </span>
                    </b-nav>
                </div>
            </div>
        </div>
    </div>
</template>
