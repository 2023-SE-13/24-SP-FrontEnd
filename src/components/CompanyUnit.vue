<template>
    <div class="company-unit" @click="gotoCompanyView">
        <div class="upper-box">
            <el-avatar shape="square" :size="55" :src="photoSrc"></el-avatar>
            <span >{{companyData.company_name}}</span>
            <span>关注数:{{ companyData.company_subscription }}</span>
        </div>
        <div class="lower-box">
            <span>{{ companyData.company_description }}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            photoSrc:require('../assets/photo.png')
        }
    },
    props:{
        companyData:{

        }
    },
    created(){
        console.log(this.companyData)
    },
    methods: {
      gotoCompanyView() {
        localStorage.setItem('company_id', this.companyData.company_id)
        this.$router.push("/company");
      },
    }
}
</script>

<style lang="scss" scoped>
.upper-box{
    height: 100px;
}
.company-unit {
    width: 290px;
    height: 145px;
    background-color: white;
    // margin-left:100px ;
    border-radius: 10px;
    transition: 0.5s;
    float: left;
    // padding: 10px;
    // margin-left: 20px;
    // margin-top: 20px;
    box-sizing: border-box;
    margin-left: 15px;
    margin-top: 20px;
}

.company-unit:hover{
    box-shadow: 10px 10px 20px 0px rgba(98, 92, 92, 0.3);
}
.el-avatar{
    float: left;
    margin: 20px 20px;
}
.upper-box span{
    display: inline-block;
    float: left;
    margin-top: 20px;
}
.lower-box{
    height: 45px;
    background-color: #f6fcfc;
    border-radius: 0 0 10px 10px;
}
</style>