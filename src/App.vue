<template>
  <div id="app">
    <div
      class="mousewheelControl"
      @mousewheel.prevent
      v-if="preventMousewheel"
    ></div>
    <Header />

    <router-view></router-view>

    <Footer />
  </div>
</template>

<script>
// import axios from "axios";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  data() {
    return {
      allData: [],
      recommend: [],
      preventMousewheel: false,
      upload_file: "",
      lists: [],
      datacsv: "",
    };
  },
  methods: {
    loadData() {
      // 循环检查数据

      let getLocalStorage = setInterval(() => {
        let localStorage = JSON.parse(
          window.localStorage.getItem("408dataAll")
        );
        if (localStorage) {
          clearTimeout(getLocalStorage);
        } else {
          return;
        }
        this.allData = localStorage[0];
        this.recommend = localStorage[1];
        // this.$store.state.allData = this.allData
        console.log(this.allData);
        this.$store.dispatch("loadData",this.allData)
        // 发给各个组件
        this.$bus.$emit("sendALLDAT", this.allData);
        this.$bus.$emit("sendFouseMess", this.recommend);
        let s = [];
        for (let i = 0; i < this.allData.length; i++) {
          s.push(this.allData[i].name[0]);
        }
        this.$bus.$emit("getSubjects", s);
        setTimeout(() => {
          window.localStorage.removeItem("408dataAll");
        }, 300);
        document.querySelector("#header").style.top = 0;
      }, 100);
    },
  },
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.loadData();
    this.$bus.$on("changeMousewheel", () => {
      this.preventMousewheel = !this.preventMousewheel;
      setTimeout(() => {
        this.preventMousewheel = !this.preventMousewheel;
      }, 1000);
    });
    this.$bus.$on("sendVideoMess", (id) => {
      // console.log("我收到了videoID,数据将在我这里处理");
      id = id.split(".");
      // console.log(id);
      let x = id;
      // console.log(this.allData[x[0]]);
      let mess = this.allData[x[0]].teachers[x[1]].courses[x[2]];

      mess = mess.chapters[x[3]].lessons[x[4]];

      // 以上取得原始数据，以下处理额外数据
      mess.index = id[4];

      mess.teacher = this.allData[x[0]].teachers[x[1]].name;

      mess.teacher = Array.isArray(mess.teacher)
        ? mess.teacher[0]
        : mess.teacher;

      mess.head = this.allData[x[0]].teachers[x[1]];
      mess.head = mess.head.cover;
      mess.course = this.allData[x[0]].teachers[x[1]].courses[x[2]].otherName;
      mess.chapter =
        this.allData[x[0]].teachers[x[1]].courses[x[2]].chapters[x[3]].name;
      mess.list =
        this.allData[x[0]].teachers[x[1]].courses[x[2]].chapters[x[3]].lessons;

      this.$bus.$emit("videoID", mess);
    });
    this.$bus.$on("giveFouseMess", () => {
      this.$bus.$emit("sendFouseMess", this.recommend);
    });
    this.$bus.$on("updataData", () => {
      this.loadData();
      let offsetTop = document.querySelector(".filterrow").offsetTop;
      window.scrollTo({
        top: offsetTop - 50,
        behavior: "smooth",
      });
    });
    this.$bus.$on("giveMess", () => {
      this.$bus.$emit("sendALLDAT", this.allData);
    });
  },
  beforeCreate() {
    this.$bus.head =
      "https://vue2-1310719520.cos.ap-guangzhou.myqcloud.com/deep"
      // "vue2-1310719520.cos.ap-guangzhou.myqcloud.com/deep"
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
body {
  overflow-x: hidden;
  font-family: "Microsoft YaHei";
}
a {
  text-decoration: none; /* 去除默认的下划线 */
  outline: none; /* 去除旧版浏览器的点击后的外虚线框 */
  color: #000; /* 去除默认的颜色和点击后变化的颜色 */
}
button {
  user-select: none;
  cursor: pointer;
}
.mousewheelControl {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: transparent;
  z-index: 100;
}
</style>
