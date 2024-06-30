<template>
    <div class="man-unit" @click="getapply">
        <div class="upper">
            <span>{{postData.position_name}}</span>
            <div class="buttons">
                <el-button @click="deletepost"><i class="el-icon-delete"></i></el-button>
                <el-button @click="editPost"> <i class="el-icon-edit"></i></el-button>
            </div>
        </div>

        <div class="middle">
            <div class="middle-text">  
                <span class="req-text">{{postData.location}}</span>
                <span class="divider"></span>
                <span class="req-text">{{postData.education_requirement}}</span>
                <span class="divider"></span>
                <span class="req-text">{{postData.salary_min}}-{{salary_max}}</span>
            </div>
        </div>
        <div class="tags">
            dasdasd
        </div>
        <div class="lower">
            <span>{{postData.position_description}}</span>
            <span>申请数:{{ postData.application_count }}</span>
            <span>发布于 {{ postData.posted_at }}</span>
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
.middle-text{
    margin-left: 10px;
}
.tags {
    display: flex;
    justify-content: space-around;
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

.man-unit {

    width: 90%;
    height: 150px;
    background-color:white;
    margin-bottom: 15px;
    border-radius: 10px;
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
}

.upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: #f8f8f8;
    // padding: 0 0;

}

.upper span {
    margin-left: 10%;
}

.buttons {
    display: flex;
    gap: 10px;
 
}
.buttons .el-button{
    border: none;
    background-color:#f8f8f8;
}

.middle,
.lower {
    display: flex;
    // justify-content: space-around;\
    
}
.tags{
    height: 20px;
}
.lower{
    height: 60px;
}
.middle {
    height: 20px;
    justify-content: flex-start;
    gap:10px;
    font-size: 14px;
    background-color: #f8f8f8;
}

.req-text{
    color: #666666;
    font-weight: 500;
}

.middle .req-text:not(:last-child)::after {
    content: "";
    position: absolute;
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
    height: 12px;
    width: 1px;
    background-color: #aa9d9d;
}
</style>