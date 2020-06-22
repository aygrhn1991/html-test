$(function() {
    var month = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    var province = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '广东', '广西', '海南', '香港', '澳门', '台湾'];
    var color = '#29e2f7';
    var axisColor = '#063374';
    //构造动态折线图数据
    var lineDataX = [];
    var lineDataY1 = [];
    var lineDataY2 = [];
    for (var i = 0; i < 60; i++) {
        lineDataX.push(Util.dateToHHMMSS(new Date(new Date().getTime() - i * 5 * 1000)));
        lineDataY1.push(Util.getIntRandom(1000, 3000));
        lineDataY2.push(Util.getIntRandom(0, 300));
    }
    lineDataX.reverse();
    var lineOption1 = {
        color: [color],
        title: {
            top: '5%',
            left: 'center',
            text: '实时数据上报',
            textStyle: { color: '#fff', fontSize: 14 }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'line' },
            formatter: '{b}<br>{c}条'
        },
        legend: {
            top: '15%',
            left: 'center',
            textStyle: { color: '#f2f2f2' },
            data: ['全部数据', '异常数据']
        },
        grid: {
            top: '30%',
            left: '5%',
            right: '15%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            name: '时间',
            nameTextStyle: { color: '#fff' },
            boundaryGap: false,
            axisLabel: { color: '#fff' },
            axisLine: { lineStyle: { color: axisColor } },
            axisTick: { show: false },
            splitLine: { show: true, lineStyle: { color: axisColor } },
            data: lineDataX,
        }],
        yAxis: [{
            type: 'value',
            name: '条',
            nameTextStyle: { color: '#fff' },
            axisLabel: { color: '#fff' },
            axisLine: { lineStyle: { color: axisColor } },
            axisTick: { show: false },
            splitLine: { lineStyle: { color: axisColor } }
        }],
        series: [{
            name: '全部数据',
            type: 'line',
            symbolSize: 6,
            itemStyle: { color: '#0000ff' },
            data: lineDataY1
        }, {
            name: '异常数据',
            type: 'line',
            itemStyle: { color: '#ff0000' },
            data: lineDataY2
        }]
    };
    var chart1 = echarts.init(document.getElementById('chart1'));
    chart1.setOption(lineOption1);
    var line2bg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM5N0JCMDhEOUZGNTExRUE4RTM1QzYxNDg2RjFDRkQ4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM5N0JCMDhFOUZGNTExRUE4RTM1QzYxNDg2RjFDRkQ4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Qzk3QkIwOEI5RkY1MTFFQThFMzVDNjE0ODZGMUNGRDgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Qzk3QkIwOEM5RkY1MTFFQThFMzVDNjE0ODZGMUNGRDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7yo3A5AAAAOElEQVR42mJg+P+/FYg/Q2kg+s/AACR/glkQCTCTCSjcA8RfgXgSAxQwMoCVIwCIx4IqBAEAAQYAsfsg6Qt6K3sAAAAASUVORK5CYII=';
    var line2img = new Image();
    line2img.src = line2bg;
    var lineOption2 = {
        color: [color],
        title: {
            top: '5%',
            left: 'center',
            text: '实时在线车辆',
            textStyle: { color: '#fff', fontSize: 14 }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'line' },
            formatter: '{b}<br>{c}条'
        },
        legend: {
            top: '15%',
            left: 'center',
            textStyle: { color: '#f2f2f2' },
            data: ['全部数据', '异常数据']
        },
        grid: {
            top: '25%',
            left: '5%',
            right: '15%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            name: '时间',
            nameTextStyle: { color: '#fff' },
            boundaryGap: false,
            axisLabel: { color: '#fff' },
            axisLine: { lineStyle: { color: axisColor } },
            axisTick: { show: false },
            splitLine: { show: false },
            data: lineDataX,
        }],
        yAxis: [{
            type: 'value',
            name: '条',
            nameTextStyle: { color: '#fff' },
            axisLabel: { color: '#fff' },
            axisLine: { lineStyle: { color: axisColor } },
            axisTick: { show: false },
            splitLine: { show: false }
        }],
        series: [{
            type: 'line',
            symbol: 'roundRect',
            symbolSize: [8, 8],
            itemStyle: { color: '#4BFFFC' },
            areaStyle: { color: { image: line2img, repeat: 'repeat' }, shadowColor: 'rgba(0,202,149, 0.9)', shadowBlur: 50 },
            data: lineDataY1
        }]
    };
    var chart2 = echarts.init(document.getElementById('chart2'));
    chart2.setOption(lineOption2);
    var chartTimer = setInterval(function() {
        var datetime = Util.dateToHHMMSS(new Date());
        var tempDataY1 = Util.getIntRandom(500, 1000);
        var tempDataY2 = Util.getIntRandom(300, 500);
        lineDataX.push(datetime);
        lineDataY1.push(tempDataY1);
        lineDataY2.push(tempDataY2);
        lineDataX.splice(0, lineDataX.length - 60);
        lineDataY1.splice(0, lineDataY1.length - 60);
        lineDataY2.splice(0, lineDataY2.length - 60);
        lineOption1.xAxis[0].data = lineDataX;
        lineOption1.series[0].data = lineDataY1;
        lineOption1.series[1].data = lineDataY2;
        lineOption2.xAxis[0].data = lineDataX;
        lineOption2.series[0].data = lineDataY1;
        chart1.setOption(lineOption1);
        chart2.setOption(lineOption2);
    }, 5000);
    //构造柱状图数据
    var total = 1000;
    var percent = 700;
    var barOption1 = {
        color: [color],
        title: {
            top: '5%',
            left: 'center',
            text: '数据库容量',
            textStyle: { color: '#fff', fontSize: 14 }
        },
        grid: {
            top: '40%',
            left: '0',
            right: '0',
            bottom: '25%',
            containLabel: true
        },
        xAxis: [{
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: ['数据库容量'],
        }],
        yAxis: [{
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
        }],
        series: [{
            name: '柱子上圆',
            type: 'pictorialBar',
            symbolSize: ['40%', 35],
            symbolOffset: [0, -17],
            z: 13,
            data: [{
                value: total,
                symbolPosition: 'end',
                itemStyle: { color: 'rgba(0,226,248,.95)' }
            }]
        }, {
            name: '柱子中间圆',
            type: 'pictorialBar',
            symbolSize: ['40%', 35],
            symbolOffset: [0, -17],
            z: 12,
            data: [{
                value: percent,
                symbolPosition: 'end',
                itemStyle: { color: 'rgba(30,175,243,.95)' },
                label: {
                    show: true,
                    position: 'inside',
                    textStyle: { color: '#fff', fontSize: 16 },
                    formatter: (percent / total * 100).toFixed(0) + '%',
                },
            }]
        }, {
            name: '柱子下圆',
            type: 'pictorialBar',
            symbolSize: ['40%', 35],
            symbolOffset: [0, 17],
            z: 11,
            data: [{
                value: total,
                symbolPosition: 'start',
                itemStyle: { color: '#438afe' }
            }]
        }, {
            name: '底部内圈颜色',
            type: 'pictorialBar',
            symbolSize: ['60%', 45],
            symbolOffset: [0, 32],
            z: 1,
            data: [{
                value: total,
                itemStyle: { color: 'transparent', borderColor: '#43bafe', borderWidth: 5 }
            }]
        }, {
            name: '底部外圈颜色',
            type: 'pictorialBar',
            symbolSize: ['80%', 70],
            symbolOffset: [0, 47],
            z: 1,
            data: [{
                value: total,
                trueVal: '98',
                itemStyle: { color: 'transparent', borderColor: '#43bafe', borderWidth: 5, borderType: 'dashed' }
            }]
        }, {
            type: 'bar',
            barWidth: '32.5%',
            barGap: '-100%',
            z: 10,
            data: [{
                    name: '柱状图峰值',
                    value: total,
                    label: {
                        show: true,
                        position: 'top',
                        distance: 25,
                        textStyle: { color: '#fff', fontSize: 16 },
                        formatter: percent + '/' + total + 'T',
                    },
                    itemStyle: { color: 'rgba(67,138,254,.5)' }
                },
                {
                    name: '柱状图实际值',
                    value: percent,
                    itemStyle: { color: 'rgba(67,138,254,.9)' }
                }
            ]
        }]
    };
    var chart3 = echarts.init(document.getElementById('chart3'));
    chart3.setOption(barOption1);
    //构造饼图数据
    var value = 0.2;
    var data = [value, value, value];
    var pieOption = {
        // title: {
        //     top: '5%',
        //     left: 'center',
        //     text: '文件存储空间',
        //     textStyle: { color: '#fff', fontSize: 14 }
        // },
        series: [{
            type: 'liquidFill',
            radius: '70%',
            center: ['50%', '50%'],
            //  shape: 'roundRect',
            data: data,
            backgroundStyle: {
                color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.7,
                    colorStops: [{
                        offset: 0,
                        color: '#030a27' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: '#1b4976' // 100% 处的颜色
                    }],
                    globalCoord: false
                },
            },
            label: { show: true },
            outline: {
                borderDistance: 0,

                itemStyle: {
                    borderWidth: 2,
                    borderColor: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(41, 165, 247, 1)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(41, 165, 247, 1)'
                        }, {
                            offset: 1,
                            color: 'rgba(41, 165, 247, 1)' //圆外框线颜色
                        }],
                        globalCoord: false
                    },
                    shadowBlur: 10,
                    shadowColor: '#000',
                }
            },
            // color: {
            //     type: 'linear',
            //     x: 0,
            //     y: 0,
            //     x2: 0,
            //     y2: 1,
            //     colorStops: [{
            //         offset: 1,
            //         color: 'rgba(74, 255, 255, 0)'
            //     }, {
            //         offset: 0.5,
            //         color: 'rgba(74, 255, 255, .2)'
            //     }, {
            //         offset: 0,
            //         color: 'rgba(74, 255, 255, 1)' //波浪颜色
            //     }],
            //     globalCoord: false
            // },
            // label: {
            //     normal: {
            //         formatter: '',
            //     }
            // }
        }]
    };
    var chart4 = echarts.init(document.getElementById('chart4'));
    chart4.setOption(pieOption);
    //动态调整大小
    window.onresize = function() {
        // map.resize();
        chart1.resize();
        chart2.resize();
        chart3.resize();
        chart4.resize();
    };

});