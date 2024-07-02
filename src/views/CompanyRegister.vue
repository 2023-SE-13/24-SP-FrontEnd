<!-- <template>
  <div class="register-company">
    <h1>招聘企业注册</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="companyName">公司名称</label>
        <input type="text" id="companyName" v-model="form.companyName" required />
      </div>
      
      <div class="form-group">
        <label for="contactName">联系人姓名</label>
        <input type="text" id="contactName" v-model="form.contactName" required />
      </div>
      
      <div class="form-group">
        <label for="contactPhone">联系电话</label>
        <input type="tel" id="contactPhone" v-model="form.contactPhone" required />
      </div>
      
      <div class="form-group">
        <label for="companyAddress">公司地址</label>
        <input type="text" id="companyAddress" v-model="form.companyAddress" required />
      </div>
      
      <div class="form-group">
        <label for="companyDescription">公司描述</label>
        <textarea id="companyDescription" v-model="form.companyDescription" required></textarea>
      </div>
      
      <button type="submit">提交注册</button>
    </form>
  </div>
</template>

<script>
import { registCompany } from "@/api/api";
import { Message } from 'element-ui';

export default {
  data() {
    return {
      form: {
        companyName: '',
        contactName: '',
        contactPhone: '',
        companyAddress: '',
        companyDescription: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const token = localStorage.getItem("token"); // 替换为实际的token
        const response = await registCompany(token, this.form.companyName, this.form.companyDescription);
        console.log('注册成功:', response.data);
        Message.success('注册成功');
        // 你可以在这里添加更多逻辑，例如跳转到其他页面或显示成功消息
      } catch (error) {
        if (error.response && error.response.status === 409) {
          console.error('企业名称已注册');
          Message.error('企业名称已注册');
        } else if (error.response.status === 400 && error.response.data.message === "You are already a member of a company") {
          console.log('用户不可重复注册公司');
          Message.error('企业成员不可重复注册');
        } else {
          console.error('注册失败:', error);
          Message.error('注册失败');
        }
      }
    }
  }
};
</script>

<style scoped>
.register-company {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f0f8ff; /* 淡蓝色偏白 */
  border: 1px solid #ccc;
  border-radius: 10px; /* 圆角边框 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

h1 {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px; /* 圆角边框 */
  box-sizing: border-box;
}

textarea {
  resize: vertical; /* 允许垂直调整大小 */
}

button {
  width: 100%;
  padding: 12px;
  background-color: #00bebd;
  color: white;
  border: none;
  border-radius: 5px; /* 圆角边框 */
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #004747;
}
</style> -->


<template>
  <div class="register-company">
    <h1>招聘企业注册</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="companyName">公司名称</label>
        <input type="text" id="companyName" v-model="form.companyName" required />
      </div>

      <div class="form-group">
        <label for="contactName">联系人姓名</label>
        <input type="text" id="contactName" v-model="form.contactName" required />
      </div>

      <div class="form-group">
        <label for="contactPhone">联系电话</label>
        <input type="tel" id="contactPhone" v-model="form.contactPhone" required />
      </div>

      <div class="form-group">
        <label for="companyAddress">公司地址</label>
        <input type="text" id="companyAddress" v-model="form.companyAddress" required />
      </div>

      <div class="form-group">
        <label for="companyDescription">公司描述</label>
        <textarea id="companyDescription" v-model="form.companyDescription" required></textarea>
      </div>
      <!-- <div id="avatar">
        <label for="companyLogo">上传头像</label>
        <el-upload ref="avatar_upload" :on-change="handleChange" :limit="1"><el-avatar :size="70" @error="errorHandler"
            id="img">头像</el-avatar></el-upload>
      </div> -->
      <button type="submit">提交注册</button>
    </form>
  </div>
</template>

<script>
import { registCompany, getUser, uploadLogo } from "@/api/api";


export default {
  data() {
    return {
      photo_url: '',
      photo_file: null,
      form: {
        companyName: '',
        contactName: '',
        contactPhone: '',
        companyAddress: '',
        companyDescription: ''
      },
    };
  },
  watch: {
    photo_file: {
      handler: function () {
        let data = new FormData();
        console.log(this.photo_file)
        data.append("logo", this.photo_file);
        uploadLogo(data, localStorage.getItem('token')).then(res => {
          console.log("Jinlaileme")
          if (res.data.status === "success") {
            this.$notify({
              title: "成功",
              message: "上传成功",
              type: "success"
            });
            setTimeout(() => {
              this.$router.go(0);
            }, 1000);
          }
        },
          error => {
            console.log("上传失败", error);
          }
        );
      }
    }
  },
  created() {
    // this.token = localStorage.getItem("token");
    // this.user.name = this.$route.params.name;
    // let string = "http://10.251.253.188/avatar/"+this.user.name+"_avatar.png"
    // this.photo_url = string;
  },
  methods: {
    handleChange(file) {
      //必须是图片格式
      const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png' || file.raw.type === 'image/jpg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('只能上传图片格式文件!');
        return;
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
        return;
      }
      this.photo_file = file.raw;
    },
    async submitForm() {
      try {
        const token = localStorage.getItem("token"); // 替换为实际的token
        const response = await registCompany(token, this.form.companyName, this.form.companyDescription);
        console.log('注册成功:', response.data);
        // Message.success('注册成功');
        this.$notify({
          title: "成功",
          message: '创建企业成功,即将跳转到首页',
          type: 'success'
        })
        getUser(localStorage.getItem('username')).then(res => {
          if (res.data.data.company_id && res.data.data.role === "Admin") {
            localStorage.setItem('company_id', res.data.data.company_id);
          }
          // this.$router.push("/company-editor");
          // this.$notify({
          //   title: '提示',
          //   message: '管理员身份转换成功,即将跳转到首页',
          //   type: 'success'
          // });
          setTimeout(() => {
            // location.reload()
            this.$router.push('/main').then(location.reload())
          }, 3000)
        })
      } catch (error) {
        if (error.response && error.response.status === 409) {
          console.error('企业名称已注册');
          // Message.error('企业名称已注册');
          this.$notify({
            title: "失败",
            message: '企业名称已注册！',
            type: 'error'
          });
        } else if (error.response.status === 400 && error.response.data.message === "You are already a member of a company") {
          console.log('用户不可重复注册公司');
          // Message.error('企业成员不可重复注册');
          this.$notify({
            title: "失败",
            message: '企业成员不可重复注册！',
            type: 'error'
          });
        } else {
          console.error('注册失败:', error);
          // Message.error('注册失败');
          this.$notify({
            title: "失败",
            message: '注册失败，请联系管理员！',
            type: 'error'
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.register-company {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f7fafc;
  /* 更浅的背景色 */
  border: 1px solid #e2e8f0;
  /* 更浅的边框色 */
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  /* 添加更多阴影 */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  /* 统一字体 */
}

h1 {
  text-align: center;
  color: #2d3748;
  /* 更深的标题颜色 */
  font-size: 2em;
  /* 更大的字体 */
  margin-bottom: 10px;
  /* 添加下边距 */
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #4a5568;
  /* 更深的标签颜色 */
  font-weight: 600;
  /* 加粗字体 */
}

input,
textarea {
  width: 100%;
  padding: 12px;
  /* 更大的内边距 */
  border: 1px solid #cbd5e0;
  /* 更浅的边框颜色 */
  border-radius: 8px;
  /* 更大的圆角边框 */
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  /* 统一字体 */
  font-size: 16px;
  /* 更大的字体 */
  color: #2d3748;
  /* 更深的字体颜色 */
  background-color: #edf2f7;
  /* 更浅的背景色 */
}

textarea {
  resize: vertical;
}

button {
  width: 100%;
  padding: 14px;
  /* 更大的内边距 */
  background-color: #00cfcf;
  /* 蓝色按钮 */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  /* 更大的字体 */
  font-weight: 600;
  /* 加粗字体 */
  transition: background-color 0.3s ease;
  /* 添加过渡效果 */
}

button:hover {
  background-color: #017878;
  /* 更深的悬停颜色 */
}
</style>
