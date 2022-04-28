<template>
  <div class="siderNav" :style="`opacity:${opacity}`">
    <div class="box" @click="smooth(1)"></div>
    <div class="box" @click="smooth(2)"></div>
    <div class="box" @click="smooth(3)"></div>
  </div>
</template>

<script>
import VanillaTilt from "vanilla-tilt";
export default {
  name: "SideBar",
  data() {
    return {
      opacity: 0,
    };
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; // 滚动条偏移量
      let el = document.querySelector(".button");
      let offsetTop = 0;
      while (el && el.tagName !== "BODY") {
        offsetTop += el.offsetTop;
        el = el.offsetParent;
      }
      // 左右两边同时减去250，使至少滚动250px后才开始有效果
      this.opacity = (scrollTop - 250) / (offsetTop - 20 - 250);
      let max = document.querySelector("footer").offsetTop + 300;
      max -= window.innerHeight;
      if (scrollTop >= max - 200) {
        this.opacity = (max - scrollTop) / 200;
      }

      if (this.opacity <= 0) {
        document.querySelector(".siderNav").style.display = "none";
      } else {
        document.querySelector(".siderNav").style.display = "flex";
      }
    },
    smooth(s) {
      if (s == 1) {
        s = 0;
      } else if (s == 2) {
        s = document.querySelector("#Focus").offsetTop - 10;
      } else {
        s = document.querySelector("footer").offsetTop;
      }
      window.scrollTo({
        top: s,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll); // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
    VanillaTilt.init(document.querySelector(".siderNav"), {
      max: 10,
      speed: 400,
      scale: 1.05,
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.siderNav {
  width: 40px;
  height: 120px;
  background-color: #f0f0f0;
  box-shadow: #24242455 0 0 5px;
  border: 1px solid rgba(31, 31, 31, 0.2);
  border-radius: 8px;
  position: fixed;
  /* 确定位置 */
  bottom: 5vw;
  right: min(50px, calc(5vw + 10px));
  z-index: 5;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* transition: all .5s ease; */
}
.box {
  width: 100%;
  height: 30%;
  background-color: #fff;
  border-radius: 5px;
  user-select: none;
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: center;
  color: #1e1e1e;
  cursor: pointer;
}
.box:nth-child(1) {
  background-color: skyblue;
  opacity: 0.8;
}
.box:nth-child(2) {
  background-color: pink;
  opacity: 0.8;
}
.box:nth-child(3) {
  background-color: #040d21;
  opacity: 0.5;
}
@media screen and (max-width: 800px) {
  .siderNav {
    display: none !important;
  }
}

</style>