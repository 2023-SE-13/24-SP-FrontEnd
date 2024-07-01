<template>
    <div class="post-list">
        <div class="left-box">
            <el-button @click="addPost()" class="add-post"><i class="el-icon-plus"></i>添加职位</el-button>
            <div class="post-container scrollable">
                <template v-if="postList.length > 0">
                    <ManagePostUnit @get-apply="handleGetApply" @edit-clicked="handleEditClicked"
                        @delete-clicked="handleDelClicked" v-for="(post, index) in postList" :key="index"
                        :post-data="post"></ManagePostUnit>
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

        <el-dialog title="职位信息" :visible.sync="dialogVisible" width="45%" :before-close="handleClose">
            <el-form ref="form" :model="postForm" label-width="80px" size="middle">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="职位名称">
                            <el-input v-model="postForm.position_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在地">
                            <el-input v-model="postForm.location"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="岗位标签">
                            <el-cascader class="dialog-container" v-model="flatDesiredPosition" :options="options"
                                :props="cascaderProps" clearable style="width: 100%" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="技术需求">
                            <el-cascader class="dialog-container" v-model="flatDesiredPosition1" :options="techOptions"
                                :props="techProps" clearable multiple style="width: 100%" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="学历要求">
                            <el-input v-model="postForm.education_requirement"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="薪资区间">
                            <el-row :gutter="10">
                                <el-col :span="10">
                                    <el-select v-model="postForm.salary_min" placeholder="最低"
                                        @change="updateMaxSalaryOptions">
                                        <el-option v-for="item in salaryOptions" :key="item" :label="item"
                                            :value="item">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="2" style="text-align: center;">
                                    至
                                </el-col>
                                <el-col :span="10">
                                    <el-select v-model="postForm.salary_max" placeholder="最高">
                                        <el-option v-for="item in maxSalaryOptions" :key="item" :label="item"
                                            :value="item">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="职位描述">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="postForm.position_description">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="createPost()">确定创建</el-button>
            </span>
        </el-dialog>


        <el-dialog title="职位信息" :visible.sync="dialogVisible2" width="45%" :before-close="handleClose2">
            <el-form ref="form" :model="postForm" label-width="80px" size="middle">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="职位名称">
                            <el-input v-model="postForm.position_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在地">
                            <el-input v-model="postForm.location"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="岗位标签">
                            <el-cascader class="dialog-container" v-model="flatDesiredPosition" :options="options"
                                :props="cascaderProps" clearable style="width: 100%" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="技术需求">
                            <el-cascader class="dialog-container" v-model="flatDesiredPosition1" :options="techOptions"
                                :props="techProps" clearable multiple style="width: 100%" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="学历要求">
                            <el-input v-model="postForm.education_requirement"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="薪资要求">
                            <el-row :gutter="10">
                                <el-col :span="10">
                                    <el-select v-model="postForm.salary_min" placeholder="最低薪资"
                                        @change="updateMaxSalaryOptions">
                                        <el-option v-for="item in salaryOptions" :key="item" :label="item"
                                            :value="item">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="2" style="text-align: center;">
                                    至
                                </el-col>
                                <el-col :span="10">
                                    <el-select v-model="postForm.salary_max" placeholder="最高薪资">
                                        <el-option v-for="item in maxSalaryOptions" :key="item" :label="item"
                                            :value="item">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="职位描述">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="postForm.position_description">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="editPost()">确定修改</el-button>
            </span>
        </el-dialog>

        <el-dialog title="应聘者信息" :visible.sync="dialogVisible3" width="50%" :before-close="handleClose">
            <div id="postMan" style="width: 100%;height:100%;">
                <el-avatar :size="70" :src="this.photoUrl" >头像</el-avatar>
                <div id="postMan_content">
                  <div class="half_part">
                      <span style="margin-left: 20px">姓名：{{this.postMan.real_name}}</span>
                      <span style="margin-left: 20px">学历：{{this.postMan.education}}</span>
                  </div>
                  <div class="half_part" style="width:70%">
                      <span>期望职位：{{this.postMan.desired_position}}</span>
                      <span>邮箱：{{this.postMan.email}}</span>
                  </div>
                </div>
                <div class="resume">
                    <el-link type="primary" :underline="false" @click="openResume()">查看简历</el-link>
                </div>
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
import {IsAdmin} from "@/api/api";
import { getPositionList, createPost, deletePost, getPostApply,GetUserInfo,refuseApply,createOffer } from '@/api/api'
export default {
    data() {
        return {
            postList: [],
            dialogVisible: false,
            dialogVisible2: false,
            dialogVisible3: false,
            postMan: {},
            photoUrl: '',
            resumeUrl: '',
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
            flatDesiredPosition: [

            ], // 岗位标签用于显示在 el-cascader 中的平面化数据
            flatDesiredPosition1: [

            ],// 技术需求平面化数据
            postForm: {
                "position_name": "",
                "position_description": "",
                "location": "",
                "education_requirement": "",
                "salary_min": "",
                "salary_max": "",
                "skill_required": [],
                "position_tag": {
                    "category": "",
                    "specialization": ""
                }
            },
            salaryOptions: [
                '1k', '2k', '3k', '4k', '5k', '6k', '7k', '8k', '9k', '10k', '11k', '12k', '13k', '14k', '15k', '16k', '17k', '18k', '19k', '20k'
            ],
            maxSalaryOptions: [],
            techOptions: [
                {
                    value: '技术栈',
                    label: '技术栈',
                    children: [
                        { value: 'Java', label: 'Java' },
                        { value: 'Python', label: 'Python' },
                        { value: 'JavaScript', label: 'JavaScript' },
                        { value: 'C++', label: 'C++' },
                        { value: 'C#', label: 'C#' },
                        { value: 'PHP', label: 'PHP' },
                        { value: 'Ruby', label: 'Ruby' },
                        { value: 'Go', label: 'Go' },
                        { value: 'Swift', label: 'Swift' },
                        { value: 'Kotlin', label: 'Kotlin' },
                        { value: 'TypeScript', label: 'TypeScript' },
                        { value: 'SQL', label: 'SQL' },
                        { value: 'NoSQL', label: 'NoSQL' },
                        { value: 'R', label: 'R' },
                        { value: 'MATLAB', label: 'MATLAB' },
                        { value: 'Perl', label: 'Perl' },
                        { value: 'Scala', label: 'Scala' },
                        { value: 'Groovy', label: 'Groovy' },
                        { value: 'Rust', label: 'Rust' },
                        { value: 'Dart', label: 'Dart' },
                        { value: 'Objective-C', label: 'Objective-C' },
                        { value: 'Shell', label: 'Shell' },
                        { value: 'PowerShell', label: 'PowerShell' },
                        { value: 'HTML', label: 'HTML' },
                        { value: 'CSS', label: 'CSS' },
                        { value: 'Sass', label: 'Sass' },
                        { value: 'Less', label: 'Less' },
                        { value: 'XML', label: 'XML' },
                        { value: 'JSON', label: 'JSON' },
                        { value: 'YAML', label: 'YAML' },
                        // 可以继续添加更多技术栈
                    ]
                },
                {
                    value: '开发经验',
                    label: '开发经验',
                    children: [
                        { value: '前端开发经验', label: '前端开发经验' },
                        { value: '后端开发经验', label: '后端开发经验' },
                        { value: '移动开发经验', label: '移动开发经验' },
                        { value: '全栈开发经验', label: '全栈开发经验' },
                        { value: '云计算经验', label: '云计算经验' },
                        { value: '大数据经验', label: '大数据经验' },
                        { value: '人工智能经验', label: '人工智能经验' },
                        { value: '机器学习经验', label: '机器学习经验' },
                        { value: '深度学习经验', label: '深度学习经验' },
                        { value: '数据分析经验', label: '数据分析经验' },
                        { value: 'DevOps经验', label: 'DevOps经验' },
                        { value: '区块链经验', label: '区块链经验' },
                        { value: '游戏开发经验', label: '游戏开发经验' },
                        { value: '嵌入式开发经验', label: '嵌入式开发经验' },
                        { value: '系统架构经验', label: '系统架构经验' },
                        { value: '安全经验', label: '安全经验' },
                        { value: '网络工程经验', label: '网络工程经验' },
                        { value: '数据库管理经验', label: '数据库管理经验' },
                        { value: '运维经验', label: '运维经验' },
                        { value: '测试经验', label: '测试经验' },
                        { value: '自动化测试经验', label: '自动化测试经验' },
                        { value: '性能测试经验', label: '性能测试经验' },
                        { value: '敏捷开发经验', label: '敏捷开发经验' },
                        { value: '项目管理经验', label: '项目管理经验' },
                        // 可以继续添加更多开发经验
                    ]
                }
            ],
            options: [
                {
                    value: '后端开发',
                    label: '后端开发',
                    children: [
                        { value: 'Java', label: 'Java' },
                        { value: 'C/C++', label: 'C/C++' },
                        { value: 'PHP', label: 'PHP' },
                        { value: 'Python', label: 'Python' },
                        { value: 'C#', label: 'C#' },
                        { value: '.NET', label: '.NET' },
                        { value: 'Golang', label: 'Golang' },
                        { value: 'Node.js', label: 'Node.js' },
                        { value: 'Hadoop', label: 'Hadoop' },
                        { value: '语言视频/图形开发', label: '语言视频/图形开发' },
                        { value: 'GIS工程师', label: 'GIS工程师' },
                        { value: '区块链工程师', label: '区块链工程师' },
                        { value: '全栈工程师', label: '全栈工程师' },
                        { value: '其他后端开发', label: '其他后端开发' }
                    ]
                },
                {
                    value: '前端/移动开发',
                    label: '前端/移动开发',
                    children: [
                        { value: '前端开发工程师', label: '前端开发工程师' },
                        { value: 'Android', label: 'Android' },
                        { value: 'iOS', label: 'iOS' },
                        { value: 'U3D', label: 'U3D' },
                        { value: 'UE4', label: 'UE4' },
                        { value: 'Cocos', label: 'Cocos' },
                        { value: '技术美术', label: '技术美术' },
                        { value: 'JavaScript', label: 'JavaScript' }
                    ]
                },
                {
                    value: '测试',
                    label: '测试',
                    children: [
                        { value: '测试工程师', label: '测试工程师' },
                        { value: '软件测试', label: '软件测试' },
                        { value: '自动化测试', label: '自动化测试' },
                        { value: '功能测试', label: '功能测试' },
                        { value: '测试开发', label: '测试开发' },
                        { value: '硬件测试', label: '硬件测试' },
                        { value: '游戏测试', label: '游戏测试' },
                        { value: '渗透测试', label: '渗透测试' },
                        { value: '测试经理', label: '测试经理' },
                        { value: '性能测试', label: '性能测试' }
                    ]
                },
                {
                    value: '运维/技术支持',
                    label: '运维/技术支持',
                    children: [
                        { value: '运维工程师', label: '运维工程师' },
                        { value: 'IT技术支持', label: 'IT技术支持' },
                        { value: '网络工程师', label: '网络工程师' },
                        { value: '网络安全', label: '网络安全' },
                        { value: '系统开发工程师', label: '系统开发工程师' },
                        { value: '系统管理员', label: '系统管理员' },
                        { value: 'DBA', label: 'DBA' },
                        { value: '系统安全', label: '系统安全' },
                        { value: '技术文档工程师', label: '技术文档工程师' }
                    ]
                },
                {
                    value: '人工智能',
                    label: '人工智能',
                    children: [
                        { value: '图像算法', label: '图像算法' },
                        { value: '自然语言处理算法', label: '自然语言处理算法' },
                        { value: '大模型算法', label: '大模型算法' },
                        { value: '数据挖掘', label: '数据挖掘' },
                        { value: '推荐算法', label: '推荐算法' },
                        { value: 'SLAM算法', label: 'SLAM算法' },
                        { value: '搜索算法', label: '搜索算法' },
                        { value: '语言算法', label: '语言算法' },
                        { value: '风控算法', label: '风控算法' },
                        { value: '算法研究员', label: '算法研究员' },
                        { value: '算法工程师', label: '算法工程师' },
                        { value: '机器学习', label: '机器学习' },
                        { value: '深度学习', label: '深度学习' },
                        { value: '自动驾驶算法工程师', label: '自动驾驶算法工程师' },
                        { value: '数据标注/AI训练师', label: '数据标注/AI训练师' }
                    ]
                }
            ],
            cascaderProps: {

            },
            techProps: {
                multiple: true
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
            createOffer(apply,localStorage.getItem("token")).then(res=>{
                console.log(res)
            })
        },
        handleRefuse(value){
            console.log(value)
            let apply = {"application_id":value}
            refuseApply(apply,localStorage.getItem("token")).then(res=>{
                console.log(res)
                this.$router.go(0)
            })
        },
        handleShowInfo(value) {
            console.log(value)
            this.dialogVisible3 = true
            GetUserInfo(value).then(res=>{
                this.postMan = res.data.data
                this.photoUrl = 'http://10.251.253.188/avatar/'+this.postMan.username+'_avatar.png'
                this.postMan.desired_position = this.postMan.desired_position.map(item => [item.category, item.specialization])
                this.postMan.desired_position = this.postMan.desired_position.map(position => position.join('-')).join(' | ')
                this.resumeUrl = "http://10.251.253.188/resume/"+this.postMan.username+"_resume.pdf"
            })
        },
        handleGetApply(value) {
            getPostApply(value, localStorage.getItem('token')).then(res => {
                console.log(res)
                this.applyList = res.data
            })
        },
        handleDelClicked(value) {
            console.log("点击删除", value)
            let id = { "position_id": value }
            deletePost(id, localStorage.getItem("token")).then(res => {
                if (res.data.status === "success") {
                    this.$notify({
                        title: "成功",
                        message: "删除成功",
                        type: "success"
                    });

                }
            },
                error => {
                    if (error.response.status === 400) {
                        this.$notify({
                            title: "错误",
                            message: "无删除权限",
                            type: "error"
                        });
                    }
                })
            getPositionList(localStorage.getItem("company_id")).then(res => {
                // console.log(res.data)
                this.postList = res.data
            })
        },
        handleEditClicked(value) {
            console.log("handleEditClicked")
            console.log(value)
            this.postForm = value
            // 逆转换 position_tag 对象为 flatDesiredPosition
            this.flatDesiredPosition = [
                this.postForm.position_tag.category,
                this.postForm.position_tag.specialization
            ];

            // 逆转换 skill_required 数组为 flatDesiredPosition1
            this.flatDesiredPosition1 = this.postForm.skill_required.map(skill => {
                for (let i = 0; i < this.techOptions.length; i++) {
                    const category = this.techOptions[i];
                    for (let j = 0; j < category.children.length; j++) {
                        if (category.children[j].value === skill) {
                            return [category.value, skill];
                        }
                    }
                }
                return ['', skill]; // 如果没有匹配到，返回空字符串作为第一个字段
            });
            // 转换薪资为k格式
            this.postForm.salary_min = this.convertToK(this.postForm.salary_min);
            this.postForm.salary_max = this.convertToK(this.postForm.salary_max);
            console.log(this.postForm)
            this.dialogVisible2 = true
        },
        convertToK(value) {
            return `${value / 1000}k`;
        },
        editPost() {
            this.postForm.position_tag = {
                category: this.flatDesiredPosition[0],
                specialization: this.flatDesiredPosition[1]
            };
            this.postForm.skill_required = this.flatDesiredPosition1.map(item => item[1]);
            this.postForm.salary_min = this.convertToNumber(this.postForm.salary_min);
            this.postForm.salary_max = this.convertToNumber(this.postForm.salary_max);
            console.log("123")
            //调接口
            editPost(this.postForm, localStorage.getItem('token')).then(res => {

                if (res.data.status === "success") {
                    this.$notify({
                        title: "成功",
                        message: "修改成功",
                        type: "success"
                    });
                }
            },
                error => {
                    if (error.response.status === 400) {
                        this.$notify({
                            title: "错误",
                            message: "无创建权限",
                            type: "error"
                        });
                    }
                    else if (error.response.status === 406) {
                        this.$notify({
                            title: "错误",
                            message: "缺少创建信息",
                            type: "error"
                        });
                    }
                })
            this.dialogVisible2 = false
            // this.clearPostForm();
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
        convertToNumber(value) {
            return parseInt(value.replace('k', '000'));
        },
        // postForm: {
        //         "position_name": "",
        //         "position_description": "",
        //         "location": "",
        //         "education_requirement": "",
        //         "salary_min": "",
        //         "salary_max": "",
        //         "skill_required": [],
        //         "position_tag": {
        //             "category": "人工智能",
        //             "specialization": "机器学习"
        //         }
        //     },
        clearPostForm() {
            console.log("res")
            this.postForm.position_name = '';
            this.postForm.location = '';
            this.postForm.education_requirement = '';
            this.postForm.salary_min = '';
            this.postForm.salary_max = '';
            this.postForm.position_description = '';
            this.postForm.position_tag = {
                category: '',
                specialization: ''
            };
            this.postForm.skill_required = [];
        },
        addPost() {
            this.clearPostForm();
            this.dialogVisible = true
        },
        openResume(){
            window.open(this.resumeUrl)
        },
        createPost() {
            this.postForm.position_tag = {
                category: this.flatDesiredPosition[0],
                specialization: this.flatDesiredPosition[1]
            };
            this.postForm.skill_required = this.flatDesiredPosition1.map(item => item[1]);
            this.postForm.salary_min = this.convertToNumber(this.postForm.salary_min);
            this.postForm.salary_max = this.convertToNumber(this.postForm.salary_max);
            createPost(this.postForm, localStorage.getItem('token')).then(res => {
                console.log(res);
                if (res.data.status === "success") {
                    this.$notify({
                        title: "成功",
                        message: "创建成功",
                        type: "success"
                    });
                }
                getPositionList(localStorage.getItem("company_id")).then(res => {
                console.log(localStorage.getItem("company_id"))
                console.log(res.data)
                this.postList = res.data
            })
            },
                error => {
                    if (error.response.status === 400) {
                        this.$notify({
                            title: "错误",
                            message: "无创建权限",
                            type: "error"
                        });
                    }
                    else if (error.response.status === 406) {
                        this.$notify({
                            title: "错误",
                            message: "缺少创建信息",
                            type: "error"
                        });
                    }
                })

            this.dialogVisible = false

        },
        updateMaxSalaryOptions() {
            const minSalaryIndex = this.salaryOptions.indexOf(this.postForm.salary_min);
            if (minSalaryIndex !== -1) {
                this.maxSalaryOptions = this.salaryOptions.slice(minSalaryIndex + 1);
            }
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

.right-box img {
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

#postMan{
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
}

#postMan_content{
  width: calc(80% - 60px);
  display: flex;
  flex-direction: row;
  justify-items: flex-start;
  align-items: center;
}

.half_part{
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: PingFang SC,HarmonyOS_Regular,Helvetica Neue,Microsoft YaHei,sans-serif!important;
  font-size: 20px;
}
</style>