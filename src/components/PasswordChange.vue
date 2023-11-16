<template>
  <div class="base">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="oldPass">
        <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
      </el-form-item>
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
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.rules.checkPass !== '') {
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
        oldPass: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        oldPass: [
          { validator: validateOldPass, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: NaN, message: '长度在六个字符及以上',trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.loadingState = true;
      var myParams = {
        email: this.$store.state.user.email,
        oldPass: this.ruleForm.oldPass,
        newPass: this.ruleForm.pass
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'ResetPassword/',
            data: myParams,
            headers: {
              'token': this.$store.getters.getToken
            }
          })
              .then(async (res)=> {
                if (res.data.value === 0) {
                  this.$message({
                    labels: 'success',
                    message: '密码修改成功'
                  })
                  this.$router.push({
                    path: '/main_home'
                  })
                } else {
                  this.$message({
                    labels: 'error',
                    message: res.data.reason
                  })
                }
              })
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
    ...mapGetters(['items']),
  }
}
</script>

<style scoped>

.backBtn {
  width:40px;
  height: 40px;
  transition: 0.4s;
}

.backBtn:hover {
  width:50px;
  height: 50px;
}

.location {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
