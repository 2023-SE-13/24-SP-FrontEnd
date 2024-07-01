<template>
    <div class="man-unit" @click="getapply">
        <div class="upper">
            <span style="font-weight:600;">{{postData.position_name}}</span>
            <div class="buttons">
                <el-button style="background-color: #00B4B3" @click="deletepost"><i class="el-icon-delete"></i></el-button>
                <el-button style="background-color: #00B4B3" @click="editPost"> <i class="el-icon-edit"></i></el-button>
            </div>
        </div>
        <div class="middle">
            <div class="middle-text">  
                <span class="req-text">职位所在地：{{postData.location}}</span>
                <span class="req-text">学历要求：{{postData.education_requirement}}</span>
                <span class="req-text">薪资：{{postData.salary_min}}-{{postData.salary_max}}</span>
                <span class="req-text" style="text-align: left">职位描述：{{postData.position_description}}</span>
                <span class="req-text">申请数:{{ postData.application_count }}</span>
                <span class="req-text">发布于{{ postData.posted_at}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props:{
        postData:{

        }
    },
    created(){
        console.log(this.postData)
    },
    methods:{
        deletepost(){
            event.stopPropagation();
            this.$emit("delete-clicked",this.postData.position_id)
        },
        getapply(){
            this.$emit("get-apply",this.postData.position_id)
        },
        editPost(){
            event.stopPropagation();
            this.$emit("edit-clicked",this.postData)
        }
    }
}
</script>
<style lang="scss" scoped>

.man-unit {
  width: 90%;
  min-height: 200px;
  background-color:white;
  margin-bottom: 15px;
  border-radius: 10px;
  margin-left: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  font-family: PingFang SC,HarmonyOS_Regular,Helvetica Neue,Microsoft YaHei,sans-serif!important;
}

.middle-text{
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.divider {
    display: inline-block;
    height: 18px;
    /* 可根据需要调整 */
    width: 1px;
    background-color: #666666;
    margin: 0 10px;
    /* 可根据需要调整 */
    vertical-align: middle;
}

.upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: #00B4B3;
    border-radius: 10px 10px 0 0;
    // padding: 0 0;

}

.upper span {
    margin-left: 10px;
}

.buttons {
    display: flex;
    gap: 10px;
 
}
.buttons .el-button{
    border: none;
    background-color:#f8f8f8;
}

.lower{
  margin-left: 10px;
    min-height: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  background: #f8f8f8;
}
.middle {
    min-height: 20px;
    justify-content: flex-start;
    gap:10px;
    font-size: 14px;
    background-color: #D5E9E9;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 0 0 5px 5px;
}

.req-text{
    color: #666666;
    font-weight: 500;
    text-align: left;
    margin-bottom: 10px;
}
</style>