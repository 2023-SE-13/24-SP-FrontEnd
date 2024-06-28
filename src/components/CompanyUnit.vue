<template>
    <div class="company-unit" @click="gotoCompanyView">
        <div class="upper-box">
            <el-avatar shape="square" :size="55" :src="photoSrc"></el-avatar>
            <div class="text-container">
                <span class="comp-name">{{ companyData.company_name }}</span>
                <span class="sub-num">关注数:{{ companyData.company_subscription }}</span>
            </div>
        </div>
        <div class="lower-box">
            <span class="description">公司描述<span class="divider"></span>{{ companyData.company_description }}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            photoSrc: require('../assets/photo.png')
        }
    },
    props: {
        companyData: {

        }
    },
    created() {
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
.sub-num {
    // background-color: aqua;
    font-size: 14px;
    color: #666;
    margin-top: 20px;

}

.comp-name {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    // margin-top: -20px;
}

.upper-box {
    height: 100px;
    display: flex;
    align-items: center;
    // padding: 10px;
}

.text-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
    margin-right: 15px;
    margin-top: 20px;
}

.company-unit:hover {
    box-shadow: 10px 10px 20px 0px rgba(98, 92, 92, 0.3);
}

.el-avatar {
    float: left;
    margin: 20px 20px;
}

// .upper-box span {
//     display: block;
//     float: left;
//     margin-top: 20px;
// }

.lower-box {
    height: 45px;
    background-color: #f6fcfc;
    border-radius: 0 0 10px 10px;
    display: flex;
    align-items: flex-start;
    font-size: 15px;
    color: #666;

}
.lower-box span{
    max-width: 280px;
    // min-width: 100px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.description{
    margin-top: 10px;
    margin-left: 10px;
}
.divider{
    display: inline-block;
    height: 20px; /* 可根据需要调整 */
    width: 1px;
    background-color: #ddd;
    margin: 0 10px; /* 可根据需要调整 */
    vertical-align: middle;
}
</style>