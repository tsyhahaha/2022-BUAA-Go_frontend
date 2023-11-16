<template>
  <div class="base">
    <div class="header">
      <fieldset class="fieldset" onclick="document.querySelector('#s1').click()">
        <legend class="anno">推荐</legend>
        <el-select id="s1" @change="handleChange" v-model="recommend" placeholder="推荐" class="select">
          <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </fieldset>
      <div>
        <fieldset class="fieldset" onclick="document.querySelector('#s2').click()">
          <legend class="anno">TD</legend>
          <el-select id="s2" @change="handleChange" v-model="TD" placeholder="TD" class="select">
            <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </fieldset>
      </div>
      <div>
        <fieldset class="fieldset" onclick="document.querySelector('#s3').click()">
          <legend class="anno">地点</legend>
          <el-select id="s3" @change="handleChange" v-model="place" placeholder="地点" class="select">
            <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </fieldset>
      </div>
      <div>
        <fieldset class="fieldset" onclick="document.querySelector('#s4').click()">
          <legend class="anno">标签</legend>
          <el-select id="s4" @change="handleChange" v-model="label" placeholder="标签" class="select">
            <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </fieldset>
      </div>
      <el-date-picker
          :disabled="!timeLimit"
          @change="handleChange"
          v-model="time"
          type="datetimerange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
      <el-switch
          v-model="timeLimit"
          active-text="自定义时间"
          active-color="#13ce66"
          inactive-color="#ff4949">
      </el-switch>
    </div>
    <!--活动展式模块-->
    <div class="content">
      <!--      活动显示部分-->
      <div class="activityArea">
        <div v-for="(item, index) in activities" :key="index" @click="viewActivity(item.id)"
             class="activity">
          <div class="photo">
            <img :src="item.img">
          </div>
          <div class="info">
            <div class="activityTitle">
              <span class="titleFont">{{ item.title }}</span>
            </div>
            <div class="activityTime">
              <span class="timeFont">{{ item.position }}&nbsp;&nbsp;{{ item.start_time }}</span>
            </div>
          </div>
        </div>
      </div>
      <!--分页部分-->
      <div>
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="9"
            layout="total, prev, pager, next"
            :total="num">
        </el-pagination>
      </div>
      <div class="scrollArea">
        <fixBtn :width="70"
                :height="70"
                class="fixBtn"
                @onFloatBtnClicked="addActivity()">
        </fixBtn>
      </div>
    </div>
  </div>
</template>

<script>
import fixBtn from "@/components/FixBtn";

export default {
  components: {fixBtn},
  name: "ActivityArea",
  async created() {
    //  设置筛选器默认为第一个
    this.recommend = this.options1[0].value
    this.TD = this.options2[0].value
    this.place = this.options3[0].value
    this.label = this.options4[0].value
    this.time = []

    await this.$axios({
      method: 'get',
      url: "A_GetActivityList/",
      headers: {
        "token": sessionStorage.getItem("token")
      },
      params: {
        "recommend": this.recommend,
        "TD": this.TD,
        "place": this.place,
        "time": this.time,
        "label": this.label
      }
    }).then(async (res) => {
      let value = res.data.value;
      if (value === 0) {
        this.allActivities = res.data.activity_list
        this.num = this.allActivities.length
        if (this.allActivities.length > 9) {
          this.activities = this.allActivities.slice(0, 9);
        } else {
          this.activities = this.allActivities;
        }
      } else {
        this.$message({
          labels: 'error',
          message: res.data.reason
        });
      }
    })
  },
  data() {
    return {
      addState: false,
      currentPage: 1,
      timeLimit: false,
      num: 9,
      recommend: "",
      TD: "",
      place: "",
      label: "",
      time: [],
      options1: [
        {name: "不限", value: "不限"},
        {name: "最热", value: "最热"},
        {name: "最新", value: "最新"},
        {name: "志同道合", value: "志同道合"},
        {name: "猜你喜欢", value: "猜你喜欢"}
      ],
      options2: [
        {name: "不限", value: "不限"},
        {name: "最多TD", value: "最多TD"},
        {name: "最值TD", value: "最值TD"},
        {name: "最多博雅", value: "最多博雅"}
      ],
      options3: [
        {name: "不限", value: "不限"},
        {name: "田径场", value: "田径场"},
        {name: "体育连廊", value: "体育连廊"},
        {name: "排球场", value: "排球场"},
        {name: "篮球场", value: "篮球场"},
        {name: "羽毛球馆", value: "羽毛球馆"},
        {name: "游泳馆", value: "游泳馆"}
      ],
      options4: [
        {name: "不限", value: "不限"},
        {name: "社团活动", value: "社团活动"},
        {name: "学院活动", value: "学院活动"},
        {name: "学校活动", value: "学校活动"},
        {name: "个人活动", value: "个人活动"},
      ],
      activities: null,
      allActivities: []
    }
  },
  methods: {
    viewActivity(id) {
      this.$router.push({
        path: 'activity/'+id
      })
    },
    handleCurrentChange(val) {
      let base = 9 * (val - 1)
      this.activities = this.allActivities.slice(base, base + 9)
    },
    addActivity() {
      this.$router.push({
        path: '/activity_home/activity_create'
      })
    },
    async handleChange() {
      this.currentPage = 1
      await this.$axios({
        method: 'get',
        url: "A_GetActivityList/",
        headers: {
          "token": sessionStorage.getItem("token")
        },
        params: {
          "recommend": this.recommend,
          "TD": this.TD,
          "place": this.place,
          "time": this.time,
          "label": this.label
        }
      }).then(async (res) => {
        let value = res.data.value;
        if (value === 0) {
          this.allActivities = res.data.activity_list
          this.num = this.allActivities.length
          if (this.allActivities.length > 9) {
            this.activities = this.allActivities.slice(0, 9);
          } else {
            this.activities = this.allActivities;
          }
        } else {
          this.$message({
            labels: 'error',
            message: res.data.reason
          })
        }
      })
    }
  },
  watch: {
    timeLimit(newVal) {
      if (newVal === false) {
        this.time = []
      }
    }
  }
}
</script>

<style scoped>
.base {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  height: 10vh;
  width: 100%;
  min-width: 700px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-items: center;
}

.activityArea {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.select {
  position: relative;
  bottom: 2px;
  display: flex;
  flex-direction: row;
  justify-self: center;
  justify-content: space-around;
  align-items: center;
}

.fieldset {
  border-radius: 5px; /*设置边角圆形*/
}

.fieldset:hover {
  cursor: pointer;


}

.select >>> .el-input__inner {
  /*设置 el-select 边框透明*/
  border: 0;
}

.anno {
  position: relative;
  bottom: 2px;
  padding: 0 10px;
  margin-right: 10px;
  font-size: 5px;
  font-weight: bolder;
}

.selected {
  color: #f25f27;
}

.activity {
  width: 400px;
  height: 300px;
  margin-right: 80px;
  margin-bottom: 50px;
  border-radius: 10px; /*设置边角圆形*/
  box-shadow: 0 0 0 rgb(0 0 0 / 10%), 0 8px 10px rgb(38 38 38 / 5%);
  transition: 0.3s;
}

.activity:hover {
  width: 410px;
  height: 310px;
  box-shadow: 0 0 0 rgb(0 0 0 / 10%), 0 8px 10px rgb(38 38 38 / 12%);
  cursor: pointer;
}


img {
  min-width: 100%;
  min-height: 100%;
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

.scrollArea {
  display: flex;
  width: 100%;
  justify-content: end;
  align-items: center;
}

.fixBtn {
  background-color: #ff9800;
  color: white;
}

.fixBtn:hover {
  background-color: rgba(255, 152, 0, 50%)
}
</style>