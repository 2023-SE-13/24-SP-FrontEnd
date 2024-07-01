<template>
  <div class="tweets-container">
    <div class="tweets-list">
      <h2>员工动态</h2>

    </div>
  </div>
</template>

<script>

import {getCompanyTweetList} from "@/api/api";

export default {
  name: 'companyTweets',
  data() {
    return {
      company_id: "45c922fd027145108b78ab788a21d042",
      companyTweetsList: []
    }
  },
  created() {
    getCompanyTweetList(this.company_id).then(res => {
      this.companyTweetsList = res.data.data
      console.log(res.data.data)
    })
  }
};
</script>

<style scoped>
.tweets-container {
  flex-direction: row;
  justify-content: space-between;
}

.tweets-list {
  background-color: #ffffff;
  padding: 15px 40px 15px 45px;
  border-radius: 12px;
  margin-top: 18px;
  width: 93.5%;
  min-height: 400px;
  height: auto;
}

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
