<template>
  <div class="post-unit" @click="gotoPotion">
    <div class="upper-box">
      <span class="post">{{ postData.position_name }}</span>
      <span style="color: red; font-weight: bold; text-align: right; margin-right: 20px">{{ formatSalary(postData.salary_min) }} - {{ formatSalary(postData.salary_max) }}</span>
    </div>
    <div class="lower-box">
      <span>{{postData.company_name}}</span>
    </div>
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
    methods: {
      gotoPotion() {
        localStorage.setItem('position_id',this.postData.position_id)
        this.$router.push('/PostView/' + this.postData.position_id);
      },
      formatSalary(salary) {
        return Math.floor(salary)/1000 + 'k'; // 去掉小数点取整 + k
      },
    },
}
</script>
<style lang="scss" scoped>
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
.post-unit:hover {
  box-shadow: 10px 10px 20px 0 rgba(98, 92, 92, 0.3);
}
.upper-box {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.lower-box {
  height: 50px;
  background-color: #f6fcfc;
  border-radius: 0 0 10px 10px;
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #666;
}
.lower-box span {
  display: inline-block;
  margin-left: 20px;
}
.lower-box span:hover {
  display: inline-block;
  margin-left: 20px;
}

.post {
  display: inline-block;
  font-size: 22px;
  color: black;
  margin-top: -20px;
  margin-left: 20px;
  font-weight: bold;
}
.salary {
  display: inline-block;
  font-size: 22px;
  font-weight: 400;
  color: #fe586d;
  margin-top: -20px;
  margin-left: 140px;
}
</style>