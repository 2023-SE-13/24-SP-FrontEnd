<template>
  <div class="about">
    <div class="upper-bar">
      <div class="search-bar">
        <el-input placeholder="搜索公司" @input="allow" v-model="input" class="input-with-select">
          <el-button slot="append" id="search-button" icon="el-icon-search" @click="Search" ref="button"
            :disabled="NotAllowSearch">搜索 </el-button>
        </el-input>
      </div>
      <div class="my-company">
        <!-- 我的企业 -->
        <el-button v-show="isInComp && isLogin" @click="gotoCompanyEditor">我的企业 <i class="el-icon-office-building"></i></el-button>
        <el-button v-show="!isInComp && isLogin && !haveCompany" @click="goToCompanyRegister">创建企业 <i class="el-icon-plus"></i></el-button>
      </div>
    </div>
    <div class="lower-bar">
      <div class="company-container">
        <CompanyUnit v-show="defaultShow" v-for="(Company, index) in CompanyList" :key="index" :company-data="Company">
        </CompanyUnit>
        <CompanyUnit v-show="!defaultShow" v-for="(Company, index) in CompanyList" :key="index" :company-data="Company">
        </CompanyUnit>
      </div>
    </div>
  </div>
</template>
<script>
import CompanyUnit from '../components/CompanyUnit.vue';
import { SearchCompany, getUser } from '@/api/api';
export default {
  data() {
    return {
      input: '',
      NotAllowSearch: true,
      isInComp: false,
      CompanyList: [],
      companyId: '',
      isLogin: false,
      defaultShow: true,
      haveCompany: false,
    }
  },
  methods: {
    gotoCompanyEditor() {
      localStorage.setItem('company_id', this.companyId)
      this.$router.push("/company-editor");
    },
    allow() {
      if (this.input !== null && this.input !== '') {
        this.$refs.button.$el.style.cursor = 'pointer'
        this.NotAllowSearch = false
      } else {
        this.$refs.button.$el.style.cursor = 'not-allowed'
        this.NotAllowSearch = true
      }
    },
    Search() {
      this.defaultShow = false
      let data = { "keywords": this.input }
      SearchCompany(data).then(res => {
        this.CompanyList = res.data.data
        console.log(this.CompanyList)
      })
    },
    goToCompanyRegister() {
      this.$router.push({ path: '/company-register' });
    }
  },
  created() {
    if(localStorage.getItem('token')) {
      this.isLogin = true;
    }
    console.log('local storage: ', localStorage.getItem('username'))
    getUser(localStorage.getItem('username')).then(res => {
      console.log(res.data.data)
      if (res.data.data.company_id && res.data.data.role === "Creator") {
        this.companyId = res.data.data.company_id
        this.isInComp = true
      }
      if(res.data.data.is_staff) {
        this.haveCompany = true
      }
    })
  },
  mounted() {
    let defaultData = { "keywords": "w" }
    SearchCompany(defaultData).then(res => {
      console.log(res.data.data)
      this.CompanyList = res.data.data
      console.log(this.CompanyList)
    })
    if (this.$store.getters.searchButtonClicked) {
      // 调用接口
      console.log("跳转成果")
      let data = JSON.parse(localStorage.getItem("searchField"))
      console.log(data)
      data = { "keywords": data.keywords }
      SearchCompany(data).then(res => {
        // console.log(res.data.data)
        this.CompanyList = res.data.data
        console.log(this.CompanyList)
      })
      // 重置状态
      this.$store.dispatch('updateButtonClicked', false);
    }
  },
  components: { CompanyUnit }
}
</script>
<style lang="scss" scoped>
.company-container {
  width: 80%;
  margin: 20px auto;
  overflow: hidden;
  justify-content: center;
  box-sizing: border-box;
}

.upper-bar {
  width: 80%;
  margin: 20px auto;
  height: 200px;
  background-color: white;
  // overflow: hidden;
  position: relative;
  border-radius: 10px;
}

.info-bar {
  width: 100%;
  height: 120px;
  background: #00bebd;
}

.img-container {
  display: block;
  width: 100%;
  height: 435px;
  /* background-image: url("../assets/bg.webp"); */
  /* float: left; */
  position: relative;
}

.search-bar {
  margin: 40px -600px;
  float: left;
  position: absolute;
  left: 60%;
  top: 5%;
  border: solid 3px #00bebd;
  border-radius: 10px;
}

.my-company {
  // float: right;
  // margin-top: 30px;
  top: 25%;
  left: 80%;
  border: solid 3px #00bebd;
  border-radius: 10px;
  transition: 0.5s;
  position: absolute;
}

.my-company:hover {
  box-shadow: 10px 10px 20px 0 rgba(98, 92, 92, 0.3);
}

.my-company .el-button {
  padding: 16px 20px;
  color: #fff;
  border-radius: 5px;
  background-color: #00bebd;
  border: none;
}

.el-button+.el-button {
  margin-left: 0;
}

/* .img-container .el-select .el-input {
    width: 500px;
    height: 100px;
} */

.input-with-select {
  width: 800px;
  height: 50px;
  flex-grow: 1;
}


.select-right {
  margin-left: 20px;
}

/deep/.el-select {
  width: 130px;
  border-radius: 10px;
}

/deep/.el-input__inner {
  height: 50px;
  /* width: 100px;` */
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
  /* border-radius: 5px; */

}

#pro-search {
  display: inline-block;
  margin-right: 40px;
  background-color: #fff;
  color: rgba(47, 58, 145, .8) !important;
  font-size: larger;
}

#search-button {
  border-color: #fff;
  background-color: #00bebd !important;
  color: #fff;
  /* border-radius: 0; */
  padding: 16px 20px;
  width: 120px;
  font-size: larger;
  border-radius: 10px;
  border: none;

}

/deep/.el-input-group__append {
  background-color: #00bebd;
  border-color: #00bebd;
}

/deep/.el-input__inner {
  border-color: #fff;
}

/deep/.el-input-group__prepend {
  background-color: #fff;
  border-color: #fff;
  border-radius: 5px;
}

.select /deep/.el-input__inner::placeholder {
  color: rgba(47, 58, 145, .8) !important;
  font-weight: 500;
  text-align: center;
}

/deep/.el-select {
  /* border-right: 1px solid blue; */
  position: relative;

}


/deep/.el-select::after {
  content: '';
  position: absolute;
  top: 25%;
  /* 调整分隔线位置，这里设置为盒子高度的一半 */
  right: 0;
  height: 50%;
  /* 设置分隔线的高度为盒子高度的一半 */
  width: 2px;
  /* 设置分隔线的宽度 */
  background-color: #d6dbe3;
  /* 设置分隔线颜色 */
}
</style>