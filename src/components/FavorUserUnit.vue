<template>
    <div id="box" @click="jump">
        <div id="main">
            <div id="img">
                <el-avatar id="avatar" :src="this.imgUrl"></el-avatar>
            </div>
            <div id="info">
                <span id="name" class="text">{{ name }}</span>
                <span id="ep" class="text">所属企业：{{ this.companyName }}</span>
            </div>
            <div id="chat" @click.prevent="chat">
                <span id="chatBtn" >私聊</span>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    data() {
        return{
            name: this.username,
            imgUrl: "http://10.251.253.188/avatar/" + this.name + "_avatar.png"
        }
    },
    created() {
        this.name = this.username;
        this.imgUrl = "http://10.251.253.188/avatar/" + this.name + "_avatar.png";
    },
    methods: {
        chat() {
            localStorage.setItem("hrname", this.name);
            this.$router.push("/message/");
        },
        jump() {
            const jumpUrl = this.$router.resolve("/user/" + this.username);
            window.open(jumpUrl.href, '_blank');
        }
    },
    props: {
        username: {
            type: String,
            default: "Younsur"
        },
        companyName: {
            type: String,
            default: "宇宙银河公司"
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
        width: 40%;
        height: 40%;
        font-size: 25px;
        font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
        color: #333
    }
    #ep {
        width: 40%;
        height: 30%;
        font-size: 12px;
        position: relative;
        font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
        color: #aaa;
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
