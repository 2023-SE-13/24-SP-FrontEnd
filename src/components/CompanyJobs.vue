<template>
  <div class="jobs-container">
    <div class="jobs-list">
      <h2>招聘岗位</h2>
      <div>
        <JobUnit v-for="(jobs,index) in paginatedJobs" :key="index" :job-data="jobs" @click="showJobView"></JobUnit>
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
      <el-button type="danger" class="custom-btn" icon="el-icon-star-off">收藏</el-button>
      <el-button type="danger" class="custom-btn" icon="el-icon-s-promotion">立即沟通</el-button>
      <h2>岗位名称</h2>

      <div class="tag-box">
        <span class="tag"><i class="el-icon-location"></i>北京</span>
      </div>

      <p style="margin-top: 2%; color: red">薪酬: {{ JobData.jobSalary }}</p>
      <p>岗位描述: {{ JobData.jobInfo }}</p>

      <el-button type="danger" style="float: left;margin-top: 2.5%; margin-left: 2.5%" class="custom-btn" icon="el-icon-search">查看更多</el-button>
    </div>
  </div>
</template>

<script>
import JobUnit from "@/components/JobUnit.vue";
import {
  getPosition,
  getPositionList,
} from '@/api/api';

export default {
  name: 'companyJobs',
  components: { JobUnit },
  data() {
    return {
      currentPage: 1,
      pageSize: 4,
      JobsList: [],
      JobData: [],
      company_id: '29323fa0842d43c8bcef7d52ae46b930',
      position_id: 'ea3851b4-ecb2-42e8-8aa7-8ba294d90d8a'
    };
  },
  created() {
    getPositionList(this.company_id).then(res => {
      console.log(1)
  //     console.log(this.company_id)
  //     console.log(res.data)
  //     console.log(localStorage)
  //
  //     if (res.data.status === "200") {
  //       //this.JobsList = res.data.data
  //       //this.position_id =
  //       //localStorage.setItem('position_id', this.position_id)
  //     }
    })
  },
  methods: {
    // showJobView() {
    //   getPosition(this.position_id).then(res => {
    //     this.jobData = res.data.data
    //     console.log(this.CompanyList)
    //   })
    //   console.log(1)
    // }
  },
  computed: {
    paginatedJobs() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.JobsList.slice(start, end);
    }
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
  padding: 2px 15px 65px 15px;
  border-radius: 12px;
  margin-top: 18px;
  width: 27%;
  margin-left: 4%;
  min-height: 400px;
  height: auto;
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
  margin-top: 40px;
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

.tag-box {
  margin-left: 20px;
  margin-top: 5px;
}

.tag {
  display: inline-block;
  padding: 6px 12px;
  background-color: #f0f0f0;
  color: #333;
  font-size: 14px;
  border-radius: 4px;
  margin-top: 2px;
  margin-left: 10px;
  margin-bottom: 8px;
}
</style>
