<template>
    <div class="user-unit">
        <div class="inner-container">
            <div class="left">
                <el-avatar class="avatar" :size="55" src="../assets/photo.png"></el-avatar>
                <div class="left-inner">
                    <h3>111</h3>
                    <span>暂无企业</span>
                    <!-- <i class="el-icon-document">11</i>
                    <i class="el-icon-collection">11</i> -->
                </div>
            </div>
            <div class="right">
                <el-button class="right-button" @click="showDialog">详情</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}

</script>
<style scoped lang="scss">
.user-unit {
    width: 900px;
    height: 70px;
    /* background-color: aquamarine; */
    background-color: white;
    margin-left: 10%;
    margin-top: 15px;
    padding: 10px;
    border: 2px solid #d0d7de;
    border-radius: 10px;
    box-shadow: 2px 2px rgba(208, 215, 222, 0.2);
    transition: 0.5s;
}

.user-unit:hover {
    box-shadow: 2px 2px rgba(208, 215, 222, 0.8);
}

.inner-container {
    width: 100%;
    height: 100%;
    /* background-color: blue; */
}

.left {
    display: inline-block;
    float: left;
    /* background-color: black; */
    width: 300px;
    height: 100%;
    /* background-color: blueviolet; */
    vertical-align: top;
}

.left-inner {
    float: left;
    margin-left: 20px;
    height: 100%;
}

.left-inner span {
    display: inline-block;
    max-width: 100px;
    min-width: 100px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    /* vertical-align: bottom;
     */
    color: #6e7781;
    font-size: x-small;
    margin-top: 20px;
    vertical-align: bottom;
    text-align: left;
}

.left-inner h3 {
    color: #0969da;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    max-width: 150px;
    text-align: left;
    font-weight: 600;
    font-size: medium;
}

.left-inner i {
    display: inline-block;
    color: #6e7781;
    font-size: x-small;
    /* margin-bottom: 20px; */
    margin-left: 10px;
}

.right {
    float: right;
    display: inline-block;
    width: 250px;
    height: 100%;
    /* background-color: aqua; */

}

.right-button {
    float: right;
    height: 30px;
    font-size: smaller;
    width: 60px;
    text-align: center;
    display: inline-block;
    align-items: center;
    padding: 0;
    font-weight: 600;
    position: relative;
    top: 12px;
    right: 10px;
}

.avatar {
    float: left;
}
</style>