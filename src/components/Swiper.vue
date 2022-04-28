<template>
  <div class="swiperDivCon">
    <div class="toLeft" @click="move(1)" ref="leftButton"></div>
    <div class="toRight" @click="move(-1)" ref="rightButton"></div>
    <div class="swiper" ref="swiper">
      <ul class="contant" ref="ul">
        <li class="item" v-for="(i, index) in list" :key="index">
          <div class="cover" @click="playThis(i.id)">
            <img :src="picHead + i.cover + '/md'" alt="" />
            <!-- <img src="/pic/cover/默认图片.jpg" alt="" /> -->
            <div class="listNum">
              <span class="up">{{ i.lessonNum }}</span>
              <span class="down">{{ i.chapterNum }}</span>
            </div>
            <div class="clickToPlay"></div>
          </div>
          <span>{{ i.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SwiperDiv",
  data() {
    return {
      position: 0,
    };
  },
  props: ["list"],
  computed: {
    picHead() {
      return this.$bus.head;
    },
  },
  watch: {
    position() {
      this.$refs.ul.style.left = this.position + "px";
      if (this.position == 0) {
        this.$refs.leftButton.style.pointerEvents = "none";
        this.$refs.leftButton.style.opacity = 0;
      } else {
        this.$refs.leftButton.style.pointerEvents = "all";
        this.$refs.leftButton.style.opacity = 1;
        // console.log(this.$refs);
        // console.log(this.$refs.ul.clientWidth);
        // console.log(this.$refs.ul.offsetLeft);
      }
    },
  },
  methods: {
    move(d) {
      let old = parseInt(this.$refs.ul.style.left);
      let max = this.$refs.swiper.clientWidth;
      max = -(270 * this.list.length - 20 - max);

      if (old + 270 * d >= max) {
        this.position = old + 270 * d;
        // console.log(this.position);
      } else {
        this.position = max;
      }
      if (this.position > 0) {
        this.position = 0;
      }
    },
    playThis(id) {
      // console.log(id);
      this.$bus.$emit("playVideo", id);
    },
  },
  mounted() {
    this.$refs.ul.style.left = "0px";
    this.$refs.ul.style.width = 270 * this.list.length + "px";
    if (270 * this.list.length > this.$refs.swiper.clientWidth) {
      this.$refs.rightButton.style.pointerEvents = "all";
      this.$refs.rightButton.style.opacity = 1;
    }
  },
};
</script>

<style scoped>
.swiperDivCon {
  width: 100%;
  height: 100%;
}
.swiper {
  width: 100%;
  height: 100%;
  /* background-color: pink; */
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}
.contant {
  /* background-color: green; */
  /* width: calc(270px * 10); */
  height: 100%;
  position: absolute;
  top: 0;
  left: 0px;
  transition: all 0.5s ease;
}
.item {
  width: 250px;
  height: 100%;
  /* background-color: yellowgreen; */
  display: inline-block;
  margin-right: 20px;
}

.item .cover {
  width: 100%;
  height: 140px;
  /* background-color: red; */
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease 0.2s;
}
.cover img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.cover .listNum {
  width: 20%;
  height: 100%;
  background-color: #00000033;
  position: absolute;
  top: 0;
  right: 0;
  transition: all 0.2s ease;
}
.listNum span {
  /* background-color: #f0f0f0; */
  width: 30px;
  height: 30px;
  position: absolute;

  display: inline-block;
  font-family: JetBrains;
  color: #f0f0f0;
  line-height: 40px;
  /* list-style-position: 20px; */
  /* border: 1px red solid; */
  border-bottom: 4px solid #f0f0f0;
  text-align: center;
  transition: all 0.2s ease;
  user-select: none;
}
.listNum .up {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease;
}
.listNum .down {
  top: 50%;
  left: 50%;
  transform: translate(-50%, 100%);
  border: 0;
  color: transparent;
  font-size: 20px;
  /* background-color: red; */
  width: 100%;
  line-height: 30px;
  transition: all 0.2s ease;
}
.listNum .up::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 50%;
  border-left: 15px rgba(240, 0, 0, 0.7) solid;
  border-top: 15px transparent solid;
  border-bottom: 15px transparent solid;
  border-right: 15px transparent solid;
  transform: scaleX(1.5);
  opacity: 0;
  transition: all 0.2s ease;
}
.item .cover:hover {
  transform: scale(0.9);
}
.item .cover:hover .listNum {
  width: 100%;
  background-color: #000000aa;
}
.item .cover:hover .listNum .up {
  /* border-bottom: 50px solid #f0f0f0aa; */
  background-color: #f0f0f0aa;
  border: 0;
  box-shadow: 0 0 50px #ffffff;
  /* background-color: #f0f0f0; */
  color: transparent;
  height: 50px;
  border-radius: 50%;
  width: 50px;
}
.item .cover:hover .listNum .up::before {
  opacity: 1;
}
/* .item .cover:hover .listNum .down {
  color: #ccc;
  background-color: #00000088;
} */
.item > span {
  line-height: 30px;
}
.toLeft,
.toRight {
  background-color: #fff;

  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  bottom: 50%;
  transform: translateY(50%);
  z-index: 1;
  transition: all 0.5s ease;
}
.toRight {
  right: 0px;
  box-shadow: 2px 2px 5px #d3d3d3;
  pointer-events: none;
  opacity: 0;
}
.toLeft {
  left: 0px;
  box-shadow: -2px 2px 5px #d3d3d3;
  pointer-events: none;
  opacity: 0;
}
</style>