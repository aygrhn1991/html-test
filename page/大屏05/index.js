$(function() {
    var month = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    var province = ["北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "广东", "广西", "海南", "香港", "澳门", "台湾"];
    var color = '#29a5f7';
    //构造地图数据
    var mapData = [];
    province.forEach(function(e) {
        mapData.push({ name: e, value: Util.getIntRandom(0, 1000) });
    });
    mapData.sort(function(a, b) { return b.value - a.value });
    var mapMaxValue = mapData[0].value;
    var mapName = 'china';
    var map = echarts.init(document.getElementById('map'));
    var mapOption = {
        title: {
            top: '5%',
            left: 'center',
            text: '全国装车量分布',
            textStyle: { color: '#fff', fontSize: 20 },
            subtext: '单位：辆',
            subtextStyle: { color: '#fff' },
        },
        tooltip: { formatter: '{b}：{c}辆' },
        visualMap: {
            min: 0,
            max: mapMaxValue,
            left: '10%',
            bottom: '10%',
            itemHeight: 100,
            text: ['数量'],
            textStyle: { color: '#fff' },
            inRange: { color: ['transparent', color] },
        },
        series: [{
            type: 'map',
            map: 'china',
            layoutCenter: ['50%', '50%'],
            layoutSize: '100%',
            label: { show: true, color: '#fff' },
            itemStyle: { borderColor: '#fff', borderWidth: 1, shadowColor: color, shadowBlur: 10 },
            emphasis: { label: { show: true, color: '#fff' }, itemStyle: { areaColor: color } },
            data: mapData
        }]
    };
    //地图加载方式(两种)
    //一、如果引用china.js，则直接setOption(如下)
    map.setOption(mapOption);
    //二、如果没引用china.js，则需要加载china.json(如下)
    // $.get('../../plugin/echarts/map/json/china.json', function(chinaJson) {
    //     echarts.registerMap(mapName, chinaJson);
    //     map.setOption(mapOption);
    // });
    //构造折线图数据
    var lineDataX = [];
    var lineDataY = [];
    for (var i = 0; i < 7; i++) {
        lineDataX.push(i);
        lineDataY.push(Util.getIntRandom(0, 100));
    }
    var lineOption = {
        color: [color],
        grid: {
            top: '10%',
            left: '10%',
            right: '10%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: lineDataX,
        }],
        yAxis: [{
            type: 'value',
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
        }],
        series: [{
            name: '条',
            type: 'line',
            smooth: 1,
            showSymbol: false,
            lineStyle: { color: color, width: 0 },
            areaStyle: { color: color },
            data: lineDataY
        }]
    };
    //构造柱状图数据
    var barOption = {
        color: [color],
        grid: {
            top: '10%',
            left: '10%',
            right: '10%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
        },
        yAxis: {
            type: 'value',
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: lineDataX,
        },
        series: [{
            type: 'bar',
            itemStyle: { color: color },
            data: lineDataY
        }]
    };
    lineOption.series[0].lineStyle.color = '#00B984';
    lineOption.series[0].areaStyle.color = '#00B984';
    var chart1 = echarts.init(document.getElementById('chart1'));
    chart1.setOption(lineOption);
    var chart2 = echarts.init(document.getElementById('chart2'));
    chart2.setOption(lineOption);
    lineOption.series[0].lineStyle.color = '#A92C11';
    lineOption.series[0].areaStyle.color = '#A92C11';
    var chart3 = echarts.init(document.getElementById('chart3'));
    chart3.setOption(lineOption);
    lineOption.series[0].lineStyle.color = '#007EE1';
    lineOption.series[0].areaStyle.color = '#007EE1';
    var chart4 = echarts.init(document.getElementById('chart4'));
    chart4.setOption(lineOption);
    barOption.series[0].itemStyle.color = '#007EE1';
    var chart5 = echarts.init(document.getElementById('chart5'));
    chart5.setOption(barOption);
    lineOption.series[0].lineStyle.width = 1;
    lineOption.series[0].lineStyle.color = '#007EE1';
    lineOption.series[0].areaStyle.color = '#03398c';
    var chart6 = echarts.init(document.getElementById('chart6'));
    chart6.setOption(lineOption);
    lineOption.series[0].lineStyle.color = '#ecd151';
    lineOption.series[0].areaStyle.color = '#ecd151';
    var chart7 = echarts.init(document.getElementById('chart7'));
    chart7.setOption(lineOption);
    barOption.series[0].itemStyle.color = '#ecd151';
    var chart8 = echarts.init(document.getElementById('chart8'));
    chart8.setOption(barOption);
    lineOption.series[0].lineStyle.width = 1;
    lineOption.series[0].lineStyle.color = '#ecd151';
    lineOption.series[0].areaStyle.color = '#afa815';
    var chart9 = echarts.init(document.getElementById('chart9'));
    chart9.setOption(lineOption);
    //动态调整大小
    window.onresize = function() {
        map.resize();
        chart1.resize();
        chart2.resize();
        chart3.resize();
        chart4.resize();
        chart5.resize();
        chart6.resize();
        chart7.resize();
        chart8.resize();
        chart9.resize();
    };

});