<template>
    <div class="login-bg">
        <div style="width: 70%;height: 100%;float: left;">
            <img style="width: 100%; height: 100%;object-fit: cover;" src="../../assets/img/loginbg.png"  />
        </div>
        <div class="login-container">
            <div class="login-header">
                <img class="logo mr10" src="../../assets/img/logoimg.png" alt="" />
                <div class="login-title">吉斗云AI</div>
            </div>
            <p style="width: 100%;height: 60px;font-size: 24px;text-align: center;">AI场景校园风向标</p>
            <el-form :model="param" :rules="rules" ref="register" size="large">
                <el-form-item prop="s_name">
                    <el-input v-model="param.s_name" placeholder="用户名">
                        <template #prepend>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                
                <el-form-item prop="s_pass">
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="param.s_pass"
                       
                    >
                        <template #prepend>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-button class="login-btn" type="primary" size="large" @click="submitForm(register)">注册</el-button>
                <p class="login-text">
                    已有账号，<el-link type="primary" @click="$router.push('/login')">立即登录</el-link>
                </p>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { Register } from '@/types/user';
import { registerApi } from "../../api/index";
import request from "../../utils/request";
const router = useRouter();
const param = reactive<Register>({
    s_name: '',
    s_pass: '',
});
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
const rules: FormRules = {
    s_name: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
        },
    { validator: userUserValidate, trigger: "blur" },

    ],
    password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator: userPassValidate, trigger: "blur" },

    ],
};
const config = {
  headers: {
    "Content-Type": "application/json", // 设置请求头为 JSON 格式
    "Access-Control-Allow-Origin": "*",
  },
};
const register = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid: boolean) => {
        if (valid) {
            request
        .post(registerApi, param, config)
        .then((response) => {
          // 请求成功，处理响应数据
          console.log("响应数据:", response);
          const { message, s_name, code } = response;
          if (code == 201) {
            ElMessageBox.confirm(s_name + "您已注册成功,是否去登陆?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "success",
            })
              .then(() => {
                router.push("/login");
              })
              .catch(() => {
                ElMessage({
                  message: "取消操作成功",
                  type: "success",
                });
              });
          }
        })
        .catch((error) => {
          // 请求失败，处理错误
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
            // ElMessage.success('注册成功，请登录');
            // router.push('/login');
        } else {
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
    /* background: url(../../assets/img/login-bg.jpg) center/cover no-repeat; */
    background-color: #fff;
}

.login-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.logo {
    width: 40px;
}

.login-title {
    font-size: 24px;
    color: #333;
    font-weight: bold;
}

.login-container {
    width: 30%;
    float: left;
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
    margin-top: 20px;
    font-size: 14px;
    color: #787878;
}
</style>
