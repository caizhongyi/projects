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

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));    
    if(arr != null) return decodeURI(arr[2]); return null;    
}

function setCookie(name, value, time){
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strsec*1);
	document.cookie = name + "=" + escape (value) + ";expires=" + exp.toGMTString()+";domain=.51wan.com;path=/";
}

var urlinfo = window.location.href;	//��ȡ��ǰҳ���url
var len = urlinfo.length;				//��ȡurl�ĳ���
var offset = urlinfo.indexOf("?");	//���ò����ַ�ʼ��λ��
var a = "";
var b = "";
var c = "";
var st = "";
if(offset != -1){
	adstr=urlinfo.substr(offset+1,len)
	//alert(adstr);
	var shuzu = adstr.split('&');
	for(var i=0;i<shuzu.length;i++){
		temp = shuzu[i];
		temp1= temp.split("=");
		key  = temp1[0];
		value= temp1[1];
		switch(key){
			case 'a':
				a=value;break;
			case 'b':
				b=value;break;
			case 'c':
				c=value;break;
			case 'st':
				st=value;break;
		}		
	}
	//alert("a="+a+"  b="+b+"  c="+c+"  st="+st);
	if(st!="") setCookie("st",st,"s1800");
	if(a!="") setCookie("fromid",a,"s1800");
	if(a!=""&&b!=""&&c!=""){
		var webmanad = a+"_"+b+"_"+c+"_dd";
		setCookie("webmanad",webmanad,"s1800");
	}
	//alert(getCookie("webmanad"));
	
}
