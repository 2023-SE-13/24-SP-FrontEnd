<<<<<<< HEAD
<template>
  <div class="box">
    <div class="main" @click="toDetail()">
      <div class="avatar" style="width:10%">
        <el-avatar :size="60" :src="photo"></el-avatar>
      </div>
      <div class="content">
        <div class="name">
          <span>{{this.username}}</span>
          <span id="date">{{this.date}}</span>
        </div>
        <div class="text">
          <span>{{this.text}}</span>
        </div>
        <div class="images" v-show="images.length !== 0">
          <el-image
              v-for="(item, index) in images"
              :key="index"
              :src="item"
              :preview-src-list="images"
              style="width: 105px; height: 105px;border-radius: 10px;margin: 1px"
              fit="none">
          </el-image>
        </div>
        <el-divider></el-divider>
      </div>
    </div>
  </div>
</template>

<script>
import {getTweetDetail} from "@/api/api";
export default {
  data() {
    return {
      username: 'username',
      tweet_id: "1",
      date: '2021-01-01',
      text: 'text',
      images: [],
      photo: require('../assets/photo.png'),
      isSelf: true
    }
  },
  async created() {
    this.username = this.$route.params.name
    this.token = localStorage.getItem('token')
    this.tweet_id = this.id
    let params = {
      tweet_id: this.tweet_id
    }
    await getTweetDetail(params, this.token).then(res => {
      this.date = res.data.data.created_at
      this.text = res.data.data.text_content
      this.images = res.data.data.photos
      for(let i = 0; i < this.images.length; i++) {
        this.images[i] = "http://10.251.253.188/tweetphoto/" + this.images[i];
      }
      console.log(this.images)
    })
  },
  props: {
    id: {
      type: String,
      default: "1"
    },
  },
  methods: {
    toDetail(){
      const resolved = this.$router.resolve({name: 'Tweet', params: {id: this.tweet_id}});
      window.open(resolved.href,'_blank');
    }
  }
}
</script>

<style scoped>
  .box {
    width: 100%;
    min-height: 100px;
    background-color: white;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    font-family: PingFang SC,HarmonyOS_Regular,Helvetica Neue,Microsoft YaHei,sans-serif!important;
  }
  .main {
    width: 90%;
    min-height: 100px;
    background-color: white;
    display: flex;
    flex-direction: row;
    cursor: pointer;
  }
.content{
  width: 90%;
  min-height: 100px;
  background-color: white;
  display: flex;
  flex-direction: column;
}
.name{
  width: 100%;
  height: 60px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 25px;
}
  #date {
    font-size: 13px;
    margin-top: 5px;
    color: #9499a0;
  }
  .text{
    width: 100%;
    min-height: 40px;
    background: white;
    display: flex;
    text-align: left;
    flex-wrap: wrap;
    font-size: 20px;
    line-height: 30px;
  }
  .images{
    width: 100%;
    min-height: 100px;
    background: white;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
=======
<template>
  <div class="box">
    <div class="main" @click="toDetail()">
      <div class="avatar" style="width:10%">
        <el-avatar :size="60" :src="photo"></el-avatar>
      </div>
      <div class="content">
        <div class="name">
          <span>{{this.username}}</span>
          <span id="date">{{this.date}}</span>
        </div>
        <div class="text">
          <span>{{this.text}}</span>
        </div>
        <div class="images" v-show="images.length !== 0">
          <el-image
              v-for="(item, index) in images"
              :key="index"
              :src="item"
              :preview-src-list="images"
              style="width: 105px; height: 105px;border-radius: 10px;margin: 1px"
              fit="contain">
          </el-image>
        </div>
        <el-divider></el-divider>
      </div>
    </div>
  </div>
</template>

<script>
import {getTweetDetail} from "@/api/api";
export default {
  data() {
    return {
      username: 'username',
      tweet_id: "1",
      date: '2021-01-01',
      text: 'text',
      images: [],
      photo: require('../assets/photo.png'),
      isSelf: true
    }
  },
  async created() {
    this.username = this.$route.params.name
    this.token = localStorage.getItem('token')
    this.tweet_id = this.id
    let params = {
      tweet_id: this.tweet_id
    }
    await getTweetDetail(params, this.token).then(res => {
      this.date = res.data.data.created_at
      this.text = res.data.data.text_content
      this.images = res.data.data.photos
      for(let i = 0; i < this.images.length; i++) {
        this.images[i] = "http://10.251.253.188/tweetphoto/" + this.images[i];
      }
      console.log(this.images)
    })
  },
  props: {
    id: {
      type: String,
      default: "1"
    },
  },
  methods: {
    toDetail(){
      const resolved = this.$router.resolve({name: 'Tweet', params: {id: this.tweet_id}});
      window.open(resolved.href,'_blank');
    }
  }
}
</script>

<style scoped>
  .box {
    width: 100%;
    min-height: 100px;
    background-color: white;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    font-family: PingFang SC,HarmonyOS_Regular,Helvetica Neue,Microsoft YaHei,sans-serif!important;
  }
  .main {
    width: 90%;
    min-height: 100px;
    background-color: white;
    display: flex;
    flex-direction: row;
    cursor: pointer;
  }
.content{
  width: 90%;
  min-height: 100px;
  background-color: white;
  display: flex;
  flex-direction: column;
}
.name{
  width: 100%;
  height: 60px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 25px;
}
  #date {
    font-size: 13px;
    margin-top: 5px;
    color: #9499a0;
  }
  .text{
    width: 100%;
    min-height: 40px;
    background: white;
    display: flex;
    text-align: left;
    flex-wrap: wrap;
    font-size: 20px;
    line-height: 30px;
  }
  .images{
    width: 100%;
    min-height: 100px;
    background: white;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
>>>>>>> dev2
