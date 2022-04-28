<template>
  <div id="Focus">
    <div class="header">
      <span class="title" @click="smooth(i)">{{ mess.subject }}</span>
      <span class="num">共{{Object.keys(mess.groups).length}}个分组</span>
    </div>

    <div class="contant" v-for="(sub, i) in mess.groups" :key="i">
      <p>{{ sub.name }} <span>共{{sub.list.length}}个列表</span> </p>

      <div class="swiperDiv">
        <Swiper :list = sub.list />
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "./Swiper.vue";

export default {
  name: "WelcomeFocus",
  props: ["mess"],
  components: {
    Swiper,
  },
  methods: {
    // 点击标题自动滑动
    smooth(i) {
      window.scrollTo({
        top: document.querySelectorAll("#Focus")[i - 1].offsetTop - 10,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
#Focus {
  position: relative;
  padding: 50px calc(5vw + 10px);

}
.header {
  font-size: 24px;
  border-bottom: 1px solid #d3d3d3;
  padding: 20px 0;
}
.header .num {
  font-size: 18px;
  margin-left: 10px;
}
.title {
  user-select: none;
  cursor: pointer;
}
.contant {
  /* background-color: skyblue; */
  padding: 20px;
  border-bottom: 2px solid #e9e9e9;
  position: relative;
}
.contant:last-child {
border: 0;
}
.contant p {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.contant p span {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}
.swiperDiv {
  height: 190px;
  width: 100%;
}
</style>