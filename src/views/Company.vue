<template>
  <div class="company">
    <header>
      <div class="company-header">
        <img src="@/assets/logo.png" alt="公司logo" class="company-logo">
        <div class="company-name">{{ company.companyName }}</div>
      </div>
      <div class="btn">
        <el-button type="warning" icon="el-icon-star-off" circle class="btn-follow" @click="toggleFollow" :style="{ backgroundColor: isFollowed ? '#00cfcf' : '#4c657a', borderColor: isFollowed ? '#00cfcf' : '#4c657a' }"></el-button>
        <el-button v-if="isStaff" type="danger" @click="leaveCompany" style="padding: 13px 20px;font-size: 17px;font-weight: bolder">退出企业</el-button>
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

    <div class="box">
      <component :is="currentView"></component>
    </div>
  </div>
</template>

<script>
import { leaveCompany, followCompany, unFollowCompany, getCompany, isFollowCompany, isStaff } from '@/api/api';
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
      isFollowed: false,
      isStaff: false,
      currentView: 'CompanyIntro',
      company: {
        companyName: '某某企业',
      },
      company_id: "9f9cdc179e2e414094389fab1a0d0063",

    };
  },
  created() {
    isStaff(localStorage.getItem('token'), this.company_id).then(res => {
      this.isStaff = res.data.status === "success";
    })
    isFollowCompany(localStorage.getItem('token'), this.company_id).then(res => {
      this.isFollowed = res.data.status === "success";
    })
    getCompany(this.company_id).then(res => {
      if (res.data.status === "success") {
        this.company.companyName = res.data.data.company_name
      }
    })
  },
  methods: {
    toggleFollow() {
      if (this.isFollowed) {
        this.unFollowCompany();
      } else {
        this.followCompany();
      }
    },
    followCompany() {
      followCompany(localStorage.getItem('token'), this.company_id).then(res => {
        if (res.data.status === "success") {
          console.log("关注企业成功")
          this.$message({
            message: '成功关注该企业！',
            type: 'success'
          })
          this.isFollowed = true;
        }
      }).catch(error => {
        console.log("关注企业失败", error);
        this.$message({
          message: '关注企业失败，请稍后再试！',
          type: 'error'
        });
      });
    },
    unFollowCompany() {
      unFollowCompany(localStorage.getItem('token'), this.company_id).then(res => {
        if (res.data.status === "success") {
          console.log("取消关注企业成功")
          this.$message({
            message: '成功取消关注该企业！',
            type: 'success'
          });
          this.isFollowed = false;
        }
      }).catch(error => {
        console.log("取消关注企业失败", error);
        this.$message({
          message: '取消关注企业失败，请稍后再试！',
          type: 'error'
        });
      });
    },
    leaveCompany() {
      this.$confirm('是否确定退出该企业?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const username = {"username": this.username};
        const company_id = {"company_id": this.company_id};
        leaveCompany(localStorage.getItem('token'), username, company_id).then(res => {
          if (res.data.status === "success") {
            console.log("退出企业成功")
          }
        })
        this.$message({
          type: 'success',
          message: '成功退出该企业!'
        });
        this.$router.push("/main");
      }).catch(error => {
        console.log("退出企业失败", error);
      });
    }
  }
};
</script>

<style scoped>
.company {
  font-family: Arial, sans-serif;
  padding: 20px;
  text-align: left;
  background-color: #def0f4;
  height: 100%;
}

header {
}

.box {
  background-color: #ffffff;
  padding: 2px 15px 15px 15px;
  border-radius: 12px;
  margin-top: 18px;
}

.btn {
  position: absolute;
  right: 2.5%;
  top: 11%
}

.btn-follow {
  margin-right: 5px;
  font-size: 20px;
}

.company-name {
  font-size: 1.5em;
}

.company-logo {
  width: 45px; /* 调整企业logo的大小 */
  height: auto; /* 自动调整高度 */
  margin-right: 15px; /* 调整logo与文字之间的间距 */
}

.company-header {
  font-size: 1.5em;
  margin-bottom: 10px;
  font-weight: bold;
  display: flex;
  align-items: center; /* 垂直居中 */
  padding: 10px;
}

.nav {
  font-size: 1.1em;
  width: 100%;
  background-color: rgb(255, 255, 255);
  height: 40px;
  color: #d5d8e9;
  margin-bottom: 1%;
  border-radius: 15px;
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
  height: 35px;
  position: relative;
  left: 10px;
  padding-top: 5px;
  padding-right: 8px;
  padding-left: 8px;
}

.nav-inner .nav-item a {
  display: inline-block;
  color: #d5d8e9;
  line-height: 60px;
  text-decoration: none;
  padding: 0 15px;
}

.nav-inner .nav-item:hover {
  color: #0ccaca;
}

.nav-inner .nav-item:hover a {
  color: #fff;
}

.nav-inner .nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 80%;
  height: 5px;
  background-color: #0ccaca;
  opacity: 0;
}

.nav-inner .nav-item.active::after {
  opacity: 1;
}

.nav-inner .nav-item.active {
  color: #212121;
}

.nav-inner .nav-item.active a {
  font-weight: bold;
  color: #fff;
}
</style>
