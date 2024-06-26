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
              <el-avatar :size="70" @error="errorHandler" id="img">头像</el-avatar>
            </div>
            <div id="personInfor">
              <div id="userName">
                <span style="position: relative;left: 5%">{{ user.name }}</span>
              </div>
              <div id="userDesired">
                <span>期望: {{ user.desired_position }}</span>
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
              <el-dialog center title="编辑资料" :append-to-body="true" :visible.sync="dialogVisible" @close="editCancel">
                <el-form :model="user" :rules="rules" ref="user">
                  <el-form-item label="姓名" prop="real_name">
                    <el-input clearable v-model="user.real_name"></el-input>
                  </el-form-item>
                  <el-form-item label="学历" prop="education">
                    <el-input clearable v-model="user.education"></el-input>
                  </el-form-item>
<!--                  <el-form-item label="学校">-->
<!--                    <el-input clearable v-model="user.school"></el-input>-->
<!--                  </el-form-item>-->
                  <el-form-item label="期望职位" prop="desired_position">
                    <el-input clearable v-model="user.desired_position"></el-input>
                  </el-form-item>
                  <el-form-item label="博客或仓库">
                    <el-input clearable v-model="user.blog_link"></el-input>
                  </el-form-item>
                  <el-form-item label="职位">
                    <el-input clearable v-model="user.position"></el-input>
                  </el-form-item>
                  <el-form-item label="工龄">
                    <el-input clearable v-model="user.workYear"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="editCancel">取 消</el-button>
                  <el-button type="primary" @click="editSuccess(user)">确 定</el-button>
                </span>
              </el-dialog>
            </div>
          </div>
          <div id="resume" class="content">
            <div id="uploadResTitle">
              <span>上传简历</span>
              <span id="uploadIcon"><i class="el-icon-plus"></i></span>
            </div>
            <div id="uploadRes">
              <el-upload
                  action="#"
                  list-type="picture-card"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :http-request="uploadLocation"
                  :file-list="[]"
              >
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
import {GetUserInfo, UpdateUserInfo} from "@/api/api";
export default {
  name: "User",
  components: {
    NaviBar
  },
  created() {
    this.token = localStorage.getItem("token");
    if (this.token == null) {
      this.$router.push("/login");
    }
    this.user.name = this.$route.params.name;
    this.defaultUser.name = this.user.name;
    if (this.user.name !== localStorage.getItem("username")) {
      console.log("不是当前用户");
      console.log(this.token);
      console.log(this.user.name);
      console.log(localStorage.getItem("username"));
      // this.isSelf = false;
    }
    GetUserInfo(this.user.name).then(res => {
      if (res.data.status == "success") {
        this.user.real_name = res.data.data.real_name;
        this.user.name = res.data.data.username;
        this.user.education = res.data.data.education;
        this.user.school = res.data.data.school;
        this.user.desired_position = res.data.data.desired_position;
        this.user.blog_link = res.data.data.blog_link;
        this.user.position = res.data.data.position;
        this.user.workYear = res.data.data.work_year;
        const json = JSON.stringify(this.user);
        console.log(json);
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
      isSelf: true,
      user: {
        real_name: "张三",
        education: "本科",
        desired_position: "前端工程师",
        blog_link: "https://github.com/",
        name: "张三",
        school: "清华大学",
        position: "",
        workYear: ""
      },
      defaultUser: {
        real_name: "张三",
        education: "本科",
        desired_position: "前端工程师",
        blog_link: "https://github.com/",
        name: "张三",
        school: "清华大学",
        position: "",
        workYear: ""
      },
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
      }
    };
  },
  methods: {
    errorHandler() {
      return true;
    },
    editInfor() {
      this.dialogVisible = true;
    },
    editSuccess() {
      this.$refs["user"].validate(valid => {
        if (valid) {
          console.log("aaaaaaaa");
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
                    this.user.blog_link = res.data.data.blog_link;
                    this.user.position = res.data.data.position;
                    this.user.workYear = res.data.data.work_year;
                    const json = JSON.stringify(this.user);
                    console.log(json);
                    this.defaultUser = JSON.parse(json);
                  }},
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
  #userName, #userDesired {
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
  #userEdu, #work{
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
