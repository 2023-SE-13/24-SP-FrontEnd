<template>
  <div>
    <h2>公司简介</h2>
    <p>{{ company.description }}</p>

    <h2>公司产品</h2>
    占位

    <h2>工商信息</h2>
    <ul>
      <li>企业名称: </li>
      <li>法人代表: {{ company.businessInfo.legalRepresentative }}</li>
      <li>注册号: {{ company.businessInfo.registrationNumber }}</li>
      <li>成立日期: {{ company.businessInfo.establishmentDate }}</li>
      <li>公司地址: {{ company.businessInfo.address }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'companyIntro',
  data() {
    return {
      company: {
        description: "某某企业是一家致力于提供优质产品和服务的领先企业。",
        businessInfo: {
          registrationNumber: "123456789",
          legalRepresentative: "张三",
          registeredCapital: "500万元",
          establishmentDate: "2020-01-01",
          address: "北京市海淀区某某街道123号"
        }
      }
    };
  }
};
</script>

<style scoped>
h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  margin-top: 2%;
}

p, ul {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  text-align: left;
}

li {
  margin-bottom: 5px;
}
</style>
