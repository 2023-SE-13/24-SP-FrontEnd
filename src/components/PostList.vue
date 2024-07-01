<template>
    <div class="post-list">
        <div class="left-box">
            <el-button @click="dialogVisible = true" class="add-post"><i class="el-icon-plus"></i>添加职位</el-button>
            <div class="post-container scrollable">
                <template v-if="postList.length > 0">
                    <ManagePostUnit @get-apply="handleGetApply" @edit-clicked="handleEditClicked" @delete-clicked="handleDelClicked"
                        v-for="(post, index) in postList" :key="index" :post-data="post"></ManagePostUnit>
                </template>
                <template v-else>
                    <img src="@/assets/empty.png" alt="No posts" class="empty-image" />
                </template>
            </div>
        </div>
        <div class="right-box scrollable">

            <template v-if="applyList.length > 0">
                <ApplyUnit @acceptApp="handleAccept" @refuseApp="handleRefuse" @showInfo="handleShowInfo" v-for="(apply, index) in applyList" :key="index" :apply-data="apply"></ApplyUnit>
            </template>
            <template v-else>
                <img src="@/assets/empty.png" alt="No posts" class="empty-image" />
            </template>
        </div>

        <el-dialog title="职位信息" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <el-form ref="form" :model="postForm" label-width="80px" size="mini">
                <el-form-item label="职位名称">
                    <el-input v-model="postForm.position_name"></el-input>
                </el-form-item>
                <el-form-item label="职位所在地">
                    <el-input v-model="postForm.location"></el-input>
                </el-form-item>
                <el-form-item label="学历要求">
                    <el-input v-model="postForm.education_requirement"></el-input>
                </el-form-item>
                <el-form-item label="最低薪资">
                    <el-input v-model="postForm.salary_min"></el-input>

                </el-form-item>
                <el-form-item label="最低薪资">
                    <el-input v-model="postForm.salary_max"></el-input>

                </el-form-item>
                <el-form-item label="职位描述">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="postForm.position_description">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="createPost()">确定创建</el-button>
            </span>
        </el-dialog>
        <el-dialog title="职位信息" :visible.sync="dialogVisible2" width="50%" :before-close="handleClose2">
            <el-form ref="form" :model="postForm" label-width="80px" size="mini">
                <el-form-item label="职位名称">
                    <el-input v-model="postForm.position_name"></el-input>
                </el-form-item>
                <el-form-item label="职位所在地">
                    <el-input v-model="postForm.location"></el-input>
                </el-form-item>
                <el-form-item label="学历要求">
                    <el-input v-model="postForm.education_requirement"></el-input>
                </el-form-item>
                <el-form-item label="最低薪资">
                    <el-input v-model="postForm.salary_min"></el-input>

                </el-form-item>
                <el-form-item label="最低薪资">
                    <el-input v-model="postForm.salary_max"></el-input>

                </el-form-item>
                <el-form-item label="职位描述">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="postForm.position_description">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="editPost()">确定修改</el-button>
            </span>
        </el-dialog>
        <el-dialog title="应聘者信息" :visible.sync="dialogVisible3" width="50%" :before-close="handleClose">
            <div>
                <el-avatar :size="70" >头像</el-avatar>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible3 = false">确定</el-button>
            </span>
        </el-dialog>
    </div>

</template>
<script>

import ManagePostUnit from '@/components/ManagePostUnit.vue'
import ApplyUnit from '@/components/ApplyUnit.vue'
import { getPositionList, createPost, deletePost, getPostApply,GetUserInfo,refuseApply } from '@/api/api'
export default {
    data() {
        return {
            postList: [],
            dialogVisible: false,
            dialogVisible2: false,
            dialogVisible3: false,
            sizeForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            applyList: []
            ,
            postForm: {
                position_name: "Marketing Manager",
                position_description: "Responsible for developing marketing strategies and overseeing all marketing efforts.",
                location: "Chicago, IL",
                education_requirement: "Bachelor's Degree in Marketing, Business Administration, or related field",
                salary_min: "8000",
                salary_max: "90000",
                skill_required: [],
                position_tag:{}
            }
        }

    },
    created() {
        getPositionList(localStorage.getItem("company_id")).then(res => {
            console.log(localStorage.getItem("company_id"))
            console.log(res.data)
            this.postList = res.data
        })
    },
    methods: {
        handleAccept(value){
            console.log(value)
            let apply = {"application_id":value}
            
        },
        handleRefuse(value){
            console.log(value)
            let apply = {"application_id":value}
            refuseApply(apply,localStorage.getItem("token")).then(res=>{
                console.log(res)
                this.$router.go(0)
            })
        },
        handleShowInfo(value){
            console.log(value)
            this.dialogVisible3 = true
            GetUserInfo(value).then(res=>{
                console.log(res.data.data)
            })
        },
        handleGetApply(value) {
            console.log("应聘信息")
            getPostApply(value, localStorage.getItem('token')).then(res => {
                console.log(res)
                this.applyList = res.data
            })
        },
        handleDelClicked(value) {
            console.log("点击删除", value)
            let id = { "position_id": value }
            deletePost(id, localStorage.getItem("token")).then(res => {

                console.log(res)
                getPositionList(localStorage.getItem("company_id")).then(res => {
                    // console.log(res.data)
                    this.postList = res.data
                })
            })

        },
        handleEditClicked(value){
            this.postForm = value
            console.log(this.postForm)
            this.dialogVisible2 = true
        },
        
        editPost(){
            this.dialogVisible2 = false
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        handleClose2(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        createPost() {
            console.log(this.postForm)
            createPost(this.postForm, localStorage.getItem('token')).then(res => {
                console.log(res)
            })
            this.dialogVisible = false
            this.$router.go(0)
            // getPositionList(localStorage.getItem("company_id")).then(res => {
            //     console.log(res.data)
            //     this.postList = res.data
            // })
        }
    },
    components: {
        // PostUnit,
        ManagePostUnit,
        ApplyUnit
    }
}
</script>
<style lang="scss" scoped>
.post-container {
    position: absolute;
    top: 50px;
    /* 根据按钮的高度调整这个值 */
    left: 0;
    right: 0;
    bottom: 10px;
    overflow-y: auto;
    /* 使其内容可垂直滚动 */
    padding: 10px;
    box-sizing: border-box;
    margin-top: 30px;
}

.post-container img {
    margin-top: 30%;
    scale: 1.3;
}

.right-box img{
    margin-top: 30%;
    scale: 1.5;
}

.post-list {
    display: flex;
    height: 100vh;
}

.left-box {
    flex: 1;
    border-radius: 10px;
    overflow: auto;
    position: relative;
    background-color: white;
}

.right-box {
    flex: 2;
    border-radius: 10px;
    background-color: white;
    margin-left: 1%;
    padding: 15px;
    overflow-y: auto;
}

.add-post {
    position: absolute;
    background-color: #00b4b3;
    transition: 0.5s;
    color: white;
    font-weight: 400;
    font-size: 20px;
    border: none;
    position: absolute;
    top: 3%;
    left: 8%;

}

.add-post:hover {
    background-color: #01c2c2;
    color: white;
}

/* 自定义滚动条样式 */
.scrollable {
    overflow-y: auto;
    /* 启用垂直滚动 */
    transition: 0.5s;
    overflow-x: hidden;
}

.scrollable::-webkit-scrollbar {
    width: 5px;
    /* 滚动条宽度 */
}

.scrollable::-webkit-scrollbar-track {
    background: #f1f1f1;
    /* 滚动条轨道背景 */
    border-radius: 10px;
}

.scrollable::-webkit-scrollbar-thumb {
    background: #888;
    /* 滚动条滑块背景 */
    border-radius: 10px;
}

.scrollable::-webkit-scrollbar-thumb:hover {
    background: #555;
    /* 滚动条滑块悬停背景 */
}
</style>