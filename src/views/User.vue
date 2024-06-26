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
                <span>期望: {{ user.desiredPosition }}</span>
              </div>
              <div id="userEdu">
                <span style="position: relative;left: 5%">{{ user.education }}</span>
                <el-divider id="divider" direction="vertical"></el-divider>
                <span style="position: relative;left: 5%">{{ user.school }}</span>
              </div>
              <div id="work">
                <span>博客或仓库: <a :href="user.work" id="link">{{ user.work }}</a></span>
              </div>
            </div>
            <div id="edit">
              <el-button plain id="editBtn">
                编辑资料
                <i class="el-icon-caret-right"></i>
              </el-button>
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
                  limit="1"
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
export default {
  name: "User",
  components: {
    NaviBar
  },
  data() {
    return {
      user: {
        name: "张三",
        education: "本科",
        school: "清华大学",
        desiredPosition: "前端工程师",
        work: "https://github.com/"
      },
    };
  },
  methods: {
    errorHandler() {
      return true;
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
    height: 8vh;
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
    color: #4F81BD;
    border: 1px solid #DEFAFF;
    border-right: transparent;
    background-color: rgba(221, 255, 245, 0.2);
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
    background-color: rgba(221, 255, 245, 0.7);
    color: #00BAB7;
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
    background: #DEFFFF;
  }
  #body #main .content {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
  }
</style>
