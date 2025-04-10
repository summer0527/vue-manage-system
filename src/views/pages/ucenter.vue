<template>
    <div >
        <div class="user-container" style="display: flex;justify-content: center;align-items: center;">
            <el-card class="user-profile" shadow="hover" :body-style="{ padding: '0px' }">
                <div class="user-profile-bg"></div>
                <div class="user-avatar-wrap">
                    <el-upload
    class="avatar-uploader"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :http-request="customUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
                   
                </div>
                <div class="user-info" style="margin-top: 40px;">
                    <div class="info-name">{{ name }}</div>
                    
                   
                </div>
                <div style="padding: 10px;box-sizing: border-box;height: 300px;">
                    <el-form   label-width="auto">
                    <el-form-item label="用户名：">
                                <el-input  v-model="form.s_name" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="旧密码：">
                                <el-input type="password" v-model="form.s_pass2"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码：">
                                <el-input type="password" v-model="form.s_pass" ></el-input>
                            </el-form-item>
                          
                            
                        </el-form>
                        <div style="display: flex;justify-content: center;align-items: center;">
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                            <el-button  @click="handleBack">返回首页</el-button>

                        </div>
                </div>
                
            </el-card>
           
        </div>
    </div>
</template>

<script setup lang="ts" name="ucenter">
import { reactive, ref } from 'vue';
import { VueCropper } from 'vue-cropper';
import { ElMessage } from 'element-plus'
import 'vue-cropper/dist/index.css';
import avatar from '@/assets/img/img.jpg';
import type { UploadProps } from 'element-plus'
import { userMessageApi,userMessageUpdateApi,userPicTApi} from "../../api/index";
import request from "../../utils/request";
import { useRouter } from "vue-router";
const router = useRouter();

const name = localStorage.getItem('s_name');
const s_id = localStorage.getItem('s_id');
const form = reactive({
    s_name: name,
    s_pass: '',
    s_pass2:'',
    old: '',
});

const onSubmit = async() => {
   
    await request
    .put(userMessageUpdateApi+s_id,form)
    .then((response) => {
      console.log("响应数据:", response);
      const {
        message,
        code,
      } = response;
      if (code == 200) {
        ElMessage({
          message: message,
          type: "success",
        });
      }
    })
    .catch((error) => {
      console.log("请求出错:", error);
      const { message, code } = error.response.data;
      if (code == 409) {
        ElMessage({
          message: message,
          type: "error",
        });
      } else {
        ElMessage({
          message: error.response.data,
          type: "error",
        });
      }
    });
};

const activeName = ref('label2');

const avatarImg = ref(avatar);
const imgSrc = ref(avatar);
const cropImg = ref('');
const cropper: any = ref();
const imageUrl = ref(avatar)
// 自定义上传方法
const customUpload = async (params) => {
  const formData = new FormData();
  formData.append('file', params.file);

  

  await request
    .put(userPicTApi+s_id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log("响应数据:", response);
      imageUrl.value = params.file;
      ElMessage.success('头像上传成功');
    })
    .catch((error) => {
      console.log("请求出错:", error);
      const { message, code } = error.response.data;
      if (code == 409) {
        ElMessage({
          message: message,
          type: "error",
        });
      } else {
        ElMessage({
          message: error.response.data,
          type: "error",
        });
      }
    });
}
const getData = async () => {
  await request
    .get(userMessageApi+s_id)
    .then((response) => {
      console.log("响应数据:", response);
      const {
        message,
        data:{s_name,p_pic},
        code,
      } = response;
      if (code == 200) {
        imageUrl.value='http://192.168.1.4:1818/'+p_pic.replace(/\\/g, '/')
      }
    })
    .catch((error) => {
      console.log("请求出错:", error);
      const { message, code } = error.response.data;
      if (code == 409) {
        ElMessage({
          message: message,
          type: "error",
        });
      } else {
        ElMessage({
          message: error.response.data,
          type: "error",
        });
      }
    });
};
getData()
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
    console.log('ppopopopopopopopopop')
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
const setImage = (e: any) => {
    const file = e.target.files[0];
    if (!file.type.includes('image/')) {
        return;
    }
    const reader = new FileReader();
    reader.onload = (event: any) => {
        imgSrc.value = event.target.result;
        cropper.value && cropper.value.replace(event.target.result);
    };
    reader.readAsDataURL(file);
};

const cropImage = () => {
    cropImg.value = cropper.value?.getCroppedCanvas().toDataURL();
};

const saveAvatar = () => {
    avatarImg.value = cropImg.value;
};
const handleBack=()=>{
    router.push("/dashboard");
}
</script>

<style scoped>
.avatar-uploader .avatar {
    border-radius:50% ;
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.user-container {
    display: flex;
}

.user-profile {
    position: relative;
}

.user-profile-bg {
    width: 100%;
    height: 200px;
    background-image: url('../../assets/img/ucenter-bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.user-profile {
    width: 500px;
    margin-right: 20px;
    flex: 0 0 auto;
    align-self: flex-start;
}

.user-avatar-wrap {
    position: absolute;
    top: 135px;
    width: 100%;
    text-align: center;
}

.user-avatar {
    border: 5px solid #fff;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 7px 12px 0 rgba(62, 57, 107, 0.16);
}

.user-info {
    text-align: center;
    padding: 80px 0 30px;
}

.info-name {
    margin: 0 0 20px;
    font-size: 22px;
    font-weight: 500;
    color: #373a3c;
}

.info-desc {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
}

.info-desc,
.info-desc a {
    font-size: 18px;
    color: #55595c;
}

.info-icon {
    margin-top: 10px;
}

.info-icon i {
    font-size: 30px;
    margin: 0 10px;
    color: #343434;
}

.user-content {
    flex: 1;
}

.user-tabpane {
    padding: 10px 20px;
}

.crop-wrap {
    width: 600px;
    height: 350px;
    margin-bottom: 20px;
}

.crop-demo-btn {
    position: relative;
}

.crop-input {
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}

.w500 {
    width: 500px;
}

.user-footer {
    display: flex;
    border-top: 1px solid rgba(83, 70, 134, 0.1);
}

.user-footer-item {
    padding: 20px 0;
    width: 33.3333333333%;
    text-align: center;
}

.user-footer > div + div {
    border-left: 1px solid rgba(83, 70, 134, 0.1);
}
</style>

<style>
.el-tabs.el-tabs--left {
    height: 100%;
}
</style>
