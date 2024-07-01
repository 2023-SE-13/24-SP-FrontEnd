<template>
  <div class="box">
    <div class="main">
      <div class="login">
        <div id="logo" @click="tohome()" style="cursor: pointer">
            <img src="../assets/logo.png" style="width:50px;height:50px;margin-top: 50px">
            <span style="font-size:20px;font-weight:1000;color: #00BAB7;">Leader直聘</span>
        </div>
        <div id="login">
          <span class="title">
            登录
          </span>
          <el-form :model="loginForm" ref="loginForm" class="form">
            <el-form-item prop="username">
              <el-input style="width: 250px;" type="text" v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名" >
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input style="width: 250px;" type="password" v-model="loginForm.password" show-password prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
            </el-form-item>
            <div class="navigation">
              <el-link href="/register" :underline="false">注册账号</el-link>
              <span> | </span>
              <el-link href="/password" :underline="false">忘记密码</el-link>
            </div>
            <el-form-item>
              <el-button id="LoginButton" type="primary" @click="login()" class="button">登录</el-button>
            </el-form-item>
          </el-form>
          <span class="smallword">客服电话 400-065-5799 工作时间：8:00-22:00</span>
          <span class="smallword">人力资源服务许可证 营业执照 海淀区人社局监督电话</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Login} from "@/api/api";
import {IsAdmin} from "@/api/api";
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    tohome() {
      this.$router.push("/")
    },
    login() {
      console.log(this.loginForm)
      if (typeof this.loginForm.username == "undefined" || this.loginForm.username == null || this.loginForm.username === "") {
        //TODO: 弹出提示框
        this.$notify({
          title: '警告',
          message: '用户名不能为空',
          type: 'warning'
        });
        return;
      }
      if (typeof this.loginForm.password == "undefined" || this.loginForm.password == null || this.loginForm.password === "") {
        //TODO: 弹出提示框
        this.$notify({
          title: '警告',
          message: '密码不能为空',
          type: 'warning'
        });
        return;
      }
      const form_data = {
        username: this.loginForm.username,
        password: this.loginForm.password
      }
      console.log(form_data)
      //TODO: 发送登录请求
      Login(form_data).then(async res => {
        if (res.data.status === "success") {
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("username", this.loginForm.username)
          await IsAdmin(this.loginForm.username).then(res => {
            if (res.data.data.is_staff) {
              localStorage.setItem("company_id", res.data.data.company_id)
            } else {
              localStorage.setItem("company_id", "")
            }
          },
          error => {
            console.log(error)
          }
          )
          this.$router.push("/")
        }
      },
      error => {
        var message = ""
        if(error.response.status === 401){
          message = "密码错误"
        } else if(error.response.status === 404){
          message = "用户不存在"
        } else {
          message = "未知错误"
        }
        this.$notify({
          title: '警告',
          message: message,
          type: 'warning'
        });
      })
    },
  }
}
</script>

<style scoped>
.box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 0;
}

.main {
  width: 100%;
  height: 100%;
  background-image: url("../assets/loginBG.png");
  background-size: 100%;
  background-color: #00c1c1;
  background-repeat: no-repeat;
  background-position: bottom;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login {
  width: 640px;
  height: 450px;
  background-color: white;
  align-items: center;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
}

.form {
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.title {
  width: 100%;
  text-align: center;
  color: #00BAB9;
  font-size: 20px;
  font-weight: 1000;
  text-underline-offset: 20px;
  text-decoration-thickness: 3px;
  margin-top: 50px;
}

.button {
  width: 200px;
  height: 50px;
  border-radius: 15px;
  border: none;
  font-size: 20px;
  font-weight: 200;
  font-family: 黑体, serif;
  color: white;
  background-image: linear-gradient(to bottom right, #00BAB9, #00BAB7);
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}

.navigation {
  width:250px;
  text-align: center;
  margin-bottom: 20px;
}


a {
  text-decoration: none;
}

#logo {
  width: 30%;
  height: 100%;
  background-color: #E3FAFD;
  border-radius: 30px 0 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#login {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.smallword {
  font-size: 13px;
  color: grey;
}
</style>