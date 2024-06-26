<template>
    <div class="company-unit">
        <div class="upper-box">
            <el-avatar shape="square" :size="55" :src="photoSrc"></el-avatar>
            <span >周星达</span>
        </div>
        <div class="lower-box"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            photoSrc:require('../assets/photo.png')
        }
    }
}
</script>

<style lang="scss">
.upper-box{
    height: 100px;
}
.company-unit {
    width: 290px;
    height: 145px;
    background-color: white;
    margin-left:100px ;
    border-radius: 10px;
    transition: 0.5s;
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
    background-color: black;
    border-radius: 0 0 10px 10px;
}
</style>