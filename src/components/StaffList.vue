<template>
    <div class="staff-list scrollable">
            <span>管理员</span>
            <StaffUnit v-for="(adminStaff,index) in adminList" :key="index" :staff-data="adminStaff"></StaffUnit>
            <span>员工</span>
            <StaffUnit v-for="(normalStaff,index) in staffList" :key="index" :staff-data="normalStaff"></StaffUnit>

    </div>
</template>
<script>
import StaffUnit from '@/components/StaffUnit.vue'
import { getCompanyEmployee } from '@/api/api';
export default {
    data() {
        return {
            empList:[]
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
</style>