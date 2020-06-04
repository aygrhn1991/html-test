$(function() {
    var month = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    var province = ["北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "广东", "广西", "海南", "香港", "澳门", "台湾"];
    var color = '#29e2f7';
    var bgColor = '#031f3e';
    var axisColor = '#063374';
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
            textStyle: { color: '#fff', fontSize: 26 },
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
    //构造动态折线图数据
    var lineDataX = [];
    var lineDataY = [];
    for (var i = 0; i < 60; i++) {
        lineDataX.push(Util.dateToHHMMSS(new Date(new Date().getTime() - i * 5 * 1000)));
        lineDataY.push(Util.getIntRandom(1000, 3000));
    }
    lineDataX.reverse();
    var lineOption = {
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
            top: '25%',
            left: '5%',
            right: '10%',
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
            axisTick: { show: true },
            splitLine: { show: false },
            data: lineDataX,
        }],
        yAxis: [{
            type: 'value',
            name: '条',
            nameTextStyle: { color: '#fff' },
            axisLabel: { color: '#fff' },
            axisLine: { lineStyle: { color: axisColor } },
            axisTick: { show: true },
            splitLine: { lineStyle: { color: axisColor } }
        }],
        series: [{
            name: '条',
            type: 'line',
            areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: color }, { offset: 1, color: 'transparent' }] } },
            data: lineDataY
        }]
    };
    var line = echarts.init(document.getElementById('line'));
    line.setOption(lineOption);
    var chartTimer = setInterval(function() {
        var datetime = Util.dateToHHMMSS(new Date());
        var tempDataY = Util.getIntRandom(500, 1000);
        lineDataX.push(datetime);
        lineDataY.push(tempDataY);
        lineDataX.splice(0, lineDataX.length - 60);
        lineDataY.splice(0, lineDataY.length - 60);
        lineOption.xAxis[0].data = lineDataX;
        lineOption.series[0].data = lineDataY;
        line.setOption(lineOption);
    }, 5000);
    //构造柱状图数据
    var barOption = {
        color: [color],
        title: {
            top: '5%',
            left: 'center',
            text: '数据统计',
            textStyle: { color: '#fff', fontSize: 14 }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: '{b}：{c}条'
        },
        grid: {
            top: '10%',
            left: '5%',
            right: '15%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
        },
        yAxis: {
            type: 'category',
            inverse: true,
            axisLabel: { margin: 50, align: 'left', color: '#fff' },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: province.slice(0, 15),
        },
        series: [{
            type: 'bar',
            label: { show: true, position: 'right', color: '#fff' },
            barWidth: 10,
            itemStyle: { color: { type: 'linear', x: 1, y: 0, x2: 0, y2: 0, colorStops: [{ offset: 0, color: color }, { offset: 1, color: '#29e2f71a' }] } },
            data: mapData.map((x) => { return x.value; })
        }]
    };
    var bar = echarts.init(document.getElementById('bar'));
    bar.setOption(barOption);
    //动态调整大小
    window.onresize = function() {
        map.resize();
        line.resize();
        bar.resize();
    };

});