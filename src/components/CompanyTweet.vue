<template>
  <div class="tweets-container">
    <div class="tweets-list">
      <h2>员工动态</h2>

    </div>
  </div>
</template>

<script>

export default {
  name: 'companyTweets',
  data() {
    return {}
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
  width: 93.5%;
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
