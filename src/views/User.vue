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
                <span>{{ user.name }}</span>
              </div>
              <div id="userEdu">
                <span>{{ user.education }}</span>
                <el-divider direction="vertical"></el-divider>
                <span>{{ user.school }}</span>
              </div>
              <div id="userDesired">
                <span>{{ user.desiredPosition }}</span>
              </div>
            </div>
            <div id="edit">

            </div>
          </div>
          <div id="resume" class="content"></div>
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
      }
    };
  },
  methods: {
    errorHandler() {
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
    background: deepskyblue;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    float: left;
  }
  #img {
    position: relative;
    bottom: 10%;
  }
  #personInfor {
    width: 70%;
    height: 100%;
    background: #F56C6C;
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: black;
  }
  #userName {
  }
  #userEdu {
  }
  #userDesired {
    float: right;
  }
  #edit {
    width: 17%;
    height: 100%;
    float: left;
    background: #2f3a91;
  }
  #resume {
    width: 28%;
    height: 95%;
    float: right;
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
    background: #42b983;
  }
  #body #main .content {
    background: #eee;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
  }
</style>
