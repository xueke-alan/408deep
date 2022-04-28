<template>
  <div class="videoList">
    <div class="loading">
      <img :src="`${this.$bus.head}/loading/loading${svgNum}.svg`" ref="Svgs" />
    </div>
    <ul class="pre">
      <li v-for="(l, index) in lessonsShowed" :key="index">
        <div class="cover">
          <img :src="coverUrl" @click="playVideo(index)" />
          <!-- <img src="/pic/cover/cs/c/1.jpg" @click="playVideo(index)" /> -->
          <span
            class="coverIndex"
            :style="`color:${coverPra[0]}; top: ${coverPra[1]}%;left: ${coverPra[2]}%;`"
            >{{
              (index + capacity * (pageCurrent - 1) + 1)
                .toString()
                .padStart(3, "0")
            }}</span
          >
          <span class="duration">{{ l.duration }}</span>
        </div>
        <div class="message">
          <span class="lessonName">{{ l.name }}</span>
        </div>
      </li>
    </ul>
    <div class="pagenav">
      <PageNav />
    </div>
  </div>
</template>

<script>
import PageNav from "./pageNav.vue";
export default {
  name: "VideoList",
  components: {
    PageNav,
  },
  data() {
    return {
      lessons: [],
      coverStyle: "/md",
      coverUrl: "",
      coverPra: [],
      capacity: 36,
      pageCurrent: 1,
      pageAll: 0,
      svgNum: 0,
    };
  },
  computed: {
    lessonsShowed() {
      // 页码相关
      let start = this.capacity * (this.pageCurrent - 1);
      let list = this.lessons.slice(start, start + this.capacity);
      return list;
    },
  },
  methods: {
    playVideo(index) {
      // console.log(index);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setTimeout(() => {
        this.$bus.$emit("bindID", index);
      }, 0);
    },
    handleData(data) {
      // console.log(data);
      // console.log(data.length);
      this.pageAll = Math.ceil(data.lessons.length / this.capacity);
      this.$bus.$emit("sendPageNum", this.pageAll);
      // 关闭提示框
      document.querySelector(".loading").style.opacity = 0;
      setTimeout(() => {
        document.querySelector(".loading").style.display = "none";
      }, 400);
      document.querySelector(".pagenav").style.display = "block";
      document.querySelector(".pre").style.opacity = 0;
      // 缓缓出现界面
      setTimeout(() => {
        this.coverUrl = "";
      }, 200);
      setTimeout(() => {
        // console.log(this.lessons);
        this.lessons = data.lessons;

        this.coverUrl = this.$bus.head + data.cover[0] + this.coverStyle;
        this.coverPra = data.cover[1];
        document.querySelector(".pre").style.opacity = 1;
      }, 300);
    },
  },
  mounted() {
    this.$bus.$on("lessonsList", (data) => {
      // console.log("我收到了数据", data);
      // console.log("我收到了数据", data[1]);
      if (data) this.handleData(data);
      // console.log(data.length);
      // console.log("------------------------------------");
    });
    this.$bus.$on("hideLoading", () => {
      // console.log("开始清除数据,展示loading,隐藏nav");

      document.querySelector(".pre").style.opacity = 0;
      setTimeout(() => {
        this.lessons = [];
      }, 400);
      document.querySelector(".loading").style.display = "block";
      setTimeout(() => {
        document.querySelector(".loading").style.opacity = 1;
      }, 300);
      document.querySelector(".pagenav").style.display = "none";
    });
    this.$bus.$on("pageCurrent", (p) => {
      this.pageCurrent = p;
      console.log("我改了当前页码为，", this.pageCurrent);
    });
    this.$bus.$on("resetPage", () => {
      this.pageCurrent = 1;
    });
    this.$bus.$on("changeBgc", (i) => {
      this.svgNum = i + 1;
    });
  },
};
</script>

<style scoped>
.videoList {
  padding: 30px 5vw;
  /* height: calc(100vh - 120px); */
  position: relative;
  overflow: hidden;
  /* box-sizing: border-box; */
  /* background-color: skyblue; */
}
.loading {
  width: calc(100% - 10vw);
  height: calc(100vh - 240px);
  /* height: 100px; */
  background-image: linear-gradient(-225deg, #f0f0f0 0%, #e8e8e8 100%);
  background-blend-mode: screen;
  border-radius: 50px;
  position: absolute;
  top: 3vh;
  left: 5vw;
  opacity: 1;
  transition: all 0.3s ease;

  /* display: flex; */
  /* overflow: hidden; */
}
.loading .tips {
  padding: 30px 50px;
  position: absolute;
  font-size: 18px;
}
.loading .tips span {
  color: red;
  font-weight: bolder;
}

.loading img {
  width: 90%;
  max-width: 1000px;
  margin-left: 8vw;
  margin-top: calc(250px - 10vw);
  /* float: left; */
  transition: all 0.3s ease;
}
.pagenav {
  /* background-color: pink; */

  height: 20px;
  /* position: absolute; */
  /* bottom: 20px; */
  margin-top: 20px;
  left: 10px;
  display: none;
  position: relative;
}

.pre {
  /* height: calc(100vh - 220px); */
  /* background-color: pink; */
  /* overflow: hidden; */
  min-height: calc(100vh - 220px);

  /* display: grid; */
  /*  声明列的宽度  */
  /* grid-template-columns: repeat(4, calc((100% - 60px) / 4)); */
  /*  声明行间距和列间距  */
  /* grid-gap: 20px; */
  /*  声明行的高度  */
  /* grid-template-rows: repeat(calc(36 / 4), 12vw); */
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  /* display: none; */
  opacity: 0;
  transition: all 0.3s ease;
}

ul {
  overflow: hidden;
}
ul li {
  /* background-color: #fff; */
  /* border: 1px black solid; */
  width: 25%;
  /* height: 18vw; */
  /* height: 25%; */

  box-sizing: border-box;
  padding: 10px;
  position: relative;
  /* background-color: green; */

  overflow: hidden;
}

li .cover {
  width: 100%;
  /* 用内部padding撑开使其达到比例 */
  padding: 28.125% 0;
  /* background-color: #f0f0f0; */
  position: relative;
  display: inline-block;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

li img {
  width: 100%;
  /* height: 100%; */
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.3s ease;
}

li .duration {
  background-color: rgba(223, 223, 223, 0.8);
  padding: 0 5px;
  position: absolute;
  bottom: 8px;
  right: 4px;
  box-sizing: border-box;
  font-size: 12px;
}
li .coverIndex {
  /* background-color: rgba(223, 223, 223, 0.8); */
  width: 30%;
  height: 30%;
  text-align: center;
  /* text-align: justify;0 */

  font-size: 3vw;
  /* padding: 0 5px; */
  position: absolute;
  font-family: JetBrains;
  /* box-sizing: border-box; */
  font-weight: bolder;
  transition: all 0.3s ease 0.2s;
}
li .cover:hover {
  transform: scale(0.95);
  background-color: #1e1e1e;
}
li .cover:hover img {
  opacity: 0.5;
}
li .cover:hover .coverIndex {
  color: #fff !important;
}

li .message {
  overflow: hidden;
  text-overflow: ellipsis;
}
li .lessonName {
  display: inline-block;
  height: 40px;
  line-height: 20px;

  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}

@media screen and (min-width: 1400px) {
  ul li {
    width: 16.66667%;
    height: 12vw;
  }
  li .coverIndex {
    font-size: 2vw;
  }
}

@media screen and (max-width: 800px) {
  ul li {
    width: 33.3%;
    height: 24vw;
  }
  li .coverIndex {
    font-size: 4vw;
  }
}
@media screen and (max-width: 500px) {
  ul li {
    width: 100%;
    height: calc(40vw / 1.7777 + 20px);
    display: flex;
  }
  li .cover {
    height: 100%;
    width: 40vw;
    padding: 0;
  }
  li .message {
    margin-left: 20px;
    flex: 1;
  }
  li .coverIndex {
    font-size: 6vw;
  }
}
</style>