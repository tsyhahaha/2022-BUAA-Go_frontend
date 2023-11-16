<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  /* sans-serif 是默认字体 */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #E64A19;
  height: 100%;
  width: 100%;
}

* {
  margin: 0;
  padding: 0;
  /* 默认动画 */
  /*animation-name: enter_blur;*/
  /*animation-iteration-count: 1;*/
  /*animation-duration: 0.2s;*/
}
/*
给出了一个由模糊到清晰的效果
 */
@keyframes enter_blur {
  0% {
    filter: blur(20px);
    opacity: 0;
  }
  100% {
    filter: blur(0px);
    opacity: 100%;
  }
}
::-webkit-scrollbar{display:none}
/*!* 滚动条整体部分 *!*/
/*::-webkit-scrollbar {*/
/*  width: 10px;*/
/*  height: 10px;*/
/*}*/
/*!* 滚动条轨道 *!*/
/*::-webkit-scrollbar-track {*/
/*  width: 6px;*/
/*  -webkit-border-radius: 2em;*/
/*  -moz-border-radius: 2em;*/
/*  border-radius: 2em;*/
/*}*/

/*::-webkit-scrollbar-thumb {*/
/*  background-color: rgba(144, 147, 153, .5);*/
/*  background-clip: padding-box;*/
/*  min-height: 28px;*/
/*  -webkit-border-radius: 2em;*/
/*  -moz-border-radius: 2em;*/
/*  border-radius: 2em;*/
/*  transition: background-color .3s;*/
/*  cursor: pointer;*/
/*}*/

/*::-webkit-scrollbar-thumb:hover {*/
/*  background-color: rgba(144, 147, 153, .3);*/
/*}*/
</style>
