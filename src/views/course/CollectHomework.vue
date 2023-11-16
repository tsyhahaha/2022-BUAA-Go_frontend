<template>
  <div class="base">
    <div class="left">
      <div class="downloadBtnArea">
        <el-button class="downloadBtn" type="warning" @click="downloadAll">全部下载</el-button>
      </div>
      <div class="hwArea flexCenter">
        <div class="titleArea">
          <span class="title">完成作业学生列表</span>
        </div>
        <el-table
            :data="finishStu"
            border
            stripe
            class="tableArea">
          <el-table-column
              prop="student_num"
              label="学号"
              class="width1of3">
          </el-table-column>
          <el-table-column
              prop="name"
              label="姓名"
              class="width1of3">
          </el-table-column>
          <el-table-column
              prop="file"
              label="作业"
              class="width1of3">
            <template slot-scope="scope">
              <el-button @click="preview(scope.row)" type="text" size="small" style="color: #f25f27">
                查看</el-button>
              <el-button @click="download(scope.row)" type="text" size="small" style="color: #f25f27">
                下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="right">
      <div class="selectorArea">
        <el-form :rules="rules" :model="ruleForm" ref="ruleForm">
          <el-form-item label="" prop="courseValue">
            <el-select
                v-model="ruleForm.courseValue"
                class="selector selectorHorizon"
                placeholder="请选择课程">
              <el-option
                  v-for="item in courseOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="HWValue">
            <el-select
                class="selectorHorizon"
                v-model="ruleForm.HWValue"
                placeholder="请选择作业">
              <el-option
                  v-for="item in HWOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="addUDMargin selector">
            <el-button class="checkBtn" type="warning" @click="submit">加载数据</el-button>
          </div>
        </el-form>
      </div>
      <div class="unSubmitArea flexCenter">
        <div class="titleArea">
          <span class="title">未提交名单</span>
        </div>
        <el-table
            :data="unSubmitStu"
            border
            stripe
            empty-text="本次作业已全部提交"
            class="tableArea">
          <el-table-column
              prop="student_num"
              label="学号"
              class="width1of2">
          </el-table-column>
          <el-table-column
              prop="name"
              label="姓名"
              class="width1of2">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Collect",
  data() {
    var hwValid = (rule, value, callback) => {
      if (this.ruleForm.courseValue === '') {
        callback(new Error('请先选择课程'));
      } else if (!value) {
        callback(new Error('作业不能为空'));
      } else {
        callback();
      }
    };
    var courseValid = (rule, value, callback) => {
      if (!value) {
        callback(new Error('课程不能为空'));
      } else {
        callback();
      }
    };
    return {
      courseValue: '',  // 课程选择框结果
      ruleForm: {
        courseValue: '',  // 课程选择框结果
        HWValue: ''      // 作业选择框结果
      },
      rules: {
        HWValue: [
          {validator: hwValid, trigger: 'blur'}
        ],
        courseValue: [
          {validator: courseValid, trigger: 'blur'}
        ]
      },
      courseOptions: [],
      HWOptions: [],
      finishStu: [],
      unSubmitStu: []
    }
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$axios({
            url: 'TH_CollectHomeworks/',
            method: 'get',
            headers: {
              "token": sessionStorage.getItem("token")
            },
            params: {
              'hw_id': this.ruleForm.HWValue
            }
          }).then((res) => {
            this.finishStu = res.data.data.submitted
            this.unSubmitStu = res.data.data.unsubmitted
          })
        }
      })
    },
    /*获取课号id对应的作业列表*/
    getHw(id) {
      return this.$axios({
        url: 'TH_GetHomeworks/',
        method: 'get',
        params: {
          'course_id': id
        },
        headers: {
          "token": sessionStorage.getItem("token")
        }
      })
    },
    downloadAll() {
      window.location.href=this.$axios.defaults.baseURL +
          'TH_DownloadHW/?token=' + this.$store.getters.getToken +
          '&hw_id=' + this.ruleForm.HWValue + '&is_view=0'
    },
    preview(row) {
      window.open(this.$axios.defaults.baseURL +
          'TH_DownloadHW/?token=' + this.$store.getters.getToken +
          '&hw_id=' + this.ruleForm.HWValue +
          '&student_num=' + row.student_num + '&is_view=1')
    },
    download(row) {
      window.location.href=this.$axios.defaults.baseURL +
          'TH_DownloadHW/?token=' + this.$store.getters.getToken +
          '&hw_id=' + this.ruleForm.HWValue +
          '&student_num=' + row.student_num + '&is_view=0'
    }
  },
  async created() {
    let token = sessionStorage.getItem("token");
    await this.$axios({
      method: 'get',
      url: 'TH_GetCourseList/',
      headers: {
        'token': token
      }
    }).then((res) => {
      this.courseOptions = res.data.course;
    })
  },
  watch: {
     ruleForm: {
      handler(oldv, newValue) {
        // eslint-disable-next-line no-empty
        if (newValue.courseValue === '') {
          // pass
        } else {
          this.getHw(newValue.courseValue).then((res) => {
            this.HWOptions = res.data.hw;
          })
        }
      }, deep: true
    }
  }
}
</script>

<style scoped>
.base {
  margin: 0 auto;
  position: relative;
  top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  width: 90%;
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 1200px;
  margin-right: 30px;
  padding: 10px;

  /*调试用*/
  backdrop-filter: blur(2px);
  border-radius: 10px; /*设置边角圆形*/
  box-shadow: rgba(0, 0, 0, 13%) 0 0 10px;


}

.right {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 440px;
  padding: 10px;

  /*调试用*/
  backdrop-filter: blur(2px);
  border-radius: 10px; /*设置边角圆形*/
  box-shadow: rgba(0,0,0, 13%) 0 0 10px;
}
.downloadBtnArea {
  width: 100%;
  margin-top: 10px;
  margin-left: 15px;;
  display: flex;
  justify-content: flex-start;
}

.flexCenter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hwArea {
  bottom: 14px;
  width: 100%;
  /*调试用*/
  /*backdrop-filter: blur(2px);*/
}

.titleArea {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
}

.title {
  color: #f25f27;
  font-size: 20px;
  font-weight: bolder;
}

.selectorArea {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /*background-color: rgba(255, 223, 255, 0.5);*/
}

.addUDMargin {
  margin: 5px auto;
}

.checkBtn {
  right: 20px;
}

.unSubmitArea {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.selector {
  margin-top: 10px;
}

.selectorHorizon {
  padding: 0 5px;
}

.width1of3 {
  width: 30%;
}

.width1of2 {
  width: 50%;
}

.tableArea {
  width: 95%;
}
</style>