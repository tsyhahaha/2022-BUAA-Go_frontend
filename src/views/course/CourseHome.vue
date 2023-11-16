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
  name: "CourseHome",
  components: {HomeAside},
  data() {
    return {
      asideMenu: [
        {
          path: "/course_home/course_info",
          name: "CourseCourseInfo",
          label: "课程详情",
        },
        {
          path: "/course_home/homework",
          name: "CourseHomework",
          label: "作业提交",
        },
        {
          path: "/course_home/collect",
          name: "CourseCollect",
          label: "作业收取",
        },
        {
          path: "/course_home/create",
          name: "CourseCreate",
          label: "班级管理",
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
  min-height: 100vh;
  overflow: scroll;
}
</style>