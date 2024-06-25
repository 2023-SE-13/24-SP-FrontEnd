<template>
  <div class="box">
    <div class="main">
      <div class="register">
        <div id="logo" @click="tohome()" style="cursor: pointer">
          <img src="../assets/logo.png" style="width:50px;height:50px;margin-top: 50px">
          <span style="font-size:20px;font-weight:1000;color: #00BAB7;">两个月直聘</span>
        </div>
        <div id="register">
          <el-steps style="width:300px;background: white" :active=this.active simple>
            <el-step title="输入信息"></el-step>
            <el-step title="验证邮箱"></el-step>
          </el-steps>
          <span class="title">
            注册
          </span>
          <el-form :model="registerForm" ref="registerForm" class="form">
            <el-form-item v-show="this.active===0" prop="username">
              <el-input style="width: 250px;" type="text" v-model="registerForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名" >
              </el-input>
            </el-form-item>
            <el-form-item v-show="this.active===0" prop="password">
              <el-input style="width: 250px;" type="password" v-model="registerForm.password" show-password prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item v-show="this.active===0" prop="password2">
              <el-input style="width: 250px;" type="password" v-model="registerForm.password2" show-password prefix-icon="el-icon-lock" placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <el-form-item v-show="this.active===1" prop="real_name">
              <el-input style="width: 330px;" type="text" v-model="registerForm.real_name" prefix-icon="el-icon-user" placeholder="请输入真实姓名" >
              </el-input>
            </el-form-item>
            <el-form-item v-show="this.active===1" prop="email">
              <el-input style="width: 330px;" type="text" v-model="registerForm.email" prefix-icon="el-icon-message" placeholder="请输入邮箱" >
                <el-link slot="suffix" @click="sendEmail" :underline="false">发送验证码</el-link>
              </el-input>
            </el-form-item>
            <el-form-item v-show="this.active===1" prop="code">
              <el-input style="width: 330px;" type="text" v-model="registerForm.code" prefix-icon="el-icon-edit" placeholder="请输入验证码" >
              </el-input>
            </el-form-item>
            <div class="navigation">
              <el-link href="/login" :underline="false">返回登录</el-link>
            </div>
            <el-form-item>
              <el-button id="registerButton" type="primary" @click="register()" class="button">{{this.buttonwords}}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import {register} from "@/api/api";
export default {
  data() {
    return {
      buttonwords: '下一步',
      active: 0,
      registerForm: {
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
    sendEmail() {
      //邮箱不可为空
      if (typeof this.registerForm.email == "undefined" || this.registerForm.email == null || this.registerForm.email === "") {
        this.$notify({
          title: '警告',
          message: '邮箱不能为空',
          type: 'warning'
        });
      } else {
        //TODO: 发送验证码请求

      }
    },
    register() {
      //用户名、密码、确认密码不可为空
      if(this.active === 0) {
        if (typeof this.registerForm.username == "undefined" || this.registerForm.username == null || this.registerForm.username === "") {
            this.$notify({
              title: '警告',
              message: '用户名不能为空',
              type: 'warning'
            });
        }else if (typeof this.registerForm.password == "undefined" || this.registerForm.password == null || this.registerForm.password === "") {
            this.$notify({
              title: '警告',
              message: '密码不能为空',
              type: 'warning'
            });
        }else if (typeof this.registerForm.password2 == "undefined" || this.registerForm.password2 == null || this.registerForm.password2 === "") {
            this.$notify({
              title: '警告',
              message: '确认密码不能为空',
              type: 'warning'
            });
        }else if(this.registerForm.password !== this.registerForm.password2){
            this.$notify({
              title: '警告',
              message: '两次密码输入不一致',
              type: 'warning'
            });
        } else{
          this.active = 1
          this.buttonwords = '注册'
        }
        return
      }
      //真实姓名、邮箱、验证码不可为空
      if(this.active === 1) {
        if (typeof this.registerForm.real_name == "undefined" || this.registerForm.real_name == null || this.registerForm.real_name === "") {
          this.$notify({
            title: '警告',
            message: '真实姓名不能为空',
            type: 'warning'
          });
        } else if (typeof this.registerForm.email == "undefined" || this.registerForm.email == null || this.registerForm.email === "") {
          this.$notify({
            title: '警告',
            message: '邮箱不能为空',
            type: 'warning'
          });
        } else if (typeof this.registerForm.code == "undefined" || this.registerForm.code == null || this.registerForm.code === "") {
          this.$notify({
            title: '警告',
            message: '验证码不能为空',
            type: 'warning'
          });
        } else {
            //TODO: 发送注册请求

        }
      }
      // if (typeof this.registerForm.username == "undefined" || this.registerForm.username == null || this.registerForm.username === "") {
      //   //TODO: 弹出提示框
      //   this.$notify({
      //     title: '警告',
      //     message: '用户名不能为空',
      //     type: 'warning'
      //   });
      //   return;
      // }
      // if (typeof this.registerForm.password == "undefined" || this.registerForm.password == null || this.registerForm.password === "") {
      //   //TODO: 弹出提示框
      //   this.$notify({
      //     title: '警告',
      //     message: '密码不能为空',
      //     type: 'warning'
      //   });
      //   return;
      // }
      // let form_data = new FormData()
      // form_data.append('username', this.registerForm.username)
      // form_data.append('password', this.registerForm.password)
      // //TODO: 发送登录请求
      // register(form_data).then(res => {
      //   if (res.data.result === 0) {
      //     localStorage.setItem("token", res.data.token)
      //     this.$router.push("/")
      //   } else {
      //     this.$notify({
      //       title: '警告',
      //       message: '用户名或密码错误',
      //       type: 'warning'
      //     });
      //   }
      // })
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

.register {
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

#register {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>