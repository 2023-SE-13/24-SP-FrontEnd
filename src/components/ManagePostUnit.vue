<template>
    <div class="man-unit" @click="getapply">
        <div class="upper">
            <span style="font-weight:600;">{{ postData.position_name }}</span>
            <div class="buttons">
                <el-button style="background-color: white" @click="deletepost"><i
                        class="el-icon-delete"></i></el-button>
                <el-button style="background-color: white" @click="editPost"> <i class="el-icon-edit"></i></el-button>
            </div>
        </div>
        <div class="middle">
            <div class="middle-text">
                <span class="req-text">职位所在地：{{ postData.location }}</span>
                <span class="req-text">学历要求：{{ postData.education_requirement }}</span>
                <span class="req-text">薪资：{{ postData.salary_min }}-{{ postData.salary_max }}</span>
                <span class="req-text" style="text-align: left">职位描述：{{ postData.position_description }}</span>
                <span class="req-text">申请数:{{ postData.application_count }}</span>
                <span class="req-text">发布于{{ postTime }}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            postTime:''
        }
    },
    props: {
        postData: {

        }
    },
    created() {
        console.log(this.postData)
        let date = new Date(this.postData.posted_at)
        let formattedDate = date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // 24 小时制
        });
        this.postTime = formattedDate
    },
    methods: {
        deletepost() {
            event.stopPropagation();
            this.$emit("delete-clicked", this.postData.position_id)
        },
        getapply() {
            this.$emit("get-apply", this.postData.position_id)
        },
        editPost() {
            event.stopPropagation();
            this.$emit("edit-clicked", this.postData)
        }
    }
}
</script>
<style lang="scss" scoped>
.man-unit {
    transition: 0.5s;
    width: 90%;
    min-height: 200px;
    background-color: white;
    margin-bottom: 15px;
    border-radius: 10px;
    margin-left: 3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei, sans-serif !important;
    border: 1px solid #f2f4f7;
}
.man-unit:hover {
    box-shadow: 10px 10px 20px 0px rgba(98, 92, 92, 0.3);
}

.middle-text {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.divider {
    display: inline-block;
    height: 18px;
    /* 可根据需要调整 */
    width: 1px;
    background-color: #666666;
    margin: 0 10px;
    /* 可根据需要调整 */
    vertical-align: middle;
}

.upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: white;
    border-radius: 10px 10px 0 0;
    // padding: 0 0;

}

.upper span {
    margin-left: 10px;
}

.buttons {
    display: flex;
    gap: 10px;

}

.buttons .el-button {
    border: none;
    background-color: #f8f8f8;
}

.lower {
    margin-left: 10px;
    min-height: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #f8f8f8;
}

.middle {
    min-height: 20px;
    width: 100%;
    justify-content: flex-start;
    gap: 10px;
    font-size: 14px;
    background-color: #f2f4f7;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 0 0 5px 5px;
}

.req-text {
    color: #666666;
    font-weight: 500;
    text-align: left;
    margin-bottom: 10px;
}
</style>