;(function($){
    $.formValidator.regexEnum ={
        intege:"^-?[1-9]\\d*$",					//整数
        intege1:"^[1-9]\\d*$",					//正整数
        intege2:"^-[1-9]\\d*$",					//负整数
        num:"^([+-]?)\\d*\\.?\\d+$",			//数字
        num1:"^[1-9]\\d*|0$",					//正数（正整数 + 0）
        num2:"^-[1-9]\\d*|0$",					//负数（负整数 + 0）
        decmal:"^([+-]?)\\d*\\.\\d+$",			//浮点数
        decmal1:"^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$",//正浮点数
        decmal2:"^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$",//负浮点数
        decmal3:"^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$",//浮点数
        decmal4:"^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$",//非负浮点数（正浮点数 + 0）
        decmal5:"^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$",//非正浮点数（负浮点数 + 0）

        email:"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
        color:"^[a-fA-F0-9]{6}$",				//颜色
        url:"^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",	//url
        chinese:"^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$",					//仅中文
        ascii:"^[\\x00-\\xFF]+$",				//仅ACSII字符
        zipcode:"^\\d{6}$",						//邮编
        mobile:"^(1)[0-9]{9}$",				//手机
        ip4:"^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$",	//ip地址
        notempty:"^\\S+$",						//非空
        picture:"(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",	//图片
        rar:"(.*)\\.(rar|zip|7zip|tgz)$",								//压缩文件
        date:"^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$",					//日期
        qq:"^[1-9]*[1-9][0-9]*$",				//QQ号码
        tel:"^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$",	//电话号码的函数(包括验证国内区号,国际区号,分机号)
        username:"^\\w+$",						//用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
        letter:"^[A-Za-z]+$",					//字母
        letter_u:"^[A-Z]+$",					//大写字母
        letter_l:"^[a-z]+$",					//小写字母
        idcard:"^[1-9]([0-9]{14}|[0-9]{17})$",	//身份证
        ps_username:"^[\\u4E00-\\u9FA5\\uF900-\\uFA2D_\\w]+$" //中文、字母、数字 _
    };

    function parseOptions(o , attrName){
        var t = $(o);
        var s= $.trim(t.attr(attrName));
        if(s){
            var _9=s.substring(0,1);
            var _a=s.substring(s.length-1,1);
            if(_9!="{"){
                s="{"+s;
            }
            if(_a!="}"){
                s=s+"}";
            }
        }
        else{
            s = '{}';
        }
        return  (new Function("return "+s))();
    }

    $.fn.getFormValidator = function(config){
        var _config = $.extend(true,{},{wideword:true,autotip:true,formid:"myform",onerror:function(msg){},onsuccess:function(){
            //return confirm('请确认您填写的身份认证信息，该信息再通过审核后将无法修改!');
        }},config);
        $.formValidator.initConfig(_config);
        var that = this;
        $(this).find().attr('[id]').each(function(){
            switch ($(this).attr('id')){
                case  'email' :
                    var message =  $.extend({},{onshow:"请填写常用邮箱,该邮箱用于接收重要信息",onfocus:"请填写常用邮箱,该邮箱用于接收重要信息",oncorrect:"邮箱格式正确"}, parseOptions(this,'data-message'));
                    $(this).formValidator(message).regexValidator({regexp:"email",datatype:"enum"/*,onerror:"邮箱格式错误"*/}) ;
                    if($(this).attr('data-fn')){
                     //   var fn =  $.extend({},{onshow:"请填写常用邮箱,该邮箱用于接收重要信息",onfocus:"请填写常用邮箱,该邮箱用于接收重要信息",oncorrect:"邮箱格式正确"}, parseOptions(this,'data-message'));
                        $(this).functionValidator(parseOptions(this,'data-fn'));
                    }

                    if($(this).attr('data-ajax')){
                        var ajax =  $.extend({},{ buttons : $(that).find(':submit') , onerror : "禁止注册或邮箱已存在", onwait: '请稍候...'}, parseOptions(this,'data-ajax'));
                        $(this).ajaxValidator(parseOptions(this,'data-ajax'));
                    }
                    break;
            }

        });
    }
})(jQuery);

function isCardID(sId){ 
	var iSum=0 ;
	var info="" ;
	if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误"; 
	sId=sId.replace(/x$/i,"a"); 
	if(aCity[parseInt(sId.substr(0,2))]==null) return "你的身份证地区非法"; 
	sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2)); 
	var d=new Date(sBirthday.replace(/-/g,"/")) ;
	if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法"; 
	for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
	if(iSum%11!=1) return "你输入的身份证号非法"; 
	return true;//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女") 
} 


//短时间，形如 (13:04:06)
function isTime(str)
{
	var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
	if (a == null) {return false}
	if (a[1]>24 || a[3]>60 || a[4]>60)
	{
		return false;
	}
	return true;
}

//短日期，形如 (2003-12-05)
function isDate(str)
{
	var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
	if(r==null)return false; 
	var d= new Date(r[1], r[3]-1, r[4]); 
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
}

//长时间，形如 (2003-12-05 13:04:06)
function isDateTime(str)
{
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
	var r = str.match(reg); 
	if(r==null) return false; 
	var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]); 
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);
}