<template>
    <div class="company-info">
        <span>企业名</span>
        <span>企业描述</span>
        <el-button>编辑</el-button>
    </div>
</template>
<script>
import { getCompany } from '@/api/api';
export default {
    data() {
        return {

        }
    },
    created(){
        getCompany(localStorage.getItem('company_id')).then(res=>{
            console.log(res)
        })
    }
}
</script>
<style lang="scss" scoped>
.company-info{
    width: 100%;
    height: 80vh;
    background-color: white;
    border-radius: 20px;

}
</style>