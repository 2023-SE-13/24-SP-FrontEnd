<template>
  <div class="message-box">
    <h2>公司简介</h2>
    <p>{{ company.description }}</p>

    <h2>公司产品</h2>
    <ul>占位</ul>

    <h2>工商信息</h2>
    <ul>
<!--      <li>企业名称: {{ company.address }}</li>-->
<!--      <li>法人代表: {{ company.legalRepresentative }}</li>-->
<!--      <li>注册号: {{ company.registrationNumber }}</li>-->
<!--      <li>成立日期: {{ company.establishmentDate }}</li>-->
<!--      <li>公司地址: {{ company.address }}</li>-->
    </ul>

    <h2>在招岗位</h2>
    <div class="jobs-list">
      <div>
        <JobUnit v-for="(jobs,index) in JobsList" :key="index" :job-data="jobs"></JobUnit>
      </div>
      </div>
    </div>
</template>

<script>
import JobUnit from "@/components/JobUnit.vue";
import {getCompany, getPositionList} from "@/api/api";

export default {
  name: 'companyIntro',
  data() {
    return {
      company_id: localStorage.getItem('company_id'),
      company: {
        description: '',
      },
      JobsList: [
      ]
    };
  },
  created() {
    getCompany(this.company_id).then(res => {
      if (res.data.status === "success") {
        this.company.description = res.data.data.company_description
      }
    })
    getPositionList(this.company_id).then(res => {
      this.JobsList = res.data
    })
  },
  components: {
    JobUnit
  }
};
</script>

<style scoped>
.message-box {
  background-color: #ffffff;
  padding: 15px 40px 15px 45px;
  border-radius: 12px;
  margin-top: 33px;
  width: 86%;
  margin-left: 4%;
}

.jobs-list {
  background-color: #ffffff;
  padding: 2px 15px 65px 15px;
  border-radius: 12px;
  margin-top: 18px;
  width: 35%;
  min-height: 400px;
  height: auto;
}

h2 {
  font-size: 1.6em;
  margin-bottom: 10px;
  margin-top: 1%;
}

p, ul {
  background-color: #f6f6f7;
  border-radius: 5px;
  text-align: left;
  padding: 10px 0 10px 25px;
  margin: 20px 0 25px 10px;
}

li {
  margin-bottom: 5px;
}

</style>
