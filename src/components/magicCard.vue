<template>
  <div class="magicCard">
    <div class="button">
      <div class="top"></div>
      <div class="bottom"></div>
      <div class="left"></div>
      <div class="right"></div>
    </div>

    <div class="front">
      <Calendar />
    </div>
    <div class="back" v-if="showBack">
      <PlayPage />
    </div>
  </div>
</template>

<script>
import Calendar from "./calendar.vue";
import PlayPage from "../pages/PlayPage.vue";
export default {
  name: "magicCard",
  components: { Calendar, PlayPage },
  data() {
    return {
      showBack: false,
    };
  },
  methods: {
    playVideo(videoID) {
      // console.log(videoID);
      this.showBack = true;
      // 判断页面模式，如果是竖屏，就下拉
      // if (window.innerWidth / window.innerHeight < 0.7) {

      // 冻结日历
      document.querySelector(".magicCard").style.zIndex = "-1";
      // 半秒之后恢复
      setTimeout(() => {
        document.querySelector(".magicCard").style.zIndex = "inherit";
      }, 500);
      document.querySelector(".magicCard").style.transform =
        "translate(-50%, -50%) rotateY(180deg)";
      document.querySelector(".magicCard").style.width = "100%";
      document.querySelector(".magicCard").style.height = "100%";
      // 滚到页面顶部
      // 滚动条消失引发的效果
      // document.querySelector(".mousewheelControl").style.display = 'block'
      // document.querySelector("body").style.overflowY = " hidden";
      // document.querySelector("body").style.marginRight = "18px";
      // document.querySelector("#header .right").style.marginRight = "38px";



      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setTimeout(() => {
        // 删除前景卡片
        document.querySelector(".front").style.display = "none";
      }, 500);
      // 延迟之后转为playpage页面
      // document.querySelector(".page").style.width = "calc(100% - 18px);";
      setTimeout(() => {
        this.$router.push({
          path: "/play",
          query: {
            i: videoID,
          },
        });
      }, 1000);
    },
  },
  mounted() {
    this.$bus.$on("playVideo", (id) => {
      this.playVideo(id);
    });
  },
};
</script>

<style scoped>
.magicCard {
  width: 40%;
  /* max-width: 400px; */
  height: 40%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%) rotateY(0deg);
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;


  transition: all 1s cubic-bezier(0.66, -0.5, 0.33, 1);
  /* transform: rotateY(145deg); */
}

.button > div {
  width: 50px;
  height: 50px;
  background-color: #fff;
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 0;
  transition: all 0.2s ease;
  user-select: none;
}
.button > div:hover {
  opacity: 1;
}
.button .left {
  transform: translate(calc(max(-25vw, -200px) - 160%), -50%);
}
.button .right {
  transform: translate(calc(min(25vw, 200px) + 60%), -50%);
}
.button .bottom,
.button .top {
  display: none;
}

.front,
.back {
  position: absolute;
  text-align: center;
  backface-visibility: hidden;
}

.front {
  width: 50vw;
  max-width: 400px;
  min-width: 340px;
  height: 40vw;
  max-height: 350px;
  min-height: 260px;
}

.back {
  /* padding-top: 100px; */
  /* padding: 40px 20px 0px 20px; */
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
  background-color: #fff;
  box-sizing: border-box;
  user-select: auto;
  /* border-radius: 100px; */
}
</style>