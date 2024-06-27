<template>
  <div class="box">
    <div class="main">
      <div class="password">
        <div id="logo" @click="tohome()" style="cursor: pointer">
          <img src="../assets/logo.png" style="width:50px;height:50px;margin-top: 50px">
          <span style="font-size:20px;font-weight:1000;color: #00BAB7;">两个月直聘</span>
        </div>
        <div id="password">
          <span class="title">
            找回密码
          </span>
          <el-form :model="passwordForm" ref="passwordForm" class="form">
            <el-form-item prop="username">
              <el-input style="width: 330px;" type="text" v-model="passwordForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名" >
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input style="width: 330px;" type="password" v-model="passwordForm.password" show-password prefix-icon="el-icon-lock" placeholder="请输入要更改的密码"></el-input>
            </el-form-item>
            <el-form-item prop="password2">
              <el-input style="width: 330px;" type="password" v-model="passwordForm.password2" show-password prefix-icon="el-icon-lock" placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input style="width: 330px;" type="text" v-model="passwordForm.email" prefix-icon="el-icon-message" placeholder="请输入邮箱" >
                <el-link slot="suffix" @click="sendEmail" :underline="false">发送验证码</el-link>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input style="width: 330px;" type="text" v-model="passwordForm.code" prefix-icon="el-icon-edit" placeholder="请输入验证码" >
              </el-input>
            </el-form-item>
            <div class="navigation">
              <el-link href="/login" :underline="false">返回登录</el-link>
            </div>
            <el-form-item>
              <el-button id="passwordButton" type="primary" @click="forget()" class="button">修改密码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ForgetPassword} from "@/api/api";
import {SendCode} from "@/api/api";
import {GetUserInfo} from "@/api/api";

export default {
  data() {
    return {
      passwordForm: {
        username: '',
        password: '',
        password2: '',
        real_name: '',
        email: '',
        code: ''
      }
    }
  },

  methods: {
    tohome() {
      this.$router.push("/")
    },
    async sendEmail() {
      //邮箱不可为空
      if (typeof this.passwordForm.email == "undefined" || this.passwordForm.email == null || this.passwordForm.email === "") {
        this.$notify({
          title: '警告',
          message: '邮箱不能为空',
          type: 'warning'
        });
      } else if (!this.passwordForm.email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)) {
        //邮箱格式是否合法
        this.$notify({
          title: '警告',
          message: '邮箱格式不正确',
          type: 'warning'
        });
      } else {
        //TODO: 获取用户信息
        const param = {
          username: this.passwordForm.username
        }
        await GetUserInfo(param.username).then(res => {
              if (res.data.status === "success") {
                this.email = res.data.data.email
              }
            },
            error => {
              this.$notify({
                title: '警告',
                message: '用户不存在',
                type: 'warning'
              });
            })
        if (this.email === null || this.email === "" || this.email === undefined) {
          this.$notify({
            title: '警告',
            message: '用户不存在',
            type: 'warning'
          });
        } else if (this.email !== this.passwordForm.email) {
          this.$notify({
            title: '警告',
            message: '邮箱与用户名不匹配',
            type: 'warning'
          });
          return
        }
        //TODO: 发送验证码请求
        const params = {
          email: this.passwordForm.email
        }
        SendCode(params).then(res => {
              if (res.data.status === "success") {
                this.$notify({
                  title: '成功',
                  message: '发送成功',
                  type: 'success'
                });
              }
            },
            error => {
              const message = "发送失败"
              this.$notify({
                title: '警告',
                message: message,
                type: 'warning'
              });
            })
      }
    },
    forget() {
      //用户名、密码、确认密码不可为空
        if (typeof this.passwordForm.username == "undefined" || this.passwordForm.username == null || this.passwordForm.username === "") {
          this.$notify({
            title: '警告',
            message: '用户名不能为空',
            type: 'warning'
          });
        }else if (typeof this.passwordForm.password == "undefined" || this.passwordForm.password == null || this.passwordForm.password === "") {
          this.$notify({
            title: '警告',
            message: '密码不能为空',
            type: 'warning'
          });
        }else if (typeof this.passwordForm.password2 == "undefined" || this.passwordForm.password2 == null || this.passwordForm.password2 === "") {
          this.$notify({
            title: '警告',
            message: '确认密码不能为空',
            type: 'warning'
          });
        }else if(this.passwordForm.password !== this.passwordForm.password2){
          this.$notify({
            title: '警告',
            message: '两次密码输入不一致',
            type: 'warning'
          });
        } else if (typeof this.passwordForm.email == "undefined" || this.passwordForm.email == null || this.passwordForm.email === "") {
          this.$notify({
            title: '警告',
            message: '邮箱不能为空',
            type: 'warning'
          });
        } else if (typeof this.passwordForm.code == "undefined" || this.passwordForm.code == null || this.passwordForm.code === "") {
          this.$notify({
            title: '警告',
            message: '验证码不能为空',
            type: 'warning'
          });
        } else {
          const form_data = {
            username: this.passwordForm.username,
            password: this.passwordForm.password,
            code: this.passwordForm.code
          }
          ForgetPassword(form_data).then(res => {
            if (res.data.status === "success") {
              this.$notify({
                title: '成功',
                message: '修改密码成功',
                type: 'success'
              });
              this.$router.push("/login")
            } else {
              this.$notify({
                title: '警告',
                message: '验证码错误',
                type: 'warning'
              });
            }
          },
          error => {
            var message = "修改密码失败"
            if(error.response.status === 401){
              message = "验证码错误"
            }
            this.$notify({
              title: '警告',
              message: message,
              type: 'warning'
            });
          })
        }
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

.password {
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
  margin-top: 10px;
}

.title {
  width: 100%;
  text-align: center;
  color: #00BAB9;
  font-size: 20px;
  font-weight: 1000;
  text-underline-offset: 20px;
  text-decoration-thickness: 3px;
  margin-top: 20px;
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
  margin-left: auto;
  margin-right: auto;
}

.navigation {
  width:250px;
  text-align: center;
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

#password {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>