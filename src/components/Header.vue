<template>
  <div id="header">
    <div class="left">
      <router-link to="/">
        <div class="logo" @click="toTop">
          <span>{{ logo }}</span>
        </div>
        <div class="slg" @click="toTop">
          <span>{{ slg }}</span>
        </div>
      </router-link>
    </div>
    <div class="center">
      <div class="search">
        <input
          type="text"
          ref="search"
          v-model="inputmess"
          @focus="focus"
          @blur="blur"
          @keyup.enter="toSearch"
        />
        <div class="inputTips">
          <span class="title" v-if="!tips.length">暂无</span>
          <span class="title">搜索记录</span>
          <span class="clear" @click="clearTips" v-if="tips.length">清除</span>
          <ul>
            <li
              @click="choosed(t)"
              @mouseover="mouseHover(1)"
              @mouseleave="mouseHover(0)"
              v-for="t in tips.slice(0, 10)"
              :key="t"
            >
              {{ t }}
            </li>
          </ul>
        </div>
        <button
          @click="
            toSearch();
            selectPull();
          "
        >
          <span>
            <svg
              fill="#1e1e1e"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -2 48 48"
              width="24px"
              height="24px"
            >
              <path
                d="M 20.5 6 C 12.509634 6 6 12.50964 6 20.5 C 6 28.49036 12.509634 35 20.5 35 C 23.956359 35 27.133709 33.779044 29.628906 31.75 L 39.439453 41.560547 A 1.50015 1.50015 0 1 0 41.560547 39.439453 L 31.75 29.628906 C 33.779044 27.133709 35 23.956357 35 20.5 C 35 12.50964 28.490366 6 20.5 6 z M 20.5 9 C 26.869047 9 32 14.130957 32 20.5 C 32 23.602612 30.776198 26.405717 28.791016 28.470703 A 1.50015 1.50015 0 0 0 28.470703 28.791016 C 26.405717 30.776199 23.602614 32 20.5 32 C 14.130953 32 9 26.869043 9 20.5 C 9 14.130957 14.130953 9 20.5 9 z"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div class="right">
      <div class="subject">
        <ul>
          <li
            v-for="(s, index) in subjects"
            :key="index"
            @click="toFocus(index)"
          >
            <!-- <router-link :to="`/search?s=${s}`"></router-link> -->
            {{ s }}
          </li>
        </ul>
      </div>

      <!-- <div class="user">
        <img src="/pic/head/user.jpg" />
      </div> -->
    </div>
  </div>
</template>

<script>
// import uuu from 'src/assets/pic/head/user.jpg'
export default {
  name: "WelcomeHeader",
  data() {
    return {
      logo: "408",
      slg: "深入学习",
      default: "输入相关信息",
      inputmess: "输入相关信息",
      tips: [],
      seachHover: false,
      subjects: [],
      timer: "",
    };
  },

  methods: {
    focus() {
      this.inputmess == this.default ? (this.inputmess = "") : 0;
      this.$refs.search.style.color = "black";

      clearTimeout(this.timer);
      let tips = document.querySelector(".inputTips");

      tips.style.display = "block";
      setTimeout(() => {
        tips.style.transform = "translateY(0)";
        tips.style.top = "100%";
        // tips.style.opacity = "1";
      }, 0);
    },
    blur() {
      if (this.inputmess == "" && !this.seachHover) {
        this.inputmess = this.default;
      }

      this.$refs.search.style.color = "#1e1e1e7e";

      let tips = document.querySelector(".inputTips");
      // tips.style.opacity = "0";
      setTimeout(() => {
        tips.style.transform = "translateY(calc(-100% - 10px))";
        tips.style.top = "0%";
      }, 100);
      this.timer = setTimeout(() => {
        tips.style.display = "none";
      }, 500);
    },
    toTop() {
      if (this.$route.path != "/") return;
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    toSearch() {
      this.$refs.search.blur();
      // 向本地存数据,数组去重
      let history = this.tips;
      // 判断输入的值在不在本地中，如果在，删除
      let i = history.indexOf(this.inputmess);
      if (i >= 0) {
        history.splice(i, 1);
      }
      // 把输入值放在第一位
      if (this.inputmess != this.default) {
        history.unshift(this.inputmess);
      }

      // 截取前五个

      // 放入本地
      history = JSON.stringify(history);
      window.localStorage.setItem("408SeacherBarHistory", history);
      // 刷新tips
      this.refreshTips();

      // 如果不在主页，直接返回，暂定
      if (this.$route.path != "/") return;
      let offsetTop = document.querySelector(".filterrow").offsetTop;

      window.scrollTo({
        top: offsetTop - 50,
        behavior: "smooth",
      });
    },
    toFocus(i) {
      // 如果不在主页，直接返回，暂定
      if (this.$route.path != "/") return;

      window.scrollTo({
        top: document.querySelectorAll("#Focus")[i].offsetTop - 10,
        behavior: "smooth",
      });
    },
    smooth() {
      if (this.$route.path != "/home") {
        this.$router.push({
          path: "/home",
        });
      }
      // 下一次渲染执行
      this.$nextTick(() => {
        let el = document.querySelector(".filterrow");
        let offsetTop = 0;
        while (el && el.tagName !== "BODY") {
          offsetTop += el.offsetTop;
          el = el.offsetParent;
        }
        window.scrollTo({
          top: offsetTop - 50,
          // behavior: "smooth",
        });
      });
    },
    selectPull() {
      setTimeout(() => {
        this.$bus.$emit("pullSelect", 1);
      }, 500);
    },
    choosed(t) {
      this.inputmess = t;
      this.toSearch();
    },
    mouseHover(e) {
      this.seachHover = e;
    },
    refreshTips() {
      let history = window.localStorage.getItem("408SeacherBarHistory");
      // console.log(JSON.parse(history));
      history = JSON.parse(history) || [];
      this.tips = history;
    },
    clearTips() {
      window.localStorage.removeItem("408SeacherBarHistory");
      this.refreshTips();
    },
  },
  mounted() {
    this.refreshTips();
    this.$bus.$on("getSubjects", (s) => {
      this.subjects = s;
    });
  },
};
</script>

<style scoped>
#header {
  width: 100%;
  height: 60px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: -60px;
  z-index: 10;
  transition: all 0.5s cubic-bezier(0.66, -0.5, 0.33, 1);
}

/* 弹性盒布局 */ /* #region */
.left {
  display: flex;
  user-select: none;
  margin-left: 20px;
  margin-right: 40px;
}
.center {
  flex: 1;
  max-width: 500px;
  height: 40px;
  border-top: 10px solid #f0f0f0;
  border-bottom: 10px solid transparent;
}
.right {
  display: flex;

  align-items: center;
  user-select: none;
  font-weight: bold;
  margin-right: 20px;
  margin-left: 40px;
}
/* #endregion */

/* left部分样式 */ /* #region */

.left a {
  display: flex;
  padding: 0 10px;
  height: 100%;
  cursor: pointer;
}
.left .logo span {
  line-height: 40px;
  font-size: 34px;
  font-weight: bolder;
  display: inline-block;
  font-family: JetBrains;
}
.left .slg span {
  line-height: 40px;
  font-size: 18px;
  font-weight: lighter;
  margin: 0 20px;
}

@media screen and (max-width: 850px) {
  .left .slg {
    display: none;
  }
}

/* #endregion */

/* center搜索框部分 */ /* #region */
.center .search {
  position: relative;
}
.center .search input {
  height: 40px;
  width: 100%;
  border: 0;
  border-radius: 5px;
  outline: none;
  color: #1e1e1e7e;
  padding: 0 70px 0 8px;
  box-sizing: border-box;
  z-index: 10;
}
.inputTips {
  width: calc(100% - 100px);
  max-width: 300px;
  overflow: hidden;
  padding: 10px 5px;
  /* background-color: red; */
  background-color: #ffffff;
  /* border: 1px solid #2e2e2e; */
  box-shadow: 2px 2px 2px #1e1e1e66;
  position: absolute;
  /* top: calc(100% + 10px); */
  top: 0%;
  transform: translateY(calc(-100% - 10px));
  border-top: #ccc 1px dashed;
  left: 15px;
  border-radius: 0px 0px 10px 10px;
  /* opacity: 0; */
  display: none;
  transition: all 0.3s ease;
  color: #1e1e1e;
  z-index: -1;
}
.inputTips .title {
  font-size: 16px;
  margin: 5px 0px 10px 15px;
  user-select: none;
  display: inline-block;
}
.inputTips .clear {
  font-size: 14px;
  color: #999;
  user-select: none;
  padding: 2px 8px;
  transition: all 0.3s ease;
  border-radius: 20px;
  margin-left: 10px;
}
.inputTips .clear:hover {
  background-color: #f0f0f0;
}
.inputTips li {
  /* background-color: pink; */
  margin: 8px 0;
  /* border-bottom: 1px solid #2e2e2e; */
  background-color: #0000000a;
  padding: 5px;
  font-size: 14px;
  user-select: none;
  transition: all 0.3s ease;
  display: inline-block;
  padding: 5px 8px;
  border-radius: 10px;
  margin: 5px 10px;
}
.inputTips li:hover {
  background-color: #00000028;
}
.center .search button {
  position: absolute;
  right: -10px;
  top: 0;
  width: 40px;
  height: 100%;
  border: 0;
  background-color: transparent;
  margin: 0 15px;
  border-radius: 50%;
}
.center .search button:hover {
  color: red;
}
/* #endregion */

/* right部分样式 */ /* #region */
.subject {
  color: #2f2f2f;
  height: 40px;
  float: right;
  flex: 1;
}
.subject > ul {
  display: flex;
  height: 100%;
}
.subject > ul li {
  display: inline-block;
  /* margin: 0 10px; */
  height: 100%;
  line-height: 40px;
  padding: 0 10px;
  /* background-color: #fff; */
  border-radius: 5px;
  transition: all 0.3s;
  cursor: pointer;
  font-weight: 500;
}
.subject > ul li:hover {
  background-color: #e2dfdf9d;
}

.user {
  width: 40px;
  height: 40px;
  /* background-color: skyblue; */
  border-radius: 50%;
  margin: 0 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user img {
  width: 90%;
  border-radius: 50%;
  transition: all 0.2s ease;
}
.user img:hover {
  width: 100%;
}
@media screen and (max-width: 700px) {
  .subject ul {
    display: none;
  }
}

/* #endregion */
</style>