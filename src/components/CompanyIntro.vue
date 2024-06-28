<template>
  <div class="message-box">
    <h2>公司简介</h2>
    <p>{{ company.description }}</p>

<!--    <h2>公司产品</h2>-->
<!--    <ul>占位</ul>-->

<!--    <h2>工商信息</h2>-->
<!--    <ul>-->
<!--      <li>企业名称: {{ company.businessInfo.address }}</li>-->
<!--      <li>法人代表: {{ company.businessInfo.legalRepresentative }}</li>-->
<!--      <li>注册号: {{ company.businessInfo.registrationNumber }}</li>-->
<!--      <li>成立日期: {{ company.businessInfo.establishmentDate }}</li>-->
<!--      <li>公司地址: {{ company.businessInfo.address }}</li>-->
<!--    </ul>-->
  </div>
</template>

<script>
import { getCompany } from "@/api/api";

export default {
  name: 'companyIntro',
  data() {
    return {
      company: {
        description: '',
      },
      company_id: localStorage.getItem('company_id'),
    };
  },
  created() {
    getCompany(this.company_id).then(res => {
      if (res.data.status === "success") {
        this.company.description = res.data.data.company_description
      }
    })
  },
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
