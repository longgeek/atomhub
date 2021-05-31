<script>
/**
 * Page-job-detail component
 */
export default {
    data() {
        return {
            repo: {
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
        }
    },
}
</script>

<template>
<div>
    <div class="secondary-nav bg-white sticky-bar">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <b-nav>
                        <b-nav-item active>
                            <i class="icon mdi mdi-format-vertical-align-top"></i>Top Atoms
                        </b-nav-item>
                        <b-nav-item-dropdown toggle-class="nav-link-custom">
                            <template #button-content>
                                <i class="icon mdi mdi-code-parentheses-box"></i>Developer
                            </template>
                            <b-dropdown-item>Tools Runtime</b-dropdown-item>
                            <b-dropdown-item>AI/Machine Learn</b-dropdown-item>
                            <b-dropdown-item>Database</b-dropdown-item>
                            <b-dropdown-item>Cloud tools</b-dropdown-item>
                            <b-dropdown-item>Cloud tools</b-dropdown-item>
                            <b-dropdown-item>Analytics</b-dropdown-item>
                            <b-dropdown-item>Application Frameworks</b-dropdown-item>
                            <b-dropdown-item>Application Infrastructure</b-dropdown-item>
                            <b-dropdown-item>Application Services</b-dropdown-item>
                            <b-dropdown-item>Base Images</b-dropdown-item>
                            <b-dropdown-item>DevOps Tools</b-dropdown-item>
                            <b-dropdown-item>Featured Images</b-dropdown-item>
                            <b-dropdown-item>Messaging Services</b-dropdown-item>
                            <b-dropdown-item>Monitoring</b-dropdown-item>
                            <b-dropdown-item>Operating Systems</b-dropdown-item>
                            <b-dropdown-item>Programming Languages</b-dropdown-item>
                            <b-dropdown-item>Security</b-dropdown-item>
                            <b-dropdown-item>Storage</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item-dropdown toggle-class="nav-link-custom">
                            <template #button-content>
                                <i class="icon mdi mdi-ubuntu"></i>Operating Systems
                            </template>
                            <b-dropdown-item>Linux</b-dropdown-item>
                            <b-dropdown-item>Windows</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item-dropdown toggle-class="nav-link-custom">
                            <template #button-content>
                                <i class="icon mdi mdi-trello"></i>Architectures
                            </template>
                            <b-dropdown-item>ARM</b-dropdown-item>
                            <b-dropdown-item>ARM64</b-dropdown-item>
                            <b-dropdown-item>X86</b-dropdown-item>
                            <b-dropdown-item>X86-64</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item>
                            <i class="icon mdi mdi-unity"></i>Other
                        </b-nav-item>
                    </b-nav>
                </div>
            </div>
        </div>
    </div>

    <section class="section">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-7 col-12">
                    <div class="bg-white p-4 shadow rounded">
                        <div class="mt-2">
                        <router-link class="text-primary" :to="{name: 'repos'}">
                            <i class="mdi mdi-chevron-left"></i>
                            Back to repositories
                        </router-link>
                        </div>
                        <div class="text-center my-5">
                            <img src="temporary/company/Gitlab.svg" class="avatar avatar-small" alt="">
                            <h4 class="title mt-4 mb-3">{{ repo.name }}</h4>
                            <p class="para-desc mx-auto text-muted">{{ repo.descr }}</p>
                        </div>

                        <div class="mt-4">
                            <b-tabs
                                pills
                                justified
                                nav-class="bg-white shadow mb-4"
                                content-class="py-4"
                                nav-wrapper-class="col-lg-6 col-md-12 offset-md-3"
                            >
                                <b-tab active title-item-class="m-1">
                                    <template #title>
                                        <span class="nav-link py-2 px-5">
                                            <div class="text-center">Description</div>
                                        </span>
                                    </template>
                                    <div data-testid="markdownContent" class="dMarkdown"><div class="styles__scaleImages___3IpJT"><h5>Quick reference</h5> <ul> <li><p><strong>Maintained by</strong>: <a href="https://partner-images.canonical.com/core/" rel="nofollow noopener">Canonical</a> and <a href="https://github.com/tianon/docker-brew-ubuntu-core" rel="nofollow noopener">Tianon (Debian Developer)</a></p> </li> <li><p><strong>Where to get help</strong>: <a href="https://forums.docker.com/" rel="nofollow noopener">the Docker Community Forums</a>, <a href="https://dockr.ly/slack" rel="nofollow noopener">the Docker Community Slack</a>, or <a href="https://stackoverflow.com/search?tab=newest&amp;q=docker" rel="nofollow noopener">Stack Overflow</a></p> </li> </ul> <h5>Supported tags and respective <code>Dockerfile</code> links</h5> <ul> <li><a href="https://github.com/tianon/docker-brew-ubuntu-core/blob/042ff8d516e356e9df18e1c34235553fa150d19d/bionic/Dockerfile" rel="nofollow noopener"><code>18.04</code>, <code>bionic-20210512</code>, <code>bionic</code></a></li> <li><a href="https://github.com/tianon/docker-brew-ubuntu-core/blob/042ff8d516e356e9df18e1c34235553fa150d19d/focal/Dockerfile" rel="nofollow noopener"><code>20.04</code>, <code>focal-20210416</code>, <code>focal</code>, <code>latest</code></a></li> <li><a href="https://github.com/tianon/docker-brew-ubuntu-core/blob/042ff8d516e356e9df18e1c34235553fa150d19d/groovy/Dockerfile" rel="nofollow noopener"><code>20.10</code>, <code>groovy-20210514</code>, <code>groovy</code></a></li> <li><a href="https://github.com/tianon/docker-brew-ubuntu-core/blob/042ff8d516e356e9df18e1c34235553fa150d19d/hirsute/Dockerfile" rel="nofollow noopener"><code>21.04</code>, <code>hirsute-20210514</code>, <code>hirsute</code>, <code>rolling</code></a></li> <li><a href="https://github.com/tianon/docker-brew-ubuntu-core/blob/042ff8d516e356e9df18e1c34235553fa150d19d/trusty/Dockerfile" rel="nofollow noopener"><code>14.04</code>, <code>trusty-20191217</code>, <code>trusty</code></a></li> <li><a href="https://github.com/tianon/docker-brew-ubuntu-core/blob/042ff8d516e356e9df18e1c34235553fa150d19d/xenial/Dockerfile" rel="nofollow noopener"><code>16.04</code>, <code>xenial-20210429</code>, <code>xenial</code></a></li> </ul> <h5>Quick reference (cont.)</h5> <ul> <li><p><strong>Where to file issues</strong>: <a href="https://bugs.launchpad.net/cloud-images" rel="nofollow noopener">the cloud-images bug tracker</a> (include the <code>docker</code> tag)</p> </li> <li><p><strong>Supported architectures</strong>: (<a href="https://github.com/docker-library/official-images#architectures-other-than-amd64" rel="nofollow noopener">more info</a>) <a href="https://hub.docker.com/r/amd64/ubuntu/"><code>amd64</code></a>, <a href="https://hub.docker.com/r/arm32v7/ubuntu/"><code>arm32v7</code></a>, <a href="https://hub.docker.com/r/arm64v8/ubuntu/"><code>arm64v8</code></a>, <a href="https://hub.docker.com/r/i386/ubuntu/"><code>i386</code></a>, <a href="https://hub.docker.com/r/ppc64le/ubuntu/"><code>ppc64le</code></a>, <a href="https://hub.docker.com/r/s390x/ubuntu/"><code>s390x</code></a></p> </li> <li><p><strong>Published image artifact details</strong>: <a href="https://github.com/docker-library/repo-info/blob/master/repos/ubuntu" rel="nofollow noopener">repo-info repo's <code>repos/ubuntu/</code> directory</a> (<a href="https://github.com/docker-library/repo-info/commits/master/repos/ubuntu" rel="nofollow noopener">history</a>) (image metadata, transfer size, etc)</p> </li> <li><p><strong>Image updates</strong>: <a href="https://github.com/docker-library/official-images/issues?q=label%3Alibrary%2Fubuntu" rel="nofollow noopener">official-images repo's <code>library/ubuntu</code> label</a><br><a href="https://github.com/docker-library/official-images/blob/master/library/ubuntu" rel="nofollow noopener">official-images repo's <code>library/ubuntu</code> file</a> (<a href="https://github.com/docker-library/official-images/commits/master/library/ubuntu" rel="nofollow noopener">history</a>)</p> </li> <li><p><strong>Source of this description</strong>: <a href="https://github.com/docker-library/docs/tree/master/ubuntu" rel="nofollow noopener">docs repo's <code>ubuntu/</code> directory</a> (<a href="https://github.com/docker-library/docs/commits/master/ubuntu" rel="nofollow noopener">history</a>)</p> </li> </ul> <h5>What is Ubuntu?</h5> <p>Ubuntu is a Debian-based Linux operating system that runs from the desktop to the cloud, to all your internet connected things. It is the world's most popular operating system across public clouds and OpenStack clouds. It is the number one platform for containers; from Docker to Kubernetes to LXD, Ubuntu can run your containers at scale. Fast, secure and simple, Ubuntu powers millions of PCs worldwide.</p> <p>Development of Ubuntu is led by Canonical Ltd. Canonical generates revenue through the sale of technical support and other services related to Ubuntu. The Ubuntu project is publicly committed to the principles of open-source software development; people are encouraged to use free software, study how it works, improve upon it, and distribute it.</p> <blockquote> <p><a href="https://en.wikipedia.org/wiki/Ubuntu" rel="nofollow noopener">wikipedia.org/wiki/Ubuntu</a></p> </blockquote> <p><img src="https://raw.githubusercontent.com/docker-library/docs/01c12653951b2fe592c1f93a13b4e289ada0e3a1/ubuntu/logo.png" alt="logo"></p> <h5>What's in this image?</h5> <p>This image is built from official rootfs tarballs provided by Canonical (specifically, <a href="https://partner-images.canonical.com/core/" rel="nofollow noopener">https://partner-images.canonical.com/core/</a>).</p> <p>The <code>ubuntu:latest</code> tag points to the "latest LTS", since that's the version recommended for general use. The <code>ubuntu:rolling</code> tag points to the latest release (regardless of LTS status).</p> <p>Along a similar vein, the <code>ubuntu:devel</code> tag is an alias for whichever release the "devel" suite on the mirrors currently points to, as determined by the following one-liner: <code>wget -qO- http://archive.ubuntu.com/ubuntu/dists/devel/Release | awk -F ': ' '$1 == "Codename" { print $2; exit }'</code></p> <h6>Locales</h6> <p>Given that it is a minimal install of Ubuntu, this image only includes the <code>C</code>, <code>C.UTF-8</code>, and <code>POSIX</code> locales by default. For most uses requiring a UTF-8 locale, <code>C.UTF-8</code> is likely sufficient (<code>-e LANG=C.UTF-8</code> or <code>ENV LANG C.UTF-8</code>).</p> <p>For uses where that is not sufficient, other locales can be installed/generated via the <code>locales</code> package. <a href="https://github.com/docker-library/postgres/blob/69bc540ecfffecce72d49fa7e4a46680350037f9/9.6/Dockerfile#L21-L24" rel="nofollow noopener">PostgreSQL has a good example of doing so</a>, copied below:</p> <pre><code>RUN apt-get update &amp;&amp; apt-get install -y locales &amp;&amp; rm -rf /var/lib/apt/lists/* \ &amp;&amp; localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8 ENV LANG en_US.utf8</code></pre> <h5>License</h5> <p>View <a href="https://www.ubuntu.com/about/about-ubuntu/licensing" rel="nofollow noopener">license information</a> for the software contained in this image.</p> <p>As with all Docker images, these likely also contain other software which may be under other licenses (such as Bash, etc from the base distribution, along with any direct or indirect dependencies of the primary software being contained).</p> <p>Some additional license information which was able to be auto-detected might be found in <a href="https://github.com/docker-library/repo-info/tree/master/repos/ubuntu" rel="nofollow noopener">the <code>repo-info</code> repository's <code>ubuntu/</code> directory</a>.</p> <p>As for any pre-built image usage, it is the image user's responsibility to ensure that any use of this image complies with any relevant licenses for all software contained within.</p> </div></div>
                                </b-tab>
                                <b-tab title-item-class="m-1">
                                    <template #title>
                                        <span class="nav-link py-2 px-5 rounded">
                                            <div class="text-center">Tags</div>
                                        </span>
                                    </template>
                                    <div class="table-responsive">
                                      <table class="table mb-0">
                                        <thead>
                                          <tr>
                                            <th>Tag</th>
                                            <th>Last Time</th>
                                            <th>Size</th>
                                            <th></th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td class="text-primary">6.0.43</td>
                                            <td class="text-muted">a year ago</td>
                                            <td>156 MB</td>
                                            <td>
                                                <p class="text-muted font-weight-bold mb-0"><span class="text-success">$</span> docker pull atomhub.org/library/gitlab:6.0.43</p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td class="text-primary">7.0.76-alpine</td>
                                            <td class="text-muted">5 mins ago</td>
                                            <td>82.9 MB</td>
                                            <td>
                                                <p class="text-muted font-weight-bold mb-0"><span class="text-success">$</span> docker pull atomhub.org/library/gitlab:7.0.76-alpine </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td class="text-primary">7.0.59</td>
                                            <td class="text-muted">18 mins ago</td>
                                            <td>27.2 MB</td>
                                            <td>
                                                <p class="text-muted font-weight-bold mb-0"><span class="text-success">$</span> docker pull atomhub.org/library/gitlab:7.0.59 </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                </b-tab>
                            </b-tabs>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                    <div class="card border-0 sidebar sticky-bar rounded shadow" style="top: 142px;">
                        <div class="card-body">
                            <div class="widget mb-4 pb-2">
                                <h6 class="widget-title">Security</h6>
                                <div class="text-center">
                                    <i class="mdi mdi-shield-check-outline h1 text-success"></i>
                                    <div class="text-success">It has passed the audit</div>
                                </div>
                            </div>
                            <div class="widget mb-4 pb-2">
                                <h6 class="widget-title">Overview</h6>
                                <ul class="list-unstyled mt-4 mb-0 blog-categories">
                                    <li>
                                        <span class="text-muted">By</span>
                                        <span class="float-right text-primary">{{ repo.by }}</span>
                                    </li>
                                    <li>
                                        <span class="text-muted">Updated</span>
                                        <span class="float-right">{{ repo.update_time }}</span>
                                    </li>
                                    <li>
                                        <span class="text-muted">Downloads</span>
                                        <span class="float-right">{{ repo.downloads }}</span>
                                    </li>
                                    <li>
                                        <span class="text-muted">Stars</span>
                                        <span class="float-right">{{ repo.stars }}</span>
                                    </li>
                                    <li>
                                        <span class="text-muted">Versions</span>
                                        <span class="float-right">{{ repo.versions }}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="widget mb-4 pb-2">
                                <h6 class="widget-title">Download</h6>
                                <div class="bg-dark bg-white-dark p-4 rounded shadow mt-4">
                                    <p class="text-muted font-weight-bold mb-0"><span class="text-success">$</span> docker pull atomhub.org/library/gitlab:last </p>
                                </div>
                            </div>
                            <div class="widget mb-4 pb-2">
                                <h6 class="widget-title">Categories</h6>
                                <div class="tagcloud mt-4">
                                    <a href="jvascript:void(0)" class="rounded">Developer</a>
                                    <a href="jvascript:void(0)" class="rounded">Tools</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</template>
