<template>
  <div>
    <div class="notice" v-show="NoticeData.notification_type === 'system'">
      <p style="top:20.5%;left: 15%">尊敬的{{ NoticeData.realname }}：</p>
      <p style="top:25%;left: 15%">您好！</p>
      <p style="top:33.5%;left: 15%">我们非常高兴地通知您，经过公司严格的评估，您已被录用为我司{{
          NoticeData.position_name
        }}职位。</p>
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

    <div class="subscribe" v-show="NoticeData.notification_type === 'subscribe'">
      <p style="margin-top: 20%;">{{ NoticeData.content }}</p>
      <p>{{ NoticeData.created_at }}</p>
      <div class="custom-btn">
        <button style="top: 50.5%; right: 42.5%" @click="gotoTweet">前往查看</button>
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
      )
    },
    refuse() {
      updateOffer(localStorage.getItem('token'), this.NoticeData.offer_id, "refuse").then(res => {
        if (res.data.status === "success") {
          updateNotification(localStorage, this.NoticeData.notification_id, 1).then(res => {
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
      console.log("1")
      updateNotification(localStorage, this.NoticeData.notification_id, 1).then(res => {
        console.log("2")
        console.log(res.data)
        if (res.data.status === "success") {
          const resolved = this.$router.resolve({name: 'Tweet', params: {id: this.NoticeData.tweet_id}});
          window.open(resolved.href, '_blank');
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
  margin-left: 15%;
  margin-bottom: 1%;
  font-size: 1.2em;
}
</style>