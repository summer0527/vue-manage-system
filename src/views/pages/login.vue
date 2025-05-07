<template>
  <div class="login-bg">
    <div style="width: 70%; height: 100%; float: left">
      <img
        style="width: 100%; height: 100%; object-fit: cover"
        src="../../assets/img/loginbg.png"
      />
    </div>
    <div class="login-container" style='display: flex
;
    justify-content: center;
    align-items: center;
    flex-direction: column;'>
      <div class="login-header">
        <img class="logo mr10" src="../../assets/img/logoimg.png" alt="" />
        <div class="login-title">吉斗云AI - 教育专业大模型AI场景提供商</div>
      </div>
      <p style="width: 100%; height: 60px; font-size: 16px; text-align: center;color:#888585">
        虹晷测万象之渊，启钥在方寸；龙文演八纮之变，成章于无形
      </p>

      <el-form :model="param" :rules="rules" ref="login" size="large" style='width:75%'>
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="用户名">
            <template #prepend>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="param.password" @keydown.enter="submitForm(login)">
            <template #prepend>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div class="pwd-tips">
          <el-checkbox
            class="pwd-checkbox"
            v-model="checked"
            label="记住密码"
          />
          <!-- <el-link type="primary" @click="$router.push('/reset-pwd')"
            >忘记密码</el-link
          > -->
        </div>
        <el-button
          class="login-btn"
          type="primary"
          size="large"
          @click="submitForm(login)"
          >登录</el-button
        >
        <p class="login-text">
          没有账号？<el-link type="primary" @click="$router.push('/register')"
            >立即注册</el-link
          >
        </p>
      </el-form>
    

    </div>
    <p style="position: fixed;
    bottom: 2%;
    z-index: 10000000;
    color: #ffffff;">吉林省吉斗云科技有限公司版权所有  Copyright © JiDouYun.com, All Rights Reserved.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useTabsStore } from "@/store/tabs";
import { usePermissStore } from "@/store/permiss";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { loginApi } from "../../api/index";
import request from "../../utils/request";
import qs from "qs";

interface LoginInfo {
  username: string;
  password: string;
}

const lgStr = localStorage.getItem("login-param");
const defParam = lgStr ? JSON.parse(lgStr) : null;
const checked = ref(lgStr ? true : false);

const router = useRouter();
const param = reactive<LoginInfo>({
  username: defParam ? defParam.username : "",
  password: defParam ? defParam.password : "",
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
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
    { validator: userUserValidate, trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { validator: userPassValidate, trigger: "blur" },
  ],
};
const permiss = usePermissStore();
const login = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: boolean) => {
    if (valid) {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      request
        .post(loginApi, qs.stringify(param), config)
        .then((response) => {
          // 请求成功，处理响应数据
          console.log("响应数据:", response);
          const { code, access_token, refresh_token, s_name, s_id } = response;
          if (code == 201) {
            localStorage.setItem("token", access_token);
            localStorage.setItem("refreshToken", refresh_token);
            localStorage.setItem("s_name", s_name);
            localStorage.setItem("s_id", s_id);

            router.push("/dashboard");
          }
        })
        .catch((error) => {
          // 请求失败，处理错误
          console.log("请求出错:", error);
          const { code, message } = error.response.data;
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
    } else {
      ElMessage.error("登录失败");
      return false;
    }
  });
};

const tabs = useTabsStore();
tabs.clearTabs();
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

.pwd-tips {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin: -10px 0 10px;
  color: #787878;
}

.pwd-checkbox {
  height: auto;
}

.login-btn {
  display: block;
  width: 100%;
}

.login-tips {
  font-size: 12px;
  color: #999;
}

.login-text {
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
  color: #787878;
}
</style>
