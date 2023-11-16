<template>
  <div>
    <div class="base" v-if="!isEmpty">
      <div class="selectorArea">
        <el-select v-model="term" @change="getData" placeholder="请选择学期">
          <el-option
              v-for="item in terms"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="title">我的活动列表</div>
      <div class="listArea">
        <el-table
            v-if="!isEmpty"
            :data="activities"
            border
            :header-cell-style="headerStyle"
            :cell-style="cellStyle"
            max-height="250"
            class="tableList">
          <el-table-column
              prop="id"
              label="活动id"
              width="120">
          </el-table-column>
          <el-table-column
              prop="title"
              label="名称"
              width="140">
          </el-table-column>
          <el-table-column
              prop="tag"
              label="标签"
              width="140">
          </el-table-column>
          <el-table-column
              prop="start_time"
              label="开始时间"
              width="140">
          </el-table-column>
          <el-table-column
              prop="end_time"
              label="截止时间"
              width="140">
          </el-table-column>
          <el-table-column
              prop="position"
              label="地点"
              width="140">
          </el-table-column>
          <el-table-column
              prop="TD"
              label="TD数"
              width="140">
          </el-table-column>
          <el-table-column
              prop="BY"
              label="博雅数"
              width="140">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="100">
            <template slot-scope="scope">
              <el-popover
                  placement="bottom-start"
                  width="180"
                  trigger="hover">
                <div class="operation">
                  <el-button size="mini" @click="viewActivity(scope.row)">查看详情</el-button>
                  <el-button size="mini" @click="exitActivity(scope.row)">退出活动</el-button>
                </div>
                <i slot="reference" class="el-icon-s-tools  icon"></i>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="processArea">
        <div class="block">
          <span class="context">累计TD {{ TD }}</span>
        </div>
        <div class="block">
          <span class="context">累计博雅 {{ honer }} </span>
        </div>
      </div>
      <div class="graphArea" v-show="this.tag_info.length > 0 || this.pos_info.length > 0">
        <div id="labelGraph" class="graphBlock" v-show="this.tag_info.length > 0"></div>
        <div id="placeGraph" class="graphBlock" v-show="this.pos_info.length > 0"></div>
      </div>
    </div>
    <el-empty :image-size="200" v-if="isEmpty"></el-empty>
  </div>
</template>

<script>
import * as echarts from 'echarts/lib/echarts';

export default {
  name: "MyActivity",
  data() {
    return {
      isEmpty: false,
      visible: false,
      term: 1,
      terms: [
        {value: 1, label: '大一上学期'},
        {value: 2, label: '大一下学期'},
        {value: 3, label: '大二上学期'},
        {value: 4, label: '大二下学期'},
        {value: 5, label: '大三上学期'},
        {value: 6, label: '大三下学期'},
        {value: 7, label: '大四上学期'},
        {value: 8, label: '大四下学期'}
      ],
      activities: [],
      TD: 0,
      honer: 0,
      tag_info: [],
      pos_info: []
    }
  },
  methods: {
    hover() {
      this.visible = true;
    },
    headerStyle() {
      return "color: black;"
    },
    cellStyle() {
      return ""
    },
    viewActivity(row) {
      this.$router.push({
        path: 'activity/' + row.id
      })
    },
    exitActivity(row) {
      this.$axios({
        method: 'get',
        url: 'A_ExitActivity/',
        headers: {token: sessionStorage.getItem("token")},
        params: {id: row.id},
        timeout: 1000
      })
          .then(res => {
            if (res.data.value === 0) {
              this.$message({
                labels: 'success',
                message: "退出活动成功"
              })
            } else {
              this.$message({
                labels: 'error',
                message: res.data.reason
              })
            }
          })
      this.getData();
    },
    tagGraphInit() {
      let myChart = echarts.init(document.getElementById('labelGraph'));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '标签分布',
          top: '0%',
          left: 'center'
        },
        series: [{
          type: 'pie',
          data: this.tag_info,
          itemStyle: {
            normal: {
              color: function (colors) {
                let colorList = [
                  '#fc8251',
                  '#5470c6',
                  '#91cd77',
                  '#ef6567',
                  '#f9c956',
                  '#75bedc'
                ];
                return colorList[colors.dataIndex];
              }
            },
          }
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    placeGraphInit() {
      let myChart = echarts.init(document.getElementById('placeGraph'));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '地点分布',
          top: '0%',
          left: 'center'
        },
        series: [{
          type: 'pie',
          data: this.pos_info,
          itemStyle: {
            normal: {
              color: function (colors) {
                let colorList = [
                  '#fc8251',
                  '#5470c6',
                  '#91cd77',
                  '#ef6567',
                  '#f9c956',
                  '#75bedc'
                ];
                return colorList[colors.dataIndex];
              }
            },
          }
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getData() {
      this.$axios({
        method: 'get',
        url: 'A_MyActivities/',
        headers: {token: sessionStorage.getItem("token")},
        params: {term: this.term},
        timeout: 1000
      })
          .then(res => {
            if (res.data.value === 0) {
              this.isEmpty = false;
              let form = res.data.data;
              this.TD = form.TD;
              this.honer = form.BY;
              this.activities = form.activities;
              this.tag_info = form.tag_info;
              this.pos_info = form.pos_info;
            } else {
              this.isEmpty = true;
              this.$message({
                labels: 'error',
                message: res.data.reason
              })
            }
          })
    }
  },
  watch: {
    tag_info(newValue) {
      if(newValue) {
        this.tagGraphInit();
      }
    },
    pos_info(newValue) {
      if(newValue) {
        this.placeGraphInit();
      }
    }
  },
  mounted() {
    this.tagGraphInit();
    this.placeGraphInit();
  },
  created() {
    this.$axios({
      method: 'get',
      url: 'A_MyActivities',
      headers: {token: sessionStorage.getItem("token")},
      params: {term: this.term},
      timeout: 1000
    })
        .then(res => {
          if (res.data.value === 0) {
            this.isEmpty = false;
            let form = res.data.data;
            this.TD = form.TD;
            this.honer = form.BY;
            this.activities = form.activities;
            this.tag_info = form.tag_info;
            this.pos_info = form.pos_info
          } else {
            this.$message({
              labels: 'error',
              message: res.data.reason
            })
          }
        })
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

.selectorArea {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  width: 78vw;
}

.icon {
  font-size: large;
}

.title {
  height: 30px;
  font-size: 20px;
  font-weight: bolder;
}

.listArea {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 67vw;
}

.tableList {
  width: 100%;
}

.operation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.processArea {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 200px;
  width: 60vw;
}

.block {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90px;
  width: 210px;
  background-color: #F4A460;
}

.context {
  color: white;
  font-size: 23px;
}

.graphArea {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80vw;
  height: 300px;
}

.graphBlock {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 300px;
}
</style>