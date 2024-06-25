<template>
  <div class="admin-company-view">
    <header class="header">
      <strong>{{ company.name }}</strong>
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
            {{ employee.name }} - {{ employee.role }}
          </li>
        </ul>
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
</template>

<script>
export default {
  data() {
    return {
      company: {
        name: "示例公司",
        address: "示例地址",
        description: "示例公司描述",
        employees: [
          { name: "员工A", role: "开发人员" },
          { name: "员工B", role: "设计师" }
        ]
      },
      newEmployee: {
        name: "",
        role: ""
      }
    };
  },
  methods: {
    addEmployee() {
      if (this.newEmployee.name && this.newEmployee.role) {
        this.company.employees.push({ ...this.newEmployee });
        this.newEmployee.name = "";
        this.newEmployee.role = "";
      } else {
        alert("请填写完整的员工信息");
      }
    }
  }
};
</script>

<style scoped>
.admin-company-view {
  font-family: 'Arial', sans-serif;
  background-color: #f0f8ff; /* 浅蓝色 */
  padding: 20px;
}

.header {
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-content {
  display: flex;
  margin-top: 20px;
}

.left-panel, .right-panel {
  flex: 1;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
}

.right-panel {
  margin-right: 0;
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
}

.employee-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>
