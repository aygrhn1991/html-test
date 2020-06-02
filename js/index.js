$(function() {
    var month = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    var province = ["北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "广东", "广西", "海南", "香港", "澳门", "台湾"];
    var bgColor = '#031f3e';
    var textColor = '#29e2f7';
    var lineColor = '#063374';
    var mapData = [];
    province.forEach(function(e) {
        mapData.push({ name: e, value: Util.getIntRandom(0, 1000) });
    });
    mapData.sort(function(a, b) { return b.value - a.value });
    var maxValue = mapData[0].value;
    var mapName = 'china';
    var map = echarts.init(document.getElementById('map'));
    $.get('../plugin/echarts/map/json/china.json', function(chinaJson) {
        echarts.registerMap(mapName, chinaJson);
        var mapOption = {
            title: {
                top: '5%',
                left: 'center',
                text: '全国装车量分布',
                textStyle: { color: '#fff', fontSize: 26 },
                subtext: '单位：辆',
                subtextStyle: { color: '#fff' },
            },
            tooltip: { formatter: '{b}：{c}辆' },
            visualMap: {
                min: 0,
                max: maxValue,
                left: '5%',
                bottom: '10%',
                itemHeight: 100,
                text: ['数量'],
                textStyle: { color: '#fff' },
                inRange: { color: ['transparent', textColor] },
            },
            series: [{
                type: 'map',
                map: 'china',
                layoutCenter: ['50%', '50%'],
                layoutSize: '90%',
                label: { show: true, color: '#fff' },
                itemStyle: { borderColor: '#fff', borderWidth: 1, shadowColor: textColor, shadowBlur: 10 },
                emphasis: { label: { show: true, color: '#fff' }, itemStyle: { areaColor: textColor } },
                data: mapData
            }]
        };
        map.setOption(mapOption);
    });
    chartDataX = [];
    chartDataY = [];
    for (var i = 0; i < 60; i++) {
        chartDataX.push(Util.dateToHHMMSS(new Date(new Date().getTime() - i * 5 * 1000)));
        chartDataY.push(Util.getIntRandom(1000, 3000));
    }
    chartDataX.reverse();
    var chartOption = {
        color: [textColor],
        title: {
            top: '5%',
            left: 'center',
            text: '数据上报数量',
            textStyle: { color: '#fff', fontSize: 16 }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'line' },
            formatter: '{b}<br>{c}条'
        },
        grid: {
            top: '25%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel: { color: '#fff' },
            axisLine: { lineStyle: { color: lineColor } },
            axisTick: { show: false },
            data: chartDataX,
        }],
        yAxis: [{
            type: 'value',
            name: '条',
            nameTextStyle: { color: '#fff' },
            axisLabel: { color: '#fff' },
            axisLine: { lineStyle: { color: lineColor } },
            axisTick: { show: false },
            splitLine: { lineStyle: { color: lineColor } }
        }],
        series: [{
            name: '条',
            type: 'line',
            data: chartDataY
        }]
    };
    var chart = echarts.init(document.getElementById('data'));
    chart.setOption(chartOption);
    var chartTimer = setInterval(function() {
        var datetime = Util.dateToHHMMSS(new Date());
        var tempDataY = Util.getIntRandom(500, 1000);
        chartDataX.push(datetime);
        chartDataY.push(tempDataY);
        chartDataX.splice(0, chartDataX.length - 60);
        chartDataY.splice(0, chartDataY.length - 60);
        chartOption.xAxis[0].data = chartDataX;
        chartOption.series[0].data = chartDataY;
        chart.setOption(chartOption);
    }, 5000);
    window.onresize = function() {
        map.resize();
        chart.resize();
    };

});