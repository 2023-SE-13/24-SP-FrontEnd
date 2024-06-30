<template>
    <div class="home-page">
        <div class="info-bar">
            <span>找工作 上Leader直聘！</span>
        </div>
        <div class="img-container">
            <div class="search-bar">
                <el-input placeholder="搜索用户、公司" @input="allow" v-model="input" class="input-with-select">
                    <el-select class="select" v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="用户" value="1"></el-option>
                        <el-option label="公司" value="2"></el-option>
                    </el-select>
                    <el-button slot="append" id="search-button" icon="el-icon-search" @click="Search" ref="button"
                        :disabled="NotAllowSearch">搜索
                    </el-button>
                </el-input>
            </div>
        </div>
        <div class="post-container">
            <div class="recommend_position">
                <span>精选职位</span>
                <PostPositionUnit v-for="(position, index) in RecommendPositionList" :key="index" :post-data="position">
                </PostPositionUnit>
            </div>
            <div class="recommend_subscribe">
                <span>推荐企业</span>
                <PostCompanyUnit v-for="(company, index) in RecommendSubscribeList.companies" :key="index"
                    :post-data="company"></PostCompanyUnit>
            </div>
            <div class="recommend_user">
                <span>推荐用户</span>
                <PostUserUnit v-for="(user, index) in RecommendSubscribeList.users" :key="index" :post-data="user">
                </PostUserUnit>
            </div>
        </div>
        <el-dialog center title="请完善个人信息" :append-to-body="true" :visible.sync="dialogVisible" :show-close="false"
            width="40%">
            <el-form :model="user" :rules="rules" ref="user">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="学历" prop="education">
                            <el-input clearable v-model="user.education" class="dialog-container"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="学校">
                            <el-input clearable v-model="user.school" class="dialog-container"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-form-item label="学历" prop="education">
                    <el-input clearable v-model="user.education" class="dialog-container"></el-input>
                </el-form-item> -->

                <!--                  <el-form-item label="学校">-->
                <!--                    <el-input clearable v-model="user.school"></el-input>-->
                <!--                  </el-form-item>-->
                <el-form-item label="期望职位" prop="desired_position">
                    <!-- <el-input clearable v-model="user.desired_position" class="dialog-container"></el-input> -->
                    <el-cascader class="dialog-container" v-model="flatDesiredPosition" :options="options" filterable
                        :props="props" clearable style="width: 100%" />
                </el-form-item>
                <el-form-item label="博客或仓库主页链接">
                    <el-input clearable v-model="user.blog_link" class="dialog-container"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editSuccess(user)">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getRecommendSubscribe, getRecommendPosition, GetUserInfo, UpdateUserInfo } from "@/api/api";
import PostPositionUnit from "@/components/PostPositionUnit.vue";
import PostCompanyUnit from "@/components/PostCompanyUnit.vue";
import PostUserUnit from "@/components/PostUserUnit.vue";
export default {
    data() {
        return {
            select: '1',
            input: '',
            NotAllowSearch: true,
            token: 'ff5d0e29d3836387e23c570d2579dda65f922cb5',
            RecommendSubscribeList: [],
            RecommendPositionList: [],
            isSelf: false,
            isFavor: false,
            user: {
                real_name: "张三",
                education: "本科",
                desired_position: [
                    { category: "人工智能", specialization: "机器学习" },
                    { category: "后端开发", specialization: "Java" }
                ],
                blog_link: "https://github.com/",
                name: "张三",
                school: "清华大学",
                position: "",
                age: "",
                workYear: "",
                is_staff: false
            },
            flatDesiredPosition: [
                ['后端开发', 'Java'],
                ['前端/移动开发', 'Android']
            ], // 用于显示在 el-cascader 中的平面化数据
            dialogVisible: false,
            rules: {
                real_name: [
                    { required: true, message: "请输入姓名", trigger: "change" }
                ],
                education: [
                    { required: true, message: "请输入学历", trigger: "change" }
                ],
                desired_position: [
                    { required: true, message: "请输入期望职位", trigger: "change" }
                ]
            },

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

            props: { multiple: true }
        }

    },
    components: {
        PostPositionUnit, PostCompanyUnit, PostUserUnit
    },
    async created() {
        this.token = localStorage.getItem("token");
        if (localStorage.getItem("username") != null) {
            await GetUserInfo(localStorage.getItem("username")).then(res => {
                if (res.data.status == "success") {
                    this.user.real_name = res.data.data.real_name;
                    this.user.name = res.data.data.username;
                    this.user.education = res.data.data.education;
                    this.user.school = res.data.data.school;
                    this.user.desired_position = res.data.data.desired_position;
                    this.flatDesiredPosition = this.user.desired_position.map(item => [item.category, item.specialization]);
                    this.user.age = res.data.data.age;
                    this.user.blog_link = res.data.data.blog_link;
                    this.user.position = res.data.data.position;
                    this.user.workYear = res.data.data.work_year;
                    this.user.is_staff = res.data.data.is_staff;
                    const json = JSON.stringify(this.user);
                    // console.log(json);
                    // this.defaultUser = JSON.parse(json);
                }
            },
                error => {
                    if (error.response.status === 400) {
                        this.$notify({
                            title: "错误",
                            message: "未知错误",
                            type: "error"
                        });
                    }
                    if (error.response.status === 404) {
                        this.$notify({
                            title: "错误",
                            message: "用户不存在",
                            type: "error"
                        });
                    }
                }
            );
            console.log(this.user.education);
            console.log(this.user.desired_position);
            if (this.user.education == "" || this.user.desired_position == "") {
                this.dialogVisible = true;
            }
        }
        getRecommendSubscribe(this.token).then(res => {
            if (res.data.status === "success") {
                this.RecommendSubscribeList = res.data.data
            }
        })
        getRecommendPosition(this.token).then(res => {
            if (res.data.status === "success") {
                this.RecommendPositionList = res.data.data
            }
        })
    },
    methods: {
        editSuccess() {
            // 将平面化数据转换回后端所需的嵌套对象格式
            this.user.desired_position = this.flatDesiredPosition.map(item => ({
                category: item[0],
                specialization: item[1]
            }));
            this.$refs["user"].validate(valid => {
                if (valid) {
                    // console.log("aaaaaaaa");
                    UpdateUserInfo(this.user, this.token).then(res => {
                        if (res.data.status === "success") {
                            const json = JSON.stringify(this.user);
                            this.defaultUser = JSON.parse(json);
                            this.$notify({
                                title: "成功",
                                message: "完善成功",
                                type: "success"
                            });
                        }
                    },
                        error => {
                            if (error.response.status === 401) {
                                this.$notify({
                                    title: "错误",
                                    message: "完善失败",
                                    type: "error"
                                });
                            }
                        }
                    );
                    this.dialogVisible = false;
                    setTimeout(() => {
                        GetUserInfo(this.user.name).then(res => {
                            if (res.data.status == "success") {
                                this.user.real_name = res.data.data.real_name;
                                this.user.name = res.data.data.username;
                                this.user.education = res.data.data.education;
                                this.user.school = res.data.data.school;
                                this.user.desired_position = res.data.data.desired_position;
                                this.flatDesiredPosition = this.user.desired_position.map(item => [item.category, item.specialization]);
                                this.user.age = res.data.data.age;
                                this.user.blog_link = res.data.data.blog_link;
                                this.user.position = res.data.data.position;
                                this.user.workYear = res.data.data.work_year;
                                this.user.is_staff = res.data.data.is_staff;
                                const json = JSON.stringify(this.user);
                                // console.log(json);
                                // this.defaultUser = JSON.parse(json);
                            }
                        },
                            error => {
                                if (error.response.status === 400) {
                                    this.$notify({
                                        title: "错误",
                                        message: "未知错误",
                                        type: "error"
                                    });
                                }
                                if (error.response.status === 404) {
                                    this.$notify({
                                        title: "错误",
                                        message: "用户不存在",
                                        type: "error"
                                    });
                                }
                            }
                        );
                    }, 100);
                } else {
                    this.$notify({
                        title: "错误",
                        message: "请完善必填信息",
                        type: "error"
                    });
                }
            });
        },
        allow() {
            if (this.select !== null && this.select !== '' && this.input !== null && this.input !== '') {
                this.$refs.button.$el.style.cursor = 'pointer'
                this.NotAllowSearch = false
            } else {
                this.$refs.button.$el.style.cursor = 'not-allowed'
                this.NotAllowSearch = true
            }
        },
        Search() {
            // alert("搜索一次")
            let searchField = { "type": '', "keywords": '' }
            console.log("搜索一次")
            switch (this.select) {
                case '1':
                    // SearchUser(this.input).then(res => {
                    //     console.log(res)
                    // })
                    searchField.type = 'user'
                    searchField.keywords = this.input
                    localStorage.setItem("searchField", JSON.stringify(searchField))
                    this.$store.dispatch('updateButtonClicked', true)
                    this.$router.push('/user-list')

                    break
                case '2':
                    // const data = {
                    //     "keywords": this.input
                    // }
                    // SearchCompany(data).then(res => {
                    //     console.log(res)
                    // })
                    searchField.type = 'company'
                    searchField.keywords = this.input
                    localStorage.setItem("searchField", JSON.stringify(searchField))
                    this.$store.dispatch('updateButtonClicked', true)
                    this.$router.push('/company-list')
                    break
            }
        }
    },

}
</script>
<style scoped>
.recommend_position {
    flex: 1;
    width: 100%;
    margin-top: 3%
}

.recommend_subscribe {
    flex: 1;
    width: 100%;
    margin-top: 3%
}

.recommend_user {
    flex: 1;
    width: 100%;
    margin-top: 3%
}

.recommend_position .recommend_subscribe .recommend_user span {}

.post-container {
    width: 85%;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding-bottom: 5%;
}

.post-container span {
  display: block;
  font-size: 35px;
  font-weight: 1000;
  color: black;
}

.info-bar {
    width: 100%;
    height: 120px;
    background: #00bebd;
}

.info-bar span {
    display: block;
    font-size: 30px;
    font-weight: 900;
    color: white;
    /* margin-top: 10px; */
    position: absolute;
    top: 12%;
    left: 20%;
}

.img-container {
    display: block;
    width: 100%;
    height: 120px;
    /* background-image: url("../assets/bg.webp"); */
    /* float: left; */
    position: relative;
}

.search-bar {
    margin: 20px -400px;
    float: left;
    position: absolute;
    left: 50%;
    top: 15%;
    border: solid 3px #00bebd;
    border-radius: 10px;
}

/* .img-container .el-select .el-input {
    width: 500px;
    height: 100px;
} */

.input-with-select {
    width: 800px;
    height: 50px;

}


.select-right {
    margin-left: 20px;
}

/deep/ .el-select {
    width: 130px;
    border-radius: 10px;
}

/deep/ .el-input__inner {
    height: 50px;
    /* width: 100px;` */
}

/deep/.dialog-container .el-input__inner {
    border-color: #DCDFE6 !important
}

.input-with-select .el-input-group__prepend {
    background-color: #fff;
    /* border-radius: 5px; */

}

#pro-search {
    display: inline-block;
    margin-right: 40px;
    background-color: #fff;
    color: rgba(47, 58, 145, .8) !important;
    font-size: larger;
}

#search-button {
    border-color: #fff;
    background-color: #00bebd !important;
    color: #fff;
    /* border-radius: 0; */
    padding: 16px 20px;
    width: 120px;
    font-size: larger;
    border-radius: 10px;
    border: none;

}

/deep/ .el-input-group__append {
    background-color: #00bebd;
    border-color: #00bebd;
}

/deep/ .el-input__inner {
    border-color: #fff;
}

/deep/ .el-input-group__prepend {
    background-color: #fff;
    border-color: #fff;
    border-radius: 5px;
}

.select /deep/ .el-input__inner::placeholder {
    color: rgba(47, 58, 145, .8) !important;
    font-weight: 500;
    text-align: center;
}

/deep/ .el-select {
    /* border-right: 1px solid blue; */
    position: relative;

}


/deep/ .el-select::after {
    content: '';
    position: absolute;
    top: 25%;
    /* 调整分隔线位置，这里设置为盒子高度的一半 */
    right: 0;
    height: 50%;
    /* 设置分隔线的高度为盒子高度的一半 */
    width: 2px;
    /* 设置分隔线的宽度 */
    background-color: #d6dbe3;
    /* 设置分隔线颜色 */
}

.pro-input {
    /* border: #bfc3de solid 2px; */
    width: 70%;
    border-radius: 10px;
    /* border-top-right-radius: 10px; */
    /* padding: 10px; */
    margin: 10px 0;
}

.pro-input /deep/ .el-input__inner {
    height: 35px;
    border: #bfc3de solid 2px;
    border-radius: 5px;
    margin-left: 10px;
}

.pro-input /deep/ .el-input__inner:hover {
    border-color: rgba(47, 58, 145, .8) !important;
}

.pro-input /deep/ .el-input-group__prepend {
    border: #bfc3de solid 2px;
    width: 80px;
    border-radius: 5px;
    /* margin-right: 10px; */
}

.pro-but {
    width: 115px;
}
</style>