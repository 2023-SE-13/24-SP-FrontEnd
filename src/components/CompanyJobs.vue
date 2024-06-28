<template>
  <div class="jobs-container">
    <div class="jobs-list">
      <h2>招聘岗位</h2>
      <div>
        <JobUnit v-for="(jobs,index) in JobsList" :key="index" :job-data="jobs"></JobUnit>
      </div>
    </div>

    <div class="jobs-message">
      <h2>岗位详情</h2>
      <!-- 这里添加岗位详情的具体内容 -->
      <el-button type="danger"  style="" class="custom-btn">收藏岗位</el-button>
      <el-button type="danger"  style="" class="custom-btn">立即沟通</el-button>
    </div>
  </div>
</template>

<script>
import JobUnit from "@/components/JobUnit.vue";
export default {
  name: 'companyJobs',
  components: { JobUnit },
  data() {
    return {
      JobsList: [
        { jobName: "技术人员", jobInfo: "岗位要求：熟悉JavaScript，具备Vue.js开发经验" },
        { jobName: "产品经理", jobInfo: "岗位要求：有项目管理经验，良好的沟通能力" },
      ],
    };
  }
};
</script>

<style scoped>
.jobs-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.jobs-list {
  background-color: #ffffff;
  padding: 2px 15px 15px 15px;
  border-radius: 12px;
  margin-top: 18px;
  width: 25%;
  margin-left: 4%;
}

.jobs-message {
  background-color: #ffffff;
  padding: 2px 15px 15px 15px;
  border-radius: 12px;
  margin-top: 18px;
  width: 62%;
  margin-left: 4%;
  margin-right: 4%;
}

.custom-btn {
  float: right;
  margin-left: 7px;
  margin-top: -40px;
  padding: 13px 20px;
  font-size: 17px;
  font-weight: bolder;
  background-color: #00cfcf;
  border:solid 2px #00cfcf;
  border-radius: 8px;
}

.custom-btn:hover {
  padding: 13px 20px;
  font-size: 17px;
  font-weight: bolder;
  background-color: #02F1F1FF;
  border:solid 2px #02F1F1FF;
  border-radius: 8px;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  margin-top: 2.5%;
  margin-left: 1%;
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
