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
      
      <button type="submit">提交注册</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

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
        const response = await axios.post('https://your-api-endpoint.com/register-enterprise', this.form);
        console.log('注册成功:', response.data);
        // 你可以在这里添加更多逻辑，例如跳转到其他页面或显示成功消息
      } catch (error) {
        console.error('注册失败:', error);
        // 你可以在这里添加更多逻辑，例如显示错误消息
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px; /* 圆角边框 */
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>
