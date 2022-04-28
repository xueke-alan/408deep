<template>
  <div id="Banner">
    <Backgroung />
    <div class="banner">
      <div class="text">
        <p>You are improving !</p>
        <textarea
          name="userSlg"
          rows="5"
          v-model="motto"
          @blur="blur"
          @focus="focus"
          :class="mottoF"
          ref="textarea"
        >
        </textarea>
      </div>

      <MagicCard />

      <div class="button">
        <p>
          <!-- <span v-if="studying">科目</span> -->
          {{ studying ? "上次学到了" : "你还没有学习记录" }}
        </p>
        <p>{{ studying ? studying : "快去学习吧" }}</p>
        <button @click="playVideo(studyID)">GO ON</button>
      </div>
    </div>
  </div>
</template>

<script>
import Backgroung from "./background.vue";
import MagicCard from "./magicCard.vue";
export default {
  name: "HomeFouce",
  components: { Backgroung, MagicCard },
  data() {
    return {
      studying: "",
      studyID: "",
      motto:
        "You can write your motto here .\nSometimes it's the very people who no one imagines anything of who do the things no one can imagine .    (Alan Turing)",
      mottoF: "",
    };
  },
  methods: {
    playVideo(id) {
      this.$bus.$emit("changeMousewheel");
      // 预删除按钮模块
      // let buttonDiv = document.querySelector(".button")
      let button = document.querySelector(".button button");
      button.style.opacity = "0";
      button.style.width = "40px";
      button.style.color = "transparent";
      // button.style.borderRadius = '50%';
      // setTimeout(() => {
      //   buttonDiv.style.display = 'none'
      // }, 0);
      this.$bus.$emit("playVideo", id);
    },
    blur() {
      window.localStorage.setItem("408motto", this.motto);
      this.mottoF = "";
    },
    focus() {
      this.mottoF = "textareaFouce";
    },
  },
  mounted() {
    if (!window.localStorage.getItem("408motto")) {
      window.localStorage.setItem("408motto", this.motto);
    }
    this.motto = window.localStorage.getItem("408motto").toString();

    this.$bus.$on("giveTitleById", (mess) => {
      this.studying = mess;
    });
    let historyData = window.localStorage.getItem("408WatchHistory")||"[]";
    // console.log(historyData);
    historyData = JSON.parse(historyData);

    // console.log(typeof(historyData));
    if (typeof(historyData) != "object") {
      return
    }
    if (historyData.length > 0) {
      this.studyID = historyData[0];
      this.studying = historyData[1];
    }else{
      this.studyID = "0.0.0.0.0"
    }
    // console.log(this.studying);
  },
};
</script>

<style scoped>
#Banner {
  height: 200px;
  min-height: 100vh;
  position: relative;
  box-sizing: border-box;
  background-color: rgba(90, 90, 90, 0.5);
}
.banner {
  position: absolute;
  top: 0;
  width: 100%;
  padding: 60px 5vw 0;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  perspective: 1000px;
}

.text {
  flex: 2;
  overflow: hidden;
}
.text {
  max-width: 1000px;
  padding-top: 60px;
}
.text p:first-child {
  font-weight: bolder;
  font-size: 36px;
}
textarea {
  font-weight: bold;
  font-size: 24px;
  margin-top: 20px;
  /* display: none; */
  font-family: Arial, Helvetica, sans-serif;
  background-color: transparent;
  border: 0;
  width: 100%;
  color: #f0f0f0;
  outline-style: none;
  width: 50vw;
  min-width: 400px;
  overflow: hidden;
  resize: none;
  user-select: none;
  transition: all 0.3s linear;
}
.textareaFouce {
  animation: textarea 1s ease-in-out infinite;
}
@keyframes textarea {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
/* 高度小于850，段落2消失 */
@media screen and (max-height: 850px) {
  textarea {
    display: none;
  }
}

.banner p {
  color: #f0f0f0;
  font-size: 18px;
}
/* 高度小于600，按钮提示消失 */
@media screen and (max-height: 600px) {
  .banner p {
    display: none;
  }
}

.button {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  opacity: 1;
  transition: all 0.3s linear;
}
.button button {
  background-color: #ec1015;
  color: #f2f2f2;
  border: 0;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  width: 180px;
  height: 40px;
  padding: 4px 10px;
  margin-top: min(20px, 3vw);
  position: relative;
  display: inline-block;
  overflow: hidden;
  transition: all 0.3s linear;
}

@media screen and (max-height: 450px) {
  .button {
    display: none;
  }
}
@media screen and (max-height: 400px) {
  .magicCard {
    display: none;
  }
}
@media screen and (max-width: 750px) {
  .text p,
  textarea {
    text-align: center;
  }
}
</style>