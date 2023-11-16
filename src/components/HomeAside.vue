<template>
  <el-aside
      class="aside"
      width="200px">
    <el-menu
        :collapse="isCollapse"
        active-text-color="#E64A19"
        >
      <el-menu-item
          v-for="item in asideMenu"
          :index="item.path"
          :key="item.path"
          :route="item.path"
          :id="item.name"
          @click="clickMenu(item)">
        <span slot="title" class="nav-font">
          {{ item.label }}
        </span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "HomeAside.vue",
  props: ["asideMenu"],
  data() {
    return {
      isCollapse: false
    }
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
.aside {
  margin-top: 1px;
  height: 100%;
  border-right: 2px solid rgb(114, 110, 104, 0.2);
}

.nav-font {
  font-size: 15px;
}
/deep/.el-menu .el-menu-item:hover{
  outline: 0 !important;
  color: #ec7d32 !important;
  font-weight: bold;
  background: rgb(249, 90, 30, 0.25) !important;
}
/deep/.el-menu .el-menu-item.is-active {
  color: #ec7d32 !important;
  font-weight: bold;
  background: rgb(249, 90, 30, 0.25) !important;
}
</style>