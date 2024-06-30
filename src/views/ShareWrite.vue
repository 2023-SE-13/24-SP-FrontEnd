<template>
  <div>
    <div id="body">
      <div id="EditZone">
        <div id="EditZoneTop">
          <span id="BackBtn" @click="back"><i class="el-icon-back"> 返回</i></span>
          <span id="Submit" @click="submit">发布</span>
        </div>
        <el-divider></el-divider>
        <div id="EditZoneMiddle">
          <el-input
              id="shareContent"
              type="textarea"
              autosize
              resize="none"
              placeholder="分享点什么吧"
              v-model="shareContent">
          </el-input>
        </div>
        <div id="EditZoneMiddleB" v-if="imgVisible">
          <el-upload
              id="picCard"
              action="#"
              show-file-list
              :file-list="imgList"
              :on-change="handleChange"
              :on-remove="handleRemove"
              :on-preview="handlePreview"
              :auto-upload="false"
              list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="imgUrl" alt="">
          </el-dialog>
        </div>
        <div id="EditZoneBottom">
          <span id="uploadIcon">
            <el-upload
                :show-file-list="false"
                :file-list="imgList"
                :auto-upload = "false"
                :on-change="handleChangeIcon"
                :on-remove="handleRemove"
                :on-preview="handlePreview"
                list-type="picture"
            >
              <i class="el-icon-picture-outline-round"> 图片</i>
            </el-upload>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {publishTweet} from "@/api/api";

export default {
  name: "ShareWrite",
  created() {
    this.token = localStorage.getItem("token");
    this.shareContent = "";
    this.imgVisible = false;
    this.imgUrl = "";
    this.dialogVisible = false;
    this.imgList = [];
  },
  data() {
    return {
      token: "",
      shareContent: "",
      imgVisible: false,
      imgUrl: "",
      dialogVisible: false,
      imgList: [],
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    submit() {
      this.$confirm("是否发布此条动态？", "确认发布", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      }).then(() => {
        const formData = new FormData();
        for(let i = 0; i < this.imgList.length; i++) {
          const file = this.imgList[i];
          const reader = new FileReader();
          reader.readAsDataURL(file.raw);
          reader.onload = () => {
            file.url = reader.result;
          }
          this.imgList[i] = file.raw;
        }
        console.log(this.imgList);
        formData.append("photos", this.imgList[0]);
        formData.append("text_content", this.shareContent);
        publishTweet(formData, this.token).then(res => {
          if (res.data.status === "success") {
            this.$notify({
              title: "成功",
              message: "发布动态成功！",
              type: "success"
            });
            this.$router.back();
          }
        },
            error => {
              console.log("发布动态失败", error);
              this.$notify({
                title: "失败",
                message: "发布动态失败！",
                type: "error"
              });
            }
        );
      }).catch(() => {
        this.$notify({
          title: "取消",
          message: "取消发布动态",
          type: "info"
        });
      });
    },
    handleChange(file, fileList) {
      for(let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = () => {
          file.url = reader.result;
        }
      }
      this.imgList = fileList;
    },
    handleChangeIcon(file, fileList) {
      for(let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = () => {
          file.url = reader.result;
        }
      }
      this.imgList = fileList;
      this.imgVisible = true;
    },
    handleRemove(file, fileList) {
      this.imgList = fileList;
      if (fileList.length === 0) {
        this.imgVisible = false;
      }
    },
    handlePreview(file) {
      this.imgUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style scoped>
  ::-webkit-scrollbar-thumb {
    background: #00BAB7; /* 滚动条的颜色 */
    border-radius: 10px; /* 设置滚动条的圆角 */
  }
  #body {
    height: 93vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: rgba(211, 233, 232, 0.9);
  }
  #EditZone {
    width: 70%;
    min-height: calc(70% - 70px);
    max-height: 90%;
    padding: 0 2%;
    background-color: #fefefe;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  #EditZoneTop {
    width: 100%;
    height: 47px;
    display: flex;
    flex-direction: row;
    justify-items: flex-start;
    align-items: center;
  }
  #BackBtn {
    font-size: 20px;
    color: rgba(114, 114, 114, 0.6);
  }
  #Submit {
    width: 6%;
    height: 60%;
    border-radius: 5px;
    font-size: 15px;
    color: #fff;
    background-color: #00BAB7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 85%;
  }
  #BackBtn:hover {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.8);
  }
  #Submit:hover {
    cursor: pointer;
    background-color: #009c9f;
  }
  .el-divider {
    margin: 0;
  }
  #EditZoneMiddle {
    width: 100%;
    min-height: 310px;
    max-height: 419px;
  }
  ::v-deep #shareContent {
    width: 100%;
    padding: 10px 0 0 0;
    min-height: 300px;
    max-height: 409px;
    border: none;
    font-size: 18px;
    font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
    color: #333;
  }
  ::v-deep #shareContent::-webkit-scrollbar {
    width: 10px;
  }
  ::v-deep #shareContent::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::v-deep #shareContent::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 5px;
  }
  ::v-deep #shareContent::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
  #EditZoneMiddleB {
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  #picCard {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  ::v-deep .el-upload--picture-card {
    width: 70px;
    height: 70px;
    border: 1px dashed rgba(221, 221, 221, 0.8);
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  ::v-deep .el-upload--picture-card i {
    font-size: 24px;
    color: rgba(221, 221, 221, 0.8);
  }
  ::v-deep .el-upload--picture-card:hover {
    border-color: #00BAB7;
  }
  ::v-deep .el-upload--picture-card:hover i {
    color: #00BAB7;
  }
  ::v-deep .el-upload-list {
    max-height: 70px;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  ::v-deep .el-upload-list--picture-card .el-upload-list__item {
    width: 70px;
    height: 70px;
    margin: 0 10px 0 0;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  ::v-deep .el-upload-list--picture-card .el-upload-list__item:hover {
    border-color: #00BAB7;
  }
  #EditZoneBottom {
    width: 100%;
    height: 47px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  #uploadIcon {
    color: #222;
    font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
    font-weight: bolder;
    font-size: 16px;
  }
  #uploadIcon:hover {
    cursor: pointer;
    color: #00BAB7;
  }
</style>
