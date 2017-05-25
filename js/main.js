
function table(){
	 //Model
	$.ajax({
		type:"get",
		
		/*url:"../TongjiUniversity/select_All.do",*/
		url:"../select_All.do",
		dataType:"JSON",
		success:function(result){
			console.log(result.dept)
			for(var i in result.dept){
				var department = result.dept[i].department;
				var email = result.dept[i].email;
				//console.log(department)
				console.log(email);
		
			}
			var data = {
		            rows: result.dept,
		            rowtemplate: {Id: '', department: '', email: '', ccemail: '' }
		        };
			//ViewModel
		    var vue = new Vue({
		        el: '#app',
		        data: data,
		        methods: {
		            Save: function (event) {
		            	/*var data ={
		            			adddepentment: $(".one").val(),
		            			addemail: $(".two").val(),
		            			addid: $(".three").val()
		            	}
		            	console.log(data);*/
		            	var addccemail = $(".ccemail").val();
		            	var adddepentment = $(".dept").val();
		            	var addemail = $(".email").val();
		            	//console.log(addemail);
		            	if($(".dept").val()==''||$("#email").val() == ''||
		            			(!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($("#email").val())))||
		            					(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($(".ccemail").val()))){
		            		return;
		            		
		            	}else{
		            		$.ajax({
		            			type:"get",
		            			//url:"../TongjiUniversity/insert.do?department="+adddepentment+"&email="+addemail+"&addccemail="+addccemail,
		            			url:"../insert.do?department="+adddepentment+"&email="+addemail+"&addccemail="+addccemail,
		            			dataType:"JSON",
		            			success: function(date){
		            				console.log(date);
		            				window.location.reload();
		            			}
		            		});
		            	};
		            		
		                if (this.rowtemplate.Id == 0) {
		                    //设置当前新增行的Id
		                    this.rowtemplate.Id = this.rows.length + 1;
		                    this.rows.push(this.rowtemplate);
		                }
		                //还原模板
		                this.rowtemplate = {Id: '',department: '', email: '', ccemail: '' }
		            },
		            Delete: function (id) {
		                //实际项目中参数操作肯定会涉及到id去后台删除，这里只是展示，先这么处理。
		                for (var i=0;i<this.rows.length;i++){
		                	var dedata = {
		                			id : this.rows[i].id
		                	}
		                }
		                //console.log(dedata);
		            	$.ajax({
		            		type:"post",
		            		url:"../TongjiUniversity/delete.do",
		            		dataType:"json",
		            		data:dedata,
		            		success: function(data){
		            			alert("ok");
		            			window.location.reload();
		            			//console.log(data);
		            		},
		            		error: function(){
		            			alert("删除失败！");
		            		}
		            	});
		            },
		            Edit: function (row) {
		                this.rowtemplate = row;
		                $(".add").css('display','none');
		            },
		            Change: function (){
//		                var changedata = {
//		                		gerentuanduiId: this.rowtemplate.gerentuanduiId,
//		                		email: this.rowtemplate.email,
//		                		department: this.rowtemplate.department
//		                }
		            	$("#deptname").text('');
		            	$("#Cspinfo").text('');
		            	$(".add").css('display','inline-block');
		            	var id= this.rowtemplate.id;
		                var ccemail= this.rowtemplate.ccemail;
		                var email= this.rowtemplate.email;
		                var department= this.rowtemplate.department;
		                //console.log(changedata);
		                $.ajax({
		                	type:"post",
		            		url:"../TongjiUniversity/update.do?ccemail="+ccemail+"&department="+department+"&email="+email+"&id="+id,
		            		dataType:"json",
		            		//data:changedata,
		            		success: function(data){
		            			console.log(data);
		            			//alert("ok");
		            			//window.location.reload();
		            			
		            		},
		            		error: function(){
		            			alert("修改失败！");
		            		}
		                });
		              //还原模板
		                this.rowtemplate = {Id: '',department: '', email: '', ccemail: '' };
		            },
		            NBlur: function(){
		            	if($(".dept").val()==''){
		            		$("#deptname").text("部门名称不能为空！");
		            		$(this).focus();
		            	}else{
		            		$("#deptname").text('');
		            		$("#deptname").append("<img src=img/yes.png />");
		            	}
		            },
		            EBlur: function(){
		            	 if ($("#email").val() == '') {
		                     $("#Espinfo").text("邮箱不能为空！");
		                     $(this).focus();
		                 }
		                 else {
		                     if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($("#email").val()) == false) {
		                         $("#Espinfo").text("邮箱格式不正确，请重新填写");
		                         $(this).focus();
		                     }
		                     else {
		                         $("#Espinfo").text('');
		                         $("#Espinfo").append("<img src=img/yes.png />");
		                         state=true;
		                     }
		                 }
		            },
		            CBlur: function(){
		            	/* if ($(".ccemail").val() == '') {
		                     $("#Cspinfo").text("邮箱不能为空！");
		                     $(this).focus();
		                 }
		                 else {*/
		                     if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($(".ccemail").val()) == false) {
		                         $("#Cspinfo").text("抄送人格式不正确，请重新填写");
		                         $(this).focus();
		                     }
		                     else {
		                         $("#Cspinfo").text('');
		                         $("#Cspinfo").append("<img src=img/yes.png />");
		                         state=true;
		                     }
		                 /*}*/
		            },
		        }
		    });
			
		}
	});
        
    
}

$(function(){
	table();
});