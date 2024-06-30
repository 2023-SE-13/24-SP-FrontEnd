<template>
  <div class="comment-box">
    <div class="comment">
       <div class="author">
         <el-avatar class="avatar" :size="50" src="../assets/photo.png"></el-avatar>
       </div>
        <div class="content">
          <span class="left" style="margin-bottom: 15px">{{this.author}}</span>
          <span class="left">{{this.comment}}</span>
          <div class="left">
            <span class="smallword" >{{this.date}}</span>
            <span class="smallword" style="margin-left:10px;cursor: pointer" @click="reply_edit(author);level=2">回复</span>
          </div>
          <div class="reply" v-if="this.reply !== null">
            <div v-for="item in reply" :key="item.sender" style="width: 100%;display: flex;flex-direction: row">
              <div class="author" style="width:40px">
                <el-avatar class="avatar" :size="30" src="../assets/photo.png"></el-avatar>
              </div>
              <div class="content" style="min-height: 40px">
                <span class="left" style="margin-bottom: 5px">{{item.sender}} &nbsp {{item.content}}</span>
                <div class="left">
                  <span class="smallword" >{{item.createTime}}</span>
                  <span class="smallword" style="margin-left:10px;cursor: pointer" @click="reply_edit(item.sender);level=3">回复</span>
                </div>
              </div>
            </div>
          </div>
          <Transition name="fade">
            <div class="Editor" v-if="this.isEditor">
              <el-input v-model="comment_editor"
                        type="textarea"
                        ref="editor"
                        :autosize="{ minRows: 2}"
                        resize="none"
                        :placeholder= "'回复@'+this.sender+'：'"
                        style="width: 65%;">
              </el-input>
              <el-button  @click="reply1()" id="button" type="primary" style="height:50px;margin-left: 20px">
                发布
              </el-button>
            </div>
          </Transition>
        </div>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>

import {getComments} from "@/api/api";
import {commentComment} from "@/api/api";
import {commentComment2} from "@/api/api";

export default {
  data() {
    return {
      comment: '',
      author: '',
      sender: '',
      date: '',
      isEditor: false,
      comment_editor: '',
      reply: [],
      level: 2,
    }
  },
  async created() {
    this.token = localStorage.getItem('token')
    this.tweet_id = this.$route.params.id
    await this.getReply()
  },
  methods: {
    getReply(){
      let data = {
        comment_id: this.comment_id
      }
      getComments(data).then(res => {
        if(res.data.status === "success"){
        this.author = res.data.data.sender
        this.comment = res.data.data.content
        this.date = res.data.data.createTime
        this.reply = res.data.data.children_comment
        }},
        err => {console.log(err)})
      },
    reply_edit(name){
      this.isEditor = true
      this.sender = name
      this.$nextTick(() => {
        this.$refs.editor.focus()
      })
    },
    undo_reply(){
      this.isEditor = false
    },
    async reply1(){
      if(this.comment_editor === null || this.comment_editor === ''){
        this.$notify({
          title: '提示',
          message: '回复内容不能为空',
          type: 'warning'
        });
        return;
      }
      var data = {}
      if(this.level === 2){
        data = {
          tweet_id: this.tweet_id,
          comment_id: this.comment_id,
          text_content: this.comment_editor
        }
        await commentComment(data,this.token).then(res => {
              if(res.data.status === "success"){
                this.getReply()
                this.isEditor = false
                this.comment_editor = ''
                this.$notify({
                  title: '提示',
                  message: '回复成功',
                  type: 'success'
                });
              }
            },
            err => {
              console.log(err)
            })
      }
      else if(this.level === 3){
        data = {
          tweet_id: this.tweet_id,
          comment_id: this.comment_id,
          username: this.sender,
          text_content: this.comment_editor
        }
        await commentComment2(data,this.token).then(res => {
              if(res.data.status === "success"){
                this.getReply()
                this.isEditor = false
                this.comment_editor = ''
                this.$notify({
                  title: '提示',
                  message: '回复成功',
                  type: 'success'
                });
              }
            },
            err => {
              console.log(err)
            })
      }
    }
  },
  props: {
    comment_id: {
      type: String,
      default: "1"
    },
  }
}
</script>

<style scoped>
.comment-box {
  width: 85%;
  min-height: 100px;
  background-color: white;
  margin-top: 10px;
  transition: 0.5s;
  font-family: PingFang SC,HarmonyOS_Regular,Helvetica Neue,Microsoft YaHei,sans-serif!important;
}
.comment {
  width:100%;
  min-height: 100px;
  background: white;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.author{
  width: 10%;
  height: 60px;
  background: white;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.content{
  width: 90%;
  min-height: 70px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
}
.left{
  width: 100%;
  text-align: left;
}
.smallword{
  font-size: 13px;
  margin-top: 5px;
  color: #9499a0;
}

.Editor{
  width: 100%;
  min-height: 60px;
  background: white;
  display: flex;
  flex-direction: row;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.reply{
  width: 100%;
  min-height: 10px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 15px;
}
</style>