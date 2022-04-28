<template>
  <div id="countdown">
    <div class="contant calendar" ref="calendar">
      <div class="countdowndays box" v-show="showed.days">
        <p ref="days"></p>
        <p>DAYs</p>
      </div>
      <div class="countdownhours box" v-show="showed.hours">
        <p ref="hours"></p>
        <p class="hours">hour</p>
      </div>
      <div class="countdownmins box" v-show="showed.minutes">
        <p ref="minutes"></p>
        <p>MINs</p>
      </div>
      <div class="countdownsecs box" v-show="showed.seconds">
        <p ref="seconds"></p>
        <p>secs</p>
      </div>
    </div>
    <div class="contant recommend" ref="recommend" v-if="showRecommend">
      <div class="box title">
        <p>recommend</p>
        <p>browser</p>
      </div>
      <div class="box browser">
        <a target="_blank" href="https://www.microsoft.com/zh-cn/edge">
          <img :src="`${this.$bus.head}/browser/edge.svg`" />
        </a>

        <a target="_blank" href="https://www.google.cn/chrome/">
          <img :src="`${this.$bus.head}/browser/chrome.svg`" />
        </a>
      </div>
      <div class="box buttom">
        <p @click="closeRecommend">OK,i know</p>
      </div>
    </div>
  </div>
</template>

<script>
import VanillaTilt from "vanilla-tilt";
export default {
  name: "calendarItem",
  data() {
    return {
      showed: {
        days: true,
        hours: true,
        minutes: true,
        seconds: true,
      },
      showRecommend: false,
    };
  },
  methods: {
    refresh() {
      var endTime = new Date(2022, 11, 25, 8, 0);
      endTime = Date.parse(endTime) / 1000;
      var now = new Date();
      now = Date.parse(now) / 1000;
      var timeLeft = endTime - now;
      var days = Math.floor(timeLeft / 86400);
      var hours = Math.floor((timeLeft - days * 86400) / 3600);
      var minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
      var seconds = Math.floor(
        timeLeft - days * 86400 - hours * 3600 - minutes * 60
      );
      seconds;
      days = days < 10 ? "0" + days.toString() : days;
      if (this.$refs.days) this.$refs.days.innerHTML = days;
      hours = hours < 10 ? "0" + hours.toString() : hours;
      if (this.$refs.hours) this.$refs.hours.innerHTML = hours;
      minutes = minutes < 10 ? "0" + minutes.toString() : minutes;
      if (this.$refs.minutes) this.$refs.minutes.innerHTML = minutes;
      seconds = seconds < 10 ? "0" + seconds.toString() : seconds;
      if (this.$refs.seconds) this.$refs.seconds.innerHTML = seconds;
    },
    closeRecommend() {
      window.localStorage.setItem("408FirstOpen", 1);
      this.$refs.recommend.style.opacity = 0;
      setTimeout(() => {
        this.showRecommend = !this.showRecommend;
        this.$refs.calendar.style.opacity = 1;
      }, 500);
      this.refresh();
    },
  },
  mounted() {
    this.refresh();
    this.timer = setInterval(() => {
      // console.log("@");
      this.refresh();
    }, 1000);

    VanillaTilt.init(document.querySelector("#countdown"), {
      max: 15,
      speed: 400,
      // glare: true,
      // "max-glare": 0.6,
      scale: 1.1,
    });
    this.$bus.$on("showRecommend", () => {
      this.showRecommend = !this.showRecommend;
    });

    let firstopen = +window.localStorage.getItem("408FirstOpen");
    if (firstopen) {
      this.showRecommend = false;
      // this.$refs.recommend.style.opacity = 1;
      this.$refs.calendar.style.opacity = 1;
    } else {
      this.showRecommend = true;
      this.$refs.calendar.style.opacity = 0;
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
};
</script>

<style scoped>
#countdown {
  user-select: none;
  width: 100%;
  height: 100%;
  text-transform: uppercase;
  box-sizing: border-box;

  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  padding: max(3vw, 30px) max(3vw, 30px);
  /* overflow: hidden; */

  /* background-color: red; */
  transform-style: preserve-3d;

  transform: perspective(1000px);
  /* will-change: transform; */
  /* box-shadow: 0 0 60px #ffffff55; */
}

.contant {
  position: absolute;
  /* display: flex; */
  width: 80%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translateZ(60px) translateX(-50%) translateY(-50%);
  transition: all 0.5s ease;
}
.calendar {
  opacity: 0;
}
.box {
  width: 100%;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box p {
  font-family: Helvetica, Arial, Sans-Serif;
  color: rgba(255, 255, 255, 0.9);
  opacity: 1;
  /* height: 100%; */
  line-height: 100%;
  /* padding-right: 10px; */
  text-align: justify;
  /* text-shadow: 0 0 1px rgb(255, 0, 0); */
  transition: all 0.65s ease 0.1s;
  /* background-color: pink; */
  font-size: 72px;
  font-family: JetBrains;
}
.recommend {
  display: flex;
  height: 80%;
  flex-direction: column;
  justify-content: space-between;
}

.recommend .box {
  flex-direction: column;
  justify-content: flex-start;
  /* height: auto; */
}
.recommend p {
  font-size: 55px;
  text-align: center;
  width: 100%;
  /* background-color: red; */
}
.recommend .browser {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 30%;
}
.recommend .browser a {
  height: 100%;
  transition: all 0.3s ease;
  /* background-color: red; */
}
.recommend .browser img {
  height: 100%;
  /* width: 30px; */
}
.recommend .browser a:hover {
  height: calc(100% + 10px);
}
.recommend .title {
  height: auto;
}

.recommend .buttom {
  height: auto;
  cursor: pointer;
}
.recommend .buttom p {
  font-size: 30px;
  transition: all 0.3s ease;
}
.recommend .buttom p:hover {
  font-size: 35px;
  transform: rotateZ(5deg);
  color: #fff;
}
.box p:first-child {
  color: rgba(255, 255, 255, 1);
}
.countdowndays p {
  opacity: 1;
}
.countdownhours p {
  opacity: 0.8;
}
.countdownmins p {
  opacity: 0.6;
}
.countdownsecs p {
  opacity: 0.4;
}
.box p:hover {
  opacity: 1;
  /* color: rgb(216, 170, 170); */
  color: rgba(255, 255, 255, 1);
}

.box p:first-child {
  float: left;
}
.box p:last-child {
  float: right;
}

@media screen and (max-width: 750px) {
  .box p {
    font-size: 54px;
  }
  /* #countdowndays p {
    opacity: 1;
    font-size: 50px;
  } */
  .recommend p {
    font-size: 45px;
  }
}
</style>