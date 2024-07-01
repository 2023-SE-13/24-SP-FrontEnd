<template>
  <div class="box">
    <div class="main">
      <div class="author-container">
        <div class="author">
          <el-avatar shape="circle" :size="60" :src="photo"></el-avatar>
          <div class="name">
            <span id="name">{{this.username}}</span>
            <span id="date">{{this.date}}</span>
          </div>
          <div class="delete" v-if="this.isSelf">
            <span style="cursor:pointer;" @click="deleteTweet()"><i class="el-icon-delete"></i>删除</span>
          </div>
        </div>
      </div>
      <div class="content-container">
        <div class="content">
          <div class="text">
            {{this.text}}
          </div>
          <div class="image">
            <el-image
              v-for="(item, index) in images"
              :key="index"
              :src="item"
              :preview-src-list="images"
              style="width: 145px; height: 145px;border-radius: 10px;margin: 1px"
              fit="contain">
            </el-image>
          </div>
        </div>
      </div>
      <div class="comment-editor">
        <div class="like">
          <div id="comment">
            评论 {{this.comment_number}}
          </div>
          <div v-if="!is_like" id="dislike" @mouseenter=changeColor1($event) @mouseleave="changeColor2($event)" @click="like()"><svg t="1719648568364" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2187" width="30" height="25"><path id="dislike_icon" d="M916.9 411c-26.3-29.3-71.2-25.2-83.1-23.6l-163.1 0.4h-0.8c-14.2 0.5-32.9-1.2-41.3-11.5-9.5-11.7-4.8-32-4.7-32.8 0.3-0.8 5.6-21.6 20.3-91l0.4-1.6 0.1-1.7c4.8-58.1 2.7-69.6-6.1-104.6-0.6-2.9-1.6-6.1-2.3-9.5l-0.3-0.9-0.3-0.9c-15-46.1-62.4-72.3-115-63.7C476 77 431 111.5 430 171.9c-1.9 8.8-3.4 18.1-4.9 28-5.7 37.4-12.8 83.9-53.1 139.9-28.6 39.9-61.6 47.1-79.1 47.8l-164.7 0.3c-21.1 0-38.2 17.1-38.2 38.2v491.4c0 21.1 17.1 38.2 38.2 38.2h601.7c3.6 0.3 7.1 0.4 10.5 0.4 40.6 0 67.1-18.3 82.2-34.7 17.6-18.5 24.3-37.9 25.1-40.1l0.5-1.4 80.5-387.1c9.8-34.8 5.8-62.2-11.8-81.8z m-775.1 28.6l131.8-0.2v464.4H141.8V439.6z m737 40.4l-0.3 0.9-80.1 385.4c-1.2 2.7-5.2 11.4-13.1 19.7-13.1 13.7-30.7 19.8-52.3 18l-1-0.1H325.4V434.5c26.7-7.3 59.9-24.6 88.5-64.6 47.4-66.2 55.9-121.7 62.1-162.2 1.7-10.4 3-19.2 4.8-26.8l0.8-3.1v-3.1c-0.3-33.9 24.3-50.1 47.4-53.9 22.5-3.8 48.7 3.5 57.2 28 0.8 3.1 1.6 6 2.2 8.7 7.2 29.4 8.9 35.7 4.8 86.2-13.9 65-19.2 86.1-19.4 87.2-1.4 5.4-11 46.2 14 77.8 17.3 21.9 45.3 32.5 83.2 31.3l166.9-0.4 2.2-0.4c9.5-1.7 31.1-1.3 38.3 6.7 4.8 5.5 4.9 17.9 0.4 34.1z" fill="#515151" p-id="2188"></path></svg>
            {{this.like_number}}
          </div>
          <div v-if="is_like" id="like" @click="like()"><svg t="1719648457756" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1801" width="30" height="25"><path d="M90.1 426v491.4c0 21.1 17.1 38.2 38.2 38.2h145.3v-568l-145.3 0.2c-21.1 0-38.2 17.1-38.2 38.2zM916.9 411c-26.3-29.3-71.2-25.2-83.1-23.6l-163.1 0.4h-0.8c-14.2 0.5-32.9-1.2-41.3-11.5-9.5-11.7-4.8-32-4.7-32.8 0.3-0.8 5.6-21.6 20.3-91l0.4-1.6 0.1-1.7c4.8-58.1 2.7-69.6-6.1-104.6-0.6-2.9-1.6-6.1-2.3-9.5l-0.3-0.9-0.3-0.9c-15-46.1-62.4-72.3-115-63.7C476 77 431 111.5 430 171.9c-1.9 8.8-3.4 18.1-4.9 28-5.7 37.4-12.8 83.9-53.1 139.9-14.9 20.8-31 32.7-45.5 39.4v576.4h403.4c3.6 0.3 7.1 0.4 10.5 0.4 40.6 0 67.1-18.3 82.2-34.7 17.6-18.5 24.3-37.9 25.1-40.1l0.5-1.4 80.5-387.1c9.8-34.7 5.8-62.1-11.8-81.7z" fill="#00C1C1" p-id="1802"></path></svg>
            {{this.like_number}}
          </div>
        </div>
        <el-input
          type="textarea"
          v-model="comment_editor"
          :autosize="{ minRows: 3}"
          resize="none"
          placeholder="写下你的评论..."
          @focus="changeEditor1()"
          @blur="changeEditor2()"
          style="width: 85%;margin-top: 10px">
        </el-input>
        <Transition>
          <el-button id="button" @click="comment()" v-show="this.isEditor" type="primary">
            发布
          </el-button>
        </Transition>
      </div>
      <div class="comment" >
          <CommentUnit v-for="comment_id in comment_idList" :key="comment_id" :comment_id="comment_id"></CommentUnit>
      </div>
    </div>
  </div>
</template>

<script>
import photo from "@/assets/photo.png";
import op from "@/assets/op.jpg";
import {likeTweet} from "@/api/api";
import {getTweetDetail} from "@/api/api";
import CommentUnit from "@/components/CommentUnit.vue";
import {commentTweet} from "@/api/api";
import {deleteTweet} from "@/api/api";
export default {
  components: {CommentUnit},
  data() {
    return {
      token: "",
      username: "",
      tweet_id: '',
      date: "",
      is_like: false,
      comment_editor: '',
      isEditor: false,
      photo: photo,
      op: op,
      comment_number: 0,
      comment_count: 0,
      comment_idList: [],
      like_number: 20,
      loading: false,
      noMore: false,
      text: "",
      images: [],
      isSelf: false
    };
  },
  computed: {
    disabled () {
      return this.loading || this.noMore
    }
  },
  async created() {
    this.token = localStorage.getItem("token");
    this.tweet_id = this.$route.params.id;
    await this.getComment();
  },
  methods: {
    getComment(){
      let formdata = {
        tweet_id: this.tweet_id
      };
      getTweetDetail(formdata, this.token).then(res => {
        if(res.data.status === "success") {
          this.username = res.data.data.user;
          this.photo = "http://10.251.253.188/avatar/"+this.username+"_avatar.png"
          this.date = res.data.data.created_at;
          this.text = res.data.data.text_content;
          this.images = res.data.data.photos;
          this.isSelf = this.username === localStorage.getItem("username");
          for(let i = 0; i < this.images.length; i++) {
            this.images[i] = "http://10.251.253.188/tweetphoto/" + this.images[i];
          }
          this.like_number = res.data.data.likes;
          this.is_like = res.data.data.is_like;
          //TODO：获取评论
          if(res.data.data.comment_array === null) {
            this.comment_number = 0;
          } else {
            this.comment_number = res.data.data.comment_array.length;
            this.comment_idList = res.data.data.comment_array;
          }
        }
      }).catch(err => {
        this.$router.push("/main");
        this.$notify({
          title: '提示',
          message: '动态不存在',
          type: 'warning'
        });
        console.log(err);
      });
    },
    load () {
      this.loading = true
      if(!this.noMore) {
        this.comment_count++
        this.loading = false
      }
    },
    async comment() {
      if(this.comment_editor === null || this.comment_editor === "") {
        this.$notify({
          title: '提示',
          message: '评论不能为空',
          type: 'warning'
        });
        return;
      }
      let formdata = {
        tweet_id: this.tweet_id,
        text_content: this.comment_editor
      };
      await commentTweet(formdata, this.token).then(async res => {
        if(res.data.status === "success") {
          this.$notify({
            title: '提示',
            message: '评论成功',
            type: 'success'
          });
          this.getComment();
          this.$forceUpdate();
          this.comment_editor = "";
          this.isEditor = false;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    async deleteTweet(){
      this.$confirm('确认删除这条动态吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let data = {
          tweet_id: this.tweet_id
        };
        await deleteTweet(data, this.token).then(res => {
          if(res.data.status === "success") {
            this.$notify({
              title: '提示',
              message: '删除成功',
              type: 'success'
            });
            this.$router.push("/user/" + this.username);
          }
        }).catch(err => {
          console.log(err);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    changeColor1(event) {
      event.target.style.color = "#00C1C1";
      document.getElementById("dislike_icon").setAttribute("fill", "#00C1C1");
    },
    changeColor2(event) {
      event.target.style.color = "#515151";
      document.getElementById("dislike_icon").setAttribute("fill", "#515151");
    },
    changeEditor1() {
      this.isEditor = true;
    },
    changeEditor2() {
      this.isEditor = false;
    },
    async like() {
      let formdata = {
        tweet_id: this.tweet_id
      };
      await likeTweet(formdata, this.token).then(res => {
        if(res.data.status === "success") {
          this.is_like = !this.is_like;
          if(this.is_like) {
            this.like_number += 1;
          } else {
            this.like_number -= 1;
          }
        }
      }).catch(err => {
        if(err.response.status === 401) {
          this.$router.push("/login");
        }else {
          console.log(err);
        }
      });
    }
  }
}
</script>

<style scoped>
.box {
  width: 100%;
  min-height: calc(100vh - 50px);
  background-color: #D3E9E8;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: PingFang SC,HarmonyOS_Regular,Helvetica Neue,Microsoft YaHei,sans-serif!important;
}
.main{
  width: 700px;
  min-height: 100%;
  max-height: none;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  border-radius: 10px;
}
.author-container{
  width: 100%;
  height: 120px;
  background: white;
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}
.author{
  width: 90%;
  height: 80%;
  background: white;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.name {
  width: 320px;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.delete{
  width: 310px;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}
#name {
  font-size: 25px;
  font-weight: bold;
  margin-left: 20px;
}
#date {
  font-size: 13px;
  margin-top: 5px;
  color: #9499a0;
  margin-left: 20px;
}
.content-container{
  width: 100%;
  min-height: 100px;
  background: white;
  display: flex;
  flex-direction: column-reverse;
  margin-top: 20px;
  align-items: center;
}
.content{
  width: 85%;
  min-height: 50px;
  max-height: none;
  background: white;
  display: flex;
  flex-direction: column;
}
.text{
  width: 100%;
  min-height: 40px;
  background: white;
  display: flex;
  text-align: left;
  text-wrap: normal;
  word-break: break-all;
  font-size: 17px;
  line-height: 30px;
}
.image{
  width: 100%;
  background: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 15px;
}
.comment-editor{
  width: 100%;
  min-height: 100px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.like{
  width: 85%;
  height: 40px;
  background: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#comment{
  height: 100%;
  font-size: 20px;
  margin-right: 20px;
  color: #00C1C1;
  border-bottom: #00c1c1 2px solid;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

#dislike{
  height: 100%;
  font-size: 18px;
  color: #515151;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  cursor: pointer;
}

#like{
  height: 100%;
  font-size: 18px;
  color: #00C1C1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  cursor: pointer;
}

#button{
  width: 85%;
  height: 40px;
  margin-top: 10px;
  background: #00C1C1;
  border-radius: 5px;
  color: white;
  font-size: 18px;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}


.comment{
  width: 100%;
  min-height: 100px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
</style>