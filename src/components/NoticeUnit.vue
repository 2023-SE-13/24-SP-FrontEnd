<template>
  <div class="notice">
    <div v-show="NoticeData.notification_type === 'system'">
      <div v-show="NoticeData.offer_id != ''">
        <p style="top:20.5%;left: 15%">尊敬的{{ NoticeData.realname }}：</p>
        <p style="top:25%;left: 15%">您好！</p>
        <p style="top:33.5%;left: 15%">
          我们非常高兴地通知您，经过公司严格的评估，您已被录用为我司{{ NoticeData.position_name }}职位。</p>
        <p style="top:38%;left: 15%">恭喜您！</p>
        <p style="top:46.5%;left: 15%">我们期待您的加入，并相信您的才能和经验将为公司的发展注入新的活力。</p>
        <p style="top:51.2%;left: 15%">如果您有任何疑问或需要进一步的信息，请随时与我们联系。</p>
        <p style="top:59.5%;left: 15%">再次祝贺您！</p>
        <p style="top:69%;left: 15%">{{ NoticeData.company_name }}</p>
        <p style="top:73%;left: 15%">人力资源部</p>
        <p style="top:78%;left: 15%">{{ NoticeData.created_at }}</p>
        <div class="custom-btn" v-show="NoticeData.is_read == 0">
          <button style="top: 82.5%; right: 50.5%" @click="accept">接受</button>
          <button style="top: 82.5%; right: 42.5%" @click="refuse">拒绝</button>
        </div>
      </div>
      <div v-show="NoticeData.offer_id == ''">
        <p style="top:33.5%;left: 15%">{{ NoticeData.content }}。</p>
        <div class="custom-btn">
          <button style="top: 60.5%; right: 44%" @click="gotoCompany">前往认证</button>
        </div>
      </div>
    </div>

    <div class="subscribe" v-show="NoticeData.notification_type === 'subscribe'">
      <div v-show="NoticeData.position_id == ''">
        <p style="top: 25%;left: 12%">{{ NoticeData.content }}</p>
        <p style="top: 34%;">{{ NoticeData.tweet_content }}</p>

        <div v-show="NoticeData.tweet_photo != null">
          <el-avatar shape="square" :size="150" :src="NoticeData.tweet_photo"></el-avatar>
        </div>

        <p style="top: 69%;">{{ NoticeData.created_at }}</p>
        <div class="custom-btn">
          <button style="top: 73.2%; right: 42.5%" @click="gotoTweet">前往查看</button>
        </div>
      </div>
      <div v-show="NoticeData.position_id != ''">
        <p style="top:33.5%;left: 15%">{{ NoticeData.content }}。</p>
        <div class="custom-btn">
          <button style="top: 60.5%; right: 44%" @click="gotoPosition">前往查看</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {updateOffer, updateNotification} from "@/api/api";

export default {
  data() {
    return {}
  },
  created() {
  },
  props: {
    NoticeData: {}
  },
  methods: {
    accept() {
      updateOffer(localStorage.getItem('token'), this.NoticeData.offer_id, "accept").then(res => {
            if (res.data.status === "success") {
              updateNotification(localStorage.getItem('token'), this.NoticeData.notification_id, 1).then(res => {
                if (res.data.status === "success") {
                  this.$notify({
                    title: '成功',
                    message: '已接受该offer！',
                    type: 'success'
                  })
                  window.location.reload()
                }
              })
            }
          }
      ).catch(error => {
        if (error.response.status === 406) {
          console.log('员工无法重复加入其他！');
          this.$notify({
            title: "失败",
            type: 'error',
            message: '管理员无法退出企业！'
          });
        }
      });
    },
    refuse() {
      updateOffer(localStorage.getItem('token'), this.NoticeData.offer_id, "refuse").then(res => {
        if (res.data.status === "success") {
          updateNotification(localStorage.getItem('token'), this.NoticeData.notification_id, 1).then(res => {
            if (res.data.status === "success") {
              this.$notify({
                title: '成功',
                message: '已拒绝该offer！',
                type: 'success'
              })
            }
          })
        }
      })
    },
    gotoTweet() {
      updateNotification(localStorage.getItem('token'), this.NoticeData.notification_id, 1).then(res => {
        if (res.data.status === "success") {
          const resolved = this.$router.resolve({name: 'Tweet', params: {id: this.NoticeData.tweet_id}});
          window.open(resolved.href, '_blank');
        }
      })
    },
    gotoCompany() {
      localStorage.setItem('other_company_id', this.NoticeData.company_id)
      this.$router.push("/company");
    },
    gotoPosition() {
      localStorage.setItem('position_id',this.NoticeData.position_id)
      this.$router.push('/PostView/' + this.NoticeData.position_id);
    }
  }
}
</script>

<style lang="scss" scoped>
.el-avatar {
  margin-top: 30%;
}

.custom-btn button {
  background-color: #0ccaca;
  color: white;
  padding: 10px 15px 10px 15px;
  border: none;
  font-weight: bold;
  position: absolute;
  font-size: 1.1em;
  border-radius: 5px;
}

.custom-btn button:hover {
  background-color: #00d1d0;
}

.notice {
  text-align: left;
  padding-left: 10%;
  background-image: url('@/assets/letter.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 97%; /* 图片缩放到60% */
  margin-top: 2%;
  height: 95%;
}

.notice p {
  position: absolute;
}

.subscribe {
  text-align: left;
  padding-left: 10%;
  margin-top: 2%;
  height: 95%;
}

.subscribe p {
  margin-left: 3%;
  margin-bottom: 1%;
}
</style>