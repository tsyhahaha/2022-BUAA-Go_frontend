<template>
  <div class="base">
    <div class="TDTable">
      <div class="TDHeader">TD 统计</div>
      <el-table
          :data="TDData"
          :header-cell-style="{ textAlign: 'center' }"
          :cell-style="{ textAlign: 'center' }"
          stripe
          max-height=300
          height=300
          style="width: 100%">
        <el-table-column
            prop="year"
            label="学年"
            width="200">
        </el-table-column>
        <el-table-column
            prop="season"
            label="学期"
            width="200">
        </el-table-column>
        <el-table-column
            prop="td"
            label="已得 TD"
            width="200">
        </el-table-column>
        <el-table-column
            prop="td_need"
            label="预期 TD"
            width="200">
        </el-table-column>
      </el-table>
    </div>
    <!--  TD 活动推荐  -->
    <div class="recommend">
      活动推荐
    </div>
    <div class="similar">
      <el-carousel :interval="4000" type="card" height="400px" class="zouma">
        <el-carousel-item v-for="item in TDRecommend" :key="item">
          <div class="photo">
            <img :src="item.img" alt="暂无图片" style="width: 100%; height: 100%">
          </div>
          <div class="info">
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
  name: "TD.vue",
  data() {
    return {
      TDData : [],
      TDRecommend: []
    }
  },
  methods: {
    async getTD() {
      let token = sessionStorage.getItem("token");
      await this.$axios({
        method: 'get',
        url: 'SE_GetTds/',
        headers: {
          'token': token
        }
      }).then((res) => {
        this.TDData = res.data.data;
      })
    },
    async getRecommend() {
      await this.$axios({
        method: 'get',
        url: 'A_GetActivityList/',
        params: {
          'TD': "最多TD",
        }
      }).then((res) => {
        this.TDRecommend = res.data.activity_list;
      })
    }
  },
  mounted() {
    this.getTD();
    this.getRecommend();
  }
}
</script>

<style scoped>
.base {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.TDHeader {
  margin-top: 2px;
  margin-right: 1px;
  margin-left: 1px;
  height: 60px;
  line-height: 60px;
  border-radius: 10px; /*设置边角圆形*/
  font-weight: bold;
  font-size: 20px;
  font-family: serif;
  color: white;
  background-color: #ff9800;
}
.TDTable {
  margin: 20px;
  width: 800px;

  border-radius: 10px; /*设置边角圆形*/
  box-shadow: 0 0 0 rgb(0 0 0 / 10%), 0 4px 5px rgb(38 38 38 / 12%);
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

.photo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  background-color: #f25f27;
  border-radius: 10px 10px 0 0; /*设置边角圆形*/
  overflow: hidden;
}

.info {
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
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.timeFont {
  margin-right: 20px;
  color: #909399;
}

.zouma {
  width: 1000px;
}
</style>