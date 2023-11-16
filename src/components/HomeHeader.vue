<template>
  <div class="homeHeader">
    <div class="nav-logo-bk">
      <a class="nav-english-logo" href="/">Go!</a>
    </div>
    <div>
      <!--  一级导航栏  -->
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          text-color="#757575"
          active-text-color="#f25f27"
          default-active="1">
        <el-menu-item
            v-for="(item) in menu"
            :index="item.index.toString()"
            :key="item.path"
            :id="item.name"
            @click="clickMenu(item)"
            v-if="controlPriviledge(item.label)">
          <span slot="title" class="nav-section">{{ item.label }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!--  右侧功能区  -->
    <span style="margin-top: 10px">
      <span>
        <el-avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
      </span>
      <span>
        <el-dropdown class="right-dropdown">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right  nav-right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
             <!--   登出   -->
            <el-button type="text" class="right-button" @click="loginOut()">
              登出
            </el-button>
          </el-dropdown-item>
          <el-dropdown-item>
            <!--   修改密码   -->
            <el-button type="text" class="right-button" @click="changePass()">
              修改密码
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </span>
    </span>
    <!--    修改密码对话框    -->
    <el-dialog :visible.sync="dialogFormVisible">
      <PasswordChange></PasswordChange>
    </el-dialog>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import PasswordChange from "@/components/PasswordChange";

export default {
  name: "HomeHeader",
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      menu: [
        {
          index: 1,
          path: "/course_home",
          name: "CourseHome",
          label: "体育课程",
        },
        {
          index: 2,
          path: "/activity_home",
          name: "ActivityHome",
          label: "体育活动"
        },
        {
          index: 3,
          path: "/my_home",
          name: "MyHome",
          label: "个人信息"
        },
        {
          index: 4,
          path: "/admin_home",
          name: "AdminHome",
          label: "管理端",
        },
      ],
    }
  },
  methods: {
    async clickMenu(item) {
      await this.$router.push({
        name: item.name
      });
    },
    loginOut() {
      this.setToken('')
      this.$router.push({
        path: '/'
      })
    },
    changePass() {
      this.dialogFormVisible = true
    },
    controlPriviledge(title) {
      let type = sessionStorage.getItem('type');
      return (type === 'student' && (title === '体育课程' || title === '体育活动' || title === '个人信息')) ||
            (type === 'teacher' && ((title === '体育课程' || title === '体育活动' || title === '管理端')));
    },
    ...mapMutations({
      setToken: 'SET_USER_TOKEN'
    })
  },
  components: {
    PasswordChange
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'handWriting';
  src: url("@/assets/font/font3.ttf");
}

.nav-english-logo {
  font-family: sans-serif;
  font-weight: 900;
  font-size: 35px;
  color: #ec6a32;
  padding-left: 50px;
  margin-left: 20px;

  user-select: none;
  text-decoration: none;

  background-image: url("@/assets/images/logo.png");
  background-size: 30%;
  background-position-x: 0;
  background-position-y: 10px;
  background-repeat: no-repeat;
}

.homeHeader {
  display: flex;
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;

  border: none;
  border-bottom: 1px solid rgb(114, 110, 104, 0.2);
}

.nav-section {
  font-weight: bold;
  font-size: 17px;
}

.nav-right {
  margin-right: 20px;
}

.right-button {
  margin: 0;
  color: #f25f27;
}

.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
  background: rgb(249, 90, 30, 0.25);
}

.right-button:hover {
  font-weight: bold;
}
.nav-right {
  padding-bottom: 20px;
}
</style>