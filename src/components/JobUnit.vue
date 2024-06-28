<template>
  <div class="jobs-unit" @click="showJobView">
    <div class="upper-box">
      <h3>{{ jobData.jobName }}</h3>
    </div>
    <div class="lower-box">
      <span>{{ jobData.jobInfo }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props:{
    jobData:{

    }
  },
  created(){
    console.log(this.jobData)
  },
  methods: {
    showJobView() {
      // localStorage.setItem('company_id', this.companyData.company_id)

    },
  }
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
  height: 40%;
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

.jobs-unit:hover{
  box-shadow: 10px 10px 20px 0 rgba(98, 92, 92, 0.3);
}

.upper-box {
  height: 10%;
}

.upper-box span{
  display: inline-block;
  float: left;
}

.lower-box{
  height: 45px;
  background-color: rgb(246, 246, 247);
  border-radius: 0 0 10px 10px;
  padding-right: 4%;
  padding-bottom: 5%;
}
</style>