<template>
  <div>
    <h2>招聘职位</h2>
    <ul>
      <li v-for="job in jobs" :key="job.jobsName">
        <h3>{{ job.jobsName }}</h3>
        <p>{{ job.jobsInfo }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'companyJobs',
  data() {
    return {
      jobs: [
        { jobsName: "技术人员", jobsInfo: "岗位要求：熟悉JavaScript，具备Vue.js开发经验" },
        { jobsName: "产品经理", jobsInfo: "岗位要求：有项目管理经验，良好的沟通能力" },
      ]
    };
  }
};
</script>

<style scoped>
h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  margin-top: 1%;
}

p, ul {
  background-color: #f9f9f9;
  border-radius: 5px;
  text-align: left;
  padding: 10px 25px 10px 25px;
}

li {
  margin-bottom: 5px;
}
</style>
