<template>
  <div class="base">
    <el-form ref="form" :model="form" label-width="70px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.location" placeholder="请选择活动区域">
          <el-option label="田径场" value="田径场"></el-option>
          <el-option label="体育连廊" value="体育连廊"></el-option>
          <el-option label="排球场" value="排球场"></el-option>
          <el-option label="篮球场" value="篮球场"></el-option>
          <el-option label="羽毛球馆" value="羽毛球馆"></el-option>
          <el-option label="游泳馆" value="游泳馆"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
            v-model="form.time"
            type="datetimerange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="博雅/TD">
        <div class="TDArea">
          <el-switch v-model="form.honer" active-text="博雅认证" active-color="orange"></el-switch>
          <el-switch v-model="form.isTD" active-text="TD认证" active-color="orange"></el-switch>
          <el-input :disabled="!form.isTD" v-model.number="form.TD" placeholder="" class="TDInput"></el-input>
          <span class="place">个</span>
        </div>
      </el-form-item>
      <el-form-item label="活动标签">
        <el-radio label="社团活动" v-model="form.label">社团活动</el-radio>
        <el-radio label="学院活动" v-model="form.label">学院活动</el-radio>
        <el-radio label="学校活动" v-model="form.label">学校活动</el-radio>
        <el-radio label="个人活动" v-model="form.label">个人活动</el-radio>
      </el-form-item>
      <el-form-item label="活动介绍">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="活动图片">
        <div  class="center"><img v-if="imageUrl!==null" :src="imageUrl" class="avatar" alt=""></div>
        <el-upload
            v-if="imageUrl === null"
            class="avatar-uploader"
            action="#"
            :http-request="uploadHttpRequest"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button class="button" @click="onSubmit">立即创建</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
        name: '',
        location: '',
        time: '',
        honer: false,
        isTD: false,
        TD: 1,
        label: "4",
        desc: '',
      },
      imageUrl: null,
      img_id: ''
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
      let data = {
        title: this.form.name,
        content: this.form.desc,
        position: this.form.location,
        start_time: this.form.time[0],
        end_time: this.form.time[1],
        tag: this.form.label,
        TD: this.form.TD,
        BY: this.form.honer ? 1 : 0,
        img_id: this.img_id+""
      }
      console.log(data);
      this.$axios({
        method: 'post',
        url: 'A_CreateActivity/',
        headers: {token: sessionStorage.getItem("token")},
        data: data
      })
          .then((res) => {
            console.log(res.data);
            if (res.data.value === 0) {
              let msg = this.$message({
                labels: 'success',
                message: "创建成功"
              });
              setTimeout(()=> {
                msg.close();
              },1000);
              this.$router.push({
                path: 'activity_home/activity_area'
              })
            } else {
              this.$message({
                labels: 'error',
                message: this.data.reason
              });
            }
          })
    },
    handleAvatarSuccess(res, file) {
      console.log(true);
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      return isJPG;
    },
    uploadHttpRequest(data) {
      let formData = new FormData();
      formData.append('img', data.file);
      this.$axios({
        method: 'post',
        url: 'UploadImage/',
        data: formData,
      }).then((res) => {
        console.log(res.data.url);
        console.log(data.file);
        this.imageUrl = res.data.url;
        this.img_id = res.data.id;
      })
    },
    back() {
      this.$router.push({
        path: '/activity_home/activity_area'
      })
    }
  }
}
</script>

<style scoped>
.base {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px auto;
  width: 80%;
}

.button {
  background-color: rgba(255, 156, 0, 1);
  color: white;
}

.button:hover {
  background-color: rgba(255, 152, 0, 80%);
}

.avatar-uploader {
  border: 1px dashed rgb(176, 196, 222, 1);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader:hover {
  border-color: rgb(255, 165, 0);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  max-width: 300px;
  max-height: 300px;
  display: block;
}

.TDArea {
  position: relative;
  top: 15px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;
}

.TDInput {
  width: 60px;
  position: relative;
  right: 8px;
  bottom: 10px;
}

.place {
  position: relative;
  bottom: 10px;
  right: 4px;
  color: black;
}

.center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>