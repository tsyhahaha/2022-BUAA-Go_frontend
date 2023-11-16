<template>
  <div>
    <el-table
        style="width: 100%"
        :data="courseList"
        height="500">
      <!--   普通表头   -->
      <el-table-column
          v-for="header in headers"
          :key="header.prop"
          :prop="header.prop"
          :label="header.name"
          :width="header.width">
        <template slot="header" slot-scope="scope">
          <div>{{ header.name }}</div>
          <div>
            <el-input
                v-model="searchCourseInfo[header.infoField]"
                size="mini"/>
          </div>
        </template>
      </el-table-column>
      <!--   学生表头   -->
      <el-table-column
          prop="students"
          label="学生名单"
          width="200px">
        <template slot-scope="scope">
          <el-button
              @click.native.prevent="openShowStudentDialog(scope.$index, scope.row)"
              type="text"
              size="small">
            查看学生
          </el-button>
        </template>
      </el-table-column>
      <!--   操作表头   -->
      <el-table-column
          label="操作"
          width="200px">
        <template slot="header">
          <div>操作</div>
          <div>
            <el-button
                @click.native.prevent="searchCourse(searchCourseInfo)"
                type="text"
                size="middle">
              搜索
            </el-button>
            <el-button
                @click.native.prevent="addCourseDialogVisible = true"
                type="text"
                size="middle">
              添加
            </el-button>
            <el-button
                @click.native.prevent="download(searchCourseInfo)"
                type="text"
                size="middle">
              导出
            </el-button>
          </div>
        </template>
        <template slot-scope="scope">
          <el-button
              @click.native.prevent="openEditStudentDialog(scope.$index, scope.row)"
              type="text"
              size="small">
            编辑
          </el-button>
          <el-button
              @click.native.prevent="deleteCourse(scope.$index, scope.row)"
              type="text"
              size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
      <!--   展示学生对话   -->
      <el-dialog
          v-if="showStudentsDialogVisible"
          :modal="false"
          title="选课学生信息"
          :visible.sync="showStudentsDialogVisible"
          width="80%"
          :close-on-press-escape="false"
          :append-to-body="true"
          center>
        <el-table
            style="width: 100%"
            :data="tmpRow.students"
            height="500"
            center>
          <el-table-column
              v-for="studentHeader in studentsHeaders"
              :key="studentHeader.prop"
              :prop="studentHeader.prop"
              :label="studentHeader.name"
              width="180px">
          </el-table-column>
          <!--     学生操作     -->
          <el-table-column
              label="操作"
              width="200px">
            <template slot="header">
              <div>操作</div>
              <div>
                <el-button
                    @click.native.prevent="addStudentDialogVisible = true"
                    type="text"
                    size="middle">
                  添加
                </el-button>
              </div>
            </template>
            <template slot-scope="scope">
              <el-button
                  @click.native.prevent="deleteStudent(scope.$index, scope.row)"
                  type="text"
                  size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--   添加学生对话     -->
        <el-dialog
            v-if="addStudentDialogVisible"
            :modal="false"
            title="选课学生信息"
            :visible.sync="addStudentDialogVisible"
            width="60%"
            :close-on-press-escape="false"
            :append-to-body="true"
            center>
          <el-form
              ref="addStudent"
              :model="addStudentInfo"
              :visible.sync="addStudentDialogVisible"
              :hide-required-asterisk="true"
              @submit.native.prevent>
            <el-form-item label="学生邮箱">
              <el-input v-model="addStudentInfo.studentEmail"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addStudentDialogVisible = false">
              取 消
            </el-button>
            <el-button type="primary" @click="addStudent(addStudentInfo)">
              确 认
            </el-button>
          </span>
        </el-dialog>
      </el-dialog>
    </el-table>
    <!--   编辑课程对话   -->
    <el-dialog v-if="editCourseDialogVisible"
               :modal="false"
               title="编辑课程信息"
               :visible.sync="editCourseDialogVisible"
               width="40%"
               :close-on-press-escape="false"
               :append-to-body="true"
               center>
      <!-- 填写学生详情 -->
      <el-form ref="editCourse" :model="editCourseInfo" :visible.sync="editCourseDialogVisible" :hide-required-asterisk="true" @submit.native.prevent>
        <el-form-item label="课程名称">
          <el-input v-model="editCourseInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="授课时间">
          <el-input v-model="editCourseInfo.time"></el-input>
        </el-form-item>
        <el-form-item label="授课地点">
          <el-input v-model="editCourseInfo.location"></el-input>
        </el-form-item>
      </el-form>
      <!-- 表单脚 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCourseDialogVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="editCourse(editCourseInfo); editCourseDialogVisible = false">
          确 认
        </el-button>
      </span>
    </el-dialog>
    <!--  增加课程对话  -->
    <el-dialog v-if="addCourseDialogVisible"
               :modal="false"
               title="增加课程信息"
               :visible.sync="addCourseDialogVisible"
               width="40%"
               :close-on-press-escape="false"
               :append-to-body="true"
               center>
      <!-- 填写课程详情 -->
      <el-form ref="addStudent" :model="addCourseInfo" :visible.sync="addCourseDialogVisible" :hide-required-asterisk="true" @submit.native.prevent>
        <el-form-item label="课程名称">
          <el-input v-model="addCourseInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="任课教师邮箱">
          <el-input v-model="addCourseInfo.teacherEmail"></el-input>
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
        <el-button type="primary" @click="addCourse(addCourseInfo); addCourseDialogVisible = false;">
          确 认
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showStudentsDialogVisible: false,
      addStudentDialogVisible: false,
      addCourseDialogVisible: false,
      editCourseDialogVisible: false,
      tmpRow: {
        name: "",
        id: "",
        location: "",
        time: "",
        teacher_name: "",
        students: []
      },
      tmpIndex: -1,
      headers: [
        {
          prop: "name",
          name: "课程名称",
          width: "200px",
          infoField: "name"
        },
        {
          prop: "id",
          name: "课程id",
          width: "160px",
          infoField: "id"
        },
        {
          prop: "location",
          name: "上课地点",
          width: "200px",
          infoField: "location"
        },
        {
          prop: "time",
          name: "上课时间",
          width: "200px",
          infoField: "time"
        },
        {
          prop: "teacher_name",
          name: "任课教师",
          width: "200px",
          infoField: "teacher_name"
        },
      ],
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
      courseList: [],
      searchCourseInfo: {
        name: "",
        teacher_name: "",
        id: "",
        time: "",
        location: "",
        teacher: "",
      },
      addStudentInfo: {
        studentEmail: ""
      },
      editCourseInfo: {
        name: "",
        id: "",
        location: "",
        time: "",
        teacher: "",
      },
      addCourseInfo: {
        name: "",
        teacherEmail: "",
        time: "",
        location: "",
      }
    }
  },
  methods: {
    openShowStudentDialog(index, row) {
      this.tmpRow = row;
      this.tmpIndex = index;
      this.showStudentsDialogVisible = true;
    },
    addStudent(addStudentInfo) {
      this.$axios(
          {
            method: "post",
            url: "AddUserToCourse/",
            data: {
              user_email: addStudentInfo.studentEmail,
              course_id: this.tmpRow.id
            }
          }
      )
          .then((res) => {
            if (res.data.value === 0) {
              this.$message.success("加入学生成功");
            }
            else {
              this.$message.warning(res.data.reason);
            }
          })
          .finally(() =>{
            this.addStudentDialogVisible = false;
            this.refreshCourseList();
          });
    },
    deleteStudent(index, row) {
      this.tmpRow.students.splice(index, 1);
      this.$axios({
        method: "post",
        url: "DeleteUserFromCourse/",
        data: {
          course_id: this.tmpRow.id,
          user_email: row.email
        }
      })
          .then((res) => {
            if (res.data.value === 0) {
              this.$message.success("删除学生成功");
            }
            else {
              this.$message.warning(res.data.reason);
            }
          })
    },
    searchCourse(searchCourseInfo) {
      this.$axios(
          {
            method: "get",
            url: "GetCourse/",
            params: {
              teacher_name: searchCourseInfo.teacher_name,
              name: searchCourseInfo.name,
              id: searchCourseInfo.id,
              location: searchCourseInfo.location,
              time: searchCourseInfo.time
            }
          }
      )
          .then((res) => {
            this.courseList = res.data;
            this.tmpRow = this.courseList[this.tmpIndex];
          });
    },
    openEditStudentDialog(index, row) {
      this.editCourseDialogVisible = true;
      this.editCourseInfo.id = row.id;
    },
    editCourse(editStudentInfo)
    {
      this.$axios(
          {
            method: "POST",
            url: "EditCourse/",
            data: {
              teacher_name: editStudentInfo.teacher,
              name: editStudentInfo.name,
              id: editStudentInfo.id,
              location: editStudentInfo.location,
              time: editStudentInfo.time,
            }
          }
      ).then((res) => {
        if (res.data.value === 0) {
          this.$message.success("编辑课程成功");
          this.refreshCourseList();
        }
        else {
          this.$message.warning(res.data.reason);
        }
      });
    },
    deleteCourse(index, row) {
      this.courseList.splice(index, 1);
      this.$axios({
        method: "post",
        url: "DeleteCourse/",
        data: {
          course_id: row.id
        }
      })
          .then((res) => {
            if (res.data.value === 0) {
              this.$message.success("删除课程成功");
            }
            else {
              this.$message.warning("删除课程失败");
            }
          })
    },
    refreshCourseList() {
      this.searchCourse({
        name: "",
        teacher_name: "",
        id: "",
        time: "",
        location: "",
        teacher: "",
      })
    },
    addCourse(addCourseInfo)
    {
      this.$axios(
          {
            method: "post",
            url: "AddCourse/",
            data: {
              major_teacher_email: addCourseInfo.teacherEmail,
              name: addCourseInfo.name,
              time: addCourseInfo.time,
              location: addCourseInfo.location,
            }
          }
      )
          .then((res) => {
            if (res.data.value === 0) {
              this.$message.success("加入课程成功");
            }
            else {
              this.$message.warning(res.data.reason);
            }
          })
          .catch(() => {

          })
          .finally(() => {
            this.refreshCourseList();
          })
    },
    download(info)
    {
      window.location.href = this.$axios.defaults.baseURL +
          'ExportCourse/?' +
          'teacher_name=' + info.teacher_name +
          '&name=' + info.name +
          '&id=' + info.id +
          '&location=' + info.location +
          '&time=' + info.time;
    }
  },
  mounted() {
    this.refreshCourseList();
  }
}
</script>