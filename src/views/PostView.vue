<template>
    <div>
        <div class="header">
            <div class="status">招聘中 ({{ position.posted_at }} - 至今)</div>
            <div class="name">
                <h1 class="title">{{ position.position_name }}</h1>
                <span class="salary">{{ position.salary_min }}K - {{ position.salary_max }}K</span>
            </div>
            <div class="require">
                <span class="el-icon-location"> {{ position.location }} </span> &nbsp;
                <span class="el-icon-user"> {{ position.education_requirement }} </span>
            </div>
            <div class="button">
                <el-button class="gotochat" @click="gotochat">
                    立即沟通
                </el-button>
                <!-- <el-button class="submitCV" @click="submitCV" v-if="!is_admin">
                    提交简历
                </el-button> -->
                <button class="submitCV" @click="submitCV" v-if="!is_admin">提交简历</button>
            </div>
        </div>

        <div class="table">
            <div class="description">
                <div class="des">
                    <h3 class="des-item">
                        {{ company.company_name }} 公司情况
                    </h3>
                    <ul class="des-list">
                        <li>{{ company.company_description }}
                        </li>
                    </ul>
                    <h3 class="des-item">
                        岗位描述
                    </h3>
                    <ul class="des-list">
                        <li>{{ position.position_description }}</li>
                    </ul>
                    <h3 class="des-item">
                        技术需求
                    </h3>
                    <ul class="des-list">
                        <li v-for="(skill, index) in position.skills" :key="index">{{ skill }}</li>
                    </ul>
                    <h3 class="des-item">
                        薪酬情况
                    </h3>
                    <ul class="des-list">
                        <li>月最低薪酬：{{ position.salary_min }}K <br> 月最高薪酬：{{ position.salary_max }}K</li>
                    </ul>
                </div>
            </div>
            <div class="rel-title">
                <h3>相似岗位</h3>

            </div>
            <div class="relapos">
                <!-- <h3>相似岗位</h3> -->
                <div class="poss">
                    <ShowPostUnit v-for="(post, index) in PostViewList" :key="index" :post-data="post"></ShowPostUnit>
                </div>
            </div>
        </div>

        <!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
            :on-remove="handleRemove" :file-list="fileList" list-type="picture">
            <el-button size="small" type="primary">点击上传简历</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload> -->

    </div>
</template>

<script>
import { getPosition, getCompany, submitCV, getSimilarPost, IsAdmin } from "@/api/api";
import ShowPostUnit from '@/components/ShowPostUnit.vue'
export default {
    data() {
        return {
            position: {
                position_name: "",
                position_description: '',
                location: "",
                education_requirement: "",
                salary_min: "",
                salary_max: "",
                posted_at: "",
                company_id: "",
                position_id: "",
                hr_id: "",
                skills: [],
            },
            company: {
                company_id: "",
                company_description: "",
                company_name: "",
            },
            // token: localStorage.getItem('token'),
            token: localStorage.getItem("token"),
            is_admin: false,
            PostViewList: [],
            user_role: "",
        };
    },
    components: {
        ShowPostUnit
    },
    methods: {
        //去私聊
        gotochat() {
            if (this.position.hr_id != localStorage.getItem("username")) {
                localStorage.setItem("hrname", this.position.hr_id)
                this.$router.push("/message")
            } else {
                this.$notify({
                    title: '失败',
                    message: '禁止和自己聊天',
                    type: 'error'
                });
            }
        },
        //投递简历
        submitCV() {
            submitCV(this.token, this.position.position_id).then(res => {
                console.log(res)
                console.log("success submit!")
                if (res.data.status === "success") {
                    this.$notify({
                        title: '成功',
                        message: '提交简历成功',
                        type: 'success'
                    });
                }
            }).catch(error => {
                console.log("SubmitCV失败", error);
                if (error.response.status === 400) {
                    this.$notify({
                        title: '失败',
                        message: '您已提交过简历哦~',
                        type: 'error'
                    });
                } else if (error.response.status === 406) {
                    this.$notify({
                        title: '失败',
                        message: '您尚未上传简历',
                        type: 'error'
                    });
                }
            });
        }
    },
    created() {
        getPosition(localStorage.getItem("position_id")).then(res => {
            this.position.position_name = res.data.position_name
            this.position.position_description = res.data.position_description
            this.position.location = res.data.location
            this.position.education_requirement = res.data.education_requirement
            this.position.company_id = res.data.company_id
            getCompany(this.position.company_id).then(res => {
                if (res.data.status === "success") {
                    this.company.company_name = res.data.data.company_name
                    this.company.company_description = res.data.data.company_description
                    this.company.company_id = res.data.data.company_id
                }
            })
            //判断是不是admin，修改is_admin的值
            if (localStorage.getItem("username") === null) {
                this.is_admin = true
            } else {
                IsAdmin(localStorage.getItem("username")).then(res => {
                    console.log(res.data)
                    if (res.data.status === "success") {
                        this.user_role = res.data.data.role
                        if (this.user_role === "Admin") {
                            this.is_admin = true
                        }
                    }
                })
            }
            this.position.position_id = res.data.position_id
            console.log("positionid:" + this.position.position_id + "!!token:" + this.token)
            this.position.posted_at = res.data.posted_at.slice(0, 10)
            this.position.salary_min = res.data.salary_min / 1000
            this.position.salary_max = res.data.salary_max / 1000
            this.position.position_tag = res.data.position_tag
            this.position.hr_id = res.data.hr
            if (res.data.skill_required.length > 0) {
                this.position.skills = res.data.skill_required
            } else {
                this.position.skills = ["无"]
            }

            getSimilarPost(this.position.position_id).then(res => {
                if (res.data.status === "success") {
                    this.PostViewList = res.data.data
                }
                console.log(this.PostViewList)
                console.log(res.data)
            })
        })
    },
}
</script>

<style scoped>
.header {
    width: 100%;
    height: 200px;
    background: rgb(55, 86, 107);
}

.status {
    color: white;
    position: absolute;
    top: 9%;
    left: 12%;
}

.name {
    color: white;
    position: absolute;
    top: 13%;
    left: 12%;
    /* font-size: 10px; */
    width: 600px;
    display: flex;
    /* width: 100%; */
}

.title {
    font-size: 30px;
}

.salary {
    display: inline;
    /* 或者 inline-block，如果需要设置宽高 */
    font-size: 20px;
    margin-left: 30px;
    color: tomato;
}

.require {
    color: white;
    position: absolute;
    top: 20%;
    left: 12%;
}

.button {
    color: white;
    position: absolute;
    /* 可以移除，因为我们使用Flexbox */
    top: 25%;
    /* 根据需要调整 */
    left: 12%;
    /* 不需要设置，因为我们要让它自动填充右侧 */
    width: 75%;
    /* 设置为100%来填充容器宽度 */
    display: flex;
    /* 使用Flexbox */
    justify-content: space-between;
    /* 让子元素平均分布在容器主轴上，左侧和右侧 */
}

.gotochat,
.submitCV {
    /* 移除与布局相关的绝对定位样式 */
    /* 可以添加具体的按钮样式，比如宽度、高度、内边距等 */
    width: 100px;
    /* 示例宽度 */
    height: 40px;
    /* 示例高度 */
    padding: 0 10px;
    /* 示例内边距 */
    /* 其他样式，如背景色、边框等 */
    background-color: transparent;
    color: #00d1d0;
    border: 1px solid #00d1d0;
    border-radius: 10px;
}

.submitCV:hover {
    background-color: transparent;
    color: rgb(0, 209, 208, 0.8);
    border: 1px solid rgb(0, 209, 208, 0.8);
    border-radius: 10px;
}

.table {
    display: flex;
}

.description {
    font-size: 1.1em;
    width: 57%;
    background-color: rgb(255, 255, 255);
    height: 470px;
    color: #d5d8e9;
    margin-top: 2%;
    margin-bottom: 1%;
    border-radius: 15px;
    margin-left: 12%;
    overflow-y: auto;
}

.des {
    width: 100%;
    /* 你可以根据需要设置宽度 */
    height: 100%;
    display: flex;
    flex-direction: column;
    /* 让子元素垂直堆叠 */
    align-items: flex-start;
    padding-left: 2%;
    box-sizing: border-box;
}

.des .des-item {
    color: darkgray;
    height: 35px;
    padding-top: 5px;
    padding-right: 8px;
    padding-left: 8px;
    margin-bottom: 0;
}

.des-list {
    /* 设置深色背景 */
    background-color: rgb(246, 246, 246);
    /* 移除默认的列表样式，如列表符号 */
    list-style-type: none;
    padding-left: 0;
    margin-top: 10px;
    width: 96%;
    /* 根据需要调整这个值 */
    margin-bottom: 10px;
    /* 如果需要的话，也可以设置底部间距 */
    margin-left: 7px;
}

.des-list li {
    /* 为列表项设置样式，如果需要的话 */
    text-align: left;
    padding: 5px 10px;
    color: #333;
    /* 其他样式 */
    overflow-wrap: break-word;
    /* 或使用 overflow-wrap: break-word; */
    white-space: normal;
}


.relapos {
    font-size: 1.1em;
    width: 18%;
    background-color: rgb(255, 255, 255);
    height: 470px;
    color: #d5d8e9;
    margin-top: 2%;
    margin-bottom: 1%;
    border-radius: 15px;
    margin-left: 1%;
}
.relapos h3{
    color: black;
}

.poss {
    width: 86%;
    height: 100%;
    position: relative;
    left: 2%;
    overflow-y: auto;
}

.poss::-webkit-scrollbar {
    width: 10px;
    /* 或者你想要的宽度 */
    background: transparent;
    /* 透明背景 */
}

.poss::-webkit-scrollbar-thumb {
    background: transparent;
    /* 滑块也透明 */
}

.poss .pos-item {
    display: inline-block;
    float: left;
    height: 35px;
    position: relative;
    left: 10px;
    padding-top: 5px;
    padding-right: 8px;
    padding-left: 8px;
}
.rel-title{
    position: absolute;
    left: 70%;
    display: block;
    width: 18%;
    height: 50px;
    background-color: white;
    /* border-bottom: 1px solid black; */

}
</style>