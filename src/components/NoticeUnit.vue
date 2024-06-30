<template>
  <div class="notice">
    <p style="top:19%;left: 32%">尊敬的[应聘者姓名]：</p>
    <p style="top:28.5%;left: 32%">您好！</p>
    <p style="top:33%;left: 32%">我们非常高兴地通知您，经过公司严格的评估，</p>
    <p style="top:33%;left: 32%">您已被录用为我司[职位名称]职位。恭喜您！</p>
    <p style="top:48.5%;left: 32%">我们期待您的加入，并相信您的才能和经验将为公司的发展注入新的活力。如果您有任何疑问或需要进一步的信息，请随时与我们联系。</p>
    <p style="top:58.5%;left: 32%">再次祝贺您！</p>
    <p style="top:68.5%;left: 32%">此致</p>
    <p style="top:78.5%;left: 32%">敬礼</p>
    <p style="top:88.5%;left: 32%">[公司名称]</p>
    <p style="top:98.5%;left: 32%">人力资源部</p>
    <p style="top:108.5%;left: 32%">[日期]</p>
  </div>
</template>

<script>
export default {
  data() {
    return {

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