<template>
  <div class="root">
    <!--  添加学生的信息  -->
    <el-dialog v-if="addStudentDialogVisible"
               :modal="false"
               title="添加新学生"
               :visible.sync="addStudentDialogVisible"
               width="40%"
               :close-on-press-escape="false"
               :append-to-body="true"
               center>
      <!-- 填写学生详情 -->
      <el-form ref="addStudent" :model="addStudentInfo" :visible.sync="addStudentDialogVisible" :hide-required-asterisk="true" @submit.native.prevent>
        <el-form-item label="学生学号">
          <el-input v-model="addStudentInfo.num"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名">
          <el-input v-model="addStudentInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="入学年份">
          <el-date-picker
              v-model="addStudentInfo.grade"
              type="year"
              placeholder="请选择入学年份">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学生邮箱">
          <el-input v-model="addStudentInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="学生密码">
          <el-input v-model="addStudentInfo.password"></el-input>
        </el-form-item>
      </el-form>
      <!-- 表单脚 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addStudentDialogVisible = false; clearAddStudentInfo()">
          取 消
        </el-button>
        <el-button type="primary" @click="addStudent(addStudentInfo); clearAddStudentInfo">
          确 认
        </el-button>
      </span>
    </el-dialog>
    <!--  编辑学生的信息  -->
    <el-dialog v-if="editStudentDialogVisible"
               :modal="false"
               title="编辑学生信息"
               :visible.sync="editStudentDialogVisible"
               width="40%"
               :close-on-press-escape="false"
               :append-to-body="true"
               center>
      <!-- 填写学生详情 -->
      <el-form ref="editStudent" :model="editStudentInfo" :visible.sync="editStudentDialogVisible" :hide-required-asterisk="true" @submit.native.prevent>
        <el-form-item label="学生学号">
          <el-input v-model="editStudentInfo.num"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名">
          <el-input v-model="editStudentInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="入学年份">
          <el-date-picker
              v-model="editStudentInfo.grade"
              type="year"
              placeholder="请选择入学年份">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学生密码">
          <el-input v-model="editStudentInfo.password"></el-input>
        </el-form-item>
      </el-form>
      <!-- 表单脚 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editStudentDialogVisible = false; clearEditStudentInfo()">
          取 消
        </el-button>
        <el-button type="primary" @click="editStudent(editStudentInfo); editStudentDialogVisible = false">
          确 认
        </el-button>
      </span>
    </el-dialog>
    <!--  学生信息展示  -->
    <el-table
        style="width: 100%"
        :data="studentList"
        height="500">
      <el-table-column
          fixed
          prop="student_num"
          label="学号"
          width="150">
        <template slot="header" slot-scope="scope">
          <div>学号</div>
          <div>
            <el-input
                v-model="searchStudentInfo.num"
                size="mini"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="160">
        <template slot="header" slot-scope="scope">
          <div>姓名</div>
          <div>
            <el-input
                v-model="searchStudentInfo.name"
                size="mini"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱"
          width="300">
        <template slot="header" slot-scope="scope">
          <div>邮箱</div>
          <div>
            <el-input
                v-model="searchStudentInfo.email"
                size="mini"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="grade"
          label="年级"
          width="200">
        <template slot="header" slot-scope="scope">
          <div>年级</div>
          <div>
            <el-input
                v-model="searchStudentInfo.grade"
                size="mini"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="group"
          label="课程"
          width="160">
        <template slot="header" slot-scope="scope">
          <div>课程</div>
          <div>
            <el-input
                v-model="searchStudentInfo.course"
                size="mini"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          width="160">
        <template slot="header">
          <div>操作</div>
          <el-button
              @click.native.prevent="searchStudent(searchStudentInfo)"
              type="text"
              size="middle">
            搜索
          </el-button>
          <el-button
              @click.native.prevent="addStudentDialogVisible = true"
              type="text"
              size="middle">
            添加
          </el-button>
          <el-button
              @click.native.prevent="download(searchStudentInfo)"
              type="text"
              size="middle">
            导出
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button
              @click.native.prevent="openEditStudentDialog(scope.row)"
              type="text"
              size="small">
            编辑
          </el-button>
          <el-button
              @click.native.prevent="deleteStudent(scope.$index, scope.row)"
              type="text"
              size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      addStudentDialogVisible: false,
      editStudentDialogVisible: false,
      searchStudentInfo: {
        num: "",
        name: "",
        email: "",
        grade: "",
        course: ""
      },
      addStudentInfo: {
        email: "",
        name: "",
        num: "",
        grade: "",
        password: ""
      },
      editStudentInfo: {
        email: "",
        name: "",
        num: "",
        grade: "",
        password: ""
      },
      studentList: []
    }
  },
  methods: {
    searchStudent(searchStudentInfo) {
      this.$axios(
          {
            method: "get",
            url: "SearchUsers/",
            params: {
              email: searchStudentInfo.email,
              name: searchStudentInfo.name,
              group_name: searchStudentInfo.course,
              student_num: searchStudentInfo.num,
              grade: searchStudentInfo.grade
            }
          }
      )
          .then((res) => {
            this.studentList = res.data;
          })
          .catch(() => {

          });
    },
    addStudent(student) {
      this.$axios(
          {
            method: "post",
            url: "AddUser/",
            data: {
              email: student.email,
              name: student.name,
              student_num: student.num,
              grade: student.grade,
              password: student.password
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
          .catch(() => {

          })
          .finally(() => {
            this.refreshStudentsList();
          })
    },
    clearAddStudentInfo() {
      for (let key in this.addStudentInfo) {
        this.addStudentInfo[key] = "";
      }
    },
    clearEditStudentInfo() {
      for (let key in this.editStudentInfo) {
        this.editStudentInfo[key] = "";
      }
    },
    refreshStudentsList() {
      this.searchStudent({
        email: "",
        name: "",
        group: "",
        student_num: "",
        grade: ""
      })
    },
    deleteStudent(index, row) {
      this.studentList.splice(index, 1);
      this.$axios({
        method: "post",
        url: "DeleteUser/",
        data: {
          email: row.email
        }
      })
          .then((res) => {
            if (res.data.value === 0) {
              this.$message.success("删除学生成功");
            }
            else {
              this.$message.warning("删除学生失败");
            }
          })
    },
    openEditStudentDialog(row){
      this.editStudentDialogVisible = true;
      this.editStudentInfo.email = row.email;
    },
    editStudent(editStudentInfo)
    {
      this.$axios(
          {
            method: "post",
            url: "EditUser/",
            data: {
              email: editStudentInfo.email,
              name: editStudentInfo.name,
              student_num: editStudentInfo.num,
              grade: editStudentInfo.grade,
              password: editStudentInfo.password
            }
          }
      )
          .then((res) => {
            if (res.data.value === 0) {
              this.$message.success("编辑学生成功");
              this.refreshStudentsList();
            }
            else {
              this.$message.warning(res.data.reason);
            }
          });
    },
    download(info)
    {
      window.location.href = this.$axios.defaults.baseURL +
          'ExportUsers/?' +
          'email=' + info.email +
          '&name=' + info.name +
          '&group_name=' + info.course +
          '&student_name=' + info.num +
          '&grade=' + info.grade;
    }
  },
  mounted() {
    this.refreshStudentsList();
  }
}
</script>