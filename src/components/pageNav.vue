<template>
  <div class="nav">
    <span @click="jump(1)" :class="current != 1 || 'unable'">PRE</span>
    <span @click="step(-1)" :class="current != 1 || 'unable'">VIOUS</span>

    <div class="group">
      <ul ref="ul">
        <li
          v-for="i in pageNum"
          :key="i"
          @click="jump(i)"
          :class="current != i || 'now'"
        >
          {{ i }}
        </li>
        <li class="num" @click="jump(1)">-</li>
      </ul>
    </div>

    <span @click="step(1)" :class="current != pageNum || 'unable'">NEXT</span>
    <span @click="jump(pageNum)" :class="current != pageNum || 'unable'"
      >LAST({{ pageNum }})</span
    >
    <div class="loader">
      <span class="circle"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNav",
  data() {
    return {
      pageNum: 0,
      current: 1,
      fouse: 1,
    };
  },

  watch: {
    pageNum() {
      this.$refs.ul.style.width = 38 * (this.pageNum + 1) + "px";
      document.querySelector(".group").style.width =
        38 * (this.pageNum > 5 ? 5 : this.pageNum) - 2 + "px";
    },
  },
  methods: {
    step(s) {
      // 跳转页面后，页面滑动至videolist顶部
      // 并展示load动画
      document.querySelector(".loader span").style.opacity = 1;
      setTimeout(() => {
        let el = document.querySelector(".videoList");
        el = document.querySelector(".filterrow");
        let offsetTop = 0;
        while (el && el.tagName !== "BODY") {
          offsetTop += el.offsetTop;
          el = el.offsetParent;
        }
        window.scrollTo({
          top: offsetTop - 50,
          behavior: "smooth",
        });
        // 划上去后要关闭gif
        document.querySelector(".loader span").style.opacity = 0;
        // video list切换数据，这里需要给他传过去当前页码，
        // 切换数据时，最好页面完全滚上去，否则会页面会抖动一下
        document.querySelector(".pre").style.opacity = 0.2;
        setTimeout(() => {
          document.querySelector(".pre").style.opacity = 1;
          console.log(this.current);
          this.$bus.$emit("pageCurrent", this.current);
        }, 300);
      }, 700);

      if (s == -1 && this.current == 2 && this.fouse == 2) {
        this.fouse += s;
        this.current += s;
        return;
      }
      if (this.fouse == (s == 1 ? 4 : 2)) {
        this.current += s;
        this.$refs.ul.style.left = (this.current - this.fouse) * -38 - 2 + "px";
      } else {
        this.fouse += s;
        this.current += s;
      }
    },
    jump(s) {
      // this.current += s;
      // console.log("跳到", s);
      // console.log("当前目标:", this.current);
      // console.log(s - this.current);
      let f = s - this.current;
      for (let i = 0; i < (f < 0 ? -f : f); i++) {
        this.step(f < 0 ? -1 : 1);
      }
      // this.$refs.ul.style.left = (this.current-1) * -38 -2 + "px";
    },
  },
  mounted() {
    // 接受页码数量
    this.$bus.$on("sendPageNum", (p) => {
      this.pageNum = p;
    });
    // 重置页码
    this.$bus.$on("refreshPageNum", () => {
      this.current = 1;
      this.fouse = 1;
    });
  },
};
</script>

<style scoped>
.nav {
  height: 100%;
  display: flex;
  font-family: JetBrains;
  font-weight: bold;
  line-height: 22px;
  user-select: none;
  overflow: hidden;
}
span {
  padding: 0 8px;
  border-left: 2px solid #999;
  cursor: pointer;
  transition: all 0.5s ease;
}
span:nth-child(1) {
  border: 0;
  padding: 0;
}

span:nth-child(2) {
  padding-left: 0;
  border: 0;
  border-right: 2px solid #999;
}
span:nth-child(1):hover,
span:nth-child(2):hover {
  color: red;
}
.group {
  /* 宽度在js中制定 */
  height: 100%;
  overflow: hidden;
  /* box-sizing: border-box; */
  position: relative;
}
ul {
  /* 宽度在js中制定 */
  position: absolute;
  left: -2px;
  transition: all 0.5s ease;
}
li {
  border-left: 2px solid #999;
  text-align: center;
  width: 20px;
  display: inline-block;
  padding: 0 8px;
  /* background-color: skyblue; */
  cursor: pointer;
  transition: all 0.3s ease;
}
.unable {
  color: #bbb;
  pointer-events: none;
}
.now {
  color: rgb(220, 0, 0);
}
.loader span {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid red;
  border-left: 2px solid transparent;
  display: inline-block;
  position: relative;
  left: 15px;
  animation: load 0.5s linear infinite;
  opacity: 0;
}
@keyframes load {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>