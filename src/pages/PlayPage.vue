<template>
  <div class="page">
    <div class="left">
      <div class="titles">
        <h1 class="firstTtitle shelfC shelfB">
          {{ mess.name }}
        </h1>
      </div>
      <div class="videoDiv">
        <div class="loader" v-if="load">
          <span
            v-for="i in 5"
            :key="i"
            :style="`animation-delay:${i * 0.2 - 2.5}s`"
          ></span>
        </div>
        <video id="Video" :src="mess.url" v-if="mess.url" controls></video>
      </div>

      <div class="detail">
        <div class="dLeft shelfO">
          <span class="shelfC">
            <img :src="`${this.$bus.head}/playButton/inbox.png`" alt="" />
          </span>

          <span class="shelfC" @click="send">
            <img :src="`${this.$bus.head}/playButton/send.png`" alt="" />
          </span>
          <span class="shelfC">
            <a href="https://vue2-1310719520.cos.ap-guangzhou.myqcloud.com/deep/file/C语言课件(仅供测试).zip">
            <img :src="`${this.$bus.head}/playButton/files.png`" alt="" />
            </a>
          </span>
        </div>
        <div class="dRight shelfO">
          <span class="shelfC" @click="playNext(-1)">
            <img :src="`${this.$bus.head}/playButton/right.png`" alt="" />
          </span>
          <span class="shelfC" @click="playNext(1)">
            <img :src="`${this.$bus.head}/playButton/right.png`" alt="" />
          </span>
        </div>
      </div>

      <!-- <div class="tags">
        <ul>
          <li v-for="(t, index) in mess.tag" :key="index" class="shelfC">
            {{ t }}
          </li>
        </ul>
      </div> -->
      <!-- <hr /> -->
    </div>

    <div class="right">
      <div class="introduce">
        <div class="headPic shelfB">
          <img class="shelfO" :src="`${this.$bus.head}${mess.head}`" v-if="mess.url"/>
        </div>
        <div class="headDiv shelfB shelfC">
          <span class="">{{ `${mess.teacher} 《${mess.course}》` }}</span
          ><br />
          <span class="">{{ mess.chapter[0] }}</span>
        </div>
      </div>
      <div class="LessonCard shelfC">
        <div class="title shelfC">
          <span>{{ `课程选集&ensp;` }}</span>
          <span>{{ `${+mess.index + 1}/${mess.list.length}` }}</span>
        </div>
        <ul>
          <li
            v-for="(i, index) in mess.list"
            :key="index"
            :class="index == mess.index ? 'current' : ''"
            @click="playThis(index)"
          >
            <span class="index">P{{ index + 1 }}</span>
            {{ i.name }}
            <span class="duration">{{i.duration}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerWindow",
  data() {
    return {
      mess: {
        duration: "",
        img: "",
        name: "",
        tag: ["", ""],
        url: "",
        // 需要进一步请求的数据
        list: [],
        teacher: "",
        head: "",
        course: "",
        chapter: "",
      },
      id: "",
      load: false,
      group: [],
    };
  },
  computed: {
    index() {
      return +this.id.split(".").slice(0, 5)[4] || 0;
    },
  },
  watch: {
    id() {
      if (this.id) {
        setTimeout(() => {
          // console.log("我要发id过去了");
          this.$bus.$emit("sendVideoMess", this.id);
        }, 300);
      }
    },
  },
  methods: {
    loadRest() {
      setTimeout(() => {
        let page = document.querySelector(".page");
        if (page.querySelector("video")) {
          page.querySelector("video").oncanplay = function () {
            // 只有就绪了，才可以释放video出来并聚焦，否则就一直是加载界面
            // setTimeout(() => {
            // page.querySelector("video").focus();
            page.querySelector("video").style.opacity = 1;
            page.querySelector(".loader").style.opacity = 0;

            // setTimeout(() => {
            page.querySelector(".loader").style.display = "none";
            // }, 500);
            // }, 0);
          };
        }
        // 删除所有背景
        let needtoReset = page.getElementsByClassName("shelfC");
        for (let i = 0; i < needtoReset.length; i++) {
          needtoReset[i].style.color = "#1E1E1E";
        }
        needtoReset = page.getElementsByClassName("shelfB");
        for (let i = 0; i < needtoReset.length; i++) {
          needtoReset[i].style.backgroundColor = "transparent";
        }
        needtoReset = page.getElementsByClassName("shelfO");
        for (let i = 0; i < needtoReset.length; i++) {
          needtoReset[i].style.opacity = 1;
        }
      }, 0);
    },
    playThis(i) {
      // console.log("你点击了：", i);
      this.id = this.id.split(".").slice(0, 5);
      this.id[4] = i;
      this.id = this.id.join(".");
      window.location.hash = `#/play?i=${this.id}`;
    },
    playNext(x) {
      if (this.index + x < 0 || this.index + x > this.mess.list.length - 1) {
        return;
      }
      this.playThis(this.index + x);
    },
    send() {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(window.location.href).then(
          // 复制成功callback
          function () {
            alert("复制链接成功");
          },
          // 复制失败callback
          function () {
            alert("复制失败");
          }
        );
      }
    },
  },
  mounted() {
    this.$bus.$on("videoID", (mess) => {
      // console.log(mess);
      if (mess) {
        this.mess = mess;
        this.load = true;
        if (this.$route.query.i.split(".")[4]) {
          window.localStorage.setItem(
            "408WatchHistory",
            JSON.stringify([
              this.$route.query.i,
              mess.list[this.$route.query.i.split(".")[4]].name,
            ])
          );
        }
        this.loadRest();
      }
      // console.log(this.mess);
    });
    this.id = this.$route.query.i;
    // console.log(this.id);
    // console.log(this.$bus);
    // if (this.id) {
    //   // setTimeout(() => {
    //   // console.log("我要发id过去了");
    //   // setTimeout(() => {
    //   //   this.$bus.$emit("sendVideoMess", this.id);
    //   // },1000);
    //   // }, 0);
    // }
    // 修改样式
    if (this.load) {
      this.loadRest();
    }
  },
  beforeDestroy() {
    this.$bus.$off(["videoID"]);
  },
};
</script>

<style scoped>
/* #region */
/* 预设值 */
.shelfC {
  color: transparent;
  transition: all 0.8s ease;
}
.shelfB {
  background-color: #efefef;
  transition: all 0.8s ease;
}
.shelfO {
  opacity: 0;
  transition: all 0.8s ease;
}

/* 页面设置 */
.page {
  padding: 90px 5vw 0px;
  display: flex;
  justify-content: center;
  background-color: #f9f9f9;
  color: transparent;
  transition: all 0.5s ease;
  height: 110vh;
  box-sizing: border-box;
  overflow: hidden;
}

/* 左右布局设置 */
.page > .left {
  flex: 1;
  max-width: 1200px;
  min-height: calc(100vh - 200px);
  white-space: nowrap;
  overflow: hidden;
  z-index: 5;
}

.page > .right {
  width: 300px;
  margin-left: 30px;
  z-index: 5;
}

@media screen and (max-width: 1000px) {
  .right {
    display: none;
  }
}

/* 大标题和小标题 */
.firstTtitle {
  height: 40px;
  width: 90%;
  font-size: 26px;
  line-height: 40px;
  padding: 0 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}

/* 视频播放器部分 */
.videoDiv {
  width: 100%;
  height: 35vw;
  background-color: #1e1e1e;
  padding: 10px 0px;
  /* padding-bottom: 35vw;
  transition: all .5s ease; */
  position: relative;
}
@media screen and (max-width: 1000px) {
  .videoDiv {
    width: 100%;
    height: 50vw;
  }
}
.loader {
  width: 30%;
  height: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  transition: all 0.5s ease;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  animation: shade 0.5s linear;
  opacity: 1;
}
@keyframes shade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.loader span {
  height: 100%;
  flex: 1;
  background-color: #2e2e2e;
  /* margin: 0 30px; */
  border-radius: 10px;
  margin: 0 6%;

  animation: animate 1.6s linear infinite;
}
@keyframes animate {
  0% {
    opacity: 0;
    transform: translateX(-200%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translateX(0px) scale(1.5);
  }
  100% {
    opacity: 0;
    transform: translateX(200%) scale(1);
  }
}
video {
  width: 100%;
  height: 100%;
  outline-style: none;

  opacity: 0;
  transition: all 0.5s ease;
  /* z-index: 10; */
}
/* 视频底部 点赞转发资料 */
.detail {
  background-color: #fff;
  height: 50px;
  box-shadow: 0 5px 5px #e5e9ef;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
.dRight .dLeft {
  display: flex;
  align-items: center;
}
.detail span {
  /* background-color: #efefef; */
  width: 40px;
  height: 32px;
  line-height: 30px;
  display: inline-block;
  margin-right: 20px;
  text-align: center;
  border-radius: 10px;
  font-size: 14px;
  user-select: none;
  cursor: pointer;
}
.detail span img {
  height: 100%;
  /* opacity: 0.5; */
  transition: all 0.3s ease;
}
.detail span img {
  filter: grayscale(80%);
}
.detail span:hover img {
  filter: grayscale(0%);
}
.dRight span:first-child {
  transform: rotateY(180deg);
}
/* 视频底部的tag 和展开tag */
.tags {
  display: flex;
  align-items: center;
  padding: 15px 10px;
}
.tags ul li {
  display: inline-block;
  height: 20px;
  width: 30px;
  background-color: #efefef;
  padding: 5px 15px;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 14px;
  user-select: none;
}
.tags .more {
  height: 29px;
  width: 29px;
  border-radius: 50%;
  background-color: rgb(231, 231, 231);
  display: inline-block;
  margin-left: 20px;
}

/* #endregion */

/* 右边样式 */
.right > div {
  margin-bottom: 20px;
  border-radius: 10px;

  box-sizing: border-box;
}
.introduce {
  /* background-color: #efefef; */
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 5px;
}
.introduce .headPic {
  width: 60px;
  /* position: absolute; */
  height: 100%;
  /* box-sizing: border-box; */
  border-radius: 50%;
}
.introduce img {
  height: 60px;
  border-radius: 50%;
}

.introduce div {
  line-height: 28px;
  font-weight: 600;
}
.headDiv {
  flex: 1;
  margin-left: 20px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.introduce div span:last-child {
  font-size: 18px;
}

.LessonCard {
  height: 410px;
  font-size: 18px;
  background-color: rgb(241, 241, 241);
  padding: 10px;
  flex: 1;
}

.LessonCard > div {
  padding: 5px 10px 10px;
  border-bottom: 2px solid #c4c4c499;
  margin-bottom: 10px;
  font-size: 16px;
}
.LessonCard .title span:last-child {
  font-size: 12px;
  /* color: #999; */
  font-family: Arial, Helvetica, sans-serif;
}

.LessonCard ul {
  height: calc(100% - 50px);
  overflow: auto;
  padding-right: 5px;
}
.LessonCard ul::-webkit-scrollbar {
  width: 8px;
  background-color: transparent;
}
ul::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
}
.LessonCard li {
  /* background-color: pink; */
  margin-bottom: 2px;
  padding: 4px 10px;
  border-radius: 5px;
  border: 1px #f0f0f0 solid;
  box-sizing: border-box;
  transition-duration: 0.2s;
  cursor: pointer;
  font-size: 14px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden; /*超出的部分隐藏起来。*/
  white-space: nowrap; /*不显示的地方用省略号...代替*/
  text-overflow: ellipsis; /* 支持 IE */
  padding-right: 50px;
}

.LessonCard li:hover {
  background-color: #f8f8f8;
  border: 1px #e8e8e8 solid;
}
.LessonCard .current {
  background-color: #fff;
  /* border: 1px #ddd dashed; */
  padding-left: 16px;
}
.LessonCard .current::before {
  content: "";
  width: 3px;
  height: 15px;
  background-color: #1e1e1e99;
  position: absolute;
  top: 50%;
  left: 5px;
  border-radius: 5px;
  transform: translateY(-50%);
}
.LessonCard li .duration {
  position: absolute;
  right: 5px;
  font-size: 14px;
  animation: showDuration 0.8s ease;
}
@keyframes showDuration {
  from {
    color: transparent;
  }
  to {
    color: 999;
  }
}
</style>
