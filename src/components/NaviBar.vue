<template>
    <div class="navi">
        <div class="navi-inner">
            <div class="navi-item" v-for="(naviUnit, index) in naviUnits" :key="index" @click="changeActive(index)"
                :class="{ active: activeIndex === index }">
                <router-link :to="naviUnit.link_to">{{ naviUnit.content }}</router-link>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    // name:'NaviBar',
    data() {
        return {
            activeIndex: null,
            naviUnits: [
                { content: "首页", link_to: "/" },
                { content: "登录", link_to: "/login" }
            ]
        }
    },
    methods: {
        changeActive(index) {
            this.activeIndex = index
            console.log(this.activeIndex)
        }
    }
}
</script>

<style lang="css" scoped>
.navi {
    width: 100%;
    background-color: #2f3a91;
    height: 60px;
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
    height: 60px;
    position: relative;
    left: 10px;
}

.navi-inner .navi-item a {
    display: inline-block;
    color: #d5d8e9;
    line-height: 60px;
    text-decoration: none;
    padding: 0 15px;
}

.navi-inner .navi-item:hover {
    background-color: #4e57a1;
}

.navi-inner .navi-item:hover a {
    color: #fff;
}

.navi-inner .navi-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: #ddbb34;
    opacity: 0;
}

.navi-inner .navi-item.active::after {
    opacity: 1;
}

.navi-inner .navi-item.active {
    background-color: #4e57a1;
}

.navi-inner .navi-item.active a {
    font-weight: bold;
    color: #fff;
}
</style>