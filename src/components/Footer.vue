<template>
  <footer>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1680 40">
      <path d="M0 40h1680V30S1340 0 840 0 0 30 0 30z" fill="#040D21"></path>
    </svg>
    <!-- <img src="/pic/other/study.svg" id="studySvg"> -->
    <div class="about">
      <div class="title">
        <div>
          <p>408</p>
          <p>深入学习</p>
        </div>
        <span class="logo">
          <img :src="`${this.$bus.head}/logo/logo.svg`" />
        </span>
      </div>
      <p class="content">
        <!-- 这是我的第一个网站<br /> -->
        该项目使用VUE2开发<br />
        实现对视频数据的分类、查找、播放<br />
        <!-- 数据由JS对模板文件进行前端解析<br /> -->
        页面中数据均转载于哔哩哔哩，仅供测试使用<br />
        <!-- 配置个人数据，请下载配置模板文件<br /> -->
      </p>
      <div style="display:none">
        <a :href="`${this.$bus.head}/file/C语言课件(仅供测试).zip`"
          >下载配置文件</a
        >
        <a @click="uploadFile">使用配置文件</a>
        <input
          type="file"
          id="xlsxFile"
          ref="xlsxFile"
          style="display: none"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          @change="loadData"
        />
      </div>
    </div>
    <div class="links">
      <a
        :href="p[2]"
        v-for="(p, i) in position"
        :key="i"
        target="_blank"
        v-show="p[3]"
      >
        <div :style="`top:${p[0]}px;left:${p[1]}px`">
          <div class="footerItemLogo">
            <img :src="picHead + p[3]" v-if="p[3]" />
          </div>
          <div class="description">
            <p>{{ p[4] }}</p>
            <p>{{ p[5] }}</p>
            <p>{{ p[6] }}</p>
          </div>
        </div>
      </a>
    </div>
    <a href="http://www.magicyan.top/" target="_blank">
      <div class="copyright"><span>&copy;</span> www.magicyan.top</div>
    </a>
  </footer>
</template>

<script>
export default {
  name: "WelcomeFooter",
  data() {
    return {
      position: [
        [
          0,
          200,
          "https://cn.vuejs.org/",
          "/footer/vue.svg",
          "Vue",
          "渐进式",
          "JavaScript 框架",
        ],
        [
          0,
          500,
          "https://react.docschina.org/",
          "/footer/react.svg",
          "React",
          "用于构建用户界面的 JavaScript 库",
        ],
        [
          0,
          800,
          "https://angular.cn/",
          "/footer/angular.svg",
          "Angular",
          "The modern web developer's platform",
        ],
        [150, 100],
        [
          150,
          400,
          "https://www.bilibili.com/",
          "/footer/bilibili.svg",
          "Bilibili",
          "中国年轻世代高度聚集的综合性视频社区",
        ],
        [
          150,
          700,
          "https://github.com/",
          "/footer/github.svg",
          "GitHub",
          "Where the world builds software",
        ],
        [300, 0],
        [
          300,
          300,
          "https://yz.chsi.com.cn/",
          "/footer/yzCHSI.svg",
          "研招网",
          "中国研究生招生信息网",
        ],
        [
          300,
          600,
          "https://www.chsi.com.cn/",
          "/footer/CHSI.svg",
          "学信网",
          "中国高等教育",
          "学生信息网",
        ],
        [300, 900],
        [450, -100],
        [
          450,
          200,
          "http://yzb.hitsz.edu.cn/zs",
          "/footer/hit.png",
          "哈工大深圳",
          "研究生院",
          "",
        ],
        [
          450,
          500,
          "http://yzb.hitsz.edu.cn/zs",
          "/footer/hzu.svg",
          "华中科大",
          "研究生院",
          "",
        ],
        [
          450,
          800,
          "https://yz.szu.edu.cn/index.htm",
          "/footer/SZU.svg",
          "深圳大学",
          "研究生院",
          "",
        ],
      ],
    };
  },
  computed: {
    picHead() {
      return this.$bus.head;
    },
  },
  methods: {
    uploadFile() {
      this.$refs.xlsxFile.click();
    },
    loadData() {
      setTimeout(() => {
        console.log(123);
        this.$bus.$emit("updataData");
      }, 300);
    },
  },
};
</script>

<style scoped>
footer {
  height: calc(100vh);
  width: 100%;
  background-color: #040d21;
  color: #f0f0f0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
footer svg {
  position: absolute;
  top: 0;
  background-color: #f9f9f9;
  /* transform: translateY(calc(-100% + 1px)); */
}
/* footer #studySvg{
  width: calc(20vw + 400px);
  height: calc(20vw + 400px);
  min-width: 400px;
  min-height: 400px;
  max-width: 800px;
  max-height: 800px;
  position: absolute;
  right: 0;
  top:0;
  transform: translate(10%, -80%);
  z-index: 0;
  user-select: none;
} */
footer .about {
  position: absolute;
  left: 8vw;
  top: 50%;
  transform: translateY(-50%);
  font-family: JetBrains;
}
.about {
  display: flex;
  flex-direction: column;
}
.about .title {
  display: flex;
  align-items: center;
  user-select: none;
}
.about .title div {
  height: 120px;
}
.about .title div p:nth-child(1) {
  font-size: 80px;
  line-height: 70px;
}
.about .title div p:nth-child(2) {
  font-size: 40px;
  line-height: 40px;
}

.title img {
  margin-left: 30px;
  height: 80px;
  width: 80px;
}
.about .content {
  font-size: 20px;
  width: calc(100vw - 100px);
  max-width: 500px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 35px;
  font-size: 24px;
  font-weight: 500;
  color: #8193b2;
  margin-top: 10px;
}
.about a {
  width: 180px;
  height: 50px;
  font-size: 16px;
  text-align: center;
  display: inline-block;
  line-height: 50px;
  background-color: #131f3b;
  border-radius: 10px;
  border: 1px solid #ffffff33;
  border-radius: 10px;
  font-weight: lighter;
  color: #e2e2e2;
  margin-top: 30px;
  transition: all 0.5s ease;
  font-family: "Microsoft YaHei";
  font-size: 14px;
  color: #f0f0f066;
  user-select: none;
  position: relative;
}
.about a:active {
  box-shadow: 0 5px 40px #2a4172;
  border: 1px solid #ffffff99;
}
.about a:hover {
  box-shadow: 0 5px 20px #1d305a;
  border: 1px solid #ffffff66;
  color: #f0f0f0;
}
.about a:nth-child(2) {
  background-color: transparent;
  margin-left: 20px;
  width: 140px;
  border-width: 2px;

  cursor: pointer;
}

.links {
  position: absolute;
  width: calc(100vmax - 700px);
  height: calc(150px * 4);
  /* background-color: #fff; */
  bottom: 100px;
  left: calc(600px + 8vw);
  /* transform: translateY(-0%); */
  /* border: solid 1px #fff; */
}
.links a > div {
  width: 260px;
  height: 120px;
  background-color: #0c162d;
  border-radius: 10px;
  border: 1px solid #ffffff33;
  position: absolute;
  transition: all 0.3s ease;
  color: #f0f0f0;
}
.links a > div:hover {
  background-color: #131f3b;

  border: 1px solid #ffffff66;
  box-shadow: 0 5px 40px #1d305acc;
  /* padding: 4px; */
  /* transform: translate(-2px, -2px); */
}
.links .footerItemLogo {
  /* background-color: #f0f0f0; */
  width: 50px;
  height: 100%;
  position: absolute;
  left: 20px;
  display: flex;
  align-items: center;
}
.footerItemLogo img {
  width: 80%;
  /* height: 100%; */
}

.links .description {
  position: absolute;
  top: 20px;
  left: 80px;
  height: 50%;
  padding: 0 15px 15px 0px;
  overflow: hidden;
  color: #f0f0f088;
  transition: all 0.3s ease;
}
.links a > div:hover .description {
  color: #f0f0f0ff;
}
.links .description p:first-child {
  font-weight: bold;
  font-size: 20px;
  font-family: Arial;
}

.copyright {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: #8193b2;
  font-family: Arial, Helvetica, sans-serif;
}
.copyright span {
  font-family: Tahoma, Geneva;
}
</style>