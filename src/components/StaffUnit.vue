<template>
    <div class="staff-unit">
        <div class="upper-box">
            <el-avatar shape="square" :size="55" :src="photoSrc"></el-avatar>
            <div class="text-container">
                <span class="comp-name">{{ staffData.user.real_name }}</span>
                <span v-if="staffData.role === 'Admin'" class="sub-num">管理员</span>
                <span v-else class="sub-num">员工</span>
                <!-- <span class="sub-num">工龄:10年</span> -->
            </div>

        </div>
        <div class="lower-box">
            <div v-show="staffData.role !== 'Admin'">
                <el-tooltip content="开除员工">
                    <el-button id="del" circle @click="DeleteStaff"><i class="el-icon-delete"></i></el-button>
                </el-tooltip>
                <el-tooltip content="转让管理员权限">
                    <el-button circle @click="Trans"><i class="el-icon-sort"></i></el-button>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>
<script>
import { deleteStaff } from "@/api/api";
import { TransAdmin } from "@/api/api";
export default {
    data() {
        return {
            photoSrc:`http://10.251.253.188/avatar/${this.staffData.user.username}_avatar.png`
        }
    },
    props: {
        staffData: {

        }
    },
    created() {
        console.log("staffData:" + this.staffData.user.username)
    },
    methods: {
        DeleteStaff() {
            let data = {
                username: this.staffData.user.username,
                company_id: localStorage.getItem("company_id")
            }
            deleteStaff(data, localStorage.getItem("token")).then(res => {
                if (res.data.status === "success") {
                    this.$notify({
                        title: '提示',
                        message: '开除成功',
                        type: 'success'
                    });
                }
            },
                error => {
                    this.$notify({
                        title: '提示',
                        message: '开除失败',
                        type: 'warning'
                    });
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                })
        },
        Trans() {
            let data = {
                company_id: localStorage.getItem("company_id"),
                username: this.staffData.user.username,
            }
            console.log(data)
            console.log(localStorage.getItem("token"))
            TransAdmin(data, localStorage.getItem("token")).then(res => {
                if (res.data.status === "success") {
                    this.$notify({
                        title: '提示',
                        message: '管理员身份转换成功,即将跳转到首页',
                        type: 'success'
                    });
                    setTimeout(() => {
                        // location.reload()
                        this.$router.push('/main').then(location.reload())
                    }, 1000)
                }
            },
                error => {
                    this.$notify({
                        title: '提示',
                        message: '设置失败',
                        type: 'warning'
                    });
                })
        }
    }
}
</script>
<style lang="scss" scoped>
#del{
    margin-left: 200px;
}
.staff-unit {
    width: 290px;
    height: 145px;
    background-color: rgb(222, 217, 217);
    border-radius: 10px;
    transition: 0.5s;
    float: left;
    box-sizing: border-box;
    margin-right: 0;
    margin-bottom: 0;
    margin-left: 15px;
}

.staff-unit:hover {
    box-shadow: 10px 10px 20px 0px rgba(98, 92, 92, 0.3);
}

.sub-num {
    // background-color: aqua;
    font-size: 14px;
    color: #666;
    margin-top: 5px;

}

.comp-name {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    // margin-top: -20px;
    text-overflow: ellipsis;
    max-width: 100px;
    // min-width: 150px;
    // min-width: 100px;
    text-wrap: nowrap;
}

.upper-box {
    height: 100px;
    display: flex;
    align-items: center;
    // padding: 10px;
}

.text-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.el-avatar {
    float: left;
    margin: 20px 20px;
}

// .upper-box span {
//     display: block;
//     float: left;
//     margin-top: 20px;
// }

.lower-box {
    height: 45px;
    background-color: #f6fcfc;
    border-radius: 0 0 10px 10px;
    display: flex;
    align-items: flex-start;
    font-size: 15px;
    color: #666;

}

.lower-box {
    .el-button {
        transition: 0.5s;
        border: none;
        background-color: #f6fcfc;
        
    }
    .el-button:hover{
        background-color: #e9e3e3;
    }
}

.lower-box span {
    max-width: 280px;
    // min-width: 100px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.description {
    margin-top: 10px;
    margin-left: 20px;
}

.divider {
    display: inline-block;
    height: 20px;
    /* 可根据需要调整 */
    width: 1px;
    background-color: #c0c0c0;
    margin: 0 20px;
    /* 可根据需要调整 */
    vertical-align: middle;
}
</style>