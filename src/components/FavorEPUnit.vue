<template>
    <div id="box" @click="jump">
        <div id="main">
            <div id="img">
                <el-avatar id="avatar" :src="imgUrl"></el-avatar>
            </div>
            <div id="info">
                <span id="name" class="text">{{ this.company_name }}</span>
                <span id="ep" class="text">简介：{{ this.company_description }}</span>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    data() {
        return{
            imgUrl: "http://10.251.253.188/logo/" + this.company_id + "_image.png"
        }
    },
    mounted() {
        this.imgUrl = "http://10.251.253.188/logo/" + this.company_id + "_image.png";
    },
    methods: {
        jump() {
            localStorage.setItem('other_company_id', this.company_id)
            const jumpUrl = this.$router.resolve("/company");
            window.open(jumpUrl.href, '_blank');
        }
    },
    props: {
        company_id: {
            type: String,
            default: "Younsur"
        },
        company_name: {
            type: String,
            default: "宇宙银河公司"
        },
        company_description: {
            type: String,
            default: "bbbbb"
        }
    }
}
</script>

<style scoped>
    #box {
        width: 95%;
        height: 70px;
        min-height: 70px;
        background-color: white;
        border-bottom: 0.5px solid #ccc;
    }
    #box:hover {
        background-color: rgba(221, 221, 221, 0.3);
    }
    #main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    #img {
        width: 7.5%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        left: 2%;
    }
    #avatar {
        width: 80%;
        height: 80%;
    }
    #info {
        padding: 0 2%;
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        position: relative;
        left: 2%;
    }
    #name {
        width: 80%;
        height: 40%;
        font-size: 23px;
        font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
        color: #333
    }
    #ep {
        width: 80%;
        overflow: hidden;
        height: 40%;
        font-size: 12px;
        display: inline-block;
        position: relative;
        font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
        color: #aaa;
        display: inline-block;
        white-space: nowrap; 
        overflow: hidden;
        text-overflow:ellipsis;
        text-align: left;
    }
    .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
    #chat {
        width: 19%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    #chatBtn {
        width: 35%;
        height: 40%;
        border-radius: 10px;
        border: 1px solid #aaa;
        color: #aaa;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #chatBtn:hover {
        border: 1px solid #333;
        color: #333;
    }
</style>
