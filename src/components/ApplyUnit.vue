<template>
    <div class="apply-unit">
        <span>用户名</span>
        <span>真实姓名</span>
        <span>学历</span>
        <span>申请时间</span>
        <el-button>查看简历</el-button>
        <el-button>拒绝</el-button>
        <el-button>接受</el-button>
    </div>
</template>
<script>
export default{
    data(){
        return{

        }
    },
    props:{
        applyData:{
            
        }
    }
}
</script>

<style lang="scss" scoped>
.apply-unit{
    width: 100%;
    height: 100px;
    margin-bottom: 15px;
    background-color: aqua;
    border-radius: 10px;
}
</style>