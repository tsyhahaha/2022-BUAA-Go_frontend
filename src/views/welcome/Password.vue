<template>
  <div class="base">
    <div class="flexForm">
      <div class="formStyle">
        <!-- <div>{{items}}</div> -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div>
            <el-button icon="el-icon-back" circle @click="back()" class="location backBtn"></el-button>
          </div>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loadingState" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      loadingState: false,
      ruleForm: {
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'},
          {min: 6, max: NaN, message: '长度在六个字符及以上', trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.loadingState = true;
      var myParams = {
        name: this.getUser.name,
        email: this.getUser.email,
        identity: this.getUser.identity,
        student_num: this.getUser.number,
        grade: this.getUser.grade,
        password: this.ruleForm.pass
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (myParams['identity'] === 'course') {
            this.$axios({
              method: 'post',
              url: 'StudentRegister/',
              data: myParams
            })
                .then(async (res) => {
                  if (res.data === 0) {
                    this.$message({
                      labels: 'success',
                      message: '恭喜您，注册成功！'
                    })
                    await this.$router.push({
                      path: '/'
                    })
                  } else {
                    this.$message({
                      labels: 'error',
                      message: '抱歉请重新尝试注册！'
                    })
                  }
                })
          } else if (myParams['identity'] === 'teacher') {
            this.$axios({
              method: 'post',
              url: 'TeacherRegister/',
              data: myParams
            })
                .then(async (res) => {
                  if (res.data === 0) {
                    this.$message({
                      labels: 'success',
                      message: '恭喜您，注册成功！'
                    })
                    await this.$router.push({
                      path: '/'
                    })
                  } else {
                    this.$message({
                      labels: 'error',
                      message: '抱歉请重新尝试注册！'
                    })
                  }
                })
          }
          this.loadingState = false;
        } else {
          this.$message({
            labels: 'error',
            message: '请确认密码格式！'
          })
          this.loadingState = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    back() {
      this.$router.push({
        path: 'register'
      })
    }
  },
  computed: {
    ...mapGetters(['getUser']),
  }
}
</script>

<style scoped>
.base {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-image: url("../../assets/images/welcome_bk.jpg");
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
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

.formStyle:hover {
  width: 380px;
  height: auto;
}

.location {
  margin-top: 20px;
  margin-bottom: 20px;
}

.flexForm {
  height: 100vh;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.backBtn {
  display: flex;
  justify-content: right;
  border-color: white;
}

.backBtn {
  border-color: white;
}

</style>
