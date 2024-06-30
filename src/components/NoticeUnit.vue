<template>
  <div class="notice">
    <p style="top:20.5%;left: 15%">尊敬的{{ letterData.username }}：</p>
    <p style="top:25%;left: 15%">您好！</p>
    <p style="top:33.5%;left: 15%">我们非常高兴地通知您，经过公司严格的评估，您已被录用为我司{{ letterData.position_name }}职位。</p>
    <p style="top:38%;left: 15%">恭喜您！</p>
    <p style="top:46.5%;left: 15%">我们期待您的加入，并相信您的才能和经验将为公司的发展注入新的活力。</p>
    <p style="top:51.2%;left: 15%">如果您有任何疑问或需要进一步的信息，请随时与我们联系。</p>
    <p style="top:59.5%;left: 15%">再次祝贺您！</p>
    <p style="top:69%;left: 15%">{{ letterData.company_name }}</p>
    <p style="top:73%;left: 15%">人力资源部</p>
    <p style="top:78%;left: 15%">{{ letterData.date }}</p>

    <div class="custom-btn">
      <button style="top: 82%; right: 50%" @click="accept">接受</button>
      <button style="top: 82%; right: 42%" @click="refuse">拒绝</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      letterData:{
        username:"xxx",
        position_name: "XXX",
        company_name: "xxx",
        date: "2024-00-00"
      }
    }
  },
  props: {
    postData: {

    }
  },
  methods:{
    accept(){

    },
    refuse(){

    }
  }
}
</script>

<style lang="scss" scoped>
.custom-btn button{
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
</style>