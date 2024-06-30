<template>
  <div class="notice">
    <p style="top:19%;left: 32%">尊敬的{{ letterData.username }}：</p>
    <p style="top:28.5%;left: 32%">您好！</p>
    <p style="top:33%;left: 32%">我们非常高兴地通知您，经过公司严格的评估，</p>
    <p style="top:37.5%;left: 32%">您已被录用为我司{{ letterData.position_name }}职位。恭喜您！</p>
    <p style="top:46.5%;left: 32%">我们期待您的加入，并相信您的才能和经验将</p>
    <p style="top:51.5%;left: 32%">为公司的发展注入新的活力。如果您有任何疑</p>
    <p style="top:56%;left: 32%">问或需要进一步的信息，请随时与我们联系。</p>
    <p style="top:65%;left: 32%">再次祝贺您！</p>
    <p style="top:74%;left: 32%">{{ letterData.company_name }}</p>
    <p style="top:78.5%;left: 32%">{{ letterData.date }}</p>

    <button>接受</button>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      letterData:{
        username:"xxx",
        position_name: "xxx",
        company_name: "XXX",
        date: "2024-00-00"
      }
    }
  },
  props: {
    postData: {

    }
  },
  methods:{

  }
}
</script>
<style lang="scss" scoped>
.notice {
  text-align: left;
  padding-left: 10%;
  background-image: url('@/assets/letter.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 45%; /* 图片缩放到60% */
  margin-top: 2%;
  height: 95%;
}

.notice p {
  position: absolute;
}
</style>