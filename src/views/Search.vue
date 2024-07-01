<template>
    <div>
        <div class="upper-bar">
            <div class="search-bar">
                <el-input placeholder="搜索用户、公司" @input="allow" v-model="input" class="input-with-select">
                    <el-select class="select" v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="用户" value="1"></el-option>
                        <el-option label="公司" value="2"></el-option>
                        <el-option label="岗位" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" id="search-button" icon="el-icon-search" @click="Search" ref="button"
                        :disabled="NotAllowSearch">搜索
                    </el-button>
                </el-input>
            </div>
        </div>
        <div class="lower-bar">
            <!-- <UserUnit v-for="(user, index) in userList" :key="index" :user-data="user"></UserUnit> -->
            <el-tabs type="border-card" class="table" v-model="activeName">
                <el-tab-pane label="用户列表" name="user">
                    <PostUserUnit v-for="(user, index) in UserList" :key="index" :post-data="user"></PostUserUnit>
                </el-tab-pane>
                <el-tab-pane label="企业列表" name="company">
                    <CompanyUnit v-for="(Company, index) in CompanyList" :key="index" :company-data="Company">
                    </CompanyUnit>
                </el-tab-pane>
                <el-tab-pane label="岗位列表" name="position">
                    <PostPositionUnit v-for="(Position, index) in PositionList" :key="index" :post-data="Position">
                    </PostPositionUnit>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import PostUserUnit from '../components/PostUserUnit.vue'
import PostPositionUnit from '../components/PostPositionUnit.vue'
import CompanyUnit from '../components/CompanyUnit.vue'
import { SearchCompany, SearchUser, SearchPosition } from '@/api/api'
export default {
    data() {
        return {
            select: '1',
            input: '',
            NotAllowSearch: true,
            UserList: [],
            CompanyList: [],
            PositionList: [],
            searchField: { "type": '', "keywords": '' },
            activeName: 'role'
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
        SearchUser(keyword) {
            console.log("2")
            console.log(keyword)
            SearchUser(keyword).then(res => {
                this.UserList = res.data
                console.log(this.UserList)
                console.log(res.data)
            })
            console.log(this.UserList)
            this.select = "1"
            this.activeName = 'user'
        },
        SearchCompany(keyword) {
            console.log("1")
            let data = { "keywords": keyword }
            SearchCompany(data).then(res => {
                this.CompanyList = res.data.data
                console.log(this.CompanyList)
                console.log(res.data.data)
            })
            this.select = "2"
            this.activeName = 'company'
        },
        SearchPosition(keyword) {
            let data = { "keywords": keyword }
            SearchPosition(data).then(res => {
                this.PositionList = res.data.data
                console.log(res.data.data)
            })
            this.select = "3"
            this.activeName = 'position'
        },
        Search() {
            console.log(this.select)
            switch (this.select) {
                case '1':
                    this.SearchUser(this.input)
                    break
                case '2':
                    this.SearchCompany(this.input)
                    break
                case '3':
                    this.SearchPosition(this.input)
                    break
            }
        }
    },
    async mounted() {
        if (this.$store.getters.searchButtonClicked) {
            // 调用接口
            console.log("in new page")
            let data = JSON.parse(localStorage.getItem("searchField"))
            console.log(data.type)
            if (data.type === 'user') {
                this.activeName = 'user'
                this.select = "1"
                console.log("we see u")
                await this.SearchUser(data.keywords).then(res => {
                    console.log(res)
                    this.UserList = res.data
                })
                if (this.userList.length === 0) {
                    this.$notify({
                        title: '提示',
                        message: '未找到相关用户',
                        type: 'warning'
                    });
                }
            }
            if (data.type == 'company') {
                this.activeName = 'company'
                this.select = "2"
                await this.SearchCompany(data.keywords).then(res => {
                    console.log(res)
                    this.CompanyList = res.data
                })
                if (this.CompanyList.length === 0) {
                    this.$notify({
                        title: '提示',
                        message: '未找到相关企业',
                        type: 'warning'
                    });
                }
            }
            if (data.type == 'position') {
                this.activeName = 'position'
                this.select = "3"
                await this.SearchPosition(data.keywords).then(res => {
                    console.log(res)
                    this.PositionList = res.data
                })
                if (this.PositionList.length === 0) {
                    this.$notify({
                        title: '提示',
                        message: '未找到相关岗位',
                        type: 'warning'
                    });
                }
            }
            // 重置状态
            this.$store.dispatch('updateButtonClicked', false);
        }
    },
    components: {
        PostUserUnit,
        CompanyUnit,
        PostPositionUnit
    }
}
</script>

<style lang="scss" scoped>
.upper-bar {
    width: 80%;
    margin: 20px auto;
    height: 130px;
    background-color: null;
    // overflow: hidden;
    position: relative;
    border-radius: 10px;
}

.search-bar {
    margin: 20px -400px;
    float: left;
    position: absolute;
    left: 50%;
    top: 15%;
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

.table {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
}

/deep/ .el-tabs__item {
    font-size: 20px;
    /* 设置你想要的字体大小 */
}

/deep/ .el-tabs__header {
    border-radius: 15px 15px 0 0;
    overflow: hidden;
    /* To ensure the rounded corners are visible */
}

/deep/ .el-tabs__item {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

/deep/ .el-tabs__content {
    border-radius: 0 0 15px 15px;
    border-top: none;
    /* To remove the top border between tabs and content */
}
</style>