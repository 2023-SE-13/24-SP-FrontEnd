<template>
    <div class="post-unit" @click="showPostView">
        <div class="upper-box">
            <span class="post">{{ PostData.position_name }}</span>
            <span class="salary">{{ PostData.salary_min  }}-{{ PostData.salary_max }}</span>
        </div>
        <div class="lower-box">
            <span class="company_name">{{ PostData.company_name }}</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: {
        PostData: {
        }
    },
    methods: {
        showPostView() {
            console.log(this.PostData)
            this.$router.push('/PostView/' + this.PostData.position_id);
        }
    },
}
</script>
<style lang="scss" scoped>
.post-unit {
    width: 200px;
    height: 110px;
    background-color: white;
    margin-left: 20px;
    margin-top: 20px;
    float: left;
    border-radius: 10px;
    transition: 0.5s;
}
.post-unit:hover{
    box-shadow: 10px 10px 20px 0 rgba(98, 92, 92, 0.3);
}
.upper-box {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // padding: 10px;
}
.lower-box {
    height: 30px;
    background-color: #f6fcfc;
    border-radius: 0 0 10px 10px;
    display: flex;
    align-items: flex-start;
    font-size: 18px;
    color: #666;
}
.lower-box span{
    display: inline-block;
    margin-left: 20px;
    margin-top: 0;
}
.post{
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    color: black;
    margin-top: -20px;
    margin-left: 20px;
    // white-space: nowrap; 
    width: 50%; 
    text-align: left;
}
.salary{
    // float: right;
    //font-size: 25px0px;
    font-weight: 400;
    color: #fe586d;
    margin-top: -20px;
    margin-right: 20px;
    display: flex;  
    justify-content: flex-end; /* 水平方向右对齐 */  
}
</style>