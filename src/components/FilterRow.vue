<template>
  <div class="filterrow" ref="filter">
    <SelectItem
      filterIndex="1"
      :op="subjects"
      :allow="allow"
      placeholder="科目"
    />
    <SelectItem
      filterIndex="2"
      :op="teachers"
      :allow="allow"
      placeholder="老师"
    />
    <SelectItem
      filterIndex="3"
      :allow="allow"
      :op="lessons"
      placeholder="课程"
    />

    <SelectItem
      filterIndex="4"
      :allow="allow"
      :op="chapters"
      placeholder="章节"
    />
  </div>
</template>

<script>
import SelectItem from "./selectItem.vue";

export default {
  name: "FilterRow",
  data() {
    return {
      allow: 1,
      AllData: [],
      choose: [],
      input: "",
    };
  },
  components: {
    // FilterItme,
    SelectItem,
  },
  watch: {
    choose() {
      // console.log("你改了配置", this.choose);
      this.$store.state.choose = this.choose;
      console.log(this.$store.state.choose);
      this.$bus.$emit("changeBgc", this.choose[0]);

      if (this.choose.length == 4) {
        // console.log("全部选择了，准备传数据");
        let data = this.AllData;
        data = data[this.choose[0]].teachers;
        data = data[this.choose[1]].courses;
        data = data[this.choose[2]].chapters;
        data = data[this.choose[3]];
        this.$bus.$emit("lessonsList", data);
      } else {
        // console.log("需要展开：",this.choose.length);
        this.$bus.$emit("pullSelect", this.choose.length + 1);
      }
    },
  },
  computed: {
    subjects() {
      return this.$store.getters.subjects;
    },
    teachers() {
      return this.$store.getters.teachers;
    },
    lessons() {
      return this.$store.getters.lessons;
    },
    chapters() {
      return this.$store.getters.chapters;
    },
  },

  mounted() {
    this.$bus.$on("sendALLDAT", (d) => {
      this.AllData = d;
    });
    this.$bus.$on("sendMess", (index, data) => {
      // 收到数据
      // console.log(`我收到了数据  index是${index},数据为:${data}`);
      // console.log(typeof(data)=='number');

      this.allow = index + 1;
      // 修改对应位置的配置
      // 注意，如果修改的值不是最后一个，清空之后的值
      if (data == -1) {
        // 如果传入-1，说明触发了删除inpute框
        this.choose.splice(index - 1, 4);
      } else {
        this.choose.splice(index - 1, 4, data);
      }

      // 修改choose

      // console.log(this);
      // console.log(this.$refs);
      // this.$forceUpdate();
      // console.log("当前选择模式：", this.choose);
      if (this.choose.length != 4) {
        // console.log('没有选满,需要清除数据,展示loading,隐藏nav');
        this.$bus.$emit("hideLoading");
      }
    });
    this.$bus.$on("bindID", (index) => {
      this.choose.push(index);
      // console.log(this.choose);
      let id = "";
      for (let i = 0; i < this.choose.length; i++) {
        id = id + this.choose[i] + ".";
      }
      // console.log(id);
      this.$bus.$emit("playVideo", id);
    });

    this.$bus.$emit("giveMess");
  },
};
</script>

<style scoped>
.filterrow {
  border-top: 20px solid #f0f0f0;

  position: relative;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-wrap: wrap; */
  padding: 10px 5vw;
  user-select: none;
}
</style>