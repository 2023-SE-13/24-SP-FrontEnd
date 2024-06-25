<template>
  <div>
    <h2>招聘职位</h2>
    <ul>
      <li>职位1: 软件工程师</li>
      <li>职位2: 产品经理</li>
      <li>职位3: 设计师</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'companyJobs'
};
</script>

<style scoped>
h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
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
