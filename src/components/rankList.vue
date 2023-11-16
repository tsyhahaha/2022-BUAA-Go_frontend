<template>
  <div class="base">
    <div class="list">
      <el-table
          :data="rankInfo.list"
          style="width: 100%"
          :header-cell-style="{'text-align': 'center', 'color': 'black', 'back-ground':'orange'}"
          :max-height="height">
        <el-table-column :label="rankInfo.item">
          <el-table-column
              prop="rank"
              label="排名"
              width="100">
          </el-table-column>
          <el-table-column
              prop="name"
              label="姓名"
              width="100">
          </el-table-column>
          <el-table-column
              prop="grade"
              label="成绩"
              width="100">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "rankList",
  props: {
    rankInfo: {},
    height: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>