<template>
  <div class="base">
    <!--  导航栏  -->
    <el-page-header @back="goBack" content="活动详情">
    </el-page-header>
    <!--  分割线  -->
    <el-divider></el-divider>
    <!-- 表单   -->
    <div class="info">
      <!--      <div class="activityImg" :style="'background: url(' + activityInfo.img + ')'"></div>-->
      <img class="activityImg" :src="activityInfo.img" alt="暂时没有活动图片">
      <div class="activityInfo">
        <el-descriptions column="2">
          <el-descriptions-item label="活动名称">{{ activityInfo.title }}</el-descriptions-item>
          <el-descriptions-item label="活动地点">{{ activityInfo.position }}</el-descriptions-item>
          <el-descriptions-item label="开始时间">{{ activityInfo.time.start }}</el-descriptions-item>
          <el-descriptions-item label="截止时间">{{ activityInfo.time.end }}</el-descriptions-item>
          <el-descriptions-item label="活动标签">
            <el-tag size="small">{{ activityInfo.tag }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="TD 次数">{{ activityInfo.TD }}</el-descriptions-item>
          <el-descriptions-item label="博雅次数">{{ activityInfo.BY }}</el-descriptions-item>
          <el-descriptions-item label="参与人数">{{ activityInfo.participants_num }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <!--  活动介绍  -->
    <div class="activityIntroduce">
      <div class="introHead">
        活动介绍
      </div>
      <!--  活动介绍    -->
      <div class="introContent" v-html="activityInfo.content">
      </div>
      <el-button class="addButton" type="warning" plain @click.native.prevent="addActivity()" style="margin-bottom: 20px">参加活动</el-button>
    </div>

    <!--  相似活动推荐走马灯  -->
    <div class="recommend">
      相似活动推荐
    </div>
    <div class="similar">
      <el-carousel :interval="4000" type="card" height="300px" class="zouma">
        <el-carousel-item v-for="item in activityInfo.similar_activities" :key="item">
          <div class="photo">
            <img :src="item.img" alt="暂无图片" style="width: 100%; height: 100%">
          </div>
          <div class="zoumaInfo">
            <div class="activityTitle">
              <span class="titleFont">{{ item.title }}</span>
            </div>
            <div class="activityTime">
              <span class="timeFont">{{item.position}}&nbsp;&nbsp;{{ item.start_time }}</span>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivityInfo",
  data() {
    return {
      activityInfo: {}
    }
  },
  methods: {
    goBack() {
      this.$router.push("/activity_home/activity_area")
    },
    async getActivityInfo() {
      let activityId = this.$route.params.id;
      await this.$axios({
        method: 'get',
        url: 'A_GetActivityMessages/',
        params: {
          'id': activityId
        }
      }).then((res) => {
        this.activityInfo = res.data.activity;
      })
    },
    async addActivity() {
      let token = sessionStorage.getItem("token");
      let activityId = this.$route.params.id;
      await this.$axios({
        method: 'get',
        url: 'A_TakePartInActivity/',
        headers: {
          'token': token
        },
        params: {
          'id': activityId
        }
      }).then((res) => {
        if (res.data.value === 0) {
          let _msg = this.$message.success("加入活动成功");
          setTimeout(()=> {
            _msg.close();
          },1000)
        }
        else {
          let _msg = this.$message.warning(res.data.reason);
          setTimeout(()=> {
            _msg.close();
          },1000)
        }
      })
    }
  },
  //这个属性就可以，在里面声明初始化时要调用的方法即可
  mounted() {
    // we can implement any method here like
    this.getActivityInfo();
  }
}
</script>

<style scoped>
.base {

}

.info {
  display: flex;
  align-items: center;
  width: 80%;
  margin: 30px auto;
}

.activityImg {
  width: 200px;
  height: 200px;
}

.activityInfo {
  margin-left: 40px;
}

.activityIntroduce {
  height: 330px;
  width: 90%;
  /* border: 1px solid grey; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 30px auto;
  border-radius: 10px; /*设置边角圆形*/
  box-shadow: 0 0 0 rgb(0 0 0 / 10%), 0 4px 5px rgb(38 38 38 / 12%);
}

.introHead {
  font-size: 40px;
  font-weight: bold;
  color: #ff9800;
}

.introContent {
  margin-top: 20px;
  color: #606266;
  white-space: pre-line;
}

.similar {
  margin-top: 2px;
  margin-left: 350px;
  height: 60px;
  width: 300px;
  line-height: 60px;
  border-radius: 10px; /*设置边角圆形*/
  font-weight: bold;
  font-size: 30px;
  font-family: serif;
}

.addButton {
  width: 20%;
  height: 18%;
  font-size: 20px;
  margin: 15px
}

.el-button--warning.is-plain:hover {
  color: white;
  font-weight: bolder;
  background: #ff9800;
  border-color: #f5dab1;
}

.addDialog.el-button--warning {
  background-color: #ff9800;
}

.photo {
  width: 100%;
  height: 70%;
  background-color: #f25f27;
  border-radius: 10px 10px 0 0; /*设置边角圆形*/
  overflow: hidden;
}

.zoumaInfo {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  background-color: snow;
}

.activityTitle {
  height: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.titleFont {
  font-size: 20px;
  font-weight: bolder;
  margin-left: 40px;
  color: #f25f27;
}

.activityTime {
  height: 50%;
  font-size: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.timeFont {
  margin-right: 20px;
  color: #909399;
}

.zouma {
  width: 900px;
}

.recommend {
  margin-top: 2px;
  margin-right: 1px;
  margin-left: 1px;
  height: 60px;
  line-height: 60px;
  border-radius: 10px; /*设置边角圆形*/
  font-weight: bold;
  font-size: 30px;
  font-family: serif;
}
</style>