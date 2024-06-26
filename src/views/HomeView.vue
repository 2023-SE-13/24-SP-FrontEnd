<template>
  <div class="main-body">
    <div class="navi">
      <NaviBar />
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NaviBar from '@/components/NaviBar.vue'

export default {
  // name: 'NaviBar',
  data(){
    return{

    }
  },
  components: {
    NaviBar
  }
}
</script>
<style lang="scss" scoped>
.main-body{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(200deg,#f3e7e9,#e3eeff);
}
.navi {
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>
