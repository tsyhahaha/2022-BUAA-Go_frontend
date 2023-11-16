<template>
  <div class="base">
    <div class="scoreArea" v-if="!isEmpty">
      <el-carousel indicator-position="outside" height="470px" class="horse">
        <el-carousel-item v-for="(yearData, index) in scores" :key="index">
          <scoreTable :yearData="yearData"></scoreTable>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="rankArea" v-if="!isEmpty">
      <div class="rankList" v-for="item in rankList">
        <rankList :rankInfo="item"></rankList>
      </div>
    </div>
    <el-empty :image-size="200" v-if="isEmpty"></el-empty>
  </div>
</template>

<script>
import scoreTable from "@/components/ScoreTable";
import rankList from "@/components/rankList";

export default {
  name: "TestScore",
  components: {scoreTable, rankList},
  data() {
    return {
      isEmpty: true,
      rankList: [],
      scores: [],
    }
  },
  methods: {

  },
  created() {
    this.$axios({
      method: 'get',
      url: 'SE_GetExamineResult/',
      headers: { token: sessionStorage.getItem("token") }
    })
        .then(res => {
          if(res.data.value === 0) {
            this.isEmpty = false;
            this.scores = res.data.data;
          } else {
            let msg = this.$message({
              labels: 'error',
              message: res.data.reason
            })
            setTimeout(()=> {
              msg.close();
            },1000)
          }
        })
    this.$axios({
      method: 'get',
      url: 'SE_GetRankList/',
      headers: { token: sessionStorage.getItem("token") }
    })
        .then( res => {
          console.log(res)
          if(res.data.value === 0) {
            this.isEmpty = false;
            this.rankList = res.data.data;
          } else {
            let msg = this.$message({
              labels: 'error',
              message: res.data.reason
            });
            setTimeout(()=> {
              msg.close();
            },1000)
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

.scoreArea {
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.horse {
  width: 78vw;
}

.rankArea {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  justify-self: center;
  margin-bottom: 2vh;
  width: 70vw;
}

.rankList {
  width: 400px;
  margin-bottom: 50px;
}
</style>