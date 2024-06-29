<template>
<div class="post-list">
    <div class="left-box">
        <el-button><i class="el-icon-plus"></i>添加职位</el-button>
        <div class="post-container">
            <PostUnit></PostUnit>
            <PostUnit></PostUnit>
            <PostUnit></PostUnit>
            <PostUnit></PostUnit>
            <PostUnit></PostUnit>
            <PostUnit></PostUnit>
        </div>

    </div>
    <div class="right-box">
        
    </div>
</div>

</template>
<script>
import PostUnit from './PostUnit.vue';
export default{
    data(){
        return{

        }
    },
    components:{
        PostUnit
    }
}
</script>
<style lang="scss" scoped>
.post-container{
    position: absolute;
    top: 50px; /* 根据按钮的高度调整这个值 */
    left: 0;
    right: 0;
    bottom: 10px;
    overflow-y: auto; /* 使其内容可垂直滚动 */
    padding: 10px;
    box-sizing: border-box;
}
.post-list{
    display: flex;
    height: 100vh;
}
.left-box{
    flex: 1;
    background-color: bisque;
    border-radius: 10px;
    overflow: auto;
    position: relative;
}
.right-box{
    flex: 2;
    border-radius: 10px;
    background-color: burlywood;
}
.el-button{
    background-color:#00b4b3;
    transition: 0.5s;
    color: white;
    font-weight: 400;
    font-size: 20px;
    border: none;
    position: absolute;

}
.el-button:hover{
    background-color:#01c2c2;
    color: white;
}
</style>