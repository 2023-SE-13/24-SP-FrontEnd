<template>
  <div class="admin-company-view">
    <header class="company-header">
      <img src="@/assets/logo.png" alt="公司logo" class="company-logo">
      <div class="company-name">{{ company.name }}</div>
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
          <div class="form-group">
            <label for="employeeRole">员工角色</label>
            <input type="text" id="employeeRole" v-model="newEmployee.role" />
          </div>
          <button @click="addEmployee">添加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addEmployee, getCompany, getCompanyEmployee} from "@/api/api";

export default {
  data() {
    return {
      company: {
        name: "示例公司",
        address: "示例地址",
        description: "示例公司描述",
        employees: []
      },
      newEmployee: {
        name: "",
        role: ""
      },
      token: '', // 替换为实际的token
      companyId: '9f9cdc179e2e414094389fab1a0d0063' // 替换为实际的公司ID
    };
  },
  created() {
    getCompany(this.companyId).then(res => {
      console.log(res.data)
      if (res.data.status === "success") {
        this.company.name = res.data.data.company_name
      }
    })
    getCompanyEmployee(this.companyId).then(res => {
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
    async addEmployee() {
      if (this.newEmployee.name && this.newEmployee.role) {
        try {
          this.token = localStorage.getItem("token");
          const response = await addEmployee(this.token, this.newEmployee.name, this.companyId);
          console.log('员工添加成功:', response.data);
          this.newEmployee.name = "";
          this.newEmployee.role = "";
        } catch (error) {
          if (error.response.status === 404 && error.response.data.message === "User not found") {
            console.log('用户不存在');
          } else {
            console.error('添加员工失败:', error);
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
  padding: 20px;
}

.company-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #007bff;
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #0056b3;
}

.employee-list {
  list-style: none;
  padding: 0;
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
