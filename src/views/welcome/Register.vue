<template>
  <div class="base">
    <div class="flexForm">
      <div class="formStyle">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px">
          <div class="backBtn">
            <el-button icon="el-icon-close" circle @click="back()" class="location btnSize"></el-button>
          </div>
          <div class="form-input">
            <el-form-item label="身份" prop="identity">
              <el-select v-model="ruleForm.identity" placeholder="请选择..." clearable>
                <el-option v-for="item in options"
                           :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form-input">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" style="width: 270px"></el-input>
            </el-form-item>
          </div>
          <div class="form-input">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" style="width: 270px"></el-input>
            </el-form-item>
          </div>
          <div class="form-input">
            <el-form-item label="学号" prop="number" v-if="ruleForm.identity==='course'">
              <el-input v-model="ruleForm.number" style="width: 270px"></el-input>
            </el-form-item>
          </div>
          <div class="form-input">
            <el-form-item label="年级" prop="grade" v-if="ruleForm.identity==='course'">
              <el-input v-model="ruleForm.grade" style="width: 270px"></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button class="login-button" :loading="loadingState" @click="submitForm('ruleForm')">创 建</el-button>
            <el-button class="login-button" @click="resetForm('ruleForm')">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
  computed: {
    ...mapGetters(['items'])
  },
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      }
      else if (!/^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
          .test(this.ruleForm.email)) {
        callback(new Error('邮箱格式不正确'))
      }
      else {
        callback();
      }
    };
    return {
      loadingState: false,
      options: [
        {value: 'teacher', label: '老师'},
        {value: 'course', label: '学生'}
      ],
      ruleForm: {
        name: '',
        email: '',
        identity: '',
        number: '',
        grade: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: validateEmail, trigger: 'blur'}
        ],
        identity: [
          {required: true, message: '请选择身份', trigger: 'change'}
        ],
        number: [
          {required: true, message: '请输入学号', trigger: 'change'}
        ],
        grade: [
          {required: true, message: '请输入年级', trigger: 'change'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.loadingState = true;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 设置请求逻辑
          const myParams = {
            name: this.ruleForm.name,
            email: this.ruleForm.email,
            identity: this.ruleForm.identity,
            number: '',
            grade: ''
          };
          if (this.ruleForm.identity === 'course') {
            // 如果是学生注册
            myParams['number'] = parseInt(this.ruleForm.number);
            myParams['grade'] = this.ruleForm.grade;
            await this.$axios({
              method: 'post',
              url: 'StudentMessageCheck/',
              data: myParams
            })
                .then(async (res) => {
                  this.loadingState = false;
                  if (res.data.value === 0) {
                    this.setName(myParams['name']);
                    this.setEmail(myParams['email']);
                    this.setId(myParams['identity']);
                    this.setNumber(myParams['number']);
                    this.setGrade(myParams['grade']);
                    this.$router.push({
                      path: 'password'
                    })
                  }
                  else if (res.data.value === 1) {
                    this.$message({
                      labels: 'error',
                      message: '邮箱已使用！'
                    })
                  }
                  else if (res.data.value === 2) {
                    this.$message({
                      labels: 'error',
                      message: '学号已被注册！'
                    })
                  }
                  else if (res.data.value === 3) {
                    this.$message({
                      labels: 'error',
                      message: res.message
                    })
                  }
                })
          }
          else {
            await this.$axios({
              method: 'post',
              url: 'TeacherMessageCheck/',
              data: myParams
            })
                .then(async (res) => {
                  this.loadingState = false;
                  if (res.data.value === 0) {
                    this.setName(myParams['name']);
                    this.setEmail(myParams['email']);
                    this.setId(myParams['identity']);
                    await this.$router.push({
                      path: 'password'
                    })
                  }
                  else if (res.data.value === 1) {
                    this.$message({
                      labels: 'error',
                      message: '邮箱已使用！'
                    })
                  }
                })
          }
          this.loadingState = false;
        }
        else {
          console.log('error submit!!');
          this.loadingState = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.loadingState = false
    }, back() {
      this.$router.push({
        path: '/'
      })
    },
    /* vuex保存各属性值 */
    ...mapMutations({
      setName: 'SET_USER_NAME',
      setEmail: 'SET_USER_EMAIL',
      setId: 'SET_USER_ID',
      setNumber: 'SET_USER_NUMBER',
      setGrade: 'SET_USER_GRADE',
      setRegistered: 'SET_USER_REGISTERED'
    })
  },
  watch: {
    isStu(val) {
      if (val === 'teacher') {
        setTimeout(() => {
          this.form.child = false;
        }, 100)
      }
    }
  }
}
</script>

<style scoped>
.base {
  margin: 0;
  padding: 0;
  height:100%;
  width:100%;
  background-image: url("../../assets/images/welcome_bk.jpg");
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
}

.flexForm {
  height: 100vh;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.formStyle {
  width: 350px;
  height: auto;
  padding: 0 25px;
  /* border: 1px solid grey; */
  margin: 21px auto;
  border-radius: 40px;
  line-height: 80px;
  /*可以让文字往下移一点 */

  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);

  transition: 0.4s;

  backdrop-filter: blur(2px);
  background-color: rgba(255, 255, 255, 0.5);

  box-shadow: 0 0 0 rgb(0 0 0 / 10%), 0 12px 20px rgb(38 38 38 / 12%);
}

.backBtn {
  display: flex;
  justify-content: right;
  border-color: white;
}

.backBtn {
  border-color: white;
}

.form-input {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}

.btnSize {
  height: 40px;
  width: 40px;
  transition: 0.4s;
}

.btnSize:hover {
  height: 40px;
  width: 40px;
  color: #fff;
  background: rgb(249, 90, 30, 0.8);
  border-style: none;
}

.location {
  margin-top: 20px;
  margin-bottom: 20px;
}

.form-input {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}

.login-button {
  font-size: 17px;
  background-color: #fff;
  border: none;
}

.login-button:hover {
  color: white;
  background-color: #f25f27;
  font-weight: bold;
  border: none;
}

.el-select-dropdown__item:hover {
  color: white;
  font-weight: bold;
  background: rgb(249, 90, 30, 0.3);
}

.el-select {
  border-style: none;
}
.el-select .el-input.is-focus .el-input__inner {
  border-style: none;
}
</style>