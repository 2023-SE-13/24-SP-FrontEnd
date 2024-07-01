<template>
    <div class="navi">
        <div class="navi-inner">
            <div class="navi-item" v-for="(naviUnit, index) in naviUnits" :key="index" @click="changeActive(index)"
                :class="{ active: activeIndex === index }">
                <router-link :to="naviUnit.link_to">{{ naviUnit.content }}</router-link>
            </div>
            <!-- <div class="navi-search" v-show="this.$route.path !== '/main'">
                <el-select v-model="select" :popper-append-to-body="false" slot="prepend" class="navi-select">
                    <el-option label="用户" value="1" @click="select = '用户'"></el-option>
                    <el-option label="公司" value="2" @click="select = '公司'"></el-option>
                </el-select>
                <el-input placeholder="搜索用户、公司" v-model="input" class="navi-input" @input="allow"
                    @keyup.enter.native="search">
                    <el-button slot="suffix" icon="el-icon-search" @click="search" ref="button"
                        :disabled="NotAllowedSearch"></el-button>
                </el-input>
            </div> -->
            <div v-show="isLogin" class="photo">
                <el-dropdown placement="bottom" @command="handleCommand">
                    <el-avatar :size="35" :src="photoSrc"></el-avatar>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a"><i class="el-icon-house"></i>主页</el-dropdown-item>
                        <el-dropdown-item command="b"><i class="el-icon-star-off"></i>关注</el-dropdown-item>
                        <!-- <el-dropdown-item command="c"><i class="el-icon-thumb"></i>推荐</el-dropdown-item> -->
                        <el-dropdown-item divided command="d"><i class="el-icon-setting"></i>设置</el-dropdown-item>
                        <el-dropdown-item command="e"><i class="el-icon-switch-button"></i>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div v-show="!isLogin" class="loginButton">
                <el-button @click="gotoLogin">登录/注册</el-button>
            </div>
        </div>

    </div>
</template>
<script>
import { SearchUser } from '@/api/api'

export default {
    // name:'NaviBar',
    data() {
        return {
            activeIndex: null,
            naviUnits: [
                { content: "首页", link_to: "/main" },
                { content: "搜索", link_to: "/search" },
                // { content: "公司", link_to: "/company-list" },
                // { content: "我的企业", link_to: "/company-temp" },
                { content: "企业", link_to: this.getEnterpriseLink() },
                { content: "消息中心", link_to: "/message" }

            ],
            isLogin: false,
            select: '',
            input: '',
            NotAllowedSearch: true,
            photoSrc: require('../assets/photo.png'),
            username: localStorage.getItem('username')
        }
    },
    beforeMount() {
        if (localStorage.getItem('token') !== null) {
            this.isLogin = true
        }
        this.photoSrc = "http://10.251.253.188/avatar/" + this.username + "_avatar.png"
    },
    methods: {
        getEnterpriseLink() {
            //没写好
            return true ? "/company-temp" : "/company-register";
        },
        changeActive(index) {
            this.activeIndex = index
            console.log(this.activeIndex)
        },
        gotoLogin() {
            this.$router.push("/login")
            // this.isLogin = true
        },
        allow() {
            if (this.input !== null && this.input !== '') {
                this.$refs.button.$el.style.cursor = 'pointer'
                this.NotAllowedSearch = false
            } else {
                this.$refs.button.$el.style.cursor = 'not-allowed'
                this.NotAllowedSearch = true
            }
        },
        handleCommand(command) {
            if (command === 'a' && this.$route.path !== '/user/' + localStorage.getItem('username')) {
                this.$router.push("/user/" + localStorage.getItem('username'));
            }
            if (command === 'b') {
                this.$router.push("/user/" + localStorage.getItem('username'));
                // this.$router.push("/article/" + btoa(encodeURIComponent(JSON.stringify(this.id))));
            }
            if (command === 'd' && this.$route.path !== '/settings') {
                // this.$router.push("/settings")
            }
            if (command === 'e') {
                this.$confirm("是否退出登录", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    localStorage.removeItem('token')
                    this.isLogin = false
                    if (this.$route.path !== "/main") {
                        this.$router.push("/")
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });
                });
            }
        },
        search() {
            // alert("搜索一次")
            console.log("搜索一次")
            switch (this.select) {
                case '1':
                    SearchUser(this.input).then(res => {
                        console.log(res)
                    })
                    break
                case '2':
                    break
            }
        },
        goToUserPage() {
            console.log("aaaaaaaa");
            this.$router.push("/user/" + localStorage.getItem("username"));
        }
    },
    created() {
        const currentRouteIndex = this.naviUnits.findIndex(unit => unit.link_to == this.$route.path);
        this.activeIndex = currentRouteIndex !== -1 ? currentRouteIndex : null;
        this.$watch('$route', () => {
            const currentRouteIndex = this.naviUnits.findIndex(unit => unit.link_to === this.$route.path);
            this.activeIndex = currentRouteIndex !== -1 ? currentRouteIndex : null;
        })
        this.token = localStorage.getItem('token');
        this.isLogin = this.token != null;
    },
    mounted() {
        if (this.input === null || this.input === '') {
            this.$refs.button.$el.style.cursor = 'not-allowed'
        }
    }
}
</script>

<style lang="css" scoped>
.navi {
    width: 100%;
    /* background-color: #00bebd; */
    background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 1) 100%);
    height: 50px;
    /* background-image: linear-gradient(179deg,black,#00bebd); */
}

.navi-inner {
    width: 86%;
    height: 100%;
    position: relative;
    left: 7%;
}

.navi-inner .navi-item {
    display: inline-block;
    float: left;
    height: 50px;
    position: relative;
    left: 10px;
}

.navi-inner .navi-item a {
    display: inline-block;
    color: white;
    line-height: 50px;
    text-decoration: none;
    padding: 0 15px;
}

.navi-inner .navi-item:hover {
    /* background-color: #00bebd; */
}

.navi-inner .navi-item:hover a {
    color: #00bebd;
}

.navi-inner .navi-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: black;
    opacity: 0;
}

.navi-inner .navi-item.active::after {
    opacity: 1;
}

.navi-inner .navi-item.active {
    background-color: black;
}

.navi-inner .navi-item.active a {
    font-weight: bold;
    color: #00bebd;
}

.navi-search {
    width: 496px;
    float: left;
    position: relative;
    top: 5px;
    left: 30px;
    border-radius: 20px 0 0 20px;
}

.navi-search .el-select {
    float: left;
    width: 80px;
    height: 40px;
}

.navi-search .el-select .el-input__inner {
    background-color: #ffffff33;
    color: #ffffffcc;
    border-radius: 20px 0 0 20px;
    border: 1px solid transparent;
    padding: 10px 10px 10px 15px;
    font-size: 12px;
}

.navi-search .el-select:hover .el-input__inner {
    border: 1px solid transparent;
}

.navi-search .el-select .el-input__inner:focus {
    color: white;
    background-color: #ffffff33;
    border: 1px solid transparent;
}

.navi-search .el-select .el-input.is-focus .el-input__inner {
    border: 1px solid transparent;
}

.navi-search .navi-input {
    float: left;
    width: 416px;
}

.navi-search .navi-input>.el-input__inner {
    float: left;
    width: 416px;
    color: #ffffffcc;
    background-color: #ffffff33;
    font-size: 12px;
    border-radius: 0 20px 20px 0;
    border: 1px solid transparent;
}

.navi-search .navi-input>.el-input__inner:focus {
    color: #2f3a91;
    background-color: #ffffff;
}

.navi-search .navi-input .el-button {
    height: 40px;
    position: relative;
    left: 5px;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 0 20px 20px 0;
    color: #bbbbbb;
}

.navi-search .navi-input .el-button:hover {
    color: black;
}

.navi-inner .photo {
    display: inline-block;
    float: right;
    position: relative;
    height: 60px;
    width: 60px;
}

.navi-inner .photo .el-avatar {
    position: relative;
    top: 7.5px;
}


.navi-inner .loginButton {
    display: inline-block;
    float: right;
    position: relative;
    /* height: 20px; */
    width: 100px;
    /* top: 15x; */
    margin-top: 5px;
}

.navi-inner .loginButton .el-button {
    background: transparent;
    color: white;
    border: 2px solid #00bebd;
    border-radius: 4px;
    position: center;
}

.navi-inner .loginButton .el-button:hover {
    background-color: #1c4348;
    color: #00bebd;
    /* border: 1px solid white; */
}
</style>
