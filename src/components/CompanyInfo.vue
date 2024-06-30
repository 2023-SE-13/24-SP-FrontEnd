<template>
    <div class="company-info">
        <span>{{ company_name }}</span>
        <span>{{ company_description }}</span>
        <el-button type="text" @click="dialogVisible = true">编辑</el-button>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="compForm" status-icon ref="form" label-width="100px">
                <el-form-item label="企业名称">
                    <el-input type="password" v-model="compForm.company_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="企业描述">
                    <el-input type="password" v-model="compForm.company_description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model.number="compForm.age"></el-input>
                </el-form-item>

            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { getCompany } from '@/api/api';
export default {
    data() {
        return {
            company_name: '',
            company_description: '',
            dialogVisible: false,
            compForm: {
                company_name: '',
                company_description: '',
                age: ''
            },

        }
    },
    created() {
        getCompany(localStorage.getItem('company_id')).then(res => {
            console.log(res.data.data)
            this.company_name = res.data.data.company_name
            this.company_description = res.data.data.company_description
        })
    }
}
</script>
<style lang="scss" scoped>
.company-info {
    width: 100%;
    height: 80vh;
    background-color: white;
    border-radius: 20px;

}
</style>