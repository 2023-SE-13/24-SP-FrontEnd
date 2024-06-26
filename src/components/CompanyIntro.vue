<template>
  <div>
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
      company_id: "9f9cdc179e2e414094389fab1a0d0063",
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
h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  margin-top: 1%;
}

p, ul {
  background-color: #f6f6f7;
  border-radius: 5px;
  text-align: left;
  padding: 10px 25px 10px 25px;
}

li {
  margin-bottom: 5px;
}
</style>
