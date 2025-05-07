<template>
    <div>
        <!-- <el-row :gutter="20" class="mgb20" >
            <el-col :span="12" @click="hanleTip('stu')">
                <el-card shadow="hover"  :body-class="isStudent?'card-body card-bodyHover':'card-body'" :class="isStudent?'shadow':''">
                 
                    <div class="card-content">
                        <div class="studenNumber">学生数量
                        <countup class="card-num color1" :end="6666" />
                            <span class="people">人</span>
                        </div>

                    </div>
                </el-card>
            </el-col>
            <el-col :span="12" @click="hanleTip('te')">
                <el-card shadow="hover" :body-class="!isStudent?'card-body2 card-bodyHover2':'card-body2'" :class="!isStudent?'shadow':''">
                  
                    <div class="card-content">
                        <div class="studenNumber">教师数量
                            <countup class="card-num color2" :end="168" />
                            <span class="people">人</span>

                        </div>

                       
                    </div>
                </el-card>
            </el-col>
          
        </el-row> -->

        <el-row :gutter="20" class="mgb20">
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">教案生成助手</p>
                        <!-- <p class="card-header-desc">最近一周订单状态，包括订单成交量和订单退货量</p> -->
                    </div>
                    <v-chart class="chart" :option="dashOpt13" />
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">辩论主持人助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt11" />
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">分层练习题助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt7" />
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mgb20">
            
        </el-row>
        <el-row :gutter="20" class="mgb20">
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">教学大纲生成助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt9" />
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">课堂互动问答助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt15" />
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">虚拟合作伙伴助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt1" />
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mgb20">
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">翻译助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt17" />
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">代码生成助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt16" />
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">研发问答助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt5" />
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mgb20">
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">对话记忆助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt18" />
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">个性化学习助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt6" />
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">数据表字段生成助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt10" />
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mgb20">
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">体检助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt12" />
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">智能客服助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt14" />
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">行业知识库助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt8" />
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mgb20">
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">心理健康支持助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt4" />
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">汽车故障检修助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt2" />
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">治疗虚拟教学培训助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt3" />
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mgb20">
            
          
           
           
           
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">智能导诊与患者服务助手</p>
                    </div>
                    <v-chart class="chart" :option="dashOpt19" />
                </el-card>
            </el-col>
           
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">新场景</p>
                    </div>
                    <div style="width: 100%;height: 300px;">
                        <div style="float: left; width: 100%;display: flex;justify-content: center;align-items: center;margin-bottom: 38px;">
                            <el-image  :src="url"  style="width: 257px;height: 257px;" fit="contain"/>

                        </div>
                        
                        <span style="float: left; width: 100%;margin-top: -42px;text-align: center;color: #C0C4CC;font-size: 24px;">
                            敬请期待
                        </span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="dashboard">
import { ref, reactive,onMounted } from 'vue';

import countup from '@/components/countup.vue';
import { use, registerMap } from 'echarts/core';
import { BarChart, LineChart, PieChart, MapChart } from 'echarts/charts';
import {
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    VisualMapComponent,
    
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import { dashOpt1, dashOpt2, dashOpt3,dashOpt4,dashOpt5,dashOpt6,dashOpt7,dashOpt8,dashOpt9,dashOpt10,dashOpt11,dashOpt12,dashOpt13,dashOpt14,dashOpt15,dashOpt16,dashOpt17,dashOpt18,dashOpt19 } from './chart/options';
import chinaMap from '@/utils/china';
import url from '../assets/img/jingqing.png'
import { loginUserApi,virtuallearningDailyApi } from "../api/index";
import request from "../utils/request";
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus';

const router = useRouter();

use([
    CanvasRenderer,
    BarChart,
    GridComponent,
    LineChart,
    PieChart,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    VisualMapComponent,
    MapChart,
]);
registerMap('china', chinaMap);
const isStudent = ref(true)
const hanleTip=(type)=>{
    if (type=='stu') {
        isStudent.value = true;
    } else {
        isStudent.value = false;

    }
}
onMounted(() => {
  getUser();
  getCheckData()
  
});
function getCheckData(){
    console.log('popopopopoe')
    request
    .get(virtuallearningDailyApi,{params:{days:'7'}})
    .then((response) => {
      console.log("响应数据:", response);
      const { code } = response;
      if (code == 200) {
        localStorage.setItem("userData", response);
      }
    })
    .catch((error) => {
      console.log("请求出错:", error);
      if (error == "未登录，请先登录") {
      }
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
}
function getUser() {
  console.log(router, "routerrouterrouterrouterrouter");
  request
    .get(loginUserApi)
    .then((response) => {
      console.log("响应数据:", response);
      const { code } = response;
      if (code == 200) {
        localStorage.setItem("userData", response);
      }
    })
    .catch((error) => {
      console.log("请求出错:", error);
      if (error == "未登录，请先登录") {
        console.log(router, "routerrouterrouterrouterrouter");
        router.push("/login");
      }
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
}
</script>

<style>
.card-body {
    display: flex;
    align-items: center;
    height: 100px;
    padding: 0;
    background-image: url(../assets/img/studentBg.png);
    background-position: bottom;

}
/* .card-body:hover{
    background-color: #2d8cf0;
} */
.card-bodyHover{
    background-color: #2d8cf0;

}
.card-bodyHover2{
    background-color: #40DBDE;

}
.shadow{
    box-shadow: -5px 10px 5px #888888;

}
.card-body2 {
    display: flex;
    align-items: center;
    height: 100px;
    padding: 0;
    background-image: url(../assets/img/teachBg.png);
    background-position: bottom;
}
/* .card-body2:hover{
    background-color:#40DBDE;
} */

</style>
<style scoped>
.studenNumber{
    font-family: Alimama ShuHeiTi;
    font-size: 24px;
    font-weight: bold;
    line-height: 14px;
    letter-spacing: 0.09em;
    font-variation-settings: "opsz" auto;
    font-feature-settings: "kern" on;
    color: #303649;
}
.studenNumber span{
    font-family: OPPOSans;
    font-size: 36px;
    font-weight: bold;
    line-height: normal;
    letter-spacing: 0em;
    font-variation-settings: "opsz" auto;
    font-feature-settings: "kern" on;
    color: #107BFF;
}
.studenNumber .people{
    font-family: Alibaba PuHuiTi 3.0;
    font-size: 24px;
    font-weight: normal;
    line-height: 16px;
    letter-spacing: 0em;
    font-variation-settings: "opsz" auto;
    font-feature-settings: "kern" on;
    color: #8E94A5;
    margin-left: 5px;
}
.card-content {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
    padding: 0 20px;
}

.card-num {
    font-size: 30px;
}

.card-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.bg1 {
    background: #2d8cf0;
}

.bg2 {
    background: #64d572;
}

.bg3 {
    background: #f25e43;
}

.bg4 {
    background: #e9a745;
}

.color1 {
    color: #2d8cf0;
}

.color2 {
    color: #64d572;
}

.color3 {
    color: #f25e43;
}

.color4 {
    color: #e9a745;
}

.chart {
    width: 100%;
    height: 300px;
}

.card-header {
    padding-left: 10px;
    margin-bottom: 20px;
}

.card-header-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
}

.card-header-desc {
    font-size: 14px;
    color: #999;
}

.timeline-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: #000;
}

.timeline-time,
.timeline-desc {
    font-size: 12px;
    color: #787878;
}

.rank-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.rank-item-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f2f2f2;
    text-align: center;
    line-height: 40px;
    margin-right: 10px;
}

.rank-item-content {
    flex: 1;
}

.rank-item-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #343434;
    margin-bottom: 10px;
}

.rank-item-desc {
    font-size: 14px;
    color: #999;
}
.map-chart {
    width: 100%;
    height: 350px;
}
</style>
