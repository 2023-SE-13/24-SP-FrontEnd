<template>
  <div>
    <div id="nav">
      <NaviBar></NaviBar>
    </div>
    <div id="body">
      <div id="center" class="background">
        <div id="main">
          <div id="infor" class="content">
            <div id="avatar">
              <el-avatar :size="70" @error="errorHandler" src="../assets/photo.png" id="img">头像</el-avatar>
            </div>
            <div id="personInfor">
              <div id="userName">
                <span style="position: relative;left: 5%">{{ user.name }}</span>
                <span v-if="!isSelf && !isFavor" style="position: relative;left: 7%;width: 20%;height: 60%"
                  class="favor" @click="changeFavor"><i class="el-icon-plus"> 关注</i></span>
                <span v-if="!isSelf && isFavor" style="position: relative;left: 7%;width: 20%;height: 60%" class="favor"
                  id="isFavor" @click="changeFavor"><i class="el-icon-s-operation">已关注</i></span>
              </div>
              <div id="userDesired">
                <span>期望岗位: {{ formattedDesiredPosition }}</span>
              </div>
              <div id="userEdu">
                <span style="position: relative;left: 5%">{{ user.education }}</span>
                <!--                <el-divider id="divider" direction="vertical"></el-divider>-->
                <!--                <span style="position: relative;left: 5%">{{ user.school }}</span>-->
              </div>
              <div id="work">
                <span>博客或仓库: <a :href="user.blog_link" id="link">{{ user.blog_link }}</a></span>
              </div>
            </div>
            <div v-if="isSelf" id="edit">
              <el-button plain @click.prevent="editInfor" id="editBtn">
                编辑资料
                <i class="el-icon-caret-right"></i>
              </el-button>
              <el-dialog center title="编辑资料" :append-to-body="true" :visible.sync="dialogVisible" @close="editCancel"
                width="40%">
                <el-form :model="user" :rules="rules" ref="user">


                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="姓名" prop="real_name">
                        <el-input clearable v-model="user.real_name"></el-input>
                      </el-form-item>

                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="年龄" prop="age">
                        <el-input clearable v-model="user.age" class="dialog-container"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="学历" prop="education">
                        <el-input clearable v-model="user.education" class="dialog-container"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="学校">
                        <el-input clearable v-model="user.school"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <!-- <el-form-item label="期望职位测试" prop="desired_position">
                    <div v-for="(position, index) in flatDesiredPosition" :key="index" style="margin-bottom: 5px;">
                      <el-tag type="info" closable @close="removeTag(index)">
                        {{ position[0] }} / {{ position[1] }}
                      </el-tag>
                    </div>
                  </el-form-item> -->
                  <el-form-item label="期望职位" prop="desired_position">
                    <el-cascader class="dialog-container" v-model="flatDesiredPosition" :options="options" filterable
                      :props="cascaderProps" clearable style="width: 100%" />
                  </el-form-item>

                  <el-form-item label="博客或仓库">
                    <el-input clearable v-model="user.blog_link"></el-input>
                  </el-form-item>

                  <el-row :gutter="20" v-if="this.user.is_staff">
                    <el-col :span="12">
                      <el-form-item label="职位">
                        <el-input clearable v-model="user.position"></el-input>
                      </el-form-item>

                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="工龄">
                        <el-input clearable v-model="user.workYear"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="editCancel">取 消</el-button>
                  <el-button type="primary" @click="editSuccess(user)">确 定</el-button>
                </span>
              </el-dialog>
            </div>
          </div>
          <div v-if="isSelf" id="resume" class="content">
            <div id="uploadResTitle">
              <span>上传简历</span>
              <span id="uploadIcon"><i class="el-icon-plus"></i></span>
            </div>
            <div id="uploadRes">
              <el-upload action="#" list-type="picture-card" :on-preview="handlePreview" :on-remove="handleRemove"
                :http-request="uploadLocation" :file-list="[]">
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
          <div id="zone" class="content"></div>
        </div>
      </div>
      <div id="left" class="background">
      </div>
      <div id="right" class="background">
      </div>
    </div>
  </div>
</template>

<script>
import NaviBar from "@/components/NaviBar.vue";
import { GetUserInfo, UpdateUserInfo, SubscribeUser, UnSubscribeUser, DoSubscribeUser } from "@/api/api";
export default {
  name: "User",
  components: {
    NaviBar
  },
  watch: {
    $route: {
      handler: function () {
        this.user.name = this.$route.params.name;
        this.defaultUser.name = this.user.name;
        this.isSelf = true;
        this.isFavor = false;
        if (this.user.name !== localStorage.getItem("username")) {
          this.isSelf = false;
          const data = {
            username: this.user.name
          }
          DoSubscribeUser(data, this.token).then(res => {
            if (res.data.status === "success") {
              this.isFavor = true;
            }
          });
        }
        GetUserInfo(this.user.name).then(res => {
          if (res.data.status == "success") {
            this.user.real_name = res.data.data.real_name;
            this.user.name = res.data.data.username;
            this.user.education = res.data.data.education;
            this.user.school = res.data.data.school;
            this.user.age = res.data.data.age;
            this.user.desired_position = res.data.data.desired_position;

            this.flatDesiredPosition = this.user.desired_position.map(item => [item.category, item.specialization]);

            this.user.is_staff = res.data.data.is_staff;
            this.user.blog_link = res.data.data.blog_link;
            this.user.position = res.data.data.position;
            this.user.workYear = res.data.data.work_year;
            const json = JSON.stringify(this.user);
            // console.log(json);
            this.defaultUser = JSON.parse(json);
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
      },
      deep: true
    }
  },
  created() {

    this.token = localStorage.getItem("token");
    this.user.name = this.$route.params.name;
    this.defaultUser.name = this.user.name;
    this.isSelf = true;
    this.isFavor = false;

    if (this.user.name !== localStorage.getItem("username")) {
      this.isSelf = false;
      const data = {
        username: this.user.name
      }
      if (this.token !== null) {
        DoSubscribeUser(data, this.token).then(res => {
          if (res.data.status === "success") {
            this.isFavor = true;
          }
        });
      }
    }
    GetUserInfo(this.user.name).then(res => {
      if (res.data.status == "success") {
        // console.log(res.data.data);
        this.user.real_name = res.data.data.real_name;
        this.user.name = res.data.data.username;
        this.user.education = res.data.data.education;
        this.user.school = res.data.data.school;
        this.user.age = res.data.data.age;
        this.user.desired_position = res.data.data.desired_position;
        // 将 desired_position 转换为平面化格式
        this.flatDesiredPosition = this.user.desired_position.map(item => [item.category, item.specialization]);

        this.user.is_staff = res.data.data.is_staff;
        this.user.blog_link = res.data.data.blog_link;
        this.user.position = res.data.data.position;
        this.user.workYear = res.data.data.work_year;
        const json = JSON.stringify(this.user);
        // console.log(json);
        this.defaultUser = JSON.parse(json);
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
  },
  data() {
    return {
      token: null,
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
        age:"",
        workYear: "",
        is_staff: false
      },
      flatDesiredPosition: [
        ['后端开发', 'Java'],
        ['前端/移动开发', 'Android']
      ], // 用于显示在 el-cascader 中的平面化数据
      defaultUser: {
        real_name: "张三",
        education: "本科",
        desired_position: [
          { category: "人工智能", specialization: "机器学习" },
          { category: "后端开发", specialization: "Java" }
        ],
        blog_link: "https://github.com/",
        name: "张三",
        school: "清华大学",
        age:"",
        position: "",
        workYear: "",
        is_staff: false
      },
      dialogVisible: false,
      rules: {
        real_name: [
          { required: true, message: "请输入姓名", trigger: "change" }
        ],
        // education: [
        //   { required: true, message: "请输入学历", trigger: "change" }
        // ],
        // desired_position: [
        //   { required: true, message: "请输入期望职位", trigger: "change" }
        // ]
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

      cascaderProps: {
        multiple: true,
        // checkStrictly: true,
        // emitPath: false
      }
    };
  },
  computed: {
    formattedDesiredPosition() {
      return this.flatDesiredPosition.map(position => position.join('-')).join(' | ');
    }
  },
  methods: {
    errorHandler() {
      return true;
    },
    changeFavor() {
      if (this.token === null) {
        this.$notify({
          title: "错误",
          message: "请先登录",
          type: "error"
        });
        return;
      }
      if (this.isFavor) {
        const data = {
          username: this.user.name
        }
        UnSubscribeUser(data, this.token).then(res => {
          if (res.data.status === "success") {
            this.$notify({
              title: "成功",
              message: "取消关注成功",
              type: "success"
            });
            this.isFavor = false;
          }
        });
      } else {
        const data = {
          username: this.user.name
        }
        SubscribeUser(data, this.token).then(res => {
          if (res.data.status === "success") {
            this.$notify({
              title: "成功",
              message: "关注成功",
              type: "success"
            });
            this.isFavor = true;
          }
        });
      }
    },
    editInfor() {
      this.dialogVisible = true;
    },
    editSuccess() {
      console.log(this.flatDesiredPosition);
      // 将平面化数据转换回后端所需的嵌套对象格式
      this.user.desired_position = this.flatDesiredPosition.map(item => ({
        category: item[0],
        specialization: item[1]
      }));
      console.log(this.user.desired_position);
      this.$refs["user"].validate(valid => {
        if (valid) {

          UpdateUserInfo(this.user, this.token).then(res => {
            if (res.data.status === "success") {
              const json = JSON.stringify(this.user);
              this.defaultUser = JSON.parse(json);
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success"
              });
            }
          },
            error => {
              if (error.response.status === 401) {
                this.$notify({
                  title: "错误",
                  message: "修改错误",
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
                this.defaultUser = JSON.parse(json);
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
            message: "请检查输入",
            type: "error"
          });
        }
      });
    },
    editCancel() {
      const json = JSON.stringify(this.defaultUser);
      this.user = JSON.parse(json);
      this.dialogVisible = false;
    },
    handlePreview() {
      return true;
    },
    handleRemove() {
      return true;
    },
    uploadLocation() {
      return true;
    }
  }
}
</script>

<style scoped>
#nav {
  height: 6vh;
}

#body {
  height: 91.8vh;
  padding: 0 80px;
}

#center {
  width: 100%;
  float: left;
}

#main {
  width: 97%;
  height: 95%;
  position: relative;
  top: 2.5%;
  left: 1.5%;
}

#infor {
  width: 70%;
  height: 20%;
  margin-right: 2%;
  margin-bottom: 1%;
  float: left;
}

#avatar {
  width: 13%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  float: left;
}

#img {
  position: relative;
  bottom: 6%;
}

#personInfor {
  width: 70%;
  height: 100%;
  float: left;
  color: #333;
}

#userName,
#userDesired {
  width: 50%;
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  float: left;
  position: relative;
  top: 12%;
}

#userName .favor {
  border-radius: 5px;
  background-color: rgba(0, 190, 189, 0.5);
  font-size: 12px;
  color: white;
  font-weight: bolder;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#userName .favor:hover {
  background-color: #00BEBD;
}

#userName #isFavor {
  background-color: rgba(114, 118, 123, 0.7);
  color: rgba(0, 0, 0, 0.8);
}

#userName #isFavor:hover {
  color: rgba(0, 0, 0, 0.5);
}

#userEdu,
#work {
  position: relative;
  top: 12%;
  width: 50%;
  float: left;
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
}

::v-deep #divider {
  background-color: slategrey;
  position: relative;
  left: 5%;
}

#userDesired {
  font-size: 15px;
}

#userEdu {
  color: #666;
}

#link {
  color: #00BAB7;
  text-decoration: none;
}

#link:visited {
  color: #F56C6C;
}

#link:hover {
  color: #67c23a;
}

#edit {
  width: 17%;
  height: 100%;
  float: left;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#editBtn {
  width: 65%;
  background-color: #f8f8f8;
  color: #414a60;
  border-radius: 20px 0 0 20px;
  border: 1px solid #d4d5d6;
  border-right: transparent;
  font-size: 12px;
  position: relative;
  left: 17.6%;
  bottom: 17%;
}

#editBtn:hover {
  color: #00BEBD;
  border: 1px solid #DEFAFF;
  border-right: transparent;
  background-color: rgba(0, 190, 189, 0.2);
}

#resume {
  width: 28%;
  height: 50%;
  float: right;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

#uploadResTitle {
  width: 90%;
  height: 15%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

#uploadIcon {
  position: relative;
  left: 73%;
}

#uploadIcon:hover {
  background-color: rgba(0, 190, 189, 0.1);
  color: #00BEBD;
}

#uploadRes {
  width: 90%;
  height: 60%;
  /*background-color: red;*/
  border-radius: 5px;
}

#zone {
  width: 70%;
  height: 78%;
  margin-right: 2%;
  float: left;
}

#left {
  width: 80px;
  margin-left: -100%;
  position: relative;
  left: -80px;
  float: left;
}

#right {
  width: 80px;
  margin-right: -100%;
  float: left;
}

#body .background {
  height: 91.8vh;
  float: left;
  background: rgba(0, 190, 189, 0.1);
}

#body #main .content {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
}
</style>
