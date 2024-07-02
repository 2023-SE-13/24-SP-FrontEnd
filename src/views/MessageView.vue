<template>
  <div class="message-wrapper">
    <!-- 联系人列表 -->
    <div class="group-list-box">
      <div class="group-list-header">
        <span :style="{ color: !isNotice ? '#00cfcf' : '#000000' }" @click="isNotice = false">私信</span>|
        <span :style="{ color: isNotice ? '#00cfcf' : '#000000' }"  @click="isNotice = true" >通知</span>
      </div>

    <!--通知列表-->
      <div class="group-list" v-show="isNotice === true">
        <ul>
          <li v-for="item in NoticeList" :key="item.notification_id">
            <div class="group-item" @click="selectNotice(item)">
              {{ item.content }}
            </div>
          </li>
        </ul>
      </div>

      <!--私信列表-->
      <div class="group-list" v-show="isNotice === false">
        <ul>
          <li v-for="item in groupList" :key="item.group_id">
            <div class="group-item" @click="selectGroup(item)">
              {{ groupName(item) }} <br>
              <!-- <span style="color:rgb(186, 228, 232, 1);">{{ item.group_company}}</span> -->
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 消息列表 -->
    <div class="message-box">
      <div class="group-info-header"></div>
      <!-- 消息窗口 -->
      <div class="message-list" :style="{ height: isNotice ? '97.7%' : '70%' }" ref="messageList">
        <!--私信-->
        <ul>
          <li v-for="(item, index) in messageList"
          class="message-item"
          :class="{ 'my-message' : item.sender_uname === user_name }"
          :key="item.message_id"
          v-show="isNotice === false"
          >
            <div class="user-item">
              {{ item.sender_uname }}  <br>
              <el-avatar><div class="imgUser-box"><img :src="'http://10.251.253.188/avatar/' + item.sender_uname + '_avatar.png'" alt="Avatar" class="imgUser_t"></div></el-avatar>
            </div>
            <!-- 消息块 -->
            <div class="message-background-color" :ref="'messageRef' + index">
                {{ item.content }}
            </div>
          </li>
        </ul>

      <!--通知-->
      <NoticeUnit v-show="isNotice === true && this.notification_id" :notice-data="this.NoticeData"></NoticeUnit>

      </div>
      <!-- 输入框 -->
      <div class="text-box" v-show="isNotice === false">
        <textarea name="text" id="" cols="30" v-model='message_text'></textarea>
        <div class="send-btn">
          <div @click="sendMessageToGroup">发送</div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import {
  getConversation,
  getMessage,
  getUserMessage,
  createConversation,
  getConversationById,
  getTweetDetail
} from '@/api/api';
import NoticeUnit from "@/components/NoticeUnit.vue";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";


export default {
  data() {
    return {
      user_name: localStorage.getItem('username'),
      groupList: [],
      conversation_id: '',
      conversation: {},
      message_text:'',
      messageList: [],
      isNotice: false,
      NoticeList: [],
      NoticeData:[],
      stompClient: null,
      notification_id: '',
    };
  },
  components : { NoticeUnit },
  async created() {
    getUserMessage('ALL', localStorage.getItem('token')).then(res => {
      this.NoticeList = res.data.data
      if (this.NoticeList[0]) {
        this.NoticeData = this.NoticeList[0]
      }
    })

    if(localStorage.getItem('hrname')) {
      await this.startChat(localStorage.getItem('hrname')).then(()=> {
        // localStorage.removeItem("hrname")
        console.log('startChat 已完成！！！！！！！')
      })
    }
    // this.loadGroupList();
    this.getGroupList();
  },
  methods: {
    // 装载群组列表
    joinGroup(groupId) {
      if (!this.stompClient) {
        console.error("stompClient is not initialized.");
        return;
      }
      const component = this;
      this.stompClient.subscribe(
        `/topic/messages/${groupId}`,
        function (messageOutput) {
          let message = JSON.parse(messageOutput.body);
          console.log(`Received message from group ${groupId}: `, message);
          // 在这里你可以更新你的 UI
          component.messageList.push(message);
          component.scrollToLatestMessage();
        }
      );
      console.log('已订阅：',groupId)
    },
    loadGroupList() {
      for (let i = 0; i < this.groupList.length; i++) {
        this.joinGroup(this.groupList[i].conversation_id);
      }
    },
    // 页面创建之初加载聊天列表
    // getGroupList() {
    //   if(!localStorage.getItem('token')) {
    //     console.log('token为空，请先登录')
    //   }
    //   else {
    //     try {
    //       getConversation(localStorage.getItem('token')).then(res => {
    //         this.groupList = res.data
    //         this.$nextTick(() => {
    //           const groupItems = document.querySelectorAll(".group-item");
    //           for (let i = 0; i < groupItems.length; i++) {
    //             groupItems[i].style.opacity = "0";
    //             groupItems[i].style.transform = "translateY(70vh)";
    //             setTimeout(() => {
    //               groupItems[i].style.opacity = "1";
    //               groupItems[i].style.transform = "translateY(0)";
    //             }, i * 150);
    //           }
    //         });
    //       })
    //     } catch (error) {
    //       console.error("Error fetching groupList:", error);
    //     }
    //   }
    // },
    getGroupList() {
    if(!localStorage.getItem('token')) {
      console.log('token为空，请先登录')
    }
    else {
      try {
        getConversation(localStorage.getItem('token')).then(res => {
          this.groupList = res.data
          this.$nextTick(() => {
            const groupItems = document.querySelectorAll(".group-item");
            for (let i = 0; i < groupItems.length; i++) {
              groupItems[i].style.opacity = "0";
              groupItems[i].style.transform = "translateY(70vh)";
              setTimeout(() => {
                groupItems[i].style.opacity = "1";
                groupItems[i].style.transform = "translateY(0)";
              }, i * 150);
            }
          });
          // 确保在groupList加载完成后调用loadGroupList
          this.loadGroupList();
        })
      } catch (error) {
        console.error("Error fetching groupList:", error);
      }
    }
  },
    // 加载联系人名称
    groupName(conversation) {
      if (conversation.user1_uname !== this.user_name) {
        return conversation.user1_uname
      } else {
        return conversation.user2_uname
      }
    },
    scrollToLatestMessage() {
      this.$nextTick(() => {
        setTimeout(() => {
          const messageListElement = this.$refs.messageList;
          if (messageListElement) {
            messageListElement.scrollTop = messageListElement.scrollHeight;
          }
        }, 100); // 延迟 100 毫秒，确保 DOM 渲染完成
      });
    },
    // 选择聊天
    selectGroup(selectedGroup) {
      this.conversation_id = selectedGroup.conversation_id
      this.conversation = selectedGroup
      this.loadConversation().then(() => {
      this.scrollToLatestMessage();
    });
    },
    // 选择通知
    selectNotice(selectedGroup) {
      console.log(selectedGroup)
      this.notification_id = selectedGroup.notification_id
      this.NoticeData = selectedGroup
      console.log('1:' + this.NoticeData)
      if(this.NoticeData.tweet_id != '') {
        let data = {
          tweet_id: this.NoticeData.tweet_id
        };
        getTweetDetail(data, localStorage.getItem('token')).then(res => {
          this.NoticeData.tweet_content = res.data.data.text_content.length > 20
              ? res.data.data.text_content.substring(0, 60) + '...'
              : res.data.data.text_content;
          if(res.data.data.photos[0] != null) {
            this.NoticeData.tweet_photo = "http://10.251.253.188/tweetphoto/" + res.data.data.photos[0]
          } else {
            this.NoticeData.tweet_photo = null
          }
        })
      }
    },
    // 加载聊天内容
    // loadConversation() {
    //   if(!localStorage.getItem('token')) {
    //     console.error('localstorage中没有token，请检查')
    //   } else {
    //     if(!this.conversation_id) {
    //       console.error('conversation_id为空，请检查')
    //     } else {
    //       getMessage(localStorage.getItem('token'), this.conversation_id).then(res => {
    //         console.log('聊天内容：', res.data)
    //         this.messageList = res.data
    //       }) 
    //     }
    //   }
    // },
    loadConversation() {
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('token')) {
        console.error('localstorage中没有token，请检查');
        reject('No token');
      } else {
        if (!this.conversation_id) {
          console.error('conversation_id为空，请检查');
          reject('No conversation_id');
        } else {
          getMessage(localStorage.getItem('token'), this.conversation_id).then(res => {
            console.log('聊天内容：', res.data);
            this.messageList = res.data;
            resolve();
          }).catch(error => {
            console.error('Error loading conversation:', error);
            reject(error);
          });
        }
      }
    });
  },

    myMessage(message) {
      if(message.sender_uname === this.user_name) {
        return 'my-message'
      } else {
        return 'your-message'
      }
    },
    // sendMessage() {
    //   if(this.conversation) {
    //     if(this.message_text !== '') {
    //       if(this.conversation.user1_uname === this.user_name) {
    //         saveMessage(this.conversation.user1_uname, this.conversation.user2_uname, this.conversation.conversation_id, this.message_text)
    //       } else {
    //         saveMessage(this.conversation.user2_uname, this.conversation.user1_uname, this.conversation.conversation_id, this.message_text)
    //       }
    //       this.message_text = ''
    //     } else {
    //       console.log('发送消息不可为空')
    //     }
    //   }
    // },
    sendMessageToGroup() {
      if (!this.stompClient) {
        console.error("stompClient is not initialized.");
        return;
      }
      if (!this.conversation || this.message_text.trim() === "") return;
      const groupId = this.conversation_id;
      const receiver_uname = this.conversation.user1_uname !== this.user_name ? this.conversation.user1_uname : this.conversation.user2_uname
      // console.log('!!!!!!!!!!!!!!', this.message_text.trim(), this.user_name, receiver_uname, this.conversation_id)
      this.stompClient.publish({
        destination: `/send/${groupId}`,
        body: JSON.stringify({
          content: this.message_text.trim(),
          sender_uname: this.user_name,
          receiver_uname: receiver_uname,
          conversation_id: this.conversation_id,
        }),
      });
      console.log(this.stompClient);
      this.message_text = "";
      this.scrollToLatestMessage(); // 确保方法调用正确
    },

    // startChat(username) {
    //   try {
    //     let id = '';
    //     createConversation(localStorage.getItem('token'), username).then(res => {
    //       id = res.data.conversation_id
    //       this.conversation_id = id
    //       getConversationById(localStorage.getItem('token'), id).then(res => {
    //         this.conversation = res.data
    //         this.isNotice = false
    //         this.selectGroup(this.conversation)
    //       })
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },

    async startChat(username) {
      try {
        let id = '';
        const res = await createConversation(localStorage.getItem('token'), username);
        id = res.data.conversation_id;
        this.conversation_id = id;
        const conversationRes = await getConversationById(localStorage.getItem('token'), id);
        this.conversation = conversationRes.data;
        this.isNotice = false;
        this.selectGroup(this.conversation);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    console.log("Mounted hook executed");
    const socket = new SockJS("http://10.251.253.188:8082/websocket");
    this.stompClient = new Client({ webSocketFactory: () => socket });
    this.stompClient.onConnect = (frame) => {
      console.log("Connected: " + frame);
      // 在连接成功后执行相关操作
      this.$nextTick(() => {
        this.loadGroupList();
      });
    };
    this.stompClient.activate();
    // localStorage.removeItem('hrname')
  },
}
</script>

<style lang="css" scoped>
.message-wrapper {
  /* padding-top: 50px; */
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  background-color: #cdf6ff;
}

/* 左边框 */
.group-list-box {
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: 16vw;
  height: 83.5vh;
  margin-left: 1vw;
  margin-top: 25px;
  border-radius: 8px;

  /* background-color: rgb(43, 89, 214); */
}

/* 左上角返回框 */
.group-list-header {
  position: relative;
  height: 6.0vh;
  width: 100%;
  margin-bottom: 1.5vh;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.05);
  background-color: azure;
  border-radius: 3px;
  padding-top: 8%;
}

.group-list-header span {
  font-weight: bold;
  font-size: 18px;
  padding: 0 10px 0 10px
}

/* 联系人框 */
.group-list {
  position: relative;
  vertical-align: top;
  width: 100%;
  height: 72.9vh;
  overflow-y: scroll;

  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.05);
  background-color: azure;
  border-radius: 3px;
}

.group-list::-webkit-scrollbar {
  display: none;
}

/* 群聊单元格 */
.group-item {
  width: 95%;
  min-height: 50px;
  margin: 5px auto;
  align-items: center;
  justify-content: center;
  display: flex;
  overflow-wrap: break-word;
  /* 自动换行 */
  /* opacity: 0; */
  transition: opacity 1s ease, transform 1s ease;
  /* border: 2px solid rgb(0, 0, 0); */
  /* border-radius: 7px; */
  border-bottom: 1px solid #d6f5fc; /* 设置下边框的样式 */
  border-top: none;   /* 确保其他边框不显示 */
  border-left: none;
  border-right: none;
}

.group-item:hover {
  background-color: #dcf9ff;
  border-bottom: 2px solid #bbf3ff; /* 设置下边框的样式 */
  border-top: none;   /* 确保其他边框不显示 */
  border-left: none;
  border-right: none;
}

ul {
  list-style: none;
  padding: 0;
  /* 可以添加这个来去除列表项的内边距 */
}

.selected-group {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border: 5px solid rgb(241, 167, 167, 0.5);
}

/* 右边框 */
.message-box {
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: 60vw;
  height: 85vh;
  margin-left: 5px;
  margin-top: 25px;
  border-radius: 3px;
}

/*信息框*/
.message-list {
  overflow-y: scroll;
  height: 70%;
  /* border: 6px solid rgb(186, 228, 232, 0.5); */
  border-radius: 8px;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.05);
  background-color: azure;
  /* padding-top: 30px; */
}

.message-background-color {
  margin: 5px 60px 25px 60px;
  display: inline-block;
  padding: 10px 10px;
  background-color: #d6f5fc;
  overflow-wrap: break-word;
  width: auto;
  text-align: left;
  border-radius: 10px;
}

/*用户信息字体*/
.my-message {
  text-align: right;
  margin-right: 1.5vw;
}

.my-message .message-background-color {
  text-align: right;
  background-color: rgba(197, 255, 236, 0.336);
}


/*气泡*/
.message-item {
  margin-left: 15px;
  text-align: left;
  transition: opacity 1s ease, transform 1s ease;
  
}

/*用户信息字体*/
.my-message {
  text-align: right;
  margin-right: 1.5vw;
}

/*输入框*/
textarea {
  width: 90%;
  height: 100%;
  resize: none;
  border: none;
  padding: 12px;
  box-sizing: border-box;
  outline: none;
  font-size: 17px;
  display: inline-block;
  background-color: azure;
}

.text-box {
  /* border: 5px solid rgb(241, 167, 167, 0.3); */
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.05);
  height: 26%;
  margin-top: 10px;
  border-radius: 3px;
  background-color: azure;
}

.message-list::-webkit-scrollbar {
  display: none;
  /* WebKit 浏览器（如 Chrome 和 Safari）隐藏滚动条 */
}

/* 发送按钮 */
.send-btn {
  display: inline-block;
  width: 45px;
  vertical-align: bottom;
  text-align: auto;
  height: 15%;
  position: relative;
  margin-bottom: 15px;
  left: 0%;
  margin-left: 5px;
  background-color: #cdf6ff;
  border-radius: 5px;
  padding: 5px;
}

.send-btn:hover {
  background-color: #c2f4ff;
}

.imgUser {
  width: 100px;
  height: 100px;
}

.imgUser_t {
  width: 40px;
  height: 40px;
}

/*用户名*/
.user-item {
  margin-left: 5px;
  padding-left: 5px;
  margin-right: 5px;
  font-size: 15px;
}

</style>