<template>
  <div class="message-wrapper">
    <!-- 联系人列表 -->
    <div class="group-list-box">
      <div class="group-list-header">
      <span :style="{ color: isNotice ? '#00cfcf' : '#000000' }"  @click="isNotice = true" >通知</span> |
      <span :style="{ color: !isNotice ? '#00cfcf' : '#000000' }" @click="isNotice = false">私信</span>
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
      <div class="message-list" :style="{ height: isNotice ? '97.7%' : '70%' }">
        <!--私信-->
        <ul>
          <li v-for="(item, index) in messageList"
          class="message-item"
          :class="{ 'my-message' : item.sender_uname === user_name }"
          :key="item.message_id"
          v-show="isNotice == false"
          >
            <!-- <div class="user-item">
              {{ item.sender_uname }}  <br>
              <el-avatar><div><img :src="imgSrc(item.sender_uname)" alt="Avatar" class="imgUser_t"></img></div></el-avatar>
            </div> -->
            <!-- 消息块 -->
            <div class="message-background-color">
                {{ item.content }}
            </div>
          </li>
        </ul>

      <!--通知-->
      <NoticeUnit v-show="isNotice == true" :notice-data="this.NoticeData"></NoticeUnit>

      </div>
      <!-- 输入框 -->
      <div class="text-box" v-show="isNotice == false">
        <textarea name="text" id="" cols="30" v-model='message_text'></textarea>
        <div class="send-btn">
          <div @click="sendMessage">发送</div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import {getConversation, getMessage, getNotification, saveMessage, getUserMessage ,createConversation, getConversationById} from '@/api/api';
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
      isNotice: true,
      NoticeList: [],
      NoticeData:[],
      stompClient: null,
      notification_id: '',
      notification: {},
    };
  },
  components : { NoticeUnit },
  created() {
    this.loadGroupList();
    getUserMessage('system', '4ed97128864b50a6bb919f9172f91ec065213839').then(res => {
      this.NoticeList = res.data.data
      this.NoticeData = this.NoticeList[0]
    })
    this.startChat('why')
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
        }
      );
    },
    loadGroupList() {
      for (let i = 0; i < this.groupList.length; i++) {
        this.joinGroup(this.groupList[i].conversation_id);
      }
    },
    // 页面创建之初加载聊天列表
    loadGroupList() {
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
    // 选择聊天
    selectGroup(selectedGroup) {
      this.conversation_id = selectedGroup.conversation_id
      this.conversation = selectedGroup
      this.loadConversation()
    },
    // 选择通知
    selectNotice(selectedGroup) {
      this.notification_id = selectedGroup.notification_id
      this.NoticeData = this.selectedGroup
    },
    // 加载聊天内容
    loadConversation() {
      if(!localStorage.getItem('token')) {
        console.error('localstorage中没有token，请检查')
      } else {
        if(!this.conversation_id) {
          console.error('conversation_id为空，请检查')
        } else {
          getMessage(localStorage.getItem('token'), this.conversation_id).then(res => {
            console.log('聊天内容：', res.data)
            this.messageList = res.data
          }) 
        }
      }
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

    startChat(username) {
      try {
        let id = '';
        createConversation(localStorage.getItem('token'), username).then(res => {
          id = res.data.conversation_id
          this.conversation_id = id
          getConversationById(localStorage.getItem('token'), id).then(res => {
            this.conversation = res.data
            this.isNotice = false
            this.selectGroup(this.conversation)
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    console.log("Mounted hook executed");
    const socket = new SockJS("http://10.251.253.188:8082/websocket");
    this.stompClient = new Client({ webSocketFactory: () => socket });
    this.stompClient.onConnect = (frame) => {
      console.log("Connected: " + frame);
      // 在连接成功后执行相关操作
      this.loadGroupList();
    };
    this.stompClient.activate();
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
  border-bottom: 1px solid black; /* 设置下边框的样式 */
  border-top: none;   /* 确保其他边框不显示 */
  border-left: none;
  border-right: none;
}

.group-item:hover {
  background-color: rgba(197, 255, 236, 0.336);
  border-bottom: 2px solid black; /* 设置下边框的样式 */
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
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
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
  margin: 10px 3vw 20px 3vw;
  display: inline-block;
  padding: 10px 10px;
  background-color: rgb(214, 214, 214, 0.4);
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
  background-color: rgb(197, 255, 237);
}


/*气泡*/
.message-item {
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
  font-size: 15px;
  font-family: JingNanFont;
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

</style>