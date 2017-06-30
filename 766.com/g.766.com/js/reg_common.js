function is_password(s){
	var par = /^.{6,32}$/i;
	return par.test(s);
}

function is_email(s){
	var par = /^[a-z0-9.\-_]{2,32}@[a-z0-9\-]{2,32}(\.[a-z0-9\-]{2,5})+$/i;
	return par.test(s);
}

//显示提示信息
function info(id){
	htmlinfo = $('#'+id+'_div_info,.'+id+'_div_info').html();
	if(htmlinfo===null||htmlinfo===""){
		$('#' + id+'_div_error,.' + id+'_div_error').html("").hide();
	}else{
		$('#' + id+'_div_error,.' + id+'_div_error').html(htmlinfo).slideDown("slow");
	}
}

// 显示错误提示
function error(o, msg){
	var nid	=	$(o).attr('id');

    $(o).nextAll('#' + nid + '_div_error,.' + nid + '_div_error').html('<img src="http://img2.51wan.com/gg/images/xyRegNO.jpg" class="ico-stop"/>' + msg).show();
}

// 验证正确时提示
function ok(o, msg){
	var nid	= $(o).attr('id');
	$('#' + nid + '_div_error,.' + nid + '_div_error').html('<img src="http://img2.51wan.com/gg/images/xyRegOK.jpg"/>'+msg).show();
}

// 验证用户名是否被注册
function ajaxgetNameEmail(obj, value,callback){
	var ss = $(obj).attr('id')+'_div_error';
	$.getJSON(
			"http://g.766.com/gameapi/checkUserIsExist",
			{username:value},
			function(data){
				if(data == 1){
					$("#"+ss).html('<img src="http://img2.51wan.com/gg/images/xyRegNO.jpg" class="ico-stop"/>用户名已存在!').show();
				}else{
					$("#"+ss).html('<img src="http://img2.51wan.com/gg/images/xyRegOK.jpg"/>');
				}
                callback && callback(data);
			}			
	);
}

//检查用户名
function checkUsername(obj,callback){
	var username = jQuery.trim($(obj).val());
	var reg = /[^\u4e00-\u9fa5]/;
	var ck = /^[a-zA-Z0-9][a-zA-Z0-9.\@]{5,15}$/;
	if (username == ""){
		error(obj, "请输入登录账号");
	}else if(!reg.test(username)){
		error(obj, "登录账号不能使用中文");
	}else if(!ck.test(username)){
		error(obj, "登录账号以6到16位字母、数字、点或@组成");
	}else {
		ajaxgetNameEmail(obj, username,callback);
	}
}



//检查密码
function checkPassword(obj){

	var password = $(obj).val();
	if (password == ""){
		error(obj, "请输入您的密码");		
	}else if (!is_password(password)){
		error(obj, "密码格式不正确");
	}else{
		var nid	= $(obj).attr('id');
		$('#' + nid + '_div_error,.' + nid + '_div_error').html('<img src="http://img2.51wan.com/gg/images/xyRegOK.jpg"/>').show();
	}
}

function login(username,password,rememberMe){
    $.ajax({
        type: "POST",
        url: "http://g.766.com/gameapi/loginCheck",
        data: "username="+username+"&password="+password+"&rememberMe="+rememberMe,
        success: function(status){
            var status = parseInt(status);
            switch(status)
            {
                case 1://登入成功
                    window.location.href = "http://g.766.com/mhzc/";
                    break;
                case -1:
                    alert("用户名或密码错误");
                    break;
                default:
                    alert("登入失败");
            }
        }
    });
}

function regist(username,password){
    $.ajax({
        type: "POST",
        url: "http://g.766.com/gameapi/register/",
        data: "username="+username+"&password="+password,
        success: function(data){
            if(data == 1){
                location.href = 'http://g.766.com/mhzc/';
            }
            else if(data == -2){
                alert("用户名已存在！");
            }
            else if(data == -4){
                alert("用户名错误！");
            }
            else if(data == -5){
                alert("密码错误！");
            }
            else
            {
                alert('注册失败!');
            }
        }
    });
}

//检查二次输入密码
function checkRepassword(obj){
	var password = $("#password").val();
	var repassword = $(obj).val();	
	if(password == ""){
		error(obj, "请您先输入密码");		
	}else{	
		if(password==repassword){
			var nid	= $(obj).attr('id');
			$('#' + nid + '_div_error').html('<img src="http://img2.51wan.com/gg/images/xyRegOK.jpg"/>').show();	
		}else{
			error(obj, "您两次输入不一致");
		}	
	}
}

function checkSubmitForm(){	
	checkUsername($("#username,#login-username")[0]);
	checkPassword($("#password,#login-password")[0]);
	checkRepassword($("#repassword")[0]);
}
//提交按钮的可用否
function changeDisabled(){
	if($("form:first :submit").attr("disabled")==true){
	    //判断input元素是否已经设置了disabled属性
		　$("form:first :submit").removeAttr("disabled");//去除input元素的disabled属性
		clearInterval();
	}
}
/********************************************************************************************/

$(document).ready(function(){	
	$(':text,:password').focus(function(e){
		info($(this).attr('id'));		
	});			
	$('#username').focus();
	$("#login-username,#username").blur(function(){checkUsername(this);});
	$("#login-password,#password").blur(function(){checkPassword(this);});
	$("#repassword").blur(function(){checkRepassword(this);});
	$("#submit_form").submit(function() {
        var username = jQuery.trim($('#username').val());
        var password = $("#password").val();
        var repassword = $("#repassword").val();
        if (username == "") {
            checkUsername($("#username")[0]);
            return false;
        } else if (password == "") {
            checkPassword($("#password")[0]);
            return false;
        } else if (password != repassword) {
            checkRepassword($("#repassword")[0]);
		    return false;
	    }

       // $("form:first :submit").attr("disabled","disabled");
        if ($("img.ico-stop").size() != 0)
            return false;
        if ($("#agree:checked").size() === 0) {
            alert("您必须接受条款才能激活");
            return false;
        };
        regist(username,password);
        return false;
	});

   /* $("#agree").click(function(){
        if($(this).attr('checked')){
            $("form:first :submit").removeAttr('disabled');
        }
    })*/
	//老用户跳转
/*	if(getCookie("xy_uid")>0){
     var adids = jQuery.trim($("#gamename").val());
     window.location.href="http://my.51wan.com/ad.php?who="+adids;
     }*/


    $('#login-form').submit(function(){
        var username = jQuery.trim($('#login-username').val());
        var password = $("#login-password").val();

        if (username == "") {
            checkUsername($("#login-username")[0]);
            return false;
        } else if (password == "") {
            checkPassword($("#login-password")[0]);
            return false;
        }

        login($(this).find('#login-username').val(),$(this).find('#login-password').val(),false);
        return false;
    });
});	

/*****************************************************************************************/
//删除COOKIE
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if(cval!=null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function getsec(str){
    var str1 = str.substring(1,str.length)*1; 
    var str2 = str.substring(0,1); 
    if (str2=="s"){
    	return str1*1000;
    }else if (str2=="h"){
    	return str1*60*60*1000;
    }else if (str2=="d"){
    	return str1*24*60*60*1000;
    }
}

//获取COOKIE
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));    
    if(arr != null) return decodeURI(arr[2]); return null;    
}

//设置COOKIE
function setCookie(name, value, time){
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strsec*1);
	document.cookie = name + "=" + escape (value) + ";expires=" + exp.toGMTString()+";domain=.51wan.com;path=/";
}

//登录验证

function CheckUserLogin(){
	
	var login_username = $("#login_username").val();
	var login_password = $("#login_password").val();
	
	var reg_gamename = $("#gamename").val();
	if(reg_gamename != ""){
		$("#login_gamename").val(reg_gamename);
	}
	
	//写入回跳路径
	var localurl = window.location.href;
	$("#gotourl").val(localurl);
	
	
	if(login_username == ''){
		alert("请填写用户名");
		$("#login_username").focus();
		return false;
	}
	
	if(login_password == ''){
		alert("请填写用户密码");
		$("#login_password").focus();
		return false;
	}
	
}

