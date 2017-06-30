
//'http://image.91.com/www91/flash/newflash0123.swf'

function playFlash(flashid,iWmode,iWidth,iHeight){
        var fpic =document.getElementById(flashid).getElementsByTagName("img");
	var flink =document.getElementById(flashid).getElementsByTagName("a");
	var pic_width=275; 
	var pic_height=182;
	if(iWidth!=null)
	pic_width=iWidth;
	if(iHeight!=null)
	pic_height=iHeight;
	var button_pos=fpic.length;
	var stop_time=6000;
	var show_text=1; 
	var txtcolor="dddddd";
	var bgcolor="000000";
	var imag=new Array();
	var link=new Array();
	var text=new Array();
	var flashUrl = 'http://image.91.com/photo.news/flash/2009/newflash090414.swf';


for(var i=0;i<fpic.length;i++){
   imag[i]=fpic[i].src;
   link[i]=flink[i].href;
   } 

	var swf_height=show_text==1?pic_height+0:pic_height;
	var pics="", links="", texts="";
	for(var i=0; i<imag.length; i++){
		pics=pics+("|"+imag[i]);
		links=links+("|"+link[i]);
		texts=texts+("|"+text[i]);
	}
	pics=pics.substring(1);
	links=links.substring(1);
	texts=texts.substring(1);
	
	var flash = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="'+ pic_width +'" height="' + pic_height +'" />';
	flash = flash + '<param name="wmode" value="opaque">'; 
	flash = flash + '<param name="movie" value="'+ flashUrl +'" />';
	flash = flash + '<param name="quality" value="high" />';
	flash = flash + '<param name="menu" value="false" />';
	flash = flash + '<param name="FlashVars" value="pics='+pics+'&links='+links+'&texts='+texts+'&pic_width='+pic_width+'&pic_height='+pic_height+'&show_text='+show_text+'&txtcolor='+txtcolor+'&bgcolor='+bgcolor+'&button_pos='+button_pos+'&stop_time='+stop_time+'">';
	flash = flash + '<embed wmode="transparent" src="' + flashUrl + '" FlashVars="pics='+pics+'&links='+links+'&texts='+texts+'&pic_width='+pic_width+'&pic_height='+pic_height+'&show_text='+show_text+'&txtcolor='+txtcolor+'&bgcolor='+bgcolor+'&button_pos='+button_pos+'&stop_time='+stop_time+'" quality="high" width="'+ pic_width +'" height="'+ swf_height +'" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
    flash = flash + '</object>';
	document.writeln(flash); 
}









