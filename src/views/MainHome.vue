<template>
  <div class="center">
    <el-container>
      <el-header>
        <HomeHeader></HomeHeader>
      </el-header>
      <el-container>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from "@/components/HomeHeader";

export default {
  name: "MainHome",
  components: {
    HomeHeader
  }
}
</script>

<style scoped>
.center {
  height: 100px;
  width: 100%;
}
</style>