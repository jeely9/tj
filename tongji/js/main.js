function showData(){
	var nowtime = new Date();  
    var year = nowtime.getFullYear();  
    var month = nowtime.getMonth() + 1;  
    var day = nowtime.getDate();
    var str = year + "-" + month + "-" + day;
    $("#pretime").html(str);
}

function calender(){
	$('#mydatepicker').dcalendarpicker({
		format:'yyyy-mm-dd'
		
	});
	$('#mydatepicker2').dcalendarpicker({
		format:'yyyy-mm-dd'
	}); 
	$('#mycalendar').dcalendar();
}














$(function(){
	showData();
	calender();
})
