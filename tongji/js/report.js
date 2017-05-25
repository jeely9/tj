var hotopic = echarts.init(document.getElementById("hotopic"));//热词折线图
var cirintro = echarts.init(document.getElementById('cirintro')); //聚焦舆情综述
var xdata = [];
var ydata = [];
var option = option1 = null;
option = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
    },	   
    xAxis: {
        type: 'category',
        name: '日',
        splitLine: {show: false},
        data: xdata,
    },
    grid: {
        left: '0',
        right: '0',
        bottom: '',
        containLabel: true
    },
    yAxis: {
        name: 'y'
    },
    series: [
        {
            //name: '3的指数',
            size: ['100%', '100%'],
            type: 'line',
            data: ydata,
        }
    ],
    color: ['#f66'],
};
hotopic.setOption(option);
/*聚焦舆情综述*/
option1 = {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        feature: {
            //restore: {},
            //saveAsImage: {}
        }
    },
    /*legend: {
        data:['负面','中立','正面']
    },
    */
    series: [{            
            startAngle: 180,
            endAngle: 0,
            name:[],
            type:'gauge',
            center : ['50%', '96%'],    // 默认全局居中
            radius : 180,
            min:-1000,
            max:1000,
            splitNumber:10,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 130
                }
            },
            axisTick: {show:false},
            axisLabel: {            // 坐标轴小标记
                textStyle: {       // 属性lineStyle控制线条样式
                    fontWeight: 'bolder',
                    fontSize : 12,
                    color: '#444'
                }
            },
            splitLine: {           // 分隔线
                length : 8,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    width:1,
                    color: '#444'
                }
            },
            pointer: {           // 分隔线
                color:'#666666',
                width: 4,
                length:180
            },
            detail : {
                show : false
            },
            data: []
        }],
    color: ['#ed7a7a','#ffbf53','#18b5bb']
};
cirintro.setOption(option1);

$(function (){
	hotAjax();
});
function hotAjax(){
	hotopic.showLoading();//加载动画
	cirintro.hideLoading();
	$.ajax({
		type:"post",
		url:"../../../TongjiUniversity/hot/weeklyDetail.do",   //获得数据接口
		async:true,
		success: function(data){
			hotopic.hideLoading();
			console.log(data);
			$(".hotLike").empty();
			$(".trend").empty();
			var key_value = data.num1.keyWord;
			$(".key_value").html(key_value);
			
			var corpusContent = data.num1.corpusContent;
			contentFn(corpusContent);
			
			var trend = data.num1.trend;
			xdata = [],ydata = [];
			for(var key in trend){
				xdata.push(key);
				ydata.push(trend[key]);
			}
			/*判断持续度的有几颗星*/
			for(var i = 0;i<xdata.length;i++){
				var trendImg = $('<img src="../img/start.png"/>');
				$(".trend").append(trendImg);
			}
			/*判断热度有几颗星*/
			var wardLike = data.num1.commentForwardLike;
			if(0<wardLike<=100){
				var trendImg = $('<img src="../img/start.png"/>');
			}else if(100<wardLike<=200){
				var trendImg = $('<img src="../img/start.png"/><img src="../img/start.png"/>');
			}else if(200<wardLike<=300){
				var trendImg = $('<img src="../img/start.png"/><img src="../img/start.png"/><img src="../img/start.png"/>');
			}else if(300<wardLike<=400){
				var trendImg = $('<img src="../img/start.png"/><img src="../img/start.png"/><img src="../img/start.png"/><img src="../img/start.png"/>');
			}else if(400<wardLike){
				var trendImg = $('<img src="../img/start.png"/><img src="../img/start.png"/><img src="../img/start.png"/><img src="../img/start.png"/><img src="../img/start.png"/>');
			}
			$(".hotLike").append(trendImg);
			
			/*hotchart()为折线图数据函数*/
			hotchart(xdata,ydata);		
			/*舆情综述*/
			var emotion = data.emotion;
			emovalue = [],emoname = [];
			$.each(emotion, function(key,value) {
				emoname = key;
				emovalue = value*100;
			});
			hotcircle(emoname,emovalue);
		},
		error:function(data){
			console.log(data);
		}
	});
}
/*填充折线图数据*/
function hotchart(xdata,ydata){
	hotopic.setOption({
		xAxis:{
			data:xdata,
		},
		series:[{
			data:ydata,
		}]
	});
}
/*微博内容展示*/
function contentFn(jsonData){
	var keyArr = [];
	for(var key in jsonData){
		keyArr.push(key);
	}
	var oneContent = jsonData[keyArr[0]];
	var content = oneContent.content;
	var name = oneContent.name;
	var sendTime = oneContent.sendTime;
	$(".box-text").html(content);
	$(".name").html(name);
	$("#hot_time").html(sendTime);
	
	$.each(jsonData, function(key,value) {
		var ols = $('<ol><div class="mbox-container"><p class="mbox-text">'+jsonData[key].content+'</p><p class="mbox-news">'+jsonData[key].name+'<span id="">'+jsonData[key].sendTime+'</span></p></div></ol>');		
		ols.appendTo('#modal_context');
	});
}

function hotcircle(emoname,emovalue){
	cirintro.setOption({
		series:[{
			data:[{name:emoname,value:emovalue}],
		}]
	});
}
