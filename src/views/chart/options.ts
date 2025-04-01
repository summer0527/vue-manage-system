import { graphic } from 'echarts/core';







export const dashOpt1 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00'],
    },
    yAxis: {
        type: 'value',
        name: "y",
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
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
                        color: 'rgba(0, 150, 136,0.8)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 150, 136,0.2)',
                    },
                ]),
            },
            smooth: true,
            data: [120, 132, 133, 134, 150, 200, 210],
        }
    ],
};

