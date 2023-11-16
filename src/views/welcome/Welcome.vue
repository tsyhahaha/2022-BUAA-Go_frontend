<template>
  <div class="base">
    <div class="header">
      <div class="flexHeader">
        <div class="nav-logo">
          <a href="/">
            <img src="../../assets/images/ChineseLogo.png" alt="图片缺失" style="padding: 5px">
            <img src="../../assets/images/EnglishLogo.png" alt="图片缺失" style="padding: 5px">
          </a>
        </div>
        <div>
          <el-button class="register-button" @click="register()">注 册</el-button>
        </div>
      </div>
    </div>
    <div class="flexContent">
      <div class="title fadeInLeft">
        走马不是为了观花，而是为了对岸的你
      </div>
      <el-button class="login-button" @click="login()">登 录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
  },
  data() {
    return {}
  },
  methods: {
    login() {
      this.$router.push({
        path: "login",
      });
    },
    register() {
      this.$router.push({
        path: "register",
      });
    },
  },
};

</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
.base {
  margin: 0;
  padding: 0;
  height:100%;
  width:100%;
  background-image: url("../../assets/images/welcome_bk.jpg");
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
}

.header {
  height: 20vh;
}

.flexHeader {
  display: flex;
  justify-content: space-between;
}
.nav-logo {
  padding: 15px;
  height: 30px;
}

.title {
  margin-bottom: 20px;
  -webkit-text-stroke: 2px #fff;
  -webkit-text-fill-color : transparent;
  font-size: 50px; 
  color: #f25f27;
}

.flexContent {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}

div img {
  width: 80px;
  height: 80px;
}

.register-button {
  margin-top: 20px;
  margin-right: 20px;
  height: 80px;
  width: 120px;
  background-color: rgba(255, 255, 255, 0.5);
  font-family: sans-serif;
  font-weight: bold;
  font-size: 22px;
}

.register-button:hover {
  height: 80px;
  width: 120px;
  color: #ec7d32;
}

.login-button {
  margin-top: 50px;
  height: 80px;
  width: 150px;
  font-weight: bold;
  font-size: 22px;
  background-color: rgba(255, 255, 255, 0.5);
  font-family: sans-serif;
}

.login-button:hover {
  height: 85px;
  width: 160px;
  color: #ec7d32;
}
</style>