<template>
  <div class="tweets-container">
    <div class="tweets-list">
      <h2>员工动态</h2>

      <div id="share">
        <div id="tweetBlock">
          <ul id="tweetList">
            <li v-for="(tweet_id,index) in tweets" :key="index">
              <TweetUnit :id="tweet_id"></TweetUnit>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import {getCompanyTweetList} from "@/api/api";
import TweetUnit from "@/components/TweetUnit.vue";

export default {
  name: 'companyTweets',
  components: {
    TweetUnit
  },
  data() {
    return {
      company_id: localStorage.getItem('company_id'),
      tweets: []
    }
  },
  created() {
    getCompanyTweetList(this.company_id).then(res => {
      this.tweets = res.data.data;
      console.log(this.tweets);
    })
  }
};
</script>

<style scoped>
#share {
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 92%;
  max-height: 92%;
  overflow-y: hidden;
  overflow-x: hidden;
  margin-top: 2%;

}

.tweets-container {
  flex-direction: row;
  justify-content: space-between;
}

.tweets-list {
  background-color: #ffffff;
  padding: 15px 0 15px 45px;
  border-radius: 12px;
  margin-top: 18px;
  width: 92.5%;
  min-height: 400px;
  height: auto;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  margin-top: 1%;
}

#tweetBlock {
  width: 100%;
}
#tweetList {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

#tweetList li{
  width: 100%;
}
</style>
