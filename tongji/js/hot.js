var word = echarts.init(document.getElementById('word'));
var line = echarts.init(document.getElementById("line"));	
var xAxis_data = [];//X轴数据
var series_data = [];//Y轴数据
var option  = option1 = null;
function createRandomItemStyle() {
    return {
        normal: {
            color: 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
            ].join(',') + ')'
        }
    };
}
//云图配置
option = {
    title: {
        text: '',
        link: 'http://www.google.com/trends/hottrends'
    },
    tooltip: {
        show: true
    },
    series: [{
        name: '热词云图',
        type: 'wordCloud',
        size: ['80%', '80%'],
        textRotation : [0, 45, 90, -45],
        textPadding: 0,
        autoSize: {
            enable: true,
            minSize: 34
        },
        itemStyle:{
        	normal:{
        		textStyle:{
        			fontSize:20,
        		}
        	}
        },
        data:[]
    }]
};
word.setOption(option,true);

//折线图配置
option1 = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
    },   
    xAxis: {
        type: 'category',
        name: 'x',
        splitLine: {show: false},
        data: xAxis_data,
    },
    grid: {
        //left: '3%',
        //right: '4%',
        //bottom: '3%',
        containLabel: true
    },
    yAxis: {
        name: 'y'
    },
    series: [
        {
            name: '3的指数',
            size: ['100%', '100%'],
            type: 'line',
            data: series_data,
        }
    ]
};
if (option1 && typeof option1 === "object") {
    line.setOption(option1, true);
};//渲染 
function initData(data){
	/*热词*/
	var hotword = data.hotCloud;
	var wordname = [],wordval = [];
	$.each(hotword, function(key,value) {
		wordname.push(key);
		wordval.push(value);
	});
	var wordData = [];
	for(var i=0;i<wordname.length;i++){
		wordData.push({name:wordname[i],value:wordval[i],itemStyle: createRandomItemStyle()});
	}
	wordcloud(wordData);
	/*舆情动态*/		
	var trendnow = data.topic1.trend;
	xAxis_data = [];
	series_data = [];
	$.each(trendnow,function(key,value){
		xAxis_data.push(value.datetime);
		series_data.push(value.value);		
	});
	linechart(xAxis_data,series_data);
	topiclist(data);
}
function hotajax(){
	word.showLoading();//加载动画
	line.showLoading();//加载动画
	$.ajax({
		type:"post",
		url:"../../../TongjiUniversity/hot/hotDetail.do",   //获得的数据接口
		async:true,
		success: function(data){
			word.hideLoading();
			line.hideLoading();
			console.log(data);
			initData(data);
		},
	});
}
function wordcloud(wordData){
	word.clear();
	word.setOption({
		series:[{
			data:wordData,
		}]
	});	  
	word.setOption(option);
}

function linechart(xAxis_data,series_data){	
	line.clear();
	line.setOption({//存放数据
		xAxis: {
			data: xAxis_data
		},
		series: [{
			data:  series_data
		}]
	});
	line.setOption(option1);
}
function Dateval(){
	$("#sea").click(function(){
		//alert("ok");
		var startDate = $('#mydatepicker').val();
		var endDate = $('#mydatepicker2').val();
		$.ajax({
            type:"post",
            dataType:"json",
            url:"../../../TongjiUniversity/hot/hotDetail.do",
            data:{
            	"startDate":startDate,
            	"endDate":endDate
            },
            success:function(data){
            	initData(data);
            }
       });		
	});
}

var corpusContent = new Array();//全局变量用于存放所有的corpusContent
var trends = new Array();
function topiclist(data){
	
	var i=1;j=1;
	$.each(data, function(key,value) {
		if(key.indexOf("topic") !== -1){//过滤寻找keyWord数据
			corpusContent[i] = value.corpusContent;
			trends[j] = value.trend;
			var wei = 0;
			$.each(corpusContent[i], function(key,value) {
				wei++;
			});
			$.each(trends[j],function(key,value){
				
			})
			$('<li onclick="modalContext(this)" name="'+i+'"><p class="hot-tip">'+i+'</p><p class="hot-text" data-toggle="modal" data-target="#myModal">'+value.keyWord+'</p><b class="hot-num">'+wei+'</b></li>')
			.appendTo('#hot_topic');
			i++;
			j++;		
		}	
	});		
}
function modalContext(id) {//点击不同的热点标题展示不同的modal数据
	var modal_id = id.outerHTML.split('name="')[1].substr(0,1);
	document.getElementById("modal_context").innerHTML = '';
	var weibo = 0;
	var zhuanfa = 0;
	var comment = 0;	
	var res_zheng = 0;
	var res_fu = 0;
	var res = 0;
	$.each(corpusContent[modal_id], function(key,value) {
		weibo++;
		zhuanfa += value.forward;//转发数是所有的forward总和
		comment += value.comment;//评论数是所有的comment总和
		if(value.res === "正面") {//统计res
			res_zheng++;
		}else if(value.res === "负面"){
			res_fu++;
		}else{
			res++;
		}
		$('<ol><div class="mbox-container"><p class="mbox-text">'+value.content+'</p><p class="mbox-news">'+value.name+'<span id="">'+value.sendTime+'</span></p></div></ol>')
		.appendTo('#modal_context');
	});
	xAxis_data = [];
	series_data = [];
	$.each(trends[modal_id],function(key,value){		
		xAxis_data.push(value.datetime);
		series_data.push(value.value);		
	});
	linechart(xAxis_data,series_data);
	document.getElementById("weibo").innerHTML = weibo;
	document.getElementById("zhuanfa").innerHTML = zhuanfa;
	document.getElementById("comment").innerHTML = comment;
	document.getElementById("res_zheng").innerHTML = res_zheng;
	document.getElementById("res_fu").innerHTML = res_fu;
	document.getElementById("res").innerHTML = res;
	
}
$(function (){
	Dateval();  //传数据
	hotajax();   //ajax获取接口值
});
