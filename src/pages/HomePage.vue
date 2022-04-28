<template>
  <div id="page">
    <Banner />
    <V-Filter />
    <SideBar />
    <VideoList />
    <div class="fouseGroup">
      <Focus v-for="(i, index) in mess" :key="index" :mess="i" />
    </div>
  </div>
</template>

<script>
// 引入页面组件
import Banner from "../components/Home.vue";
import Filter from "../components/FilterRow.vue";
import SideBar from "../components/SideBar.vue";
import VideoList from "../components/VideoList.vue";
import Focus from "../components/Focus.vue";

export default {
  name: "HomePage",
  data() {
    return {
      mess: [],
    };
  },
  components: {
    Banner,
    "V-Filter": Filter,
    SideBar,
    VideoList,
    Focus,
  },
  mounted() {
    this.$bus.$on("sendFouseMess", (m) => {
      this.mess = m;
    });
    // 返回到该页面时，需要问app要数据
    this.$bus.$emit("giveFouseMess");
  },
};
</script>

<style scoped>
#page {
  min-height: 100vh;
}
.fouseGroup {
  padding-bottom: 500px;
  background: #f8f8f8;
  /* z-index: 15; */
}
</style>
