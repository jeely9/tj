//初始化Echars图表
var wordCloud; var color;
$.ajaxSettings.async = false;
var word = echarts.init(document.getElementById('word'));
var pie = echarts.init(document.getElementById('pie'));
var option = option1 = null;
var wordData = [];
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
option = {
    title: {
        text: '*括号里为热词条数',
        link: 'http://www.google.com/trends/hottrends',
        textStyle: {
	    	fontSize: '8px'
	    },
    },   
    tooltip: {
        show: true
    },
    series: [{
        name: '热词动态',
        type: 'wordCloud',
        size: ['80%', '80%'],
        textRotation : [0, 45, 90, -45],
        textPadding: 0,
        autoSize: {
            enable: true,
            minSize: 14
        },        
        data: wordData,
    }]
};
word.setOption(option,true);

option1 = {
	title : {
	    text: '',
	    subtext: '',
	    //x:'center'
	},
	tooltip : {
	    trigger: 'item',
	    formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	
	series : [
	    {
	        name: '部门指数',
	        type: 'pie',
	        radius : '65%',
	        center: ['50%', '50%'],
	        data:[],
	        itemStyle: {
	            emphasis: {
	                shadowBlur: 10,
	                shadowOffsetX: 0,
	                shadowColor: 'rgba(0, 0, 0, 0.5)'
	            }
	        }
	    }
	],
	color: ['#02b3c5','#ed7a7a','#ffbf53']
};
pie.setOption(option1,true);

function initData(data){
	
	console.log(data.totalNumPage);
	/*分页*/
	 var html = '',pageSize = 4;
	 var list = data.list,length = data.list.length, pageIndex ;
	 console.log(list);
	 //默认页面显示内容
	 for(var i = 0; i < list.length;i++) {
        html += '<ul class="infos clearfix"><b class="left features minus" id="features">'+ list[i].res +'</b>';
        html += '<li class="left"><p>'+list[i].content+'</p>';
        html += '<p class="info-tip"><span class="info-resours">'+list[i].name+'</span><span class="info-date">'+list[i].sendTime+'</span></p>';
        html += '</ul></li>';        
    }
	 console.log(list);
    $('#list').html(html);
	//颜色匹配
	/*if($('#features').text().match('负面')){
		$('#features').toggleClass('minus');
	}else if($('#features').text().match('正面')){
		$('#features').toggleClass('plus');
	}else if($('#features').text().match('中性')){
		$('#features').toggleClass('neutral');
	} */
	/*page初始化数值*/
   $("#page").pagination({
   		totalData:data.totalNumPage,
        //pageCount: data.totalNumPage,
        showData: 4,
        jump: true,
        coping: true,
        homePage: '首页',
        endPage: '尾页',
        preContent: '<',
        nextContent: '>',
         callback: function (index) {
        	 pageIndex = index.getCurrent();
        	 console.log(index);
         	$.ajax({
         		type:"post",
         		url:"../../../TongjiUniversity/getMcroblogNotHot.do",
         		data:{
         			'pageIndex':pageIndex
         		},
         		async:true,
         		success:function(data){
         			console.log(data);
         			var newlist = data.list;
         			var html = '';
         			for (var j =0;j < newlist.length;j++){
         				html += '<ul class="infos clearfix"><b class="left features minus" id="features">'+ newlist[j].res +'</b>';
				        html += '<li class="left"><p>'+newlist[j].content+'</p>';
				        html += '<p class="info-tip"><span class="info-resours">'+newlist[j].name+'</span><span class="info-date">'+newlist[j].sendTime+'</span></p>';
				        html += '</ul></li>';
         			}         			
         			 $('#list').html(html);
         		}
         	});
            pageIndex = index.getCurrent()-1;
            //for(pageIndex  < list.length && pageIndex<4;)
            /* $('#list').html('<ul class="infos clearfix"><b class="left features" id="features">'
             + list[pageIndex].res +'</b>'+'<li class="left"><p>'+list[pageIndex].content+'</p>'+'<p class="info-tip"><span class="info-resours">'+list[pageIndex].name+'</span><span class="info-date">'+list[pageIndex].sendTime+'</span></p>'+'</ul></li>');*/	                
         }
     });
}
function wordcloud(wordData){
	word.clear();
	word.setOption({
		series:[{data:wordData}],
	});
	word.setOption(option);
}
function deptpie(neutral,positive,negative){
	pie.setOption({		
		series:[{
			data:[{value:positive, name:'正面'},
	            {value:negative, name:'负面'},
	            {value:neutral, name:'中立'}],
		}]
	});	
	pie.setOption(option1);
}
function Dateval(){
	
	var depart = $("#deptinfo option:selected").val();   //获得选中的值
	var name = $("#deptinfo option:selected").text();
	var pre = $('#mydatepicker').val();
	var end = $('#mydatepicker2').val();
	$.ajax({
        type:"post",
        dataType:"json",
        url:"../../../TongjiUniversity/getMcroblog.do",
        data:{
				'depart': depart,
				'name': name,
				'pre' :pre,
				'end' :end
			},
        success:function(data){
           showdept(data);
        }
    });
	$("#sea").click(function(checkbox_value){
		var pre = $('#mydatepicker').val();
		var end = $('#mydatepicker2').val();
		
		$.ajax({
            type:"post",
            dataType:"json",
            url:"../../../TongjiUniversity/getMcroblog.do",
            data:{
					'pre': pre,
					'end':  end
				},
            success:function(data){
            	checkbox();
               showdept(data);
            }
        });
		
	})
}

function deptajax(){
	word.showLoading();//加载动画
	pie.showLoading();//加载动画
	$.ajax({
		type:"get",
		url:"../../../TongjiUniversity/getMcroblog.do",
		async:false,
		success: function(data){
			showdept(data);			
		}
	});	
}
function showdept(data){
	
	word.hideLoading();
	pie.hideLoading();
	/*微博内容*/
	initData(data);
	/*热词*/
	wordCloud=data.listW;
	wordData = [];
	for(var i =0;i <wordCloud.length;i++){
		wordData.push({name:wordCloud[i].name,value:wordCloud[i].value,itemStyle:createRandomItemStyle()})
	}
	wordcloud(wordData);			
	/*部门指数*/
	totalNum = data.totalNum;
	$("#totalNum").html(totalNum);
	neutral = data.neutral;
	positive = data.positive;
	negative = data.negative;
	deptpie(neutral,positive,negative);
}
function checkbox(){
	$("#tip input[type=checkbox]").click(function() { 
		obj = document.getElementsByName("test");
		var pre = $('#mydatepicker').val();
		var end = $('#mydatepicker2').val();
		var depart = $("#deptinfo option:selected").val();   //获得选中的值
		var name = $("#deptinfo option:selected").text();
		 check_val = [];
	    for(k in obj){
	        if(obj[k].checked)
	        	check_val += obj[k].value;
	        
	        	
	    }
		var checkbox_value = check_val;
		//console.log(checkbox_value);
		$.ajax({
            type:"post",
            dataType:"json",
            url:"../../../TongjiUniversity/getMcroblogNotHot.do",
            data:{
					'checkbox_value':checkbox_value,
					'pre': pre,
					'end': end,
					'depart': depart,
					'name': name
				},
            success:function(data){
            	console.log(data);
            	initData(data);
            }
        });
	})
}
$(function (){
	deptajax();  //ajax取值
	checkbox();
	Dateval();   //传参数给后台
	//initData();       //微博列表	
})
