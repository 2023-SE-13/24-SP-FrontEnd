<template>
  <div class="intro-box">
    <h2>公司简介</h2>
    <p>{{ company.description }}</p>
  </div>
</template>

<script>
import {getCompany, getPositionList} from "@/api/api";

export default {
  name: 'companyIntro',
  data() {
    return {
      company_id: localStorage.getItem('other_company_id'),
      company: {
        description: '',
      },
      JobsList: [
      ]
    };
  },
  created() {
    getCompany(this.company_id).then(res => {
      if (res.data.status === "success") {
        this.company.description = res.data.data.company_description
      }
    })
    getPositionList(this.company_id).then(res => {
      this.JobsList = res.data
    })
  },
  components: {
  }
};
</script>

<style scoped>
.intro-box {
  background-color: #ffffff;
  padding: 15px 40px 15px 45px;
  border-radius: 12px;
  width: 89.65%;
  min-height: 400px;
  height: auto;
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
