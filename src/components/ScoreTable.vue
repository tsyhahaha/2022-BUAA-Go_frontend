<template>
  <div>
    <div class="tableName">{{ yearData.year }}学年体测成绩</div>
    <div class="baseInfo">
      <el-table
          :data="yearData.baseInfo"
          border
          class="baseInfoTable"
          :show-header="false"
          :cell-style="baseColumnStyle">
        <el-table-column
            prop="key1"
            label="key1">
        </el-table-column>
        <el-table-column
            prop="value1"
            label="value1">
        </el-table-column>
        <el-table-column
            prop="key2"
            label="key2">
        </el-table-column>
        <el-table-column
            prop="value2"
            label="value2">
        </el-table-column>
        <el-table-column
            prop="key3"
            label="key3">
        </el-table-column>
        <el-table-column
            prop="value3"
            label="value3">
        </el-table-column>
      </el-table>
    </div>
    <div class="courseMark">
      <el-table
          :data="yearData.courseMark"
          border
          class="courseMarkInfo"
          :cell-style="scoreMarkStyle"
          :show-header="false">
        <el-table-column
            prop="term"
            label="term">
        </el-table-column>
        <el-table-column
            prop="course"
            label="course">
        </el-table-column>
        <el-table-column
            prop="mark"
            label="mark">
        </el-table-column>
      </el-table>
    </div>
    <div class="scoreInfo">
      <el-table
          :data="yearData.scoreInfo"
          border
          class="scoreInfoTable"
          :cell-style="scoreColumnStyle"
          :header-cell-style="headerStyle">
        <el-table-column
            prop="label1"
            label="项目">
        </el-table-column>
        <el-table-column
            prop="mark1"
            label="成绩">
        </el-table-column>
        <el-table-column
            prop="score1"
            label="得分">
        </el-table-column>
        <el-table-column
            prop="grade1"
            label="等级">
        </el-table-column>
        <el-table-column
            prop="label2"
            label="项目">
        </el-table-column>
        <el-table-column
            prop="mark2"
            label="成绩">
        </el-table-column>
        <el-table-column
            prop="score2"
            label="得分">
        </el-table-column>
        <el-table-column
            prop="grade2"
            label="等级">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScoreTable",
  props: ['yearData'],
  data() {
    return {}
  },
  methods: {
    baseColumnStyle({columnIndex}) {
      if (columnIndex % 2 === 0) {
        return 'background: #BEBEBE;font-weight: bolder;color: black;font-size: 15px;'
      }
    },
    scoreColumnStyle({columnIndex}) {
      if (columnIndex % 4 === 0) {
        return 'background: #BEBEBE;font-weight: bolder;color: black;font-size: 15px;'
      }
    },
    scoreMarkStyle({columnIndex}) {
      if (columnIndex < 3) {
        return 'background: #faa755;font-weight: bolder;color: black;font-size: 15px;'
      }
    },
    headerStyle() {
      return 'background: #BEBEBE;color: black;font-size: 15px;';
    }
  }
}
</script>

<style scoped>
.tableName {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 23px;
  height: 36px;
  width: 100%;
  background-color: orange;
}

.baseInfoTable {
  font-size: 3px;
}

.scoreInfoTable {
  font-size: 3px;
}

.baseInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>