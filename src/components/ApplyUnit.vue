<template>
    <div class="apply-unit">
        <el-avatar :size="70" @error="errorHandler" :src="photo_url" id="img">头像</el-avatar>
        <div class="apply-details">
            <span>用户名: {{ applyData.username }}</span>
            <span>真实姓名:{{ applyData.real_name }}</span>
            <span>学历:{{ applyData.education }}</span>
            <span>申请时间: {{ applyTime }}</span>
        </div>
        <div class="apply-actions">
            <el-button plain @click="gotoTalk" class="action-button">私信</el-button>

            <el-button plain @click="showInfo" class="action-button">查看信息</el-button>
            <el-button plain @click="refuseApp" class="action-button">拒绝</el-button>
            <el-button plain @click="acceptApp" class="action-button">接受</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            photo_url: `http://10.251.253.188/avatar/${this.applyData.username}_avatar.png`,
            applyTime: ''
        }
    },
    props: {
        applyData: {

        }
    },
    created() {
        let date = new Date(this.applyData.applied_at)
        console.log(date + '@')
        let formattedDate = date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // 24 小时制
        });
        console.log(formattedDate)
        console.log(this.applyData)
        this.applyTime = formattedDate
    },
    methods: {
        gotoTalk() {
            localStorage.setItem("hrname", this.applyData.username)
            this.$router.push('/message')
        },
        showInfo() {
            this.$emit("showInfo", this.applyData.username)
        },
        refuseApp() {
            this.$emit("refuseApp", this.applyData.application_id)
        },
        acceptApp() {
            this.$emit("acceptApp", this.applyData.application_id)
        }
    }
}
</script>

<style lang="scss" scoped>
.apply-unit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100px;
    margin-bottom: 15px;
    padding: 10px;
    background-color: #f0f9ff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.apply-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 15px;
    text-align: left;
    font-size: 14px;
    font-weight: 600;
}

.apply-details span {
    margin-bottom: 5px;
}

.apply-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;
    /* 控制按钮之间的间距 */
}

.action-button {
    border: none !important;
    background-color: transparent !important;
    color: #409EFF !important;
    /* 可以根据需要修改颜色 */
    padding: 0 !important;
    font-size: 14px !important;
    cursor: pointer;
}

.action-button:hover {
    color: #66b1ff !important;
    /* 悬停时的颜色 */
}
</style>
