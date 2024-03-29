import logs from '@/columns/logs.js';
import users from '@/columns/admin/users.js';
import robotAccounts from '@/columns/admin/robot-accounts.js';
import groups from '@/columns/admin/groups.js';
import labels from '@/columns/admin/labels.js';
import projects from '@/columns/admin/projects.js';
import projectsRepos from '@/columns/admin/projects-repos.js';
import projectsMembers from '@/columns/admin/projects-members.js';
import gcHistory from '@/columns/admin/gc-history.js';
import artifacts from '@/columns/artifacts.js';
import artifactsTags from '@/columns/artifacts-tags.js';

/**
 * 表格字段
 */
export default {
    logs: logs,
    artifacts: artifacts,
    artifactsTags: artifactsTags,
    admin: {
        users: users,
        robotAccounts: robotAccounts,
        groups: groups,
        labels: labels,
        projects: projects,
        projectsRepos: projectsRepos,
        projectsMembers: projectsMembers,
        gcHistory: gcHistory,
    },
}
