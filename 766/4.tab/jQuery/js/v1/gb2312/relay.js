/* JS Document 
Version:	1.0
Date:		2011/03/09
Author:		Kaijun Ni
Update:
*/
function jumpUrl(x){
	var url = '',tt='', e = encodeURIComponent, s = screen, d = document, wd = 0, hg = 0, u = d.location,t=d.title.split("_766��Ϸ��_�����ֲ���������")[0];
	if(x=='t'){
		url ="http://t.sohu.com/third/post.jsp?link="+e(u.href)+"&title="+e(t);
		wd = 660;hg = 470;tt="ת�����Ѻ�΢��";
	}else if(x=='qq'){
		url ="http://v.t.qq.com/share/share.php?title="+e(t)+e(u);
		wd = 700;hg = 680;tt="ת������Ѷ΢��";
	}else if(x=='douban'){
		url ="http://www.douban.com/recommend/?url="+e(u.href)+"&title="+e(t);
		wd = 460;hg = 340;tt="ת��������";
	}else if(x=='sina'){
		url ="http://v.t.sina.com.cn/share/share.php?url="+e(u.href)+"&title="+e(t);
		wd = 480;hg = 340;tt="ת����sina΢��";
	}	else if(x=='renren'){
		url ="http://share.renren.com/share/buttonshare?link="+e(u.href)+"&title="+e(t);
		wd = 590;hg = 430;tt="ת����������";
	}else if(x=='kaixin'){
		url ="http://www.kaixin001.com/repaste/share.php?rurl="+e(u.href)+"&rtitle="+e(t);
		wd = 540;hg = 360;tt="ת����������";
	}else if(x=='itb'){
		url ="http://tieba.baidu.com/i/sys/share?link="+e(u.href)+"&type=text&title="+e(t)+"&content="+e($('contentText').getElementsByTagName('p')[0].innerHTML.replace(/<[^>].*?>/g,'').substr(0,120)||'');
		wd = 626;hg = 436;tt="ת�����ٶ�����";
	}else if(x=='qzone'){
		url ="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+e(u.href)+"&title="+e(t);
		wd = 586;hg = 415;tt="ת����QQ�ռ�";
	}
	
	function a(){
		if (!window.open(url, tt, ['toolbar=0,status=0,resizable=1,width='+ wd +',height='+ hg +',left='+ (s.width - wd) / 2+ ',top='+ (s.height - hg) / 2]))
			u.href = [url].join('');
	}
	if (/Firefox/.test(navigator.userAgent)){
		setTimeout(a, 0);
	}else{
		a();
	}
}