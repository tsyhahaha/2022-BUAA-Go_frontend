<template>
  <div class="uploaderBase">
    <input multiple
           type="file"
           autocomplete="off"
           tabindex="-1"
           id="upload"
           accept=".pdf,.word,.rar,.zip"
           @change="handleFile($event)"
           style="display: none;"/>
    <div class="submitInfo">
      <!--icon-->
      <div class="icon"><i class="el-icon-paperclip"></i></div>
      <!--input line-->
      <div class="input" onclick="document.querySelector('#upload').click()">
        <span class="inputFont">选择文件</span>
      </div>
      <!--uploader btn-->
      <div>
        <el-button class="fontUp" type="text" @click="upload()"><i class="el-icon-upload"></i> 提交</el-button>
      </div>
    </div>
    <div slot="tip" class="el-upload__tip">只能上传pdf文件，多个文件请压缩成rar/zip压缩包</div>
    <div class="preview">
      <div v-for="(file, index) in this.files" :myIndex="index" :key="file.name" class="uploadSuccess">
        <div><i class="el-icon-document-checked" style="margin: 5px;"></i>{{ file.name }}</div>
        <el-button @click="deleteFile($event)" class="deleteBtn" type="text warning" icon="el-icon-circle-close"><i
            class="el-circle-close"></i></el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Uploader",
  props: ['HWid', 'lastSubmit'],
  data() {
    return {
      files: []
    }
  },
  methods: {
    handleFile(event) {
      const file = event.target.files[0];
      this.files.splice(0, 1);
      this.files.push(file);
      // eslint-disable-next-line vue/no-mutating-props
      this.lastSubmit = file.name;
    },
    deleteFile(e) {
      const index = e.currentTarget.parentElement.getAttribute('myIndex');
      const name = this.files[index].name;
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        labels: 'warning'
      }).then(() => {
        this.files.splice(index, 1);
        this.$message({
          labels: 'success',
          message: '删除: ' + name
        });
      }).catch(() => {
        this.$message({
          labels: 'info',
          message: '已取消删除'
        });
      });
    },
    upload() {
      var formData = new FormData();
      if (this.files.length === 0) {
        this.$message({
          message: '上传文件列表为空！',
          labels: 'error'
        })
      } else {
        formData.append('hw_submit', this.files[0]); // 仅有一个文件
        formData.append('id', this.HWid);
        this.$axios({
          url: 'SH_SubmitHomework/',
          method: 'post',
          data: formData,   // 发现 data 后面直接跟 formData 后端才能接收到
          headers: {
            token: this.$store.getters.getToken
          }
        }).then(res => {
          if (res.data.value === 0) {
            this.$message({
              message: '作业上传成功',
              labels: 'success'
            })
          } else {
            this.$message({
              message: '作业上传失败: ' + res.data.reason,
              labels: 'error'
            })
          }
        })
      }
    },
  },
  mounted() {
    if(this.lastSubmit) {
      this.files = [{name: this.lastSubmit}]
    } else {
      this.files = []
    }
  }
}
</script>

<style scoped>

.uploaderBase {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.submitInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.icon {
  font-size: 25px;
  margin-right: 10px;
}

.input {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 45px;
  width: 400px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0);
  border-bottom: 1px solid #1a1a1a;
  border-radius: 3px 3px 3px 3px; /*设置边角圆形*/

  transition: 0.3s;
}

.input:hover {
  cursor: pointer;
  background-color: rgba(160, 156, 156, 0.2);
  width: 410px;
}

.inputFont {
  font-family: sans-serif;
  color: rgba(0, 0, 0, 0.5);
  font-weight: normal;
  border-bottom: #1a1a1a;
  margin-left: 8px;
}


.fontUp {
  font-size: 15px;
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.3);
}

.fontUp:hover {
  color: rgba(0, 0, 0, 0.6);
}

.preview {
  width: 460px;
  margin: 5px auto;
}


.uploadSuccess {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  font-size: 13px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0);
  transition: 0.3s;
}

.uploadSuccess:hover {
  background-color: rgba(255, 255, 255, 0.6);
}

.deleteBtn {
}

.deleteBtn:hover {
  color: red;
}

</style>