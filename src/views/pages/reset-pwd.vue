<template>
    <div class="login-bg">
        <div class="login-container">
            <div class="reset-title">重置密码</div>
            <!-- <p class="reset-text">输入你的邮箱，我们将发送重置密码邮件</p> -->
            <el-form :model="param" :rules="rules" ref="register" size="large">
                <el-form-item prop="email">
                    <el-input v-model="param.s_name" placeholder="用户名" >
                        <template #prepend>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="s_student_id">
                    <el-input v-model="param.s_student_id" placeholder="学号">
                        <template #prepend>
                            <el-icon>
                                <Message />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input v-model="param.s_pass" placeholder="新密码">
                        <template #prepend>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-button class="login-btn" type="primary" size="large" @click="submitForm(register)"
                    >保存</el-button
                >
                <p class="login-text"><el-link type="primary" @click="$router.push('/login')">返回登录</el-link></p>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';

// import { passwordResetApi } from "../../api/index";
import request from "../../utils/request";
const param = ref({
    s_name: '',
    s_student_id: '',
    s_pass: ''
});
const reg2 = /^[a-zA-Z]{6,12}$/;
const userPassValidate = (rule, value, callback) => {
  console.log("lllll");
  if (!value) {
    return callback(new Error("密码不能为空"));
  }
  setTimeout(() => {
    if (value.toString().length < 6 || value.toString().length > 12) {
      callback(new Error("密码长度要在6到12位之间"));
    } else if (!reg2.test(value)) {
      callback(new Error("请输入英文"));
    } else {
      callback();
    }
  }, 0);
};
const reg = /^[\u4e00-\u9fff]+$/;
const userUserValidate = (rule, value, callback) => {
  console.log("lllll");
  if (!value) {
    return callback(new Error("用户名不能为空"));
  }
  setTimeout(() => {
    if (value.toString().length > 12) {
      callback(new Error("用户名最长12位"));
    } else if (!reg.test(value)) {
      callback(new Error("请输入中文"));
    } else {
      callback();
    }
  }, 0);
};
const regNumbei = /^\d+$/;
const userNumberValidate = (rule, value, callback) => {
  console.log("lllll");
  if (!value) {
    return callback(new Error("学号不能为空"));
  }
  setTimeout(() => {
    if (!regNumbei.test(value)) {
      callback(new Error("请输入数字"));
    } else {
      callback();
    }
  }, 0);
};
const rules: FormRules = {
    s_name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { validator: userUserValidate, trigger: "blur" },
    ],
    s_student_id: [
        { required: true, message: '请输入学号', trigger: 'blur' },
        { validator: userNumberValidate, trigger: "blur" },
    ],
    s_pass: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: userPassValidate, trigger: "blur" },
    ],
};
const register = ref<FormInstance>();

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: boolean) => {
    if (valid) {
     
      // request
      //   .post(passwordResetApi, param)
      //   .then((response) => {
      //     console.log("响应数据:", response);
      //     const { code, access_token, refresh_token, s_name, s_id } = response;
      
      //   })
      //   .catch((error) => {
      //     console.log("请求出错:", error);
      //     const { code, message } = error.response.data;
      //     if (code == 409) {
      //       ElMessage({
      //         message: message,
      //         type: "error",
      //       });
      //     } else {
      //       ElMessage({
      //         message: error.response.data,
      //         type: "error",
      //       });
      //     }
      //   });
    } else {
      ElMessage.error("登录失败");
      return false;
    }
  });
};

</script>

<style scoped>
.login-bg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: url(../../assets/img/loginbg.png) center/cover no-repeat;
}

.reset-title {
    text-align: center;
    font-size: 22px;
    color: #333;
    font-weight: bold;
    margin-bottom: 10px;
}

.reset-text {
    text-align: center;
    font-size: 14px;
    color: #787878;
    margin-bottom: 40px;
}

.login-container {
    width: 450px;
    border-radius: 5px;
    background: #fff;
    padding: 40px 50px 50px;
    box-sizing: border-box;
}

.login-btn {
    display: block;
    width: 100%;
}

.login-text {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    font-size: 14px;
    color: #333;
}
</style>
