import logs from '@/columns/logs.js'
import users from '@/columns/admin/users.js'
import robotAccounts from '@/columns/admin/robot-accounts.js'
import groups from '@/columns/admin/groups.js'

/**
 * 表格字段
 */
export default {
    logs: logs,
    admin: {
        users: users,
        robotAccounts: robotAccounts,
        groups: groups,
    },
}
