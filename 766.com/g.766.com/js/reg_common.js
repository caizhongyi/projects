function is_password(s){
	var par = /^.{6,32}$/i;
	return par.test(s);
}

function is_email(s){
	var par = /^[a-z0-9.\-_]{2,32}@[a-z0-9\-]{2,32}(\.[a-z0-9\-]{2,5})+$/i;
	return par.test(s);
}

//��ʾ��ʾ��Ϣ
function info(id){
	htmlinfo = $('#'+id+'_div_info,.'+id+'_div_info').html();
	if(htmlinfo===null||htmlinfo===""){
		$('#' + id+'_div_error,.' + id+'_div_error').html("").hide();
	}else{
		$('#' + id+'_div_error,.' + id+'_div_error').html(htmlinfo).slideDown("slow");
	}
}

// ��ʾ������ʾ
function error(o, msg){
	var nid	=	$(o).attr('id');

    $(o).nextAll('#' + nid + '_div_error,.' + nid + '_div_error').html('<img src="http://img2.51wan.com/gg/images/xyRegNO.jpg" class="ico-stop"/>' + msg).show();
}

// ��֤��ȷʱ��ʾ
function ok(o, msg){
	var nid	= $(o).attr('id');
	$('#' + nid + '_div_error,.' + nid + '_div_error').html('<img src="http://img2.51wan.com/gg/images/xyRegOK.jpg"/>'+msg).show();
}

// ��֤�û����Ƿ�ע��
function ajaxgetNameEmail(obj, value,callback){
	var ss = $(obj).attr('id')+'_div_error';
	$.getJSON(
			"http://g.766.com/gameapi/checkUserIsExist",
			{username:value},
			function(data){
				if(data == 1){
					$("#"+ss).html('<img src="http://img2.51wan.com/gg/images/xyRegNO.jpg" class="ico-stop"/>�û����Ѵ���!').show();
				}else{
					$("#"+ss).html('<img src="http://img2.51wan.com/gg/images/xyRegOK.jpg"/>');
				}
                callback && callback(data);
			}			
	);
}

//����û���
function checkUsername(obj,callback){
	var username = jQuery.trim($(obj).val());
	var reg = /[^\u4e00-\u9fa5]/;
	var ck = /^[a-zA-Z0-9][a-zA-Z0-9.\@]{5,15}$/;
	if (username == ""){
		error(obj, "�������¼�˺�");
	}else if(!reg.test(username)){
		error(obj, "��¼�˺Ų���ʹ������");
	}else if(!ck.test(username)){
		error(obj, "��¼�˺���6��16λ��ĸ�����֡����@���");
	}else {
		ajaxgetNameEmail(obj, username,callback);
	}
}



//�������
function checkPassword(obj){

	var password = $(obj).val();
	if (password == ""){
		error(obj, "��������������");		
	}else if (!is_password(password)){
		error(obj, "�����ʽ����ȷ");
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
                case 1://����ɹ�
                    window.location.href = "http://g.766.com/mhzc/";
                    break;
                case -1:
                    alert("�û������������");
                    break;
                default:
                    alert("����ʧ��");
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
                alert("�û����Ѵ��ڣ�");
            }
            else if(data == -4){
                alert("�û�������");
            }
            else if(data == -5){
                alert("�������");
            }
            else
            {
                alert('ע��ʧ��!');
            }
        }
    });
}

//��������������
function checkRepassword(obj){
	var password = $("#password").val();
	var repassword = $(obj).val();	
	if(password == ""){
		error(obj, "��������������");		
	}else{	
		if(password==repassword){
			var nid	= $(obj).attr('id');
			$('#' + nid + '_div_error').html('<img src="http://img2.51wan.com/gg/images/xyRegOK.jpg"/>').show();	
		}else{
			error(obj, "���������벻һ��");
		}	
	}
}

function checkSubmitForm(){	
	checkUsername($("#username,#login-username")[0]);
	checkPassword($("#password,#login-password")[0]);
	checkRepassword($("#repassword")[0]);
}
//�ύ��ť�Ŀ��÷�
function changeDisabled(){
	if($("form:first :submit").attr("disabled")==true){
	    //�ж�inputԪ���Ƿ��Ѿ�������disabled����
		��$("form:first :submit").removeAttr("disabled");//ȥ��inputԪ�ص�disabled����
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
            alert("���������������ܼ���");
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
	//���û���ת
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
//ɾ��COOKIE
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

//��ȡCOOKIE
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));    
    if(arr != null) return decodeURI(arr[2]); return null;    
}

//����COOKIE
function setCookie(name, value, time){
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strsec*1);
	document.cookie = name + "=" + escape (value) + ";expires=" + exp.toGMTString()+";domain=.51wan.com;path=/";
}

//��¼��֤

function CheckUserLogin(){
	
	var login_username = $("#login_username").val();
	var login_password = $("#login_password").val();
	
	var reg_gamename = $("#gamename").val();
	if(reg_gamename != ""){
		$("#login_gamename").val(reg_gamename);
	}
	
	//д�����·��
	var localurl = window.location.href;
	$("#gotourl").val(localurl);
	
	
	if(login_username == ''){
		alert("����д�û���");
		$("#login_username").focus();
		return false;
	}
	
	if(login_password == ''){
		alert("����д�û�����");
		$("#login_password").focus();
		return false;
	}
	
}

