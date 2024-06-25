<template>
  <div class="company">
    <header>
      <div class="company-header"><img src="@/assets/logo.png" alt="公司logo" class="company-logo">
        {{ companyName }}
        <button @click="currentView = 'CompanyIntro'" class="company-btn">关注</button></div>
    </header>
    <nav>
      <button @click="currentView = 'CompanyIntro'">公司简介</button>
      <button @click="currentView = 'CompanyJobs'">招聘职位</button>
      <button @click="currentView = 'CompanyTaste'">员工动态</button>
    </nav>
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
  }
};
</script>

<style>
.company {
  font-family: Arial, sans-serif;
  margin: 20px;
  text-align: left;
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
}

.company-btn {
  margin-left: 20px;
}

nav {
  margin-bottom: 20px;
}

button {
  margin-right: 10px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

p, ul {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  text-align: left;
}

li {
  margin-bottom: 5px;
}
</style>
