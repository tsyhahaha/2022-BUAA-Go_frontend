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
  name: "ActivityHome",
  components: {HomeAside},
  data() {
    return {
      asideMenu: [
        {
          path: "/activity_home/activity_area",
          name: "ActivityArea",
          label: "活动中心",
        },
        {
          path: "/activity_home/activity_create",
          name: "ActivityCreate",
          label: "活动创建",
        },
        {
          path: "/activity_home/my_activity",
          name: "MyActivity",
          label: "我的活动",
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
.main {
  overflow: scroll;
}

</style>