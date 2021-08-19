<template>
    <b-modal id="push-repos"
        centered
        size="md"
        title="推送镜像"
        title-class="font-18"
        ok-title="确认"
        cancel-title="取消"
        ok-variant="dark"
        cancel-variant="outline-dark"
        no-close-on-backdrop
        no-close-on-esc
    >
        <p><b>Docker 推送命令</b></p>
        <p>在项目中标记镜像：</p>
        <pre><code>docker tag SOURCE_IMAGE[:TAG] atomhub.org/library/REPOSITORY[:TAG]</code></pre>
        <p>推送镜像到当前项目：</p>
        <pre><code>docker push atomhub.org/library/REPOSITORY[:TAG]</code></pre>

        <p><b>Helm 推送命令</b></p>
        <p>在项目中标记 chart：</p>
        <pre><code>helm chart save CHART_PATH atomhub.org/library/REPOSITORY[:TAG]</code></pre>
        <p>推送 chart 到当前项目：</p>
        <pre><code>helm chart push atomhub.org/library/REPOSITORY[:TAG]</code></pre>

        <p><b>CNAB 推送命令</b></p>
        <p>推送 CNAB 到当前项目：</p>
        <pre><code>cnab-to-oci push CNAB_PATH --target atomhub.org/library/REPOSITORY[:TAG] --auto-update-bundle</code></pre>
    </b-modal>
</template>
