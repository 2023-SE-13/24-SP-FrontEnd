<template>
    <div class="home-page">
        <div class="info-bar">

        </div>
        <div class="img-container">
            <div class="search-bar">
                <el-input placeholder="搜索用户、公司" @input="allow" v-model="input" class="input-with-select">
                    <el-select class="select" v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="用户" value="1"></el-option>
                        <el-option label="公司" value="2"></el-option>
                        <!-- <el-option label="作者" value="3"></el-option>
                        <el-option label="学者" value="4"></el-option> -->
                    </el-select>
                    <!-- <el-select class="select select-right" v-model="select2" slot="prepend" placeholder="请选择">
                        <el-option label="精确" value="1"></el-option>
                        <el-option label="模糊" value="2"></el-option>
                    </el-select> -->
                    <!-- <el-button slot="append" type="text">文字按钮</el-button> -->
                    <!-- <el-link slot="append" id="pro-search" type="primary" :underline="false"
                        @click="dialogVisible = true">高级检索</el-link> -->
                    <!-- <el-button id="pro-search" slot="append" icon="el-icon-search">高级检索</el-button> -->
                    <el-button slot="append" id="search-button" icon="el-icon-search" @click="Search" ref="button"
                        :disabled="NotAllowSearch">搜索</el-button>
                </el-input>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            select: '',
            input: '',
            NotAllowSearch: true
        }
    },
    methods: {
        allow() {
            if (this.select !== null && this.select !== '' && this.input !== null && this.input !== '') {
                this.$refs.button.$el.style.cursor = 'pointer'
                this.NotAllowSearch = false
            } else {
                this.$refs.button.$el.style.cursor = 'not-allowed'
                this.NotAllowSearch = true
            }
        },
        Search(){
            alert("搜索一次")
        }
    }
}
</script>
<style scoped>
.info-bar{
    width: 100%;
    height: 120px;
    background: #00bebd;
}
.img-container {
    display: block;
    width: 100%;
    height: 435px;
    /* background-image: url("../assets/bg.webp"); */
    /* float: left; */
    position: relative;
}

.search-bar {
    margin: 20px -400px;
    float: left;
    position: absolute;
    left: 50%;
    top: 5%;
    border: solid 3px #00bebd;
    border-radius: 10px;
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