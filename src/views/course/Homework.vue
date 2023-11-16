<template>
  <div class="base">
    <div class="homeworkInfo">
      <div class="process">
        <el-timeline class="row" :reverse="true">
          <el-timeline-item
              v-for="(homework, index) in homeworks"
              :key="index"
              :color="homework.color"
              :size="homework.size"
              :timestamp="homework.time">
            <el-button type="text" class="hwBtn font" @click="check(index)" circle>
              {{ homework.short }}
            </el-button>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="content" v-if="haveHW">
        <!-- 作业内容-->
        <h1 class="leftMargin hwTitle">{{ this.homeworks[preIndex].title }}</h1>
        <div class="spaceBetween hwInfo">
          发布日期：{{ this.homeworks[preIndex].time}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          截止日期：{{ this.homeworks[preIndex].ddl }}</div>
        <el-divider></el-divider>
        <div class="leftMargin hwContent">{{ this.homeworks[preIndex].content }}</div>
      </div>
      <div class="empty" v-if="!haveHW"><el-empty description="您今天没有作业哦~"></el-empty></div>
    </div>
    <div class="submit">
      <div class="loaderCss">
        <Uploader :HWid="nowId" :lastSubmit="last"></Uploader>
      </div>
    </div>
  </div>
</template>

<script>
import Uploader from "@/components/Uploader";

export default {
  components: {Uploader},
  data() {
    return {
      haveHW: true,
      nowId: '',
      preIndex: 0,    // 应当设为作业数量 - 1
      files: [], //将用户选择的文件赋值给它，渲染在页面
      homeworks: [],
      last: ''
    };
  },
  methods: {
    check(index) {
      this.homeworks[this.preIndex]['color'] = '#F5F5F5';
      this.homeworks[index]['color'] = '#f25f27';
      this.preIndex = index;
      this.nowId = this.homeworks[index].id;
    }
  },
  async created() {
    await this.$axios({
      method: 'get',
      url: 'SH_GetHomework/',
      headers: {
        token: sessionStorage.getItem("token")
      },
      timeout: 1000
    })
    .then(async (res) => {
      if(res.data.value === 0) {
        this.homeworks = res.data.homeworks;
        this.last = res.data.submit;
            // res.data.submit;
      } else {
        // pass
      }
    })
    if(this.homeworks.length > 0) {
      this.preIndex = this.homeworks.length - 1;
      for (let i = 0; i < this.preIndex; i++) {
        this.homeworks[i]['color'] = '#F5F5F5'
      }
      this.homeworks[this.preIndex]['color'] = '#f25f27';
      this.nowId = this.homeworks[this.preIndex]['id'];
    } else {
      this.haveHW = false;
    }
  }
};
</script>

<style scoped>
.base {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.homeworkInfo {
  height: 50vh;
  width: 90%;
  margin: 21px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

}

.empty {
  position: absolute;
}

.submit {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  width: 90%;
  margin: 21px auto;
}

.loaderCss {
  width: 600px;
  padding: 21px 20px;

  border-radius: 10px; /*设置边角圆形*/
  box-shadow: 0 0 0 rgb(0 0 0 / 10%), 0 4px 5px rgb(38 38 38 / 12%);
}


.process {
  display: flex;
  flex-direction: column;
  height: 80%;
}


.content {
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
  background-color: rgba(255, 255, 255, 0.5);
}

.leftMargin {
  text-align: left;
  margin-left: 20px;
}

.spaceBetween {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.hwTitle {
  margin: 0 auto;
  font-size: 21px;
}

.hwInfo {
  margin-bottom: 0;
  padding-bottom: 0;
  font-size: 15px;
}

.hwContent {
  color: #606266;
  font-size: 16px;
}

.hwBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 70px;
  border-radius: 10px; /*设置边角圆形*/
  box-shadow: 0 0 0 rgb(0 0 0 / 10%), 0 4px 5px rgb(38 38 38 / 12%);
}

.font {
  position: relative;
  color: black;
  font-size: 13px;
  font-weight: bolder;

  transition: 0.2s;
}

.font:hover {
  position: relative;
  color: #f25f27;
}

</style>



