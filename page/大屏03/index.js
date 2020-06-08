$(function() {
    var month = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    var province = ["北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "广东", "广西", "海南", "香港", "澳门", "台湾"];
    var color = '#29a5f7';
    var bgColor = '#031f3e';
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
    //动态调整大小
    window.onresize = function() {
        map.resize();
        line.resize();
        bar.resize();
    };

});