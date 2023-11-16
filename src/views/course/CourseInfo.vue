<template>
  <div>
    <div class="courseInfo">
      <!--课程名称-->
      <div class="courseName">
        <span class="rightOffset font1">{{ courseName }}</span>
      </div>
      <!--  分界线    -->
      <el-divider content-position="right">
        <span class="divider font1" style="font-size: 15px">青春在于运动</span>
      </el-divider>
      <!--课程信息-->
      <div class="courseContent" style="color: #f25f27;">
        <div class="contentLine">
          <div class="font2 around">上课时间:&nbsp;&nbsp;<span class="contentFont">{{ time }}</span></div>
          <div class="font2">教师:&nbsp;&nbsp;&nbsp;<span class="contentFont">{{ teacher }}</span></div>
        </div>
        <div class="contentLine">
          <div class="font2 around">课程地点:&nbsp;&nbsp;<span class="contentFont">{{ location }}</span></div>
          <div class="font2"></div>
        </div>
      </div>
    </div>
    <div class="signs">
      <div class="info"><span class="font2 bottom" style="font-size: 40px">通知</span></div>
      <el-carousel class="card">
        <el-carousel-item v-for="sign in signs" :key="sign.id">
          <span class="title">{{ sign.title }}</span>
          <span class="time">{{ sign.time }}</span>
          <el-divider></el-divider>
          <div class="content"><span>{{ sign.content }}</span></div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courseName: '',
      time: '',
      teacher: '',
      location: '',
      signs: []
    }
  },
  async created() {
    await this.$axios({
      method: 'get',
      url: 'SC_GetCourseNow/',
      headers: {
        "token": sessionStorage.getItem("token")
      },
    }).then(async (res) => {
        if(res.data.value === 0) {
          let courseId = res.data.data.id;
          sessionStorage.setItem("courseId", courseId);
          await this.$axios({
            method: 'get',
            url: 'SC_GetCourseMessages/',
            params: {
              "id": res.data.data.id,
            },
          }).then((res) => {
            if(res.data.value === 0) {
              this.courseName = res.data.data.name;
              this.time = res.data.data.time;
              this.location = res.data.data.location;
              this.teacher = res.data.data.teacher_name;
              this.signs = res.data.data.signs
            } else if(res.data.value === -1) {
              this.$message({
                message: res.data.reason,
                labels: 'error'
              })
            }
          })
        } else if(res.data.value === -1) {
          this.$message({
            message: "信息查询失败：" + res.data.reason,
            labels: 'error'
          })
        }
    })
  }
}
</script>

<style scoped>

.courseInfo {
  height: 330px;
  width: 90%;
  justify-content: center;
  /* border: 1px solid grey; */
  margin: 0 auto;
  border-radius: 10px; /*设置边角圆形*/
  box-shadow: 0 0 0 rgb(0 0 0 / 10%), 0 4px 5px rgb(38 38 38 / 12%);
}

.courseName {
  margin-top: 20px;
  height: 20px;
  text-align: left;
}

@font-face {
  font-family: 'myFont1';
  src: url("../../assets/font/font1.ttf");
}

.font1 {
  font-family: myFont1, sans-serif;
  font-size: 35px;
  font-weight: bold;
}

.contentFont {
   color: #8c939d;
}

.font2 {
  color: #303133;
  font-size: 19px;
  font-weight: bold;
}

.rightOffset {
  margin-left: 20px;
}

.courseContent {
  display: flex;
  flex-direction: column;
  margin: 40px 30px;
}

.around {
  width: 30%;
  margin-right: 80px;
  padding-right: 80px;
}

.contentLine {
  display: flex;
  flex-direction: row;
  margin: 27px 40px;
  text-align: left;
  flex-wrap: nowrap;
  align-items: stretch;
}

.divider {
  border-radius: 40px; /*设置边角圆形*/
  color: #1a1a1a;
  font-weight: bold;
}

.el-divider__text.is-right {
  border-radius: 40px; /*设置边角圆形*/
  backdrop-filter: blur(2px);
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0 rgb(0 0 0 / 10%), 0 12px 20px rgb(38 38 38 / 12%);
}

.signs {
  height: 500px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* border: 1px solid grey; */
  overflow: hidden;
  margin: 50px auto;
  border-radius: 10px; /*设置边角圆形*/
  box-shadow: 0 0 0 rgb(0 0 0 / 10%), 0 4px 5px rgb(38 38 38 / 12%);
}

.title {
  font-family: myFont3, sans-serif;
  position: relative;
  top: 10px;
  font-size: 30px;
  font-weight: bold;
  margin-right: 30px;
}

.time {
  font-family: myFont3, sans-serif;
  position: relative;
  top: 10px;
}

.content {
  margin: 0 21px;
  text-align: left;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 18px;
  color: #606266;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item {
  background-color: white;
  height: 400px;
  margin: 20px;
  background-color: rgba(255, 255, 255, 0.5);
}

.info {
  height: 50px;
  text-align: end;
}

.bottom {
  position: relative;
  top: 10px
}

.card {
  height: 100%;
  width: 100%;
  margin: 0 21px;
}
</style>