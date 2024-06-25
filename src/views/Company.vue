<template>
  <div class="company">
    <header>
      <div class="company-header">
        <img src="@/assets/logo.png" alt="公司logo" class="company-logo">
        <div class="company-name">{{ companyName }}</div>
        <el-button type="warning" icon="el-icon-star-off" circle class="btn-follow" @click="follow"></el-button>
        <div class="btn-quick">
          <el-button type="danger" @click="quick">退出企业</el-button>
        </div>
      </div>
    </header>

    <div class="nav">
      <div class="nav-inner">
        <div class="nav-item" :class="{ 'active': currentView === 'CompanyIntro' }" @click="currentView = 'CompanyIntro'">
          公司简介
        </div>
        <div class="nav-item" :class="{ 'active': currentView === 'CompanyJobs' }" @click="currentView = 'CompanyJobs'">
          招聘职位
        </div>
        <div class="nav-item" :class="{ 'active': currentView === 'CompanyTaste' }" @click="currentView = 'CompanyTaste'">
          员工动态
        </div>
      </div>
    </div>

      <component :is="currentView"></component>
  </div>
</template>

<script>
import CompanyIntro from '@/components/CompanyIntro.vue';
import CompanyJobs from "@/components/CompanyJobs.vue";
import CompanyTaste from "@/components/CompanyTaste.vue";

export default {
  name: 'App',
  components: {
    CompanyIntro,
    CompanyJobs,
    CompanyTaste
  },
  data() {
    return {
      currentView: 'CompanyIntro',
      companyName: '某某企业'
    };
  },
  methods: {
    follow() {
      this.$message({
        message: '成功关注该企业！',
        type: 'success'
      });
    },
    quick() {
      this.$confirm('是否确定退出该企业?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '成功退出该企业!'
        });
      }).catch(() => {

      });
    }
  }
};
</script>

<style scoped>
.btn-quick {
  margin-left: 70%;
}

.btn-follow {
  margin-left: 10px;
  font-size: 20px;
  background-color: #f6d0aa;
  border-color: #f6d0aa;
}

.btn-follow:hover {
  background-color: #ffc457;
  border-color: #ffc457;
}

.company {
  font-family: Arial, sans-serif;
  margin: 20px;
  text-align: left;
}

.company-name {
  font-size: 1.5em;

}

.company-logo {
  width: 50px; /* 调整企业logo的大小 */
  height: auto; /* 自动调整高度 */
  margin-right: 10px; /* 调整logo与文字之间的间距 */
}

.company-header {
  font-size: 1.5em;
  margin-bottom: 10px;
  font-weight: bold;
  display: flex;
  align-items: center; /* 垂直居中 */
  padding: 10px;
}

nav {
  margin-bottom: 20px;
}

.nav {
  font-size: 1.5em;
  width: 100%;
  background-color: rgba(44, 55, 140, 0.96);
  height: 50px;
  color: #d5d8e9;
  font-weight: bold;
  margin-bottom: 1%;
}

.nav-inner {
  width: 86%;
  height: 100%;
  position: relative;
  left: 2%;
}

.nav-inner .nav-item {
  display: inline-block;
  float: left;
  height: 45px;
  position: relative;
  left: 10px;
  padding-top: 5px;
  padding-right: 5px;
  padding-left: 5px;
}

.nav-inner .nav-item a {
  display: inline-block;
  color: #d5d8e9;
  line-height: 60px;
  text-decoration: none;
  padding: 0 15px;
}

.nav-inner .nav-item:hover {
  background-color: #4e57a1;
}

.nav-inner .nav-item:hover a {
  color: #fff;
}

.nav-inner .nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #ddbb34;
  opacity: 0;
}

.nav-inner .nav-item.active::after {
  opacity: 1;
}

.nav-inner .nav-item.active {
  background-color: #4e57a1;
}

.nav-inner .nav-item.active a {
  font-weight: bold;
  color: #fff;
}
</style>
