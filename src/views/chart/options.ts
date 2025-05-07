import { graphic } from 'echarts/core';

import { loginUserApi,virtuallearningDailyApi,carDailyApi,treatmentDailyApi,mentalhealthDailyApi,researchDailyApi,
    personalizeDailyApi,
    stratifieDailyApi,
    industryDailyApi,
    syllaDailyApi,
    databaseDailyApi,
    debateDailyApi,
    onlineDailyApi,
    lessonDailyApi,
    intelligentDailyApi,
    interactiveDailyApi,
    codeDailyApi,
    languageDailyApi,
    dialogueDailyApi,
    gudicanDailyApi
 } from "../../api/index";
import request from "../../utils/request";
import { ref, reactive,onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import axios, { AxiosResponse } from 'axios';


    
const da = ref([])
const va = ref([])
const dacar = ref([])
const vacar = ref([])
const datreatment = ref([])
const vatreatment = ref([])
const damentalhealth = ref([])
const vamentalhealth = ref([])
const damentalresearch = ref([])
const vamentalresearch = ref([])
const dapersonalize = ref([])
const vapersonalize = ref([])
const dastratifie = ref([])
const vastratifie = ref([])
const daindustry = ref([])
const vaindustry = ref([])
const dasylla = ref([])
const vasylla = ref([])
const dadatabase = ref([])
const vadatabase = ref([])
const dadebate = ref([])
const vadebate = ref([])
const daonline = ref([])
const vaonline = ref([])
const dalesson = ref([])
const valesson = ref([])
const daintelligent = ref([])
const vaintelligent = ref([])
const dainteractive = ref([])
const vainteractive = ref([])
const dacode = ref([])
const vacode = ref([])
const dalanguage = ref([])
const valanguage = ref([])
const dadialogue = ref([])
const vadialogue = ref([])
const dagudican = ref([])
const vagudican = ref([])
function usD(url,da,va){
    request
    .get(url,{params:{days:'7'}})
    .then((response) => {
      console.log("响应数据:", response);
      const { data } = response;
      data.forEach(element => {
        da.value.push(element.date)
        va.value.push(element.count)
        
      });

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
usD(virtuallearningDailyApi,da,va)   
usD(carDailyApi,dacar,vacar)  
usD(treatmentDailyApi,datreatment,vatreatment)   
usD(mentalhealthDailyApi,damentalhealth,vamentalhealth)   
usD(researchDailyApi,damentalresearch,vamentalresearch)   
usD(personalizeDailyApi,dapersonalize,vapersonalize)  
usD(stratifieDailyApi,dastratifie,vastratifie)   
usD(industryDailyApi,daindustry,vaindustry)   
usD(syllaDailyApi,dasylla,vasylla)   
usD(databaseDailyApi,dadatabase,vadatabase)   
usD(debateDailyApi,dadebate,vadebate)   
usD(onlineDailyApi,daonline,vaonline) 
usD(lessonDailyApi,dalesson,valesson)  
usD(intelligentDailyApi,daintelligent,vaintelligent)   
usD(interactiveDailyApi,dainteractive,vainteractive)  
usD(codeDailyApi,dacode,vacode)   
usD(languageDailyApi,dalanguage,valanguage)   
usD(dialogueDailyApi,dadialogue,vadialogue)  
usD(gudicanDailyApi,dagudican,vagudican)   












export const dashOpt1 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:da.value,
        
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: va.value
         
        }
    ],
};
export const dashOpt2 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:dacar.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: vacar.value
         
        }
    ],
};
export const dashOpt3 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:datreatment.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: vatreatment.value
         
        }
    ],
};
export const dashOpt4 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:damentalhealth.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: vamentalhealth.value
         
        }
    ],
};
export const dashOpt5 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:damentalresearch.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: vamentalresearch.value
         
        }
    ],
};
export const dashOpt6 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:dapersonalize.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: vapersonalize.value
         
        }
    ],
};
export const dashOpt7 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:dastratifie.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: vastratifie.value
         
        }
    ],
};
export const dashOpt8 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:daindustry.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: vaindustry.value
         
        }
    ],
};
export const dashOpt9 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:dasylla.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: vasylla.value
         
        }
    ],
};
export const dashOpt10 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:dadatabase.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: vadatabase.value
         
        }
    ],
};
export const dashOpt11 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:dadebate.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: vadebate.value
         
        }
    ],
};
export const dashOpt12 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:daonline.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: vaonline.value
         
        }
    ],
};
export const dashOpt13 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:dalesson.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: valesson.value
         
        }
    ],
};
export const dashOpt14 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:daintelligent.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: vaintelligent.value
         
        }
    ],
};
export const dashOpt15 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:dainteractive.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: vainteractive.value
         
        }
    ],
};
export const dashOpt16 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:dacode.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: vacode.value
         
        }
    ],
};
export const dashOpt17 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:dalanguage.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: valanguage.value
         
        }
    ],
};
export const dashOpt18 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:dadialogue.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: vadialogue.value
         
        }
    ],
};
export const dashOpt19 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:dagudican.value,
    },
    yAxis: {
        type: 'value',
        name: "y",
        min: 0, // 设置 y 轴的固定最小值
        max: 100, // 设置 y 轴的固定最大值
        interval: 20 // 设置 y 轴刻度的固定间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            return `时间: ${params.name}<br/>数值: ${params.value}`;
        }
    },
    // color: ['#009688', '#f44336'],
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    series: [
        {
            type: 'line',
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(19, 232, 247, 0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 35, 150, 0.2)',
                    },
                ]),
            },
            smooth: true,
            data: vagudican.value
         
        }
    ],
};

