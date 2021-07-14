<script>
    export default {
        props: {
            repo: { type: Object },
            artifacts: { type: Array },
            loading: { type: Boolean, default: true },
            getArtifacts: { type: Function },
        },
    };
</script>

<template>
<div>
    <div class="small" v-if="loading">正在加载...</div>
    <div v-if="!loading">
        <div class="page-toolbar detail p-0 mb-3">
            <button class="btn btn-dark" v-if="!loading" @click="getArtifacts()">
                <i class="mdi mdi-refresh align-middle"></i>
            </button>
            <button class="btn btn-dark" v-else disabled>
                <i class="mdi mdi-refresh align-middle"></i>
            </button>
        </div>
        <div class="table-responsive shadow">
            <table class="table mb-0">
                <thead>
                    <tr>
                        <th>构建编号</th>
                        <th>拉取命令</th>
                        <th>Tags</th>
                        <th>大小</th>
                        <th>推送时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(art, index) in artifacts" :key="index">
                        <td class="text-primary">{{ art.digest | limitTo(15) }}</td>
                        <td class="text-muted">
                            <span class="mdi mdi-content-copy h6 pointer hover-dark"
                                v-if="repo.hasOwnProperty('name')"
                                v-clipboard="'docker pull atomhub.org/' + repo.name + '@' + art.digest"
                            ></span>
                        </td>
                        <td>
                            <span v-for="(tag, idx) in art.tags" :key="idx">
                                {{ tag.name }}<span v-if="idx != art.tags.length - 1">、</span>
                            </span>
                        </td>
                        <td>
                            <span v-if="art.size / 1024 / 1024 > 1 && art.size / 1024 / 1024 < 1024">
                                {{ (art.size / 1024 / 1024).toFixed(2) }} MB
                            </span>
                            <span v-if="art.size / 1024 / 1024 < 1">
                                {{ (art.size / 1024).toFixed(2) }} KB
                            </span>
                            <span v-if="art.size / 1024 / 1024 >= 1024">
                                {{ (art.size / 1024 / 1024 / 1024).toFixed(2) }} GB
                            </span>
                        </td>
                        <td class="text-muted">{{ art.push_time | toLocalTime }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

