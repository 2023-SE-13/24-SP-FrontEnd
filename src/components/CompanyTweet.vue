<template>
  <div class="tweets-container">
    <h2>员工动态</h2>
    <div class="tweets-list">
      <div class="author-container">
        <div class="author">
          <el-avatar shape="circle" :size="60" :src="photo"></el-avatar>
          <div class="name">
            <span id="name">{{this.username}}</span>
            <span id="date">{{this.date}}</span>
          </div>
        </div>
      </div>
      <div class="content-container">
        <div class="content">
          <div class="text">
            {{this.text}}
          </div>
          <div class="image">
            <el-image
                v-for="(item, index) in images"
                :key="index"
                :src="item.url"
                :preview-src-list="images.map(item => item.url)"
                style="width: 145px; height: 145px;border-radius: 10px;margin: 1px"
                fit="contain">
            </el-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import photo from "@/assets/photo.png";
import op from "@/assets/op.jpg";

export default {
  name: 'companyTweets',
  data() {
    return {
      username: "Tadaoni",
      date: "2021-09-01",
      photo: photo,
      op: op,
      text: "在遥远的星系中，有一个名为Zorgon的星球，那里的居民是一群爱好和平的生物，他们拥有高度发达的科技和魔法。Zorgon星的居民们每天都会进行各种奇妙的活动，比如在天空中飞行的花园里种植奇异的植物，或者在水下城市中与五彩斑斓的海洋生物共舞。他们的生活充满了和谐与欢乐，直到有一天，一个名为Gorgomoth的黑暗势力从宇宙的另一端降临，企图征服整个星系。" +
          "Gorgomoth拥有强大的力量和邪恶的魔法，他的目标是将所有的星球都置于他的统治之下。Zorgon星的居民们意识到了这个威胁，他们决定团结起来，共同对抗这个强大的敌人。他们中的一些勇敢的战士，比如勇敢的Kimi勇士，踏上了寻找古老传说中的神器的旅程，这个神器据说拥有能够抵御Gorgomoth的力量。" +
          "Kimi勇士和他的伙伴们穿越了无数的星系和维度，经历了无数的试炼和冒险。他们遇到了各种各样的生物，有的友好，有的敌对。他们学会了如何使用古老的魔法，如何与自然和谐共处，以及如何团结一心，共同面对困难。在他们的旅途中，他们也发现了Gorgomoth的弱点，并制定了一个计划来打败他。" +
          "最终，在一场史诗般的战斗中，Kimi勇士和他的伙伴们使用了神器的力量，成功地击退了Gorgomoth，保护了Zorgon星球和整个星系的和平。他们的英勇事迹被传唱在每一个角落，成为了永恒的传说。",
      images: [
        {
          url: op,
          name: "photo"
        },
        {
          url: photo,
          name: "photo"
        },
        {
          url: op,
          name: "photo"
        },
        {
          url: photo,
          name: "photo"
        },
        {
          url: op,
          name: "photo"
        }
      ]
    };
  }
};
</script>

<style scoped>
.tweets-container {
  flex-direction: row;
  justify-content: space-between;
}

.tweets-list {
  background-color: #ffffff;
  padding: 2px 15px 65px 15px;
  border-radius: 12px;
  margin-top: 18px;
  width: 27%;
  min-height: 400px;
  height: auto;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  margin-top: 1%;
}

p, ul {
  background-color: #f9f9f9;
  border-radius: 5px;
  text-align: left;
  padding: 10px 25px 10px 25px;
}

li {
  margin-bottom: 5px;
}
</style>
