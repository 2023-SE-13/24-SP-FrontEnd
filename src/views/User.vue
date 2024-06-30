<template>
  <div>
    <div id="body">
      <div id="center" class="background">
        <div id="main">
          <div id="infor" class="content">
            <div id="avatar">
              <el-avatar :size="70" @error="errorHandler" :src="photo_url" id="img">头像</el-avatar>
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
              <span id="uploadIcon">
                <el-upload action="#" auto-upload :on-success="handleSuccess" :on-preview="handlePreview"
                  :on-remove="handleRemove" :on-error="handleError" :show-file-list="false"
                  :http-request="uploadResume">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </span>
            </div>
            <div id="resumeImg">
              <div v-if="!hasResume" id="nullResume">
                <el-empty description="暂无简历，快去上传吧" :image-size="80"></el-empty>
              </div>
              <div v-if="hasResume" id="userResume">
                <div>
                  <svg t="1719662425449" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3740" width="80" height="80">
                    <path
                      d="M179 64h468.5l223 225.5V935c0 13.807-11.193 25-25 25H179c-13.807 0-25-11.193-25-25V89c0-13.807 11.193-25 25-25z"
                      fill="#FF4867" p-id="3741"></path>
                    <path d="M647.5 64v200.5c0 13.807 11.193 25 25 25h198L647.5 64z" fill="#FF97A9" p-id="3742"></path>
                    <path
                      d="M691.919 812c-44.4 0-84.22-76.189-105.17-125.732-35.243-14.71-74.092-28.45-111.831-37.331-33.022 21.788-89.214 54.4-132.365 54.4-26.778 0-46.064-13.461-53.14-36.914-5.411-19.29-0.832-32.613 4.995-39.83 11.377-15.543 34.825-23.453 69.929-23.453 28.443 0 64.517 4.996 104.754 14.71 25.945-18.457 52.307-39.829 75.756-62.45-10.406-49.404-21.784-129.479 7.076-166.393 14.29-17.625 36.074-23.454 62.436-15.543 28.86 8.326 39.82 25.951 43.15 39.829 12.21 48.155-43.15 113.103-80.473 151.267 8.325 33.029 19.286 67.862 32.606 99.78 53.556 23.87 117.24 59.536 124.456 98.394 2.913 13.461-1.249 25.951-12.21 36.915-9.435 7.771-19.425 12.351-29.97 12.351zM652 728c9.768 21.74 19.081 32 23.99 32 0.76 0 1.823-0.333 3.341-1.664 1.822-1.996 1.822-3.327 1.518-4.547-1.012-5.713-9.262-15.085-28.849-25.789z m-281.922-88c-15.62 0-19.913 3.774-21.22 5.535-0.373 0.566-1.493 2.264-0.373 6.666 0.933 3.774 3.547 7.799 11.636 7.799 10.143 0 24.829-5.723 41.879-15.975-12.196-2.704-22.962-4.025-31.922-4.025zM523 620.582c9.333 2.6 19.01 5.951 28 9.418-3.264-8.551-5.898-17.449-8.13-26A629.121 629.121 0 0 1 523 620.582zM588.966 433c-3.32 0-5.649 1.229-7.745 3.511-6.173 7.783-6.872 27.386-2.097 52.489 18.111-19.427 27.953-37.275 25.507-46.813-0.35-1.404-1.398-5.676-9.842-8.134-2.33-0.702-4.076-1.053-5.823-1.053z"
                      fill="#FFFFFF" p-id="3743"></path>
                  </svg>
                </div>
                <div id="resumeInfo">
                  <p>{{ user.real_name }}_resume.pdf</p>
                  <p style="font-size: 12px;color: #bbb">上传时间: {{ resumeUploadTime }}</p>
                </div>
                <div id="resumeMenu">
                  <el-dropdown trigger="hover" placement="bottom" @command="handleCommand">
                    <i class="el-icon-more"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="a">预览</el-dropdown-item>
                      <el-dropdown-item divided command="b">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>
          <div id="zone" class="content">
            <!--展示切换菜单-->
            <div id="preMenu">
              <el-menu default-active="1" mode="horizontal" @select="preSelect" id="pre_menu">
                <el-menu-item index="1" class="preMenuItem">动态</el-menu-item>
                <el-menu-item index="2" class="preMenuItem">关注</el-menu-item>
              </el-menu>
            </div>
            <div v-show="preActive === '1'" id="share">
              <div id="shareEditBtn" @click="goToWrite">
                <i class="el-icon-edit"></i>
              </div>
            </div>
          </div>
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
import {DoSubscribeUser, GetUserInfo, SubscribeUser, UnSubscribeUser, UpdateUserInfo, uploadResume} from "@/api/api";

export default {
  name: "User",
  components: {
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
    this.preActive = '1';
  },
  data() {
    return {
      token: null,
      photo_url: require("../assets/photo.png"),
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
        age: "",
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
      hasResume: false,
      resumeUrl: "",
      resumeUploadTime: "",
      preActive: '1',
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
    handleSuccess() {
      this.$notify({
        title: "成功",
        message: "上传成功",
        type: "success"
      });
    },
    handleError() {
      this.$notify({
        title: "错误",
        message: "上传失败",
        type: "error"
      });
    },
    handlePreview() {
      return true;
    },
    handleRemove() {
      return true;
    },
    uploadResume(file) {
      console.log(file.file);
      const formData = new FormData();
      formData.append("resume", file.file);
      uploadResume(formData, this.token).then(res => {
        if (res.data.status === "success") {
          console.log("上传成功");
          this.hasResume = true;
          this.resumeUrl = "http://10.251.253.188/resume/" + this.user.name + "_resume.pdf";
          this.resumeUploadTime = new Date();
        }
      },
          error => {
            if (error.response.status === 400) {
              this.$notify({
                title: "错误",
                message: "上传错误",
                type: "error"
              });
            }
          }
      );
    },
    preSelect(index) {
      this.preActive = index;
    },
    goToWrite() {
      this.$router.push("/User/" + this.user.name + "/ShareWrite");
    },
    handleCommand(command) {
      if (command === 'a') {
        window.open(this.resumeUrl);
      }
      if (command === 'b') {

      }
    }
  }
}
</script>

<style scoped>
#body {
  height: 93vh;
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
  height: 30%;
  float: right;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

#uploadResTitle {
  width: 90%;
  height: 20%;
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

#resumeImg {
  width: 95%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#nullResume {
  position: relative;
  bottom: 5%;
}

#userResume {
  width: 100%;
  font-family: “Helvetica Neue”, Helvetica, Arial, sans-serif;
  position: relative;
  bottom: 10%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

#userResume:hover {
  background-color: rgba(247, 247, 247, 0.9);
}

#resumeInfo {
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  left: 3%;
  line-height: 180%;
}

#resumeMenu {
  position: relative;
  left: 29.5%;
}

#resumeMenu i:hover {
  color: #00BEBD;
  ;
}

#zone {
  width: 70%;
  height: 78%;
  margin-right: 2%;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

#preMenu {
  width: 100%;
  height: 8%;
}

#pre_menu {
  height: 100%;
}

#pre_menu .preMenuItem {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#share {
  width: 100%;
  height: 92%;
  position: relative;
}

#shareEditBtn {
  width: 7%;
  height: 14.35%;
  border-radius: 50%;
  float: right;
  position: absolute;
  top: 76%;
  right: 6%;
  background-color: rgba(0, 186, 183, 0.5);
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 27px;
}

#shareEditBtn:hover {
  background-color: #00BEBD;
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
  height: 93vh;
  float: left;
  background: rgba(211, 233, 232, 0.9);
}

#body #main .content {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}
</style>
