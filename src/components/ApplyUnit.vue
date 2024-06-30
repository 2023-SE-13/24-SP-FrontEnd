<template>
    <div class="apply-unit">
        <span>{{ applyData.username }}</span>
        <span>{{applyData.real_name}}</span>
        <span>{{applyData.education}}</span>
        <span>{{applyData.applied_at}}</span>
        <el-button @click="showInfo">查看信息</el-button>
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
    },
    created(){
        console.log(this.applyData)
    },
    methods:{
        showInfo(){
            this.$emit("showInfo",this.applyData.username)
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