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
                { content: "首页", link_to: "/main" },
                { content: "公司", link_to: "/company" }
            ]
        }
    },
    methods: {
        changeActive(index) {
            this.activeIndex = index
            console.log(this.activeIndex)
        }
    },
    created() {
        const currentRouteIndex = this.naviUnits.findIndex(unit => unit.link_to == this.$route.path);
        this.activeIndex = currentRouteIndex !== -1 ? currentRouteIndex : null;
    }
}
</script>

<style lang="css" scoped>
.navi {
    width: 100%;
    /* background-color: #00bebd; */
    background:linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 1) 100%);
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
</style>