<template>
  <div class="float-btn" :style="{'width':width+'px','height':height+'px','left':left+'px','top':top+'px'}"
       ref="div"
       @click="onBtnClicked">
    <span class="text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "FloatImgBtn",
  props: {
    text: {
      type: String,
      default: "+"
    },
    width: {
      type: Number,
      default: 60
    },
    height: {
      type: Number,
      default: 60
    },
    gapWidth: {
      type: Number,
      default: 20
    },
    coefficientHeight: {
      type: Number,
      default: 0.8
    }
  },
  created() {
    this.clientWidth = document.documentElement.clientWidth;
    this.clientHeight = document.documentElement.clientHeight;
    this.left = this.clientWidth - this.width - this.gapWidth;
    this.top = this.clientHeight * this.coefficientHeight;
  },
  mounted() {
    window.addEventListener('scroll', this.handleScrollStart);
    this.$nextTick(() => {
      const div = this.$refs.div;
      div.addEventListener("touchstart", () => {
        div.style.transition = 'none';
      });
      div.addEventListener("touchmove", (e) => {
        if (e.targetTouches.length === 1) {
          let touch = event.targetTouches[0];
          this.left = touch.clientX - this.width / 2;
          this.top = touch.clientY - this.height / 2;
        }
      });
      div.addEventListener("touchend", () => {
        div.style.transition = 'all 0.3s';
        if (this.left > this.clientWidth / 2) {
          this.left = this.clientWidth - this.width - this.gapWidth;
        } else {
          this.left = this.gapWidth;
        }
      });

    });
    window.addEventListener("resize", () => {
      this.clientWidth = document.documentElement.clientWidth;
      this.clientHeight = document.documentElement.clientHeight;
      this.left = this.clientWidth - this.width - this.gapWidth;
      this.top = this.clientHeight * this.coefficientHeight;
    })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScrollStart);
  },
  methods: {
    onBtnClicked() {
      this.$emit("onFloatBtnClicked");
    },
    handleScrollStart() {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.handleScrollEnd();
      }, 300);
      this.currentTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (this.left > this.clientWidth / 2) {
        this.left = this.clientWidth - this.width / 2;
      } else {
        this.left = -this.width / 2;
      }
    },
    handleScrollEnd() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop === this.currentTop) {
        if (this.left > this.clientWidth / 2) {
          this.left = this.clientWidth - this.width - this.gapWidth;
        } else {
          this.left = this.gapWidth;
        }
        clearTimeout(this.timer);
      }
    }
  },
  data() {
    return {
      timer: null,
      currentTop: 0,
      clientWidth: 0,
      clientHeight: 0,
      left: 0,
      top: 0,
    }
  }
}
</script>

<style scoped>
.float-btn {
  background: rgb(255, 255, 255);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  color: #666666;
  font-weight: lighter;
  z-index: 1000;
  transition: all 0.3s;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: fixed;
  right: 30px;
  bottom: 20vm;
}

.float-btn:hover{
  cursor: pointer;
}

.text {
  font-size: 30px;
  font-weight: lighter;
}
</style>