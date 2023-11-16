<template>
  <div class="base">
    <div class="flexForm">
      <div class="formStyle">
        <el-form :inline="false" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="40px">
          <div class="backBtn">
            <el-button icon="el-icon-close" circle @click="back()" class="location btnSize"></el-button>
          </div>
          <div class="form-input">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" style="width: 300px"></el-input>
            </el-form-item>
          </div>
          <div class="form-input">
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off" style="width: 300px"></el-input>
            </el-form-item>
          </div>
          <el-form-item style="padding-right: 15px">
            <el-button class="login-button" :loading="loadingState" type="primary" @click="submitForm('ruleForm')">登
              录
            </el-button>
            <el-button class="login-button" @click="resetForm('ruleForm')">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from "vuex";

export default {
  data() {
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      } else {
        let reg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
        var result = reg.test(this.ruleForm.email)
        if (!result) {
          callback(new Error('邮箱格式不正确'));
        } else {
          callback();
        }
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (this.returnData === 2) {
        callback(new Error('密码错误'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else {
        callback();
      }
    };
    return {
      loadingState: false,
      ruleForm: {
        pass: '',
        email: ''
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        email: [
          {validator: checkEmail, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.loadingState = true;
      this.$refs[formName].validate(async (valid) => {
        valid = true; // 先不管邮箱格式对不对
        if (valid) {
          await this.$axios({
            method: 'post',
            url: 'Login/',
            data: {
              email: this.ruleForm.email,
              password: this.ruleForm.pass,
            },
            timeout: 1000
          })
              .then(async (res) => {
                let value = res.data.value;
                //.value;
                let token = res.data.token;
                let type = res.data.type;
                this.setToken(token);
                this.setType(type);
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("type", type);
                this.loadingState = false;
                if (value === 0) {
                  let _msg = this.$message({
                    labels: 'success',
                    message: '登录成功！'
                  });
                  setTimeout(() => {
                    _msg.close();
                  }, 1000);
                  await this.$router.push({
                    path: "/course_home",
                  });
                } else if (value === 1) {
                  let _msg = this.$message({
                    labels: 'error',
                    message: '用户不存在！'
                  })
                  setTimeout(() => {
                    _msg.close();
                  }, 1000)
                } else if (value === 2) {
                  let _msg = this.$message({
                    labels: 'error',
                    message: '密码错误'
                  });
                  setTimeout(() => {
                    _msg.close();
                  }, 1000)
                }
              })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.loadingState = false;
    },
    ...mapMutations({
      setToken: 'SET_USER_TOKEN',
      setType: 'SET_USERTYPE'
    }),
    back() {
      this.$router.push({
        path: "/",
      });
    }
  },
  computed: {
    ...mapGetters(['getToken'])
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
  margin: 21px auto;
  border-radius: 40px;
  line-height: 80px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);

  transition: 0.4s;

  backdrop-filter: blur(2px);
  background-color: rgba(255, 255, 255, 0.5);

  box-shadow: 0 0 0 rgb(0 0 0 / 10%), 0 12px 20px rgb(38 38 38 / 12%);
}

/*.formStyle:hover {*/
/*  width: 380px;*/
/*  height: auto;*/
/*}*/

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

.login-button {
  font-size: 17px;
  background-color: #fff;
  color: black;
  border: none;
}

.login-button:hover {
  color: white;
  background-color: #f25f27;
  font-weight: bold;
  border: none;
}
</style>
