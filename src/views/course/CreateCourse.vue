<template>
  <div class="base">
    <!--  课程展示列表  -->
    <div v-for="course in courseList" :key="course.id" class="card">
      <div class="header">{{course.name}}</div>
      <div class="body">
        <div class="item_board">
          <div class="item">
            <span class="item_entry">课程 ID ：</span><span class="item_content">{{course.id}}</span>
          </div>
          <div class="item">
            <span class="item_entry">上课时间：</span><span class="item_content">{{course.time}}</span>
          </div>
          <div class="item">
            <span class="item_entry">上课地点：</span><span class="item_content">{{course.location}}</span>
          </div>
          <div class="btArea">
            <el-button type="warning" plain @click.native.prevent="openAddNotice(course.id)">发布通告</el-button>
            <el-button type="warning" plain @click.native.prevent="openStudentsList(course.students, course.id)">学生详情</el-button>
          </div>
        </div>
      </div>

      <!--   学生信息展示对话   -->
      <el-dialog
          v-if="showStudentsDialogVisible"
          :modal="false"
          title="选课学生信息"
          :visible.sync="showStudentsDialogVisible"
          width="45%"
          :close-on-press-escape="false"
          :append-to-body="true"
          center
          class="studentShow">
        <el-table
            :data="studentsList"
            center>
          <el-table-column
              v-for="studentHeader in studentsHeaders"
              :key="studentHeader.prop"
              :prop="studentHeader.prop"
              :label="studentHeader.name"
              width="180px">
          </el-table-column>
        </el-table>
        <input multiple
               type="file"
               autocomplete="off"
               tabindex="-1"
               id="upload"
               accept=".xlsx,.csv,.xls"
               @change="handleFile($event)"
               style="display: none;"/>
        <div style="width: 100%; display: flex; flex-direction: row; justify-content: flex-end;">
          <el-button type="warning" plain class="uploadBt" onclick="document.querySelector('#upload').click()" style="float: left;">导入学生</el-button>
        </div>
      </el-dialog>

    </div>

    <!--  增加课程对话  -->
    <el-dialog v-if="addCourseDialogVisible"
               :modal="false"
               title="增加课程信息"
               :visible.sync="addCourseDialogVisible"
               width="40%"
               :close-on-press-escape="false"
               :append-to-body="true"
               center>
      <!-- 填写学生详情 -->
      <el-form ref="addStudent" :model="addCourseInfo" :visible.sync="addCourseDialogVisible" :hide-required-asterisk="true" @submit.native.prevent>
        <el-form-item label="课程名称">
          <el-input v-model="addCourseInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="授课时间">
          <el-input v-model="addCourseInfo.time"></el-input>
        </el-form-item>
        <el-form-item label="授课地点">
          <el-input v-model="addCourseInfo.location"></el-input>
        </el-form-item>
      </el-form>
      <!-- 表单脚 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCourseDialogVisible = false;">
          取 消
        </el-button>
        <el-button type="warning" @click="addCourse(addCourseInfo); addCourseDialogVisible = false;" plain>
          确 认
        </el-button>
      </span>
    </el-dialog>

    <!--  发布公告对话  -->
    <el-dialog v-if="addNoticeDialogVisible"
               :modal="false"
               title="发布公告"
               :visible.sync="addNoticeDialogVisible"
               width="40%"
               :close-on-press-escape="false"
               :append-to-body="true"
               center>
      <!-- 填写公告详情 -->
      <el-form ref="addNotice" :model="addNoticeInfo" :visible.sync="addNoticeDialogVisible" :hide-required-asterisk="true" @submit.native.prevent>
        <el-form-item label="公告名称" prop="name">
          <el-input v-model="addNoticeInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="desc">
          <el-input type="textarea" v-model="addNoticeInfo.content"></el-input>
        </el-form-item>
      </el-form>
      <!-- 表单脚 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addNoticeDialogVisible = false;">
          取 消
        </el-button>
        <el-button type="warning" @click="addNotice(addNoticeInfo); addNoticeDialogVisible = false;" plain>
          确 认
        </el-button>
      </span>
    </el-dialog>

    <!--  添加班级按钮  -->
    <div class="addDialog">
      <el-button type="warning" icon="el-icon-plus" circle class="addBt" @click.native.prevent="addCourseDialogVisible = true;"></el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "CreateCourse.vue",
  data() {
    return {
      courseList: [],
      showStudentsDialogVisible: false,
      addCourseDialogVisible: false,
      addNoticeDialogVisible: false,
      studentsList: [],
      curCourseId: -1,
      addCourseInfo: {
        name: "",
        time: "",
        location: "",
      },
      addNoticeInfo: {
        title: "",
        content: ""
      },
      studentsHeaders: [
        {
          prop: "name",
          name: "学生姓名",
        },
        {
          prop: "student_num",
          name: "学生学号",
        },
        {
          prop: "email",
          name: "学生邮箱",
        },
        {
          prop: "grade",
          name: "学生年级"
        }
      ],
    }
  },
  methods: {
    async getCourseList() {
      await this.$axios({
        method: 'get',
        url: 'TC_GetCourseList/',
        headers: {
          'token': sessionStorage.getItem('token')
        }
      }).then((res) => {
        this.courseList = res.data.course_list;
      })
    },
    openStudentsList(studentList, courseId)
    {
      this.studentsList = studentList;
      this.curCourseId = courseId;
      this.showStudentsDialogVisible = true;
    },
    openAddNotice(courseId)
    {
      this.curCourseId = courseId;
      this.addNoticeDialogVisible = true;
    },
    addCourse(addCourseInfo)
    {
      this.$axios(
          {
            method: "post",
            url: "TC_CreateCourse/",
            data: {
              name: addCourseInfo.name,
              time: addCourseInfo.time,
              location: addCourseInfo.location,
            }
          }
      )
          .then((res) => {
            if (res.data.value === 0) {
              this.$message.success("加入课程成功");
              // this.courseList.push({id: res.data.id, name: addCourseInfo.name, time: addCourseInfo.time, location: addCourseInfo.location})
              // console.log(this.courseList)
              this.getCourseList();
            }
            else {
              this.$message.warning(res.data.reason);
            }
          })
    },
    addNotice(addNoticeInfo)
    {
      console.log(addNoticeInfo);
      this.$axios(
          {
            method: "post",
            url: "TC_AddNotice/",
            data: {
              title: addNoticeInfo.title,
              content: addNoticeInfo.content,
              c_id: this.curCourseId,
            }
          }
      )
          .then((res) => {
            if (res.data.value === 0) {
              this.$message.success("发布公告成功");
            }
            else {
              this.$message.warning(res.data.reason);
            }
          })
    },
    handleFile(event)
    {
      let file = event.target.files[0];
      this.addStudent(file);
    },
    addStudent(file)
    {
      // TODO data 中的 curCourseId 就是需要导入学生的课程的 ID
      console.log(this.curCourseId);
      let data = new FormData();
      data.append('id', this.curCourseId);
      data.append("list", file);
      this.$axios({
        method: "post",
        url: "TC_ImportStudentList/",
        data: data,
        headers: { token: sessionStorage.getItem('token') }
      })
          .then(res => {
            if(res.data.value !== 0) {
              let msg = this.$message({
                labels: 'error',
                message: res.data.reason
              })
              setTimeout(() => {
                msg.close();
              }, 1000);
            } else {
              let msg = this.$message({
                labels: 'success',
                message: "上传成功"
              })
              setTimeout(() => {
                msg.close();
              }, 1000);
            }
          })
    }
  },
  mounted() {
    this.getCourseList();
  }
}
</script>

<style scoped>
  @font-face {
    font-family: 'myFont1';
    src: url("../../assets/font/font1.ttf");
  }
  .base {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .body {

  }
  .item {
    margin: 15px;
  }
  .item_board {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .item_entry {
    color: #1a1a1a;
    font-size: 15px;
    font-family: serif;
    font-weight: bolder;
    margin-right: 10px;
  }
  .item_content {
    color: #303133;
    font-family: serif;
  }
  .card {
    margin: 20px;
    width: 400px;
    height: 280px;
    border-radius: 10px; /*设置边角圆形*/
    box-shadow: 0 0 0 rgb(0 0 0 / 10%), 0 4px 5px rgb(38 38 38 / 12%);
  }
  .header {
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
  .card:hover {
    box-shadow: 0 0 0 rgb(0 0 0 / 10%), 0 8px 10px rgb(38 38 38 / 12%);
  }
  .btArea {
    margin-left: 150px;
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

  .addDialog {
    position: fixed;
    right: 3em;
    bottom: 3em;
    display: inline-grid;
  }

  .addBt {
    min-width: 70px;
    min-height: 70px;
  }

  .studentShow {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .uploadBt {
    margin: 20px auto;
  }
</style>