$(function() {
    var url = 'http://192.168.40.17:10018';
    var month = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    var province = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '广东', '广西', '海南', '香港', '澳门', '台湾'];
    var color = '#29e2f7';
    var axisColor = '#063374';
    var type = 2;
    var chart1 = echarts.init(document.getElementById('chart1'));
    var chart2 = echarts.init(document.getElementById('chart2'));
    var chart3 = echarts.init(document.getElementById('chart3'));
    var chart4 = echarts.init(document.getElementById('chart4'));
    var chart5 = echarts.init(document.getElementById('chart5'));
    setInterval(function() {
        $('.date').text(Util.dateToYYYYMMDD(new Date()) + ' ' + Util.dateToWeekDay(new Date()) + ' ' + Util.dateToHHMMSS(new Date()));
    });
    $.ajax({
        url: url + '/statCtrl/statDataShow/-1',
        dataType: 'json',
        contentType: 'application/json',
        headers: { access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNiIsInN1YiI6InN5aCIsImVudC5pZCI6MiwiZW50Lm5hbWUiOiLkuIDmsb0iLCJwbGF0IjoxLCJleHAiOjE2MjQ4Mzg1NDYsIm5iZiI6MTU5MzIxNjE0Nn0.JxapKePHelnPe6B01wih56KTJhQiVVKoO1r2wiltJT0' },
        success: function(data) {
            $('#ddur').text((data.data[0].ddur / 10000).toFixed(0));
            $('#dnox').text((data.data[0].dnox / 1000 / 10000).toFixed(0));
            $('#doil').text((data.data[0].doil / 10000).toFixed(0));
            $('#fnum').text((data.data[0].fnum / 10000).toFixed(0));
            $('#tdur').text((data.data[0].tdur / 10000).toFixed(0));
            $('#tengnum').text((data.data[0].tengnum / 10000).toFixed(0));
            $('#tmil').text((data.data[0].tmil / 10000).toFixed(0));
            $('#tnox').text((data.data[0].tnox / 1000 / 10000).toFixed(0));
            $('#toil').text((data.data[0].toil / 10000).toFixed(0));
            $('#tvehnum').text(data.data[0].tvehnum);
        }
    });
    $.ajax({
        url: url + `/statCtrl/statDataShow/-5`,
        dataType: 'json',
        contentType: 'application/json',
        headers: { access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNiIsInN1YiI6InN5aCIsImVudC5pZCI6MiwiZW50Lm5hbWUiOiLkuIDmsb0iLCJwbGF0IjoxLCJleHAiOjE2MjQ4Mzg1NDYsIm5iZiI6MTU5MzIxNjE0Nn0.JxapKePHelnPe6B01wih56KTJhQiVVKoO1r2wiltJT0' },
        success: function(data) {
            var dataX = [];
            var dataY = [];
            data.data.forEach(function(x) {
                dataX.push(x.attm);
                dataY.push(x.dnum);
            });
            chart5.setOption(getChart5Option(dataX, dataY));
        }
    });
    $('.center-1-block').click(function() {
        $(this).siblings('div').removeClass('center-1-block-active');
        $(this).addClass('center-1-block-active')
        type = $(this).attr('type');
        $.ajax({
            url: url + `/statCtrl/statDataShow/${type}`,
            dataType: 'json',
            contentType: 'application/json',
            headers: { access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNiIsInN1YiI6InN5aCIsImVudC5pZCI6MiwiZW50Lm5hbWUiOiLkuIDmsb0iLCJwbGF0IjoxLCJleHAiOjE2MjQ4Mzg1NDYsIm5iZiI6MTU5MzIxNjE0Nn0.JxapKePHelnPe6B01wih56KTJhQiVVKoO1r2wiltJT0' },
            success: function(data) {
                $('#c_dnum').text(data.data[0].c_dnum);
                $('#c_dtc_num').text((data.data[0].c_dtc_num / 10000).toFixed(0));
                $('#c_engnum').text((data.data[0].c_engnum / 10000).toFixed(0));
                $('#c_idl_oil').text((data.data[0].c_idl_oil / 10000).toFixed(0));
                $('#c_idl_ut').text((data.data[0].c_idl_ut / 10000).toFixed(0));
                $('#c_mil').text((data.data[0].c_mil / 10000).toFixed(0));
                $('#c_oil').text((data.data[0].c_oil / 10000).toFixed(0));
                $('#c_onum').text(data.data[0].c_onum);
                $('#c_r_ut').text((data.data[0].c_r_ut / 10000).toFixed(0));
                $('#c_tnum').text(data.data[0].c_tnum);
                $('#percent').text((data.data[0].c_file_size / 1024 / 1024).toFixed(0));
                $('#total').text(data.data[0].c_file_size);
                chart3.setOption(getChart3Option(data.data[0].c_hbase_u, data.data[0].c_hbase_t));
                chart4.setOption(getChart4Option(data.data[0].c_file_num, data.data[0].c_file_size));
            }
        });
        getChart12Data(type == 2 ? -4 : -3);
    });
    $('#start').click();

    function getChart12Data(e) {
        $.ajax({
            url: url + `/statCtrl/statDataShow/${e}`,
            dataType: 'json',
            contentType: 'application/json',
            headers: { access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNiIsInN1YiI6InN5aCIsImVudC5pZCI6MiwiZW50Lm5hbWUiOiLkuIDmsb0iLCJwbGF0IjoxLCJleHAiOjE2MjQ4Mzg1NDYsIm5iZiI6MTU5MzIxNjE0Nn0.JxapKePHelnPe6B01wih56KTJhQiVVKoO1r2wiltJT0' },
            success: function(data) {
                var dataX = [];
                var dataY1 = [];
                var dataY2 = [];
                data.data.forEach(function(x) {
                    dataX.push(Util.dateToHHMMSS(new Date(x.c_attm)));
                    dataY1.push(x.c_calnum <= 0 ? 0 : x.c_calnum);
                    dataY2.push(x.c_onum);
                });
                chart1Option.xAxis[0].data = dataX;
                chart1Option.series[0].data = dataY1;
                chart1.setOption(chart1Option);
                chart2Option.xAxis[0].data = dataX;
                chart2Option.series[0].data = dataY2;
                chart2.setOption(chart2Option);
            }
        });
    }

    function getSumData() {
        $.ajax({
            url: url + `/statCtrl/statDataShow/-2`,
            dataType: 'json',
            contentType: 'application/json',
            headers: { access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNiIsInN1YiI6InN5aCIsImVudC5pZCI6MiwiZW50Lm5hbWUiOiLkuIDmsb0iLCJwbGF0IjoxLCJleHAiOjE2MjQ4Mzg1NDYsIm5iZiI6MTU5MzIxNjE0Nn0.JxapKePHelnPe6B01wih56KTJhQiVVKoO1r2wiltJT0' },
            success: function(data) {
                $('#onum').text(data.data[0].onum);
                $('#dnum').text(data.data[0].dnum);
                $('#datanum').text((data.data[0].datanum / 10000).toFixed(0));
            }
        });
    };
    getSumData();
    //构造柱状图数据
    var barDataX = [];
    var barDataY = [];
    for (var i = 0; i < 7; i++) {
        barDataX.push(Util.dateToMMDD(Util.addDay(new Date(), -i)));
        barDataY.push(Util.getIntRandom(1000, 3000));
    }

    //图表参数
    var chart1Option = {
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
            data: [],
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
            type: 'line',
            itemStyle: { color: '#0000ff' },
            data: []
        }]
    };
    var line2bg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM5N0JCMDhEOUZGNTExRUE4RTM1QzYxNDg2RjFDRkQ4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM5N0JCMDhFOUZGNTExRUE4RTM1QzYxNDg2RjFDRkQ4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Qzk3QkIwOEI5RkY1MTFFQThFMzVDNjE0ODZGMUNGRDgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Qzk3QkIwOEM5RkY1MTFFQThFMzVDNjE0ODZGMUNGRDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7yo3A5AAAAOElEQVR42mJg+P+/FYg/Q2kg+s/AACR/glkQCTCTCSjcA8RfgXgSAxQwMoCVIwCIx4IqBAEAAQYAsfsg6Qt6K3sAAAAASUVORK5CYII=';
    var line2img = new Image();
    line2img.src = line2bg;
    var chart2Option = {
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
            data: [],
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
            data: []
        }]
    };

    function getChart3Option(percent, total) {
        return {
            color: [color],
            title: {
                top: '5%',
                left: 'center',
                text: '数据库容量',
                textStyle: { color: '#fff', fontSize: 14 },
                subtext: percent + '/' + total + 'GB',
                subtextStyle: { color: '#fff', fontSize: 16 },
            },
            grid: {
                top: '30%',
                left: '0',
                right: '0',
                bottom: '15%',
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
                data: [{ value: total, symbolPosition: 'end', itemStyle: { color: 'rgba(0,226,248,.95)' } }]
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
                    label: { show: true, position: 'inside', textStyle: { color: '#fff', fontSize: 16 }, formatter: (percent / total * 100).toFixed(0) + '%' },
                }]
            }, {
                name: '柱子下圆',
                type: 'pictorialBar',
                symbolSize: ['40%', 35],
                symbolOffset: [0, 17],
                z: 11,
                data: [{ value: total, symbolPosition: 'start', itemStyle: { color: '#438afe' } }]
            }, {
                name: '底部内圈颜色',
                type: 'pictorialBar',
                symbolSize: ['60%', 45],
                symbolOffset: [0, 32],
                z: 1,
                data: [{ value: total, itemStyle: { color: 'transparent', borderColor: '#43bafe', borderWidth: 5 } }]
            }, {
                name: '底部外圈颜色',
                type: 'pictorialBar',
                symbolSize: ['80%', 70],
                symbolOffset: [0, 47],
                z: 1,
                data: [{ value: total, itemStyle: { color: 'transparent', borderColor: '#43bafe', borderWidth: 5, borderType: 'dashed' } }]
            }, {
                type: 'bar',
                barWidth: '32.5%',
                barGap: '-100%',
                z: 10,
                data: [{ name: '柱状图峰值', value: total, itemStyle: { color: 'rgba(67,138,254,.5)' } }, { name: '柱状图实际值', value: percent, itemStyle: { color: 'rgba(67,138,254,.9)' } }]
            }]
        };
    }

    function getChart4Option(percent, total) {
        return {
            series: [{
                type: 'liquidFill',
                radius: '70%',
                center: ['50%', '50%'],
                data: [percent / total, percent / total, percent / total],
                backgroundStyle: { color: { type: 'radial', x: 0.5, y: 0.5, r: 0.7, colorStops: [{ offset: 0, color: '#030a27' }, { offset: 1, color: '#1b4976' }] } },
                label: { show: true, textStyle: { color: '#fff', fontSize: 16 } },
                outline: { borderDistance: 0, itemStyle: { borderWidth: 2, borderColor: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(41, 165, 247, 1)' }, { offset: 0.5, color: 'rgba(41, 165, 247, 1)' }, { offset: 1, color: 'rgba(41, 165, 247, 1)' }] } } },
                color: [{ type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 1, color: 'rgba(74, 255, 255, 0)' }, { offset: 0.5, color: 'rgba(74, 255, 255, .2)' }, { offset: 0, color: 'rgba(74, 255, 255, 1)' }] }],
            }]
        };
    }

    function getChart5Option(dataX, dataY) {
        return {
            title: {
                top: '5%',
                left: 'center',
                text: '车辆上线趋势图',
                textStyle: { color: '#fff', fontSize: 14 },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: '{b}<br>{c}条'
            },
            grid: {
                top: '25%',
                left: '5%',
                right: '15%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                name: '时间',
                nameTextStyle: { color: '#fff' },
                axisLabel: { color: '#fff' },
                axisLine: { lineStyle: { color: axisColor } },
                axisTick: { show: false },
                splitLine: { show: false },
                data: dataX,
            },
            yAxis: [{
                type: 'value',
                name: '辆',
                nameTextStyle: { color: '#fff' },
                axisLabel: { color: '#fff' },
                axisLine: { lineStyle: { color: axisColor } },
                axisTick: { show: false },
                splitLine: { show: false }
            }, {
                type: 'value',
                min: 20,
                max: 100,
                splitNumber: 10,
                axisLabel: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false },
                splitArea: { show: true, areaStyle: { color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)'] } }
            }],
            series: [{
                type: 'bar',
                barWidth: 15,
                itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#00FFE3' }, { offset: 1, color: '#4693EC' }]) },
                data: dataY
            }]
        };
    }
    var chartTimer = setInterval(function() {
        getChart12Data(type == 2 ? -4 : -3);
        getSumData();
    }, 10000);
    //动态调整大小
    window.onresize = function() {
        chart1.resize();
        chart2.resize();
        chart3.resize();
        chart4.resize();
        chart5.resize();
    };
});