<template>
    <div class="staff-list scrollable">
            <div class="search">
              <span>管理员</span>
              <div>
                <el-input placeholder="搜索员工" v-model="input" class="input-with-select">
                    <el-button slot="append" style="background-color:#3BD4D4;color:white" id="search-button" icon="el-icon-search" @click="Search" ref="button">添加</el-button>
                </el-input>
              </div>
            </div>
            <StaffUnit v-for="(adminStaff,index) in adminList" :key="index" :staff-data="adminStaff"></StaffUnit>
            <span>员工</span>
            <StaffUnit v-for="(normalStaff,index) in staffList" :key="index" :staff-data="normalStaff"></StaffUnit>
    </div>
</template>
<script>
import StaffUnit from '@/components/StaffUnit.vue'
import { getCompanyEmployee } from '@/api/api';
import {addEmployee} from "@/api/api";
export default {
    data() {
        return {
            empList:[],
            input: '',
            token: localStorage.getItem('token'),
            company_id: localStorage.getItem('company_id')
        }
    },
    components: {
        StaffUnit
    },
    created(){
        getCompanyEmployee(localStorage.getItem("company_id")).then(res=>{
            console.log(res.data.data)
            this.empList = res.data.data
        })
    },
    computed:{
        adminList(){
            return this.empList.filter(item => item.role ==='Admin');
        },
        staffList(){
            return this.empList.filter(item => item.role !=='Admin');
        }
    },
  methods: {
    Search() {
        if(this.input === ''){
            this.$notify({
                title: '提示',
                message: '请输入搜索内容',
                type: 'warning'
            });
            return;
        }
        addEmployee(this.token, this.input, this.company_id).then(res => {
              if(res.data.status === "success") {
                this.$notify({
                  title: '提示',
                  message: '添加成功',
                  type: 'success'
                });
                getCompanyEmployee(localStorage.getItem("company_id")).then(res => {
                  console.log(res.data.data)
                  this.empList = res.data.data
                })
              }
            },
            err=>{
              if(err.response.status === 404){
                this.$notify({
                  title: '提示',
                  message: '未查到该用户',
                  type: 'error'
                });
              }else {
                this.$notify({
                  title: '提示',
                  message: '添加失败',
                  type: 'error'
                });
              }
            }
        )
    }
  }
}
</script>
<style lang="scss" scoped>

.staff-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    height: 80vh;
    background-color: white;
    border-radius: 20px;
    padding: 15px;
    gap: 15px;
    row-gap: 15px;
    /* 设置行之间的间距 */
    overflow-y: auto;
}

.staff-list span {
    display: block;
    width: 100%;
    text-align: left;
    font-size: 30px;
    font-weight: 900;
    margin-left: 15px;
}
/* 自定义滚动条样式 */
.scrollable {
    overflow-y: auto;
    /* 启用垂直滚动 */
    transition: 0.5s;
    overflow-x: hidden;
}

.scrollable::-webkit-scrollbar {
    width: 5px;
    /* 滚动条宽度 */
}

.scrollable::-webkit-scrollbar-track {
    background: #f1f1f1;
    /* 滚动条轨道背景 */
    border-radius: 10px;
}

.scrollable::-webkit-scrollbar-thumb {
    background: #888;
    /* 滚动条滑块背景 */
    border-radius: 10px;
}

.scrollable::-webkit-scrollbar-thumb:hover {
    background: #555;
    /* 滚动条滑块悬停背景 */
}

.search{
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    font-size: 20px;
    font-weight: 900;
    color: black;
    border-radius: 20px;
    margin-bottom: 15px;
}
</style>