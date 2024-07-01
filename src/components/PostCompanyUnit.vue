<template>
    <div class="post-unit" @click="gotoCompany">
        <div class="upper-box">
          <el-avatar shape="square" :size="55" :src="company_logo"></el-avatar>
            <span class="post">{{ postData.company_name }}</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
          company_logo: `http://10.251.253.188/logo/${localStorage.getItem("company_id")}_image.png`
          //company_logo: require('../assets/photo.png')
        }
    },
    props: {
      postData: {

      }
    },
    methods: {
        gotoCompany(){
          localStorage.setItem('company_id', this.postData.company_id)
          this.$router.push("/company");
        }
    }
}
</script>
<style lang="scss" scoped>
.el-avatar{
  float: left;
  margin: 0 0 0 20px;
}

.post-unit {
    width: 400px;
    height: 150px;
    background-color: white;
    margin-left: 20px;
    margin-top: 20px;
    float: left;
    border-radius: 10px;
    transition: 0.5s;
}
.post-unit:hover{
    box-shadow: 10px 10px 20px 0 rgba(98, 92, 92, 0.3);
}
.upper-box {
    height: 100px;
    display: flex;
    align-items: center;
    // padding: 10px;
}
.lower-box {
    height: 50px;
    background-color: #f6fcfc;
    border-radius: 0 0 10px 10px;
    display: flex;
    align-items: flex-start;
    font-size: 18px;
    color: #666;
}
.lower-box span{
    display: inline-block;
    margin-left: 10px;
    margin-top: 10px;
}
.post{
    display: inline-block;
    font-size: 22px;
    color: black;
    margin-top: -20px;
    margin-left: 20px;
    font-weight: bold;
}
.salary{
    display: inline-block;
    // float: right;
    font-size: 22px;
    font-weight: 400;
    color: #fe586d;
    margin-top: -20px;
    margin-left: 140px;
}
</style>