<template>
    <div id="box">
        <div id="main">
            <el-avatar></el-avatar>
        </div>
    </div>
</template>

<script>

export default{
    data() {

    },
    props: {
        username: {
            type: String,
            default: "Younsur"
        },
    }
}
</script>

<style scoped>
    #box {
        width: 100%;
        height: 70px;
        min-height: 70px;
        background-color: white;
    }
    #main {
        width: 100%;
        height: 100%;
        background-color: aqua;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
</style>
