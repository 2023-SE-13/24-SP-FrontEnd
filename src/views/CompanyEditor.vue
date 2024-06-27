<template>
  <div class="admin-company-view">
    <header class="company-header">
      <img src="@/assets/logo.png" alt="公司logo" class="company-logo">
      <div class="company-name">{{ company.name }}</div>
      <el-button type="danger" @click="gotoCompanyView" style="padding: 13px 20px; margin-left: 80%; font-size: 17px;font-weight: bolder; background-color: #05d7d7; border:solid 2px #02f1f1;border-radius: 6px;" class="custom-btn">企业展示页</el-button>
    </header>
    <div class="main-content">
      <div class="left-panel">
        <h2>企业信息</h2>
        <div class="form-group">
          <label for="companyName">公司名称</label>
          <input type="text" id="companyName" v-model="company.name" />
        </div>
        <div class="form-group">
          <label for="companyAddress">公司地址</label>
          <input type="text" id="companyAddress" v-model="company.address" />
        </div>
        <div class="form-group">
          <label for="companyDescription">公司描述</label>
          <textarea id="companyDescription" v-model="company.description"></textarea>
        </div>
      </div>
      <div class="right-panel">
        <h2>员工列表</h2>
        <ul class="employee-list">
          <li v-for="(employee, index) in company.employees" :key="index" class="employee-item">
            {{ employee.user.username }} - {{ employee.role }}
          </li>
        </ul>
        <div class="add-employee">
          <h3>添加员工</h3>
          <div class="form-group">
            <label for="employeeName">员工姓名</label>
            <input type="text" id="employeeName" v-model="newEmployee.name" />
          </div>
          <!-- <div class="form-group">
            <label for="employeeRole">员工角色</label>
            <input type="text" id="employeeRole" v-model="newEmployee.role" />
          </div> -->
          <button @click="addEmployee">添加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addEmployee, getCompany, getCompanyEmployee} from "@/api/api";
import { Message } from 'element-ui';

export default {
  data() {
    return {
      company: {
        name: "",
        address: "示例地址",
        description: "",
        employees: []
      },
      newEmployee: {
        name: "",
        // role: ""
      },
      token: localStorage.getItem('token'), 
    };
  },
  created() {
    console.log('companyID: ',localStorage.getItem('company_id'))
    getCompany(localStorage.getItem('company_id')).then(res => {
      console.log(res.data)
      if (res.data.status === "success") {
        this.company.name = res.data.data.company_name
        this.company.description = res.data.data.company_description
      }
    })
    getCompanyEmployee(localStorage.getItem('company_id')).then(res => {
      if (res.data.status === "success" && Array.isArray(res.data.data)) {
        this.company.employees = res.data.data;
        console.log("get company employees", this.company.employees)
      } else {
        console.log("get company employees error !!!")
      }
    }).catch(error => {
      console.error('获取公司员工信息失败:', error);
    })
  },
  methods: {
    gotoCompanyView() {
      this.$router.push("/company");
    },
    async addEmployee() {
      if (this.newEmployee.name && this.newEmployee.role) {
        try {
          this.token = localStorage.getItem("token");
          const response = await addEmployee(this.token, this.newEmployee.name, localStorage.getItem('company_id'));
          console.log('员工添加成功:', response.data);
          Message.success('添加员工成功');
          this.newEmployee.name = "";
          this.newEmployee.role = "";
        } catch (error) {
          if (error.response.status === 404 && error.response.data.message === "User not found") {
            console.log('用户不存在');
            Message.error('用户不存在');
          } else {
            console.error('添加员工失败:', error);
            Message.error('添加员工失败');
          }
        }
      } else {
        console.log("请填写完整的员工信息");
      }
    }
  }
};

</script>

<style scoped>
.admin-company-view {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f8ff; /* 浅蓝色 */
  padding: 20px 20px 5.7%;
}

.company-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #00cfcf;
  color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.company-logo {
  width: 50px;
  height: auto;
  margin-right: 15px;
}

.company-name {
  font-size: 1.8em;
  font-weight: bold;
}

.main-content {
  display: flex;
  gap: 20px;
}

.left-panel, .right-panel {
  flex: 1;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.left-panel {
  margin-right: 20px;
}

h2, h3 {
  color: #333;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 14px;
}

textarea {
  resize: vertical; /* 允许垂直调整大小 */
}

button {
  padding: 10px 15px;
  background-color: #00cfcf;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #02F1F1FF;
}

.custom-btn {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease; /* 添加过渡效果 */
}
.custom-btn:hover {
  background-color: #02f1f1; /* 更改悬停背景颜色 */
  color: black; /* 更改悬停字体颜色 */
  border-color: black; /* 更改悬停边框颜色 */
}

.employee-list {
  list-style: none;
  max-height: 200px; /* 限制高度，允许滚动 */
  overflow-y: auto;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.employee-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.add-employee {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
