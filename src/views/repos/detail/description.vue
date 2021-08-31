<script>
    const mavonEditor = require('mavon-editor');
    import 'mavon-editor/dist/css/index.css';

    const data = function() {
        return {
            readonly: true,
            toolbars: {
                bold: true,                 // 粗体
                italic: true,               // 斜体
                header: true,               // 标题
                underline: true,            // 下划线
                strikethrough: true,        // 中划线
                mark: false,                // 标记
                superscript: false,         // 上角标
                subscript: false,           // 下角标
                quote: true,                // 引用
                ol: true,                   // 有序列表
                ul: true,                   // 无序列表
                link: false,                // 链接
                imagelink: false,           // 图片链接
                code: true,                 // code
                table: true,                // 表格
                fullscreen: true,           // 全屏编辑
                readmodel: false,           // 沉浸式阅读
                htmlcode: false,            // 展示html源码
                help: true,                 // 帮助
                /* 1.3.5 */
                undo: false,                // 上一步
                redo: false,                // 下一步
                trash: false,               // 清空
                save: false,                // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: false,          // 导航目录
                /* 2.1.8 */
                alignleft: true,            // 左对齐
                aligncenter: true,          // 居中
                alignright: true,           // 右对齐
                /* 2.2.1 */
                subfield: true,             // 单双栏模式
                preview: true,              // 预览
            }
        }
    }
    const methods = {
        submit() { this.$bvModal.show('save') },
        cancel() { this.$bvModal.show('cancel') },
        saveOk() {
            this.$http.put(
                this.$api.repositories.detail(
                    this.$route.params.project,
                    this.$route.params.repo
                ),
                {full_description: this.repo.full_description},
                {'X-Harbor-CSRF-Token': localStorage.getItem('__csrf')},
            ).then(rsp => {
                if (rsp.status === 200) {
                    this.readonly = true;
                    this.getDescription();
                    this.$bvToast.toast('保存镜像描述信息成功', {title: '提示', variant: 'primary'});
                } else {
                    this.$bvToast.toast(rsp ? rsp.data.msg : '请联系管理员', {title: '提示', variant: 'danger'});
                }
            })
        },
        cancelOk() {
            this.getDescription();
            this.readonly = !this.readonly;
        }
    }
    export default {
        page: { title: '描述信息 - 镜像详情' },
        data,
        props: {
            repo: { type: Object },
            project: { type: Object },
            loading: { type: Boolean },
            getDescription: { type: Function },
        },
        methods,
        created() { this.user = JSON.parse(localStorage.getItem('user')) },
        components: { 'mavon-editor': mavonEditor.mavonEditor },
    };
</script>

<template>
    <div>
        <div class="page-toolbar detail p-0 mb-3"
            v-if="
                (user && project && Object.keys(project).length && project.owner_id == user.user_id) ||
                (user && user.sysadmin_flag)
            "
        >
            <button class="btn btn-dark" v-if="readonly" @click="getDescription()">
                <i class="mdi mdi-refresh align-middle"></i>
            </button>
            <button class="btn btn-dark" v-else disabled>
                <i class="mdi mdi-refresh align-middle"></i>
            </button>
            <button class="btn btn-outline-dark" v-if="readonly" @click="readonly = !readonly">
                <i class="mdi mdi-circle-edit-outline align-middle"></i>
                开始编辑描述信息
            </button>
            <span class="text-muted float-right">
                <i class="mdi mdi-markdown-outline mdi-18px vertical-align-middle mr-2"></i>编辑支持使用 Markdown 进行样式设置
            </span>
            <button class="btn btn-success" v-if="!readonly" @click="submit">
                <i class="mdi mdi-content-save align-middle"></i>
                结束编辑描述信息, 并保存
            </button>
            <button class="btn btn-light" v-if="!readonly" @click="cancel">
                <i class="mdi mdi-undo align-middle"></i>
                取消编辑
            </button>
        </div>
        <div class="small" v-if="loading">正在加载...</div>
        <div v-if="!loading">
            <mavon-editor
                v-model="repo.full_description"
                v-if="!readonly"
                fontSize="12px"
                toolbarsBackground="#f6f9fc"
                placeholder="在此输入 Mardown 格式描述信息..."
                codeStyle="tomorrow-night"
                :tabSize=4
                :shortCut=false
                :scrollStyle=false
                :toolbars="toolbars"
                :editable="!readonly"
                style="height: calc(100vh - 240px);"
            ></mavon-editor>
            <div class="markdown-body p-4" v-if="readonly && repo.full_description" v-html="$options.filters.toMarkDown(repo.full_description)"></div>
            <div class="p-4" v-if="readonly && !repo.full_description">
                <span class="opacity-8">此镜像仓库没有描述信息</span>
            </div>
            <div class="small mt-4" v-if="!readonly">
                * 提示：在编辑完文档后, 需要点击上面的按钮来保存文档到服务器中。
            </div>
        </div>

        <b-modal id="save"
            centered
            size="sm"
            title="提示"
            title-class="font-18"
            ok-title="确认"
            cancel-title="取消"
            ok-variant="dark"
            cancel-variant="outline-dark"
            no-close-on-backdrop
            no-close-on-esc
            @ok="saveOk"
        >
            <div class="alert alert-primary mb-0">
                <span class="mdi mdi-information-outline mr-2"></span>确定保存当前编辑？
            </div>
        </b-modal>

        <b-modal id="cancel"
            centered
            size="sm"
            title="提示"
            title-class="font-18"
            ok-title="确认"
            cancel-title="取消"
            ok-variant="dark"
            cancel-variant="outline-dark"
            no-close-on-backdrop
            no-close-on-esc
            @ok="cancelOk"
        >
            <div class="alert alert-danger mb-0">
                <span class="mdi mdi-information-outline mr-2"></span>确定撤销当前编辑？
            </div>
        </b-modal>
    </div>
</template>

