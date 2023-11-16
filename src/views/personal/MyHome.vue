<template>
  <el-container>
    <!--  侧边栏导航  -->
    <HomeAside :asideMenu="asideMenu"></HomeAside>
    <el-main class="main">
      <router-view>
      </router-view>
    </el-main>
  </el-container>
</template>

<script>
import HomeAside from "@/components/HomeAside";
export default {
  name: "MyHome",
  components: {HomeAside},
  data() {
    return {
      asideMenu: [
        {
          path: "/my_home/TD",
          name: "TD",
          label: "体育锻炼",
        },
        {
          path: "/my_home/score",
          name: "Score",
          label: "体测成绩",
        }
      ],
    };
  },
  methods: {
    async clickMenu(item) {
      await this.$router.push({
        name: item.name,
      });
    },
  },
}
</script>

<style scoped>
.el-card__body, .el-main {
  padding: 0;
}

.main {
  overflow-x: scroll;
}
</style>