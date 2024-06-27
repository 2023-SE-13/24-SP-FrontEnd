<template>
    <div>
        <div class="upper-bar">
            <div class="search-bar">
                <el-input placeholder="搜索用户" @input="allow" v-model="input" class="input-with-select">
                    <el-button slot="append" id="search-button" icon="el-icon-search" @click="Search" ref="button"
                        :disabled="NotAllowSearch">搜索</el-button>
                </el-input>
            </div>
        </div>
        <div class="lower-bar">
            <UserUnit v-for="(user, index) in userList" :key="index" :user-data="user"></UserUnit>
        </div>
    </div>
</template>
<script>
import UserUnit from '../components/UserUnit.vue'
import { SearchUser } from '@/api/api'
export default {
    data() {
        return {
            input: '',
            NotAllowSearch: true,
            userList: []
        }
    },
    methods: {
        allow() {
            if (this.input !== null && this.input !== '') {
                this.$refs.button.$el.style.cursor = 'pointer'
                this.NotAllowSearch = false
            } else {
                this.$refs.button.$el.style.cursor = 'not-allowed'
                this.NotAllowSearch = true
            }
        },
        async Search() {
            let data = {"type":'user' ,"keywords":''}
            data.keywords = this.input
            await SearchUser(data.keywords).then(res => {
                console.log(res)
                this.userList = res.data
            })
            if(this.userList.length === 0){
                this.$notify({
                    title: '提示',
                    message: '未找到相关用户',
                    type: 'warning'
                });
            }
        }
    },
    mounted() {
        if (this.$store.getters.searchButtonClicked) {
            // 调用接口
            let data = JSON.parse(localStorage.getItem("searchField"))
            console.log(data.keywords)
            SearchUser(data.keywords).then(res => {
                console.log(res)
                this.userList = res.data
            })
            if(this.userList.length === 0){
              this.$notify({
                title: '提示',
                message: '未找到相关用户',
                type: 'warning'
              });
            }
            // 重置状态
            this.$store.dispatch('updateButtonClicked', false);
        }
    },
    components: {
        UserUnit
    }
}
</script>

<style lang="scss" scoped>
.upper-bar {
    width: 80%;
    margin: 20px auto;
    height: 200px;
    background-color: white;
    // overflow: hidden;
    position: relative;
    border-radius: 10px;
}

.search-bar {
    // margin: 20px -400px;
    float: none;
    position: absolute;
    left: 50%;
    top: 25%;
    border: solid 3px #00bebd;
    border-radius: 10px;
    transform: translateX(-60%);
}

/* .img-container .el-select .el-input {
    width: 500px;
    height: 100px;
} */

.input-with-select {
    width: 800px;
    height: 50px;

}


.select-right {
    margin-left: 20px;
}

/deep/.el-select {
    width: 130px;
    border-radius: 10px;
}

/deep/.el-input__inner {
    height: 50px;
    /* width: 100px;` */
}

.input-with-select .el-input-group__prepend {
    background-color: #fff;
    /* border-radius: 5px; */

}

#pro-search {
    display: inline-block;
    margin-right: 40px;
    background-color: #fff;
    color: rgba(47, 58, 145, .8) !important;
    font-size: larger;
}

#search-button {
    border-color: #fff;
    background-color: #00bebd !important;
    color: #fff;
    /* border-radius: 0; */
    padding: 16px 20px;
    width: 120px;
    font-size: larger;
    border-radius: 10px;
    border: none;

}

/deep/.el-input-group__append {
    background-color: #00bebd;
    border-color: #00bebd;
}

/deep/.el-input__inner {
    border-color: #fff;
}

/deep/.el-input-group__prepend {
    background-color: #fff;
    border-color: #fff;
    border-radius: 5px;
}

.select /deep/.el-input__inner::placeholder {
    color: rgba(47, 58, 145, .8) !important;
    font-weight: 500;
    text-align: center;
}

/deep/.el-select {
    /* border-right: 1px solid blue; */
    position: relative;

}


/deep/.el-select::after {
    content: '';
    position: absolute;
    top: 25%;
    /* 调整分隔线位置，这里设置为盒子高度的一半 */
    right: 0;
    height: 50%;
    /* 设置分隔线的高度为盒子高度的一半 */
    width: 2px;
    /* 设置分隔线的宽度 */
    background-color: #d6dbe3;
    /* 设置分隔线颜色 */
}

.pro-input {
    /* border: #bfc3de solid 2px; */
    width: 70%;
    border-radius: 10px;
    /* border-top-right-radius: 10px; */
    /* padding: 10px; */
    margin: 10px 0px;
}

.pro-input /deep/.el-input__inner {
    height: 35px;
    border: #bfc3de solid 2px;
    border-radius: 5px;
    margin-left: 10px;
}

.pro-input /deep/.el-input__inner:hover {
    border-color: rgba(47, 58, 145, .8) !important;
}

.pro-input /deep/.el-input-group__prepend {
    border: #bfc3de solid 2px;
    width: 80px;
    border-radius: 5px;
    /* margin-right: 10px; */
}

.pro-but {
    width: 115px;
}
</style>