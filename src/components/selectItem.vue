<template>
  <div class="selectItem" @click="scroll">
    <div class="input">
      <div class="inputDiv">
        <input
          type="text"
          v-model="inputVal"
          :placeholder="placeholder"
          @blur="blur"
          @click="inputClick"
          readonly="readonly"
          ref="input"
          :class="+allow < +filterIndex ? 'disable' : ''"
        />
        <span class="arrow" ref="arrow" @click="clearInput"></span>
      </div>
      <div class="optionDiv" ref="optionDiv" :class="sanjiao">
        <ul ref="optionUl" class="optionUl">
          <li v-if="!op.length" class="noData">暂未收录</li>
          <li
            v-for="(i, index) in op"
            @click="choosed(index, $event)"
            :key="index"
            class="optionLi"
            :class="
              (Array.isArray(i) ? i[0] : i) == inputVal ? 'choosedLi' : ''
            "
          >
            {{ Array.isArray(i) ? i[0] : i }}
            <div class="tagsDiv" v-if="Array.isArray(i)">
              <span
                v-for="t in i.slice(1, i.length)"
                :key="t"
                class="tag"
                @mouseover="stopBlur = true"
                @mouseleave="stopBlur = false"
                >{{ t }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectItem",
  data() {
    return {
      inputVal: "",
      inputIndex: "",
      timer: null,
      stopBlur: false,
      sanjiao: "sanjiaoHidden",
      showOptionsNum: 5,
    };
  },
  props: ["filterIndex", "placeholder", "allow", "op"],
  watch: {
    allow() {
      if (+this.allow <= +this.filterIndex) {
        // 根据allow清除选中的框后面的input内容
        this.inputVal = "";
        this.inputIndex = -1;
      }
    },
  },
  methods: {
    inputClick() {
      clearTimeout(this.timer);
      // 自主关闭
      if (this.$refs.optionUl.style.opacity == 1) {
        return this.blur();
      }
      // 反转箭头
      this.$refs.arrow.style.transform = "rotateZ(-135deg)";
      // 打开ul，得到高度

      this.$refs.optionUl.style.display = "block";
      this.$refs.optionUl.style.height = "auto";
      let height = this.$refs.optionUl.clientHeight + 10;
      // 判断有没有滚动条，如果没有，overflow: hidden
      if (height > 30 * this.showOptionsNum + 20) {
        height = 30 * this.showOptionsNum + 20;
        this.$refs.optionUl.style.overflowY = "auto";
      } else {
        this.$refs.optionUl.style.overflowY = "hidden";
      }
      // 马上把高度变成0
      this.$refs.optionUl.style.height = 0;
      //  再把高度和透明度恢复
      // 这里设置延迟，才会有下拉动画效果
      setTimeout(() => {
        this.$refs.optionUl.style.height = height + "px";
        // console.log(this.$refs.optionDiv.classList);
        this.$refs.optionUl.style.opacity = 1;
        this.sanjiao = "sanjiaoShow";
        // document.querySelector(".optionDiv::before");
        // window.getComputedStyle(document.querySelector('.optionDiv'),':before').opacity = 1
        // console.log(this.$refs);
        this.$refs.optionUl.scrollTo({
          top: 30 * (this.inputIndex - 2),
          behavior: "smooth",
        });
      }, 50);
    },
    blur() {
      // 一旦失去焦点，如果失去焦点后class变成disable，清空值

      if (this.stopBlur) {
        return;
      }
      this.$refs.optionUl.style.opacity = 0;
      this.sanjiao = "sanjiaoHidden";
      // document.querySelector(".optionDiv::before").style.opacity = 0;
      // window.getComputedStyle(document.querySelector('.optionDiv'),':before').opacity = 0

      // 此处不能修改height，会导致无法选中数据
      // this.$refs.optionUl.style.height = 0;
      this.timer = setTimeout(() => {
        if (this.$refs.optionUl) {
          this.$refs.optionUl.style.display = "none";
        }
      }, 400);
      this.$refs.arrow.style.transform = "rotateZ(45deg)";
    },
    choosed(i, e) {
      if (e.target.nodeName == "SPAN") {
        this.$refs.input.focus();
      } else {
        // 传下来的是选项的索引值
        let text = this.op[i];
        text = Array.isArray(text) ? text[0] : text;
        this.inputVal = text;
        this.inputIndex = i;
        // 继续向下传递索引值
        this.$bus.$emit("refreshPageNum");
        this.$bus.$emit("resetPage");
        this.sendMess(i);
        this.blur();
      }
    },
    clearInput() {
      this.inputVal = "";
      this.inputIndex = -1;
      this.sendMess(-1);
    },
    sendMess(i) {
      // console.log("我变化了,准备传参数");
      // 得到你选择的index
      this.$bus.$emit("sendMess", +this.filterIndex, i);
    },
    refresh() {
      this.value = this.placeholder;

      // this.hackReset = false;
      // this.$nextTick(() => {
      //   this.hackReset = true;
      // });
    },
    scroll() {
      let offsetTop = document.querySelector(".filterrow").offsetTop;
      window.scrollTo({
        top: offsetTop - 50,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    this.$bus.$on("pullSelect", (i) => {
      if (i != this.filterIndex) {
        return;
      }
      this.$refs.input.focus();
      setTimeout(() => {
        this.$refs.input.click();
      }, 100);
    });
  },
  beforeDestroy() {
    this.$bus.$off("pullSelect");
  },
};
</script>

<style scoped>
.selectItem {
  width: 20vw;
  max-width: 250px;
  height: 40px;
  /* background-color: red; */
  position: relative;
  margin: 0 10px;
}
.selectItem .inputDiv {
  cursor: pointer;
}
.selectItem input {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 0px 35px 0 15px;
  background-color: #ffffff;
  box-sizing: border-box;
  border: 1px solid #ccc;
  user-select: none;
  outline-style: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  color: #1e1e1e;
  transition: all 0.2s ease;
}
.selectItem .disable {
  background-color: #f4f4f4;
  pointer-events: none;
  cursor: default;
}
.disable::-webkit-input-placeholder {
  color: #ccc;
}
.selectItem input:hover {
  border-color: #999;
}
.arrow {
  width: 6px;
  height: 6px;
  /* background-color: red; */
  border-bottom: 2px solid #ccc;
  border-right: 2px solid #ccc;
  position: absolute;
  right: 15px;
  top: 40%;
  transform-origin: 60% 60%;
  transition: all 0.3s ease;
  transform: rotateZ(45deg);
  box-sizing: 0;
}
.disable + .arrow {
  cursor: default;
}
.optionDiv {
  position: absolute;
  top: calc(100% + 10px);
  width: 100%;
  /* height: 100%; */
  /* z-index: 4; */
  /* background-color: red; */
  /* display: none;
  opacity: 0; */
  transition: all 0.5s ease;
}

.optionDiv .optionUl {
  background-color: red;
  background-color: #ffffff;
  width: 100%;
  padding: 5px 0px;
  box-sizing: border-box;
  z-index: 1;
  box-shadow: 0 0 20px #00000055;
  border-radius: 5px;
  /* max-height: 200px; */
  overflow-y: hidden;
  overflow-x: hidden;
  border: 5px solid #fff;
  border-right: 0;
  transition: all 0.3s ease;
  height: 0;
  opacity: 0;
  display: none;
  position: relative;
}
.optionDiv::before {
  content: "";
  border: 6px solid transparent;
  border-bottom-color: #ffffff;
  position: absolute;
  top: -12px;

  transition: all 0.2s ease;
  z-index: 3;
}
.sanjiaoHidden::before {
  opacity: 0;
  left: -6px;
}
.sanjiaoShow::before {
  opacity: 1;
  left: 20px;
}
ul::-webkit-scrollbar {
  width: 8px;
  background-color: #e2e2e255;
}

ul::-webkit-scrollbar-thumb {
  background-color: #d8d8d8d8;
  border-radius: 5px;
}

ul li {
  padding: 5px 15px;
  width: calc(100% - 5px);
  box-sizing: border-box;
  /* max-width: calc(100% - 25px); */
  border-radius: 5px;
  line-height: 20px;
  position: relative;
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 14px;
  /* height: 100%; */
  border-left: transparent;
}

.noData {
  text-align: center;
  color: #999;
  cursor: auto;
}
ul .optionLi:hover {
  background-color: #f0f0f0;
}
ul .choosedLi {
  background-color: #f0f0f0;
  /* font-weight: bold; */
  border-left: #999 dashed 2px;
  border-radius: 0 5px 5px 0px;
}

li .tagsDiv {
  position: absolute;
  right: 10px;
  top: 4px;
}
li span {
  /* width: 40px; */
  height: 20px;
  padding: 0 5px;
  display: inline-block;
  line-height: 20px;
  border-radius: 5px;
  margin-left: 5px;
  background-color: #f0f0f0;
  border: 1px solid #999;
  opacity: 0;

  text-align: center;
  /* font-weight: bold; */
  font-size: 14px;
  color: #666;
  user-select: none;
  transition: all 0.2s ease;
  cursor: default;
}
@media screen and (max-width: 850px) {
  li span {
    display: none;
  }
}
ul li:hover span {
  opacity: 1;
}
li span:hover {
  background-color: #999;
  color: #fff;
}
</style>