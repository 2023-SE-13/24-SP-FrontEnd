<template>
    <div class="company-info">

        <div>
            <el-avatar class="profile" shape="square" :size="150" :src="photoSrc"></el-avatar>

        </div>
        <div class="intro-box">
            <h2>企业名称</h2>
            <p>{{ company_name }}</p>
            <h2>企业描述</h2>
            <p>{{ company_description }}</p>

        </div>
        <el-tooltip content="编辑企业信息"><el-button circle class="edit-btn" type="text" @click="dialogVisible = true"><i class="el-icon-edit"></i></el-button></el-tooltip>

        <el-dialog title="编辑企业资料" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="compForm" :rules="rules" status-icon ref="compForm" label-width="100px">
                <el-form-item label="企业名称" prop="company_name">
                    <el-input v-model="compForm.company_name"></el-input>
                </el-form-item>
                <el-form-item label="企业描述" prop="company_description">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="compForm.company_description">
                    </el-input>
                </el-form-item>

                <el-form-item label="上传头像">
                    <div id="logo" class="upload-avatar">
                        <el-upload ref="avatar_upload" :on-change="handleChange" :limit="1" :file-list="fileList"
                            :show-file-list="false" :auto-upload="false">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div v-if="fileList.length" class="uploaded-file-name">
                                <img src="path/to/icon.png" alt="文件图标" class="file-icon" />
                                {{ fileList[0].name }}
                            </div>
                        </el-upload>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editCancel">取 消</el-button>
                <el-button type="primary" @click="editSuccess(compForm)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getCompany, UpdateCompanyInfo, uploadLogo } from '@/api/api';
export default {
    data() {
        return {
            photoSrc: `http://10.251.253.188/logo/${localStorage.getItem('company_id')}_image.png`,
            photo_url: '',
            fileList: [],// 初始化文件列表
            photo_file: null,
            company_name: '',
            company_description: '',
            dialogVisible: false,
            compForm: {
                company_name: '',
                company_description: '',
            },
            rules: {
                company_name: [
                    { required: true, message: "请输入企业", trigger: "change" }
                ],
                company_description: [
                    { required: true, message: "请输入企业描述", trigger: "change" }
                ]
            },
        }
    },
    watch: {
        photo_file: {
            handler: function () {
                let data = new FormData();
                console.log(this.photo_file)
                data.append("logo", this.photo_file);
                uploadLogo(data, localStorage.getItem('token')).then(res => {
                    if (res.data.status === "success") {
                        this.$notify({
                            title: "成功",
                            message: "上传成功",
                            type: "success"
                        });
                        // setTimeout(() => {
                        //     this.$router.go(0);
                        // }, 1000);
                    }
                    this.token = localStorage.getItem("token");
                    let string = "http://10.251.253.188/logo/" + localStorage.getItem('company_id') + "_image.png"
                    this.photo_url = string;
                },
                    error => {
                        console.log("上传失败", error);
                    }
                );
            }
        }
    },
    created() {
        this.token = localStorage.getItem("token");
        let string = "http://10.251.253.188/logo/" + localStorage.getItem('company_id') + "_image.png"
        this.photo_url = string;
        console.log(localStorage.getItem('company_id'))
        getCompany(localStorage.getItem('company_id')).then(res => {
            console.log(res.data.data)
            this.company_name = res.data.data.company_name
            this.company_description = res.data.data.company_description
            this.compForm.company_name = res.data.data.company_name
            this.compForm.company_description = res.data.data.company_description
        })
    },
    methods: {
        handleChange(file, fileList) {
            //必须是图片格式
            this.fileList = fileList.slice(-1); // 只保留最新上传的文件
            const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png' || file.raw.type === 'image/jpg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('只能上传图片格式文件!');
                return;
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
                return;
            }
            this.photo_file = file.raw;
        },
        editCancel() {
            this.dialogVisible = false;
        },
        editSuccess() {
            this.$refs["compForm"].validate(valid => {
                console.log("wojinlaile")
                if (valid) {
                    console.log(this.compForm)
                    UpdateCompanyInfo(this.compForm, localStorage.getItem('token')).then(res => {
                        if (res.data.status === "success") {
                            this.$notify({
                                title: "成功",
                                message: "修改成功",
                                type: "success"
                            });
                        }
                    },
                        error => {
                            if (error.response.status === 401) {
                                this.$notify({
                                    title: "错误",
                                    message: "修改错误",
                                    type: "error"
                                });
                            }
                        }
                    );
                    this.dialogVisible = false;
                }
            });
        },
    }
}
</script>
<style lang="scss" scoped>
.profile{
    position: absolute;
    top: 5%;
    left: 5%;
}
.intro-box {
    background-color: #ffffff;
    //   padding: 15px 40px 15px 45px;
    border-radius: 12px;
    width: 90%;
    min-height: 400px;
    height: auto;
    position: absolute;
    top: 30%;
    left: 5%;
}
.edit-btn{
    position: absolute;
    top:10%;
    right: 5%;
    transition: 0.5s;
    width: 50px;
    height: 50px;
    font-size: 26px;
}
.edit-btn:hover{
    background-color: #e8e3e3;
}
h2 {
    font-size: 1.6em;
    margin-bottom: 10px;
    margin-top: 1%;
    text-align: left;
}

p,
ul {
    background-color: #f6f6f7;
    border-radius: 5px;
    text-align: left;
    padding: 10px 0 10px 25px;
    margin: 20px 0 25px 10px;
}

li {
    margin-bottom: 5px;
}

.company-info {
    display: flex;
    align-items: center;
    padding: 20px;
    width: 100%;
    height: 80vh;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: relative;
}


.upload-avatar {
    display: flex;
    align-items: center;

    .uploaded-file-name {
        display: flex;
        align-items: center;
        margin-left: 10px; // 调整间距使其美观
    }

    .file-icon {
        width: 16px; // 调整图标大小
        height: 16px; // 调整图标大小
        margin-right: 5px; // 图标和文件名之间的间距
    }

    label {
        margin-right: 10px; // 调整间距使其美观
    }
}

.company-info {
    width: 100%;
    height: 80vh;
    background-color: white;
    border-radius: 20px;

}
</style>