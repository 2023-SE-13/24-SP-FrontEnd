<template lang="">
  <div class="message-wrapper">
    <!-- 联系人列表 -->
    <div class="group-list-box">
      <div class="group-list-header">
      <span :style="{ color: isNotice ? '#00cfcf' : '#000000' }"  @click="isNotice = true" >通知</span> |
      <span :style="{ color: !isNotice ? '#00cfcf' : '#000000' }" @click="isNotice = false">私信</span>
      </div>

      <div class="group-list" v-show="isNotice == false">
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
      <div class="group-info-header" ></div>
      <!-- 消息窗口 -->
      <div class="message-list">
        <ul>
          <li v-for="(item, index) in messageList"
          class="message-item"
          :class="{ 'my-message' : item.sender_uname === user_name }"
          :key="item.message_id"
          >
            <!-- <div class="user-item">
              {{ item.sender_uname }}  <br>
              <el-avatar><div><img :src="imgSrc(item.sender_uname)" alt="Avatar" class="imgUser_t"></img></div></el-avatar>
            </div> -->
            <div class="message-background-color" :ref="'messageRef' + index">
                {{ item.content }}
            </div>
          </li>
        </ul>
      </div>
      <!-- 输入框 -->
      <div class="text-box">
        <textarea name="text" id="" cols="30" v-model='message_text'></textarea>
      <div class="send-btn"></div>
    </div>
    </div>
  </div>
</template>

<script>
import { getConversation, getMessage} from '@/api/api';


export default {
  data() {
    return {
      user_name: localStorage.getItem('username'),
      groupList: [],
      conversation_id: '',
      message_text:'',
      messageList: [],
      isNotice: true
    };
  },
  created() {
    this.loadGroupList();
  },
  methods: {
    // 页面创建之初加载聊天列表
    loadGroupList() {
      if(!localStorage.getItem('token')) {
        console.log('token为空，请先登录')
      }
      else {
        getConversation(localStorage.getItem('token')).then(res => {
          console.log('conversation list: ')
          console.log(res.data);
          this.groupList = res.data
        })
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
      this.loadConversation()
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
  },
}
</script>

<style lang="css">
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
  width: 99%;
  height: 100%;
  resize: none;
  border: none;
  padding: 12px;
  box-sizing: border-box;
  outline: none;
  font-size: 15px;
  font-family: JingNanFont;
  font-size: 17px;

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


</style>