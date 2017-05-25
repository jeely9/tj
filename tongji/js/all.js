var introline = echarts.init(document.getElementById('introline'));
var motion = echarts.init(document.getElementById('motion'));
var deptinfo = echarts.init(document.getElementById('deptinfo'));
var motionline = echarts.init(document.getElementById("motionline"));
var sensfilter = echarts.init(document.getElementById('sensfilter'));
var seriesData = [],
	time = [];
var option = option1 = option2 = option3  = option4= null;

option = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'cross',
			label: {
				backgroundColor: 'blue'
			}
		}
	},
	toolbox: {
		feature: {
			//saveAsImage: {}
		}
	},
	grid: {
		left: '4px',
		containLabel: true
	},
	xAxis: [{
		type: 'category',
		boundaryGap: false,
		data: [],
		name: '(日期)',
	}],
	yAxis: [{
		//type : 'value',
		name: '(数量)'
	}],
	series: [{
		name: [],
		type: 'line',
		stack: '总量',
		label: {
			normal: {
				show: true,
				position: 'top'
			}
		},
		areaStyle: {
			normal: {}
		},
		data: []
	}],
	color: ['#bccae3']
};
introline.setOption(option);

function line(time, seriesData) {
	introline.setOption({
			xAxis: {
				data: time
			},
			series: [{
				data: seriesData
			}]
		})
		//introline.setOption(option);

}
option1 = {
	tooltip: {
		formatter: "{a}  : {c}%"
	},
	toolbox: {
		feature: {
			//restore: {},
			//saveAsImage: {}
		}
	},
	legend: {
		data: ['负面', '中立', '正面']
	},
	series: [{
		startAngle: 180,
		endAngle: 0,
		name: '情感值',
		type: 'gauge',
		center: ['50%', '98%'], // 默认全局居中
		radius: 180,
		min: -10000,
		max: 10000,
		splitNumber: 10,
		axisLine: { // 坐标轴线
			lineStyle: { // 属性lineStyle控制线条样式
				width: 130
			}
		},
		axisTick: {
			show: false
		},
		axisLabel: { // 坐标轴小标记
			textStyle: { // 属性lineStyle控制线条样式
				fontWeight: 'bolder',
				fontSize: 12,
				color: '#444'
			}
		},
		splitLine: { // 分隔线
			length: 10, // 属性length控制线长
			lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
				width: 1,
				color: '#444'
			}
		},
		pointer: { // 分隔线
			color: '#666666',
			width: 4,
			length: 180
		},
		detail: {
			show: false
		},
		data: [],
		color: ['#ed7a7a', '#ffbf53', '#18b5bb']
	}]
};
motion.setOption(option1);

function motionC(emotion) {
	motion.setOption({
		series: [{
			data: [{
				name: '情感值',
				value: emotion,
			}]
		}]
	})
}
option2 = {
	color: ['#ed7a7a', '#ffbf53', '#18b5bb'],
	tooltip: {
		trigger: 'axis',
		axisPointer: { // 坐标轴指示器，坐标轴触发有效
			type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
		}
	},
	legend: {
		//orient: 'vertical',  
		right: 'top',
		data: ['正面', '中性', '负面']
	},
	grid: {
		left: '2%',
		right: '5%',
		bottom: '4%',
		containLabel: true
	},
	xAxis: [{
		type: 'category',
		data: [],
		axisTick: {
			alignWithLabel: true
		},
		"axisLabel": {
			interval: 0
		},
		labels: {
			style: {
				//color: '#19a0f5',//颜色
				fontSize: '12px' //字体
			}
		}
	}],
	yAxis: [{
		type: 'value'
	}],
	series: [{
		name: '正面',
		type: 'bar',
		//barWidth: '20%',
		data: []
	}, {
		name: '中性',
		type: 'bar',
		//barWidth: '20%',
		data: []
	}, {
		name: '负面',
		type: 'bar',
		//barWidth: '20%',
		data: []
	}]
};
deptinfo.setOption(option2);

function deptinfoC(negaData, neuData, posiData, deptName) {				
	deptinfo.setOption({
		xAxis: [{
			data: deptName,
		}],
		series: [{
			data: posiData
		}, {
			data: neuData
		}, {
			data: negaData
		}],
	})	
}

option3 = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b}: {c} "
	},
	series: [{
		name: '敏感过滤',
		type: 'pie',
		radius: ['50%', '70%'],
		avoidLabelOverlap: false,
		label: {
			normal: {
				show: false,
				position: 'center'
			},
			emphasis: {
				show: true,
				textStyle: {
					fontSize: '30',
					fontWeight: 'bold'
				}
			}
		},
		labelLine: {
			normal: {
				show: false
			}
		},
		data: []
	}],
	color: ['#f1927f', '#fab46c']
};
sensfilter.setOption(option3);
function sensfilterA(count) {
	sensfilter.setOption({
		series: [{
			data: [{
				name: '敏感词',
				value: count
			}]
		}]
	})
	
}

option4 = {
tooltip: {
	trigger: 'item',
	formatter: '{a} <br/>{b} : {c}'
},

xAxis: {
	type: 'category',
	name: 'x',
	splitLine: {
		show: false
	},
	data: []
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
series: [{
	name: '',
	size: ['100%', '100%'],
	type: 'line',
	data: []
}],
color: ['#a4d3f8']
};
motionline.setOption(option4);
function motionlineA(xData,seriesData) {
	motionline.setOption({
		xAxis:{
			data:xData
		},
		series:[{
			data:seriesData
		}]
	})
	
}

function Dateval() {
	$("#sea").click(function() {
		var pre = $('#mydatepicker').val();
		var end = $('#mydatepicker2').val();
		console.log(pre);
		console.log(end);
		$.ajax({
            type:"post",
            dataType:"json",
            url:"../getOver.do",
            data:{
            	pre:pre,
            	end:end
            },
            success:function(data){
               console.log(data);
               alldata(data);
               parentifram.window.callback(data);
            }
        });
		
	})
}

function allAjax() {
	introline.showLoading(); //加载动画
	motion.showLoading(); //加载动画
	deptinfo.showLoading(); //加载动画
	sensfilter.showLoading(); //加载动画
	motionline.showLoading();//加载动画
	$.ajax({
		type: "get",
		url: "../getOver.do",
		async: true,
		success: function(data) {
			introline.hideLoading();
			motion.hideLoading();
			sensfilter.hideLoading();
			motionline.hideLoading();
			deptinfo.hideLoading();
			alldata(data);
			parentifram.window.callback(data);
		}
	});

}

function alldata(data){
	/*舆情指数*/
	var count = data.mbcount;
	$("#count").html(count);
	var linedata = data.opinion;
	var seriesData = [],
		time = [];
	for(var i = 0; i < linedata.length; i++) {
		time.push(linedata[i].time);
		//console.log(time);
		seriesData.push(linedata[i].count);
	}
	//console.log(seriesData);
	line(time, seriesData);
	/*情感指数*/
	var mofnum = data.negative;
	$("#mofnum").html(mofnum);
	var moznum = data.positive;
	$("#moznum").html(moznum);
	emotion = data.Emotiona;
	motionC(emotion);
	/*部门情况*/
	dept = data.dept
	console.log(dept)
	var posiData = [],
		neuData = [],
		negaData = [],
		deptName = [];
	for(var i = 0; i < dept.length; i++) {
		negaData.push(dept[i].negative);
		neuData.push(dept[i].neuternoun);
		posiData.push(dept[i].positive);
		deptName.push(dept[i].deptname);
	}
	deptinfoC(negaData,neuData,posiData,deptName);
	/*敏感过滤*/
	sensnum = data.sensitive;
	$("#sensnum").html(sensnum);
	count = data.sensitivecount;
	sensfilterA(count);
	/*情绪走势*/
	var modata = data.EmotionDay;
	var xData = [],
		seriesData = [];
	for(var i = 0; i < modata.length; i++) {
		xData.push(modata[i].time);
		seriesData.push(modata[i].emotion);
	}
	motionlineA(xData,seriesData);
	senList();
}
function senList(){
	$.ajax({
		type:"get",
		url:"../select_Sentiveword.do",
		async:false,
		success: function(data){
			var senData = data.Sentivewords;
			var html = '', pageIndex;
			//console.log(senData);
			for(var k = 0; k < senData.length; k++){
				//console.log(senData)
				html += '<ul class="infos"><li><p>'+senData[k].sensiword+'</p >';
		        html += '<p class="senconent">'+senData[k].content+'</p >'
		        html += '<p class="info-tip"><span class="info-resours">'+senData[k].name+'</span><span class="info-date">'+senData[k].sendTime+'</span></p >';
		        html += '</ul></li>';
			}
			
			$("#modal_context").html(html);
			$("#page").pagination({
	       		totalData:data.Count,
	            //pageCount: parseInt(length/4),
	            showData: 5,
	            jump: true,
	            coping: true,
	            homePage: '首页',
	            endPage: '末页',
	             preContent: '<',
	            nextContent: '>',
	             callback: function (index) {
	            	 pageIndex = index.getCurrent();
	             	$.ajax({
	             		type:"post",
	             		url:"../select_Sentiveword.do",
	             		data:{
	             			'pageIndex': pageIndex
	             		},
	             		async:false,
	             		success:function(data){
	             			console.log(data);
	             			var newlist = data.Sentivewords ,html = "";
	             			
	             			for (var j =0;j < newlist.length;j++){
	             				html += '<ul class="infos"><li><p>'+newlist[j].sensiword+'</p >';
	            		        html += '<p class="senconent">'+newlist[j].content+'</p >'
	            		        html += '<p class="info-tip"><span class="info-resours">'+newlist[j].name+'</span><span class="info-date">'+newlist[j].sendTime+'</span></p >';
	            		        html += '</ul></li>';
	             			}
	             			$("#modal_context").html(html);
	             		}
	             	});
	                //pageIndex = index.getCurrent()-1;
	             }
	         })
		}
	});
}

$(function() {
	$("[data-toggle='popover']").popover(); //解释说明弹出框
	allAjax();
	Dateval(); //日期搜索
})