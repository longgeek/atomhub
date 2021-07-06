<script>
/**
 * 账号设置-个人信息 component
 */
export default {
    props: {
        user: { type: Object },
    },
}
</script>

<template>
<div class="card-body">
    <h6 class="text-md-left text-center">个人信息</h6>
    <form>
        <div class="row mt-4">
            <div class="col-md-6">
                <div class="form-group">
                    <label>用户名</label>
                    <div class="position-relative">
                        <i class="mdi mdi-account-settings-outline fea icons"></i>
                        <input
                            name="name"
                            id="first"
                            type="text"
                            class="form-control pl-5"
                            :value="user.username"
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label>邮箱地址</label>
                    <div class="position-relative">
                        <i class="mdi mdi-email fea icons"></i>
                        <input
                            name="name"
                            type="text"
                            class="form-control pl-5"
                            :value="user.email"
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label>姓名</label>
                    <div class="position-relative">
                        <i class="mdi mdi-ticket-account fea icons"></i>
                        <input
                            name="name"
                            type="text"
                            class="form-control pl-5"
                            :value="user.realname"
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label>账户描述</label>
                    <div class="position-relative">
                        <i class="mdi mdi-comment fea icons"></i>
                        <input
                            name="name"
                            type="text"
                            class="form-control pl-5"
                            :value="user.comment"
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label>加入时间</label>
                    <div class="position-relative">
                        <i class="mdi mdi-clock fea icons"></i>
                        <input
                            name="name"
                            type="text"
                            class="form-control pl-5"
                            :value="user.creation_time | toLocalTime"
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-6">
                <button class="btn btn-dark" disabled>确认修改</button>
            </div>
        </div>
    </form>
</div>
</template>
