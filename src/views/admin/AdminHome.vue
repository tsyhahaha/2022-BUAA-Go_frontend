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
  name: "AdminHome",
  components: {HomeAside},
  data() {
    return {
      asideMenu: [
        {
          path: "/admin_home/course_list",
          name: "AdminCourseList",
          label: "课程清单",
        },
        {
          path: "/admin_home/person_list",
          name: "AdminPersonList",
          label: "学生名单",
        },
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

</style>