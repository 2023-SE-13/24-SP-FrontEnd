<template>
  <div class="jobs-container">
    <div class="jobs-list">
      <h2>招聘岗位</h2>
      <div>
        <JobUnit v-for="(jobs,index) in paginatedJobs" :key="index" :job-data="jobs"></JobUnit>
      </div>
      <el-pagination
          :page-size="pageSize"
          :pager-count="7"
          layout="prev, pager, next"
          :total="JobsList.length"
          style="position: absolute; top: 93%">
      </el-pagination>
    </div>

    <div class="jobs-message">
      <h2>岗位名称</h2>
      <el-button type="danger" class="custom-btn" icon="el-icon-star-off">收藏</el-button>
      <el-button type="danger" class="custom-btn" icon="el-icon-s-promotion">立即沟通</el-button>
      <p style="margin-top: 2%; color: red">薪酬: {{ JobsList.jobSalary }}</p>
      <p>岗位描述: {{ JobsList.jobInfo }}</p>
      <p>岗位描述: {{ JobsList.jobInfo }}</p>
      <p>岗位描述: {{ JobsList.jobInfo }}</p>
      <p>岗位描述: {{ JobsList.jobInfo }}</p>
      <p>岗位描述: {{ JobsList.jobInfo }}</p>
      <p>岗位描述: {{ JobsList.jobInfo }}</p>
      <p>岗位描述: {{ JobsList.jobInfo }}</p>
      <p>岗位描述: {{ JobsList.jobInfo }}</p>
      <p>岗位描述: {{ JobsList.jobInfo }}</p>
      <p>岗位描述: {{ JobsList.jobInfo }}</p>

      <el-button type="danger" style="float: left;margin-top: 2%; margin-left: 2.5%" class="custom-btn" icon="el-icon-search">查看更多信息</el-button>
    </div>
  </div>
</template>

<script>
import JobUnit from "@/components/JobUnit.vue";
import {
  getPositionList,
  getPosition
} from '@/api/api';

export default {
  name: 'companyJobs',
  components: { JobUnit },
  data() {
    return {
      currentPage: 1,
      pageSize: 4,
      JobsList: [
        { jobName: "1", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "2", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "3", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "4", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "5", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "6", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "7", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "8", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "9", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "1", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "2", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "3", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "4", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "5", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "6", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "7", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "8", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "9", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "1", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "2", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "3", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "4", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "5", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "6", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "7", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "8", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "9", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "1", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "2", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "3", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "4", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "5", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "6", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "7", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "8", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "9", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "1", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "2", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "3", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "4", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "5", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "6", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "7", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "8", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "9", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "1", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "2", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "3", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "4", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "5", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "6", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "7", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
        { jobName: "8", jobInfo: "有项目管理经验，良好的沟通能力", jobSalary: "6k-13k" },
        { jobName: "9", jobInfo: "熟悉JavaScript，具备Vue.js开发经验", jobSalary: "6k-13k" },
      ],

    };
  },
  created() {
    // getPositionList(localStorage.getItem('company_id')).then(res => {
    //   console.log(res.data.data)
    //   this.JobsList = res.data.data
    // })
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    }
  },
  computed: {
    paginatedJobs() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.JobsList.slice(start, end);
    }
  },
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
  padding: 2px 15px 30px 15px;
  border-radius: 12px;
  margin-top: 18px;
  width: 27%;
  margin-left: 4%;
}

.jobs-message {
  background-color: #ffffff;
  padding: 0 25px 15px 15px;
  border-radius: 12px;
  margin-top: 18px;
  width: 62%;
  margin-left: 4%;
  margin-right: 4%;
  position: sticky;
}

.custom-btn {
  float: right;
  margin-right: 7px;
  margin-top: -45px;
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
  margin-top: 5.5%;
  margin-left: 3.5%;
}

p {
  background-color: #f9f9f9;
  border-radius: 5px;
  text-align: left;
  padding: 12px 25px 10px 25px;
  margin-left: 2.5%;
  margin-right: 1%;
  font-weight: bold;
}
</style>
