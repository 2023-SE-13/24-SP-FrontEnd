<template>
    <div class="company-container">

        <div class="nav-bar">
            <div class="nav-inner">
                <div class="nav-item" :class="{ 'active': currentView === 'PostList' }"
                    @click="currentView = 'PostList'">
                    职位管理
                </div>
                <div class="nav-item" :class="{ 'active': currentView === 'StaffList' }"
                    @click="currentView = 'StaffList'">
                    员工管理
                </div>
                <div class="nav-item" :class="{ 'active': currentView === 'CompanyInfo' }"
                    @click="currentView = 'CompanyInfo'">
                    企业资料
                </div>
            </div>
        </div>
        <div class="content-box">
            <component :is="currentView"></component>
        </div>
        <!-- <div class="employee-list">
            444
        </div> -->
    </div>
</template>

<script>
import PostList from '@/components/PostList.vue'
import StaffList from '@/components/StaffList.vue'
import CompanyInfo from '@/components/CompanyInfo.vue'
export default {
    data() {
        return {
            currentView: 'PostList',
        }
    },
    components:{
        PostList,
        StaffList,
        CompanyInfo
    },
    created(){
    }
}
</script>

<style lang="scss" scoped>
.content-box {
    width: 85%;
    margin: 1% auto;


}

.info-bar {
    width: 100%;
    height: 200px;
    background-color: #38556b;
}

.info-box {
    margin: 0 auto;
    width: 90%;
    height: 100%;
    background-color: aqua;
}

.nav-bar {
    font-size: 1.1em;
    width: 85%;
    background-color: rgb(255, 255, 255);
    height: 60px;
    color: #d5d8e9;
    margin: 1% auto;
    border-radius: 15px;

    font-size: 20px;
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
    padding-top: 15px;
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