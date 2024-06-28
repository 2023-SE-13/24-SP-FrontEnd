<template>
  <div class="jobs-unit" @click="showJobView">
    <div class="upper-box">
      <h3>{{ jobData.position_name }}</h3>
      <span style="color: red; font-weight: bold;">{{ formatSalary(jobData.salary_min) }} - {{ formatSalary(jobData.salary_max) }}</span>
    </div>
    <div class="lower-box">
<!--      <span>学历要求: {{ jobData.education_requirement }}</span>-->
      <span>学历要求: 本科</span>

    </div>
  </div>
</template>

<script>

import { getPosition } from "@/api/api";
export default {
  data() {
    return {}
  },
  props: {
    jobData: {

    }
  },
  created() {
  },
  methods: {
    formatSalary(salary) {
      return Math.floor(salary)/1000 + 'k'; // 去掉小数点取整 + k
    },
    showJobView() {
      getPosition('ea3851b4-ecb2-42e8-8aa7-8ba294d90d8a').then(res => {

      })
    }
  },
}
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1.2em;
  margin-bottom: 5%;
  margin-top: 3.5%;
  margin-left: 2.5%;
}

.jobs-unit {
  width: 90%;
  height: 100%;
  background-color: rgb(246, 246, 247);
  border-radius: 10px;
  transition: 0.5s;
  float: left;
  box-sizing: border-box;
  margin-left: 15px;
  margin-top: 20px;
  padding-left: 5%;
  padding-top: 3%;
}

.jobs-unit:hover {
  box-shadow: 10px 10px 20px 0 rgba(98, 92, 92, 0.3);
}

.upper-box {
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.upper-box span {
  display: inline-block;
  float: left;
  margin-right: 10%;
  margin-top: 3.7%;
}

.lower-box {
  height: auto;
  background-color: rgb(246, 246, 247);
  border-radius: 0 0 10px 10px;
  padding-right: 4%;
  padding-bottom: 5%;
}

.lower-box span {
  display: inline-block;
  float: left;
  margin-left: 4%;
  padding-bottom: 5%;
}
</style>