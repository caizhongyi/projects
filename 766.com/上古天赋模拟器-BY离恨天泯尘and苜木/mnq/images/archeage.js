(function(d){"undefined"===typeof window.ArcheAge&&(window.ArcheAge={});ArcheAge.namespace=function(a){var a=a.split("."),b=ArcheAge,c;"ArcheAge"===a[0]&&(a=a.slice(1));for(c=0;c<a.length;c+=1)"undefined"===typeof b[a[c]]&&(b[a[c]]={}),b=b[a[c]];return b};ArcheAge.namespace("LoginUser");ArcheAge.DEFAULT_ERROR_MESSAGE={message:"시스템 오류입니다. 관리자에게 문의해 주십시오!"};ArcheAge.DEFAULT_ERROR_MARK={mark:'<i class="ico_comm alert"></i>'};ArcheAge.executeFunctionByName=function(a,b){for(var c=Array.prototype.slice.call(arguments).splice(2),
d=a.split("."),f=d.pop(),h=0;h<d.length;h++)b=b[d[h]];return b[f].apply(this,c)};ArcheAge.ajaxCommonErrorProcessor=function(a,b,c){if(!c.disableGlobalErrorProcessor){ArcheAge.CommonUI.LoadingImage.unloading();var a=ArcheAge.DEFAULT_ERROR_MESSAGE,e,f;try{if(e=b.getResponseHeader("Content-Type"),(f=null!==e&&0<=e.indexOf("application/json"))&&(a=d.parseJSON(b.responseText)),403===b.status)if(void 0!=b.getResponseHeader("messageKeys")){var a={message:""},h=b.getResponseHeader("messageKeys").split(","),
g;for(g in h)a.message+=ArcheAge.executeFunctionByName(h[g],window)+"\n";a.message+=AL10N.Global.reqCs()}else a={message:AL10N.Global.forbidden()}}catch(j){console.log("error="+j)}a.message||(a=ArcheAge.DEFAULT_ERROR_MESSAGE);0<a.message.indexOf("<br />")&&(a.message=a.message.replace("<br />","\n"));ArcheAge.alert(a.message)}};d.ajaxSetup({cache:!1,dataType:"json",timeout:6E4,type:"post"});d(document).ajaxError(ArcheAge.ajaxCommonErrorProcessor);ArcheAge.cachedScript=function(){var a=arguments[0],
b=arguments[1],c=Array.prototype.slice.call(arguments,1);"string"===typeof b?ArcheAge.getScript(a,function(){ArcheAge.cachedScript.apply(null,c)}):ArcheAge.getScript(a,b)};ArcheAge.getScript=function(a,b){var c={dataType:"script",cache:!0,corssDomain:!0,url:a,type:"get"};b?d.ajax(c).done(b):d.ajax(c)};ArcheAge.alert=function(a,b){if(ArcheAge.isMobileView)return alert(a),!1;var c=ArcheAge.Utils.escapeHtml(a),c=c.split("\n").join("<br/>");ArcheAge.alertHtml(c,b)};ArcheAge.alertHtml=function(a,b){var c=
d("<div class='layer_comm'><div class='txt'>"+a+"</div><div class='wrap_btn'><button type='button' class='btn big' id='okBtn'>확인</button></div>");d("body").append(c);d("#okBtn",c).bind("click",function(){c.aaModalDialog("destroy");c.remove();b&&b();return!1});c.aaModalDialog({zIndex:5E4});c.aaModalDialog("open");d("#okBtn",c).focus();d(".layer_comm").bind("keydown",function(a){27==a.keyCode&&d("#okBtn",c).click()})};ArcheAge.confirm=function(a,b,c,e,f,h){a=ArcheAge.Utils.escapeHtml(a);a=a.split("\n").join("<br/>");
if("undefined"===typeof e||null===e)e="확인";if("undefined"===typeof f||null===f)f="취소";var g=d("<div class='layer_comm'><div class='txt'>"+a+"</div><div class='wrap_btn'><button type='button' class='btn big' id='okBtn' style='margin-right:5px;'>"+e+"</button><button type='button' class='btn big' id='cancelBtn'>"+f+"</button></div>");d("#okBtn",g).bind("click",function(){g.aaModalDialog("destroy");g.remove();"function"===typeof b&&("undefined"===typeof h||null===h?b():b(h));return!1});d("#cancelBtn",
g).bind("click",function(){g.aaModalDialog("destroy");g.remove();try{"function"===typeof c&&c()}catch(a){}return!1});d("body").append(g);g.aaModalDialog({zIndex:5E4});g.aaModalDialog("open");d("#okBtn",g).focus();d(".layer_comm").bind("keydown",function(a){27==a.keyCode&&d("#cancelBtn",g).click()})};ArcheAge.ajaxLoadAlert=function(a,b){"undefined"===typeof a&&(a=null);var c="";null!==a&&(c="<p class='aa_contents aa_dialog_message'>"+a+"</p>");var b=d.extend({zIndex:5E3},b),e=d("<div class='aa_dialog hidden'>"+
c+"    <p class='aa_contents aa_dialog_ajax_load_image'><img  style='margin-left: auto; margin-right: auto' src='"+ArcheAge.Url.img("/images/common/ajax-loader.gif")+"'/></p></div>");d("body").append(e);e.aaModalDialog(b);e.aaModalDialog("open");return function(){e.aaModalDialog("destroy");e.remove()}};ArcheAge.imagePreview=function(){var a=d("span.imagePreview.needBinding");a.hover(function(a){this.t=this.title;this.title="";var c=""!==this.t?"<br/>"+this.t:"",e=d(this).data("preview");d("body").append("<p id='imagePreview'><img src='"+
e+"' alt='Image preview' />"+c+"</p>");d("#imagePreview").css("top",a.pageY-50+"px").css("left",a.pageX+30+"px").fadeIn("fast")},function(){this.title=this.t;d("#imagePreview").remove()});a.mousemove(function(a){d("#imagePreview").css("top",a.pageY-50+"px").css("left",a.pageX+30+"px")});a.removeClass("needBinding")};d.fn.justOwnText=function(){return d(this).clone().children().remove().end().text()};d.fn.tooltip=function(a){var a=d.extend({xOffset:10,yOffset:20,message:null},d.fn.tooltip.defaults,
a),b=a.xOffset,c=a.yOffset,e=a.message,a=d(this);a.hover(function(a){null===e&&(this.t=this.title,this.title="",e=this.t);d("body").append("<p id='tooltip'>"+e+"</p>");d("#tooltip").css("top",a.pageY-b+"px").css("left",a.pageX+c+"px").fadeIn("fast")},function(){"undefined"!==typeof this.t&&(this.title=this.t);d("#tooltip").remove()});a.mousemove(function(a){d("#tooltip").css("top",a.pageY-b+"px").css("left",a.pageX+c+"px")})};d.fn.aaModalDialog=function(a){function b(){d.fn.aaModalDialog.resizeModalDialog(f,
e,c)}if("string"===typeof a)d.fn.aaModalDialog.command(this,a);else{var c=d.extend({zIndex:1,windowWidth:null,windowHeight:null,position:"fixed"},d.fn.aaModalDialog.defaults,a),e=this;e.css("position",c.position);e.css("z-index",c.zIndex+1);e.data("options",c);var f=d("<div class='aa_modal_container hidden'></div>");f.css("z-index",c.zIndex);e.data("modalContainer",f);d("body").append(f);d.fn.aaModalDialog.resizeModalDialog(f,e,c);e.data("windowResizeEventListener",b);d(window).resize(b)}};d.fn.aaModalDialog.defaults=
{zIndex:1,windowWidth:null,windowHeight:null,top:null};d.fn.aaModalDialog.resizeModalDialog=function(a,b,c){var e=d(window).width(),f=d(window).height(),h=null!==c.windowWidth&&null!==c.windowHeight;h&&(e=c.windowWidth,f=c.windowHeight);a.width(d(window).width());a.height(d(window).height());null==c.top?(a=(f-b.height())/2,0>a&&(a=0)):a=c.top;e=(e-b.outerWidth())/2;0>e&&(e=0);!h&&ArcheAge.Utils.isArcheAgeBrowser()&&(a=10,e=20);b.css("top",a+"px");b.css("left",e+"px")};d.fn.aaModalDialog.command=function(a,
b){var c=a.data("modalContainer");switch(b){case "close":a.addClass("hidden");c.addClass("hidden");break;case "open":var d=a.data("windowResizeEventListener");a.removeClass("hidden");c.removeClass("hidden");d();break;case "destroy":a.data("modalContainer",null),c.remove()}};ArcheAge.namespace("Utils");ArcheAge.Utils.unbindClickBtn=function(a){a.unbind("click")};ArcheAge.Utils.isRestrictedAccount=function(){return ArcheAge.LoginUser.isRestrictedAccount?(ArcheAge.alert(AL10N.Notice.restrictedAccount()),
!0):!1};ArcheAge.Utils.isArcheAgeBrowser=function(){return 0<navigator.userAgent.indexOf("ArcheAge")};ArcheAge.Utils.isIE7=function(){return d.browser.msie&&7>=d.browser.version};ArcheAge.Utils.stripTags=function(a){return!a?a:a.replace(/(<([^>]+)>)/ig,"")};ArcheAge.Utils.getText=function(a){if(!d.browser.msie)return a.text();a=a.html();a=a.replace(/<BR\s*\/?>/mgi,"\n");return a=ArcheAge.Utils.stripTags(a)};ArcheAge.Utils.removeCr=function(a){return d.trim(a)};ArcheAge.Utils.getHttpUrl=function(a){return!a||
0!==a.indexOf("//")?a:"http:"+a};ArcheAge.Utils.bindTextLengthWarning=function(a,b,c){c||(c=ArcheAge.Utils.bindTextLengthWarning.defaultGetLengthCallback);a.bind("keyup",function(){d(this).val();var e=c(a);if(!e&&0!==e)throw Error("getLengthCallback returns nothing.");e>b?d(this).addClass("warning"):d(this).removeClass("warning")})};ArcheAge.Utils.bindTextLengthWarning.defaultGetLengthCallback=function(a){return a.val().length};ArcheAge.Utils.bindTextLengthError=function(a,b,c,d){d||(d=ArcheAge.Utils.bindTextLengthWarning.defaultGetLengthCallback);
a.bind("keyup",function(){var f=d(a);if(!f&&0!==f)throw Error("getLengthCallback returns nothing.");f>b?c(!0):c(!1)})};ArcheAge.Utils.isNumber=function(a){return/^-?((\d+\.?\d?)|(\.\d+))$/.test(a)};ArcheAge.Utils.escapeHtml=function(a){if(null===a||0===a.length)return"";a=a.replace(/&/g,"&amp;");a=a.replace(/</g,"&lt;");a=a.replace(/>/g,"&gt;");a=a.replace(/"/g,"&quot;");return a=a.replace(/'/g,"&#39;")};ArcheAge.Utils.isImageFile=function(a){if(!a||"undefined"===typeof a)return!1;"string"!==(typeof a).toLowerCase()&&
(a=a.name);a=a.toLowerCase();return a.match(/.*\.(jpe?g|png|gif)$/i)};ArcheAge.Utils.getAjaxFormDataValue=function(a,b){var c;for(c=0;c<a.length;c+=1)if(b===a[c].name){c=a[c].value;if("string"===typeof c)return c;if(c instanceof File)return c.name;throw"Unknown field type : "+b;}return null};ArcheAge.Utils.getOS=function(){var a=navigator.userAgent;return-1<a.indexOf("NT 6.1")?"Windows 7":-1<a.indexOf("NT 6.0")?"Windows Vista/Server 2008":-1<a.indexOf("NT 5.2")?"Windows Server 2003":-1<a.indexOf("NT 5.1")?
"Windows XP":-1<a.indexOf("NT 5.0")?"Windows 2000":-1<a.indexOf("NT")?"Windows NT":-1<a.indexOf("9x 4.90")?"Windows Me":-1<a.indexOf("98")?"Windows 98":-1<a.indexOf("95")?"Windows 95":-1<a.indexOf("Win16")?"Windows 3.x":-1<a.indexOf("Windows")?"Windows":-1<a.indexOf("Linux")?"Linux":-1<a.indexOf("Macintosh")?"Macintosh":""};ArcheAge.Utils.random=function(a){for(var b=(""+a).length,c=1,d=0;d<=b;d++)c*=10;return Math.floor(Math.random()*c)%a};"undefined"===typeof window.console&&(window.console={},
console.log=function(){});ArcheAge.Localization={message:function(a){return function(){var b=[a],b=b.concat(Array.prototype.slice.apply(arguments));return ArcheAge.Localization.format.apply(null,b)}},format:function(a){var b,c;if(1>=arguments.length)return a;b=arguments.length-2;for(c=0;c<=b;c+=1)a=a.replace(RegExp("\\{"+c+"\\}","gi"),arguments[c+1]);return a}};window.AL10N={};ArcheAge.Url={character:function(a){return"/characters/"+a},diary:function(a){return ArcheAge.Url.character(a)},Attachment:{url:function(a){return ArcheAge.attachmentServerUrl+
a},original:function(a){var b=a;"object"===typeof a&&(b=a.originalUri);return ArcheAge.Url.Attachment.url(b)},small:function(a){var b=a;"object"===typeof a&&(b=a.smallUri);return ArcheAge.Url.Attachment.url(b)},thumbnail:function(a){var b=a;"object"===typeof a&&(b=a.thumbnailUri);return ArcheAge.Url.Attachment.url(b)}},getStaticServerId:function(a){if(null===a||0===d.trim(a).length)throw Error("filepath value ["+a+"] is empty");var b=ArcheAge.staticServerUrls.length,a=a.replace(/\.[^\..]*$/,"");return a.charCodeAt(a.length-
1)%b},staticUrl:function(a,b,c){if(!a)throw Error("ArcheAge.Url.staticUrl uri을 지정하지 않았음.");if("undefined"===typeof b||null===b)b=!0;if("undefined"===typeof c||null===c||0>c||c>=ArcheAge.staticServerUrls.length)c=ArcheAge.Url.getStaticServerId(a);c=ArcheAge.staticServerUrls[c];b&&(c+=ArcheAge.resourcePrefix);return c+a},img:function(a,b){return ArcheAge.Url.staticUrl(a,b)},swf:function(a){return ArcheAge.Url.staticUrl(a,!0,ArcheAge.staticServerUrls.length-1)},mapImg:function(a){return ArcheAge.Url.img(a,
!1)},jslib:function(a){return ArcheAge.Url.staticUrl(a,!1)},style:function(a,b){return ArcheAge.Url.staticUrl(a,b)},resource:function(a){return ArcheAge.resourcePrefix+a}};ArcheAge.namespace("Web");ArcheAge.Web.isLogined=function(){return!ArcheAge.LoginUser.isGuest};ArcheAge.Web.hasCharacters=function(){return!(null===ArcheAge.LoginUser.representativeUserCharacter||void 0===ArcheAge.LoginUser.representativeUserCharacter||void 0===ArcheAge.LoginUser.representativeUserCharacter.uuid)};ArcheAge.Web.CharacterTooltip=
{containerClass_:"character_layer",charHome_:function(a){return ArcheAge.domains.play+"/characters/"+a+"/informations"},compare_:function(a,b){window.open(ArcheAge.domains.play+"/characters/"+b+"/compare?uuid="+a,"_blank","width=541,height=681,scrollbars=yes,location=no,status=no,menubar=no,resizable=no")},show:function(a,b){var c=this;c.option=b||{};ArcheAge.Web.CharacterTooltip.hide();var e=a.attr("data-uuid");if(void 0!==e){var f=a.data("checked");void 0!=f?c._showInternal(a,f):d.ajax({url:ArcheAge.domains.play+
"/characters/"+e+"/profile",type:"get",dataType:"jsonp",crossDomain:!0,success:function(b){ArcheAge.Utils.isIE7();c._showInternal(a,b)}})}},_showInternal:function(a,b){var c=this,e=!1;void 0!=b.result&&"failure"==b.result&&(e=!0);var f=a.attr("data-uuid"),h=d("<div></div>").addClass(c.containerClass_),g="<ul>";void 0!=b.networks&&(g+='<li><a href="'+b.networks+'">홈 바로가기</a></li>');g+='<li><a href="'+ArcheAge.domains.play+"/characters/"+f+'">캐릭터 정보보기</a></li>';ArcheAge.Web.hasCharacters()&&(g+='<li><a href="#" onclick="ArcheAge.Web.CharacterTooltip.compare_(\''+
f+"','"+ArcheAge.LoginUser.representativeUserCharacter.uuid+"');return false;\">캐릭터 비교하기</a></li",ArcheAge.LoginUser.isRestrictedAccount||(g=e?g+('<li><a href="#" onclick="ArcheAge.alert(\''+b.message+"');return false;\">메시지 보내기</a></li>"):g+('<li><a href="#" onclick="return ArcheAge.CommonUI.Message.showfrom(\''+f+"')\">메시지 보내기</a></li>")),d.isFunction(c.subMenu)&&(g+=c.subMenu(f)));d.isFunction(c.option,a)&&(g+=c.option(f,a));h.append(g+"</ul>");a.parent().hasClass("leader")?a.parents("span.leader").append(h):
a.parents("span.character_card").append(h);ArcheAge.Utils.isIE7()&&a.parents().each(function(){var a=d(this).css("position");("relative"==a||"absolute"==a)&&d(this).addClass("oldie-zIndex")});h.on("click",function(){c.hide()});h.on("clickoutside",function(){c.hide()});h.mouseleave(function(){})},hide:function(){d("."+this.containerClass_).unbind("clickoutside").remove();ArcheAge.Utils.isIE7()&&d(".oldie-zIndex").removeClass("oldie-zIndex")}};var k=function(a,b){var c=b.find("strong").html(),d=b.parent().find(".character_server").html();
return'<li class="hr"><a href="'+(ArcheAge.services.community.path+"/?searchType=CHARACTER_UUID&keyword="+a+"&uuidCharacterName="+c+d)+'">게시글 모아보기</a></li>'};ArcheAge.Web.bindCharacterLink=function(a,b){a||(a=d("body"));a.find(".character-link.needBinding").each(function(){var a=d(this);a.removeClass("needBinding");a.hover(function(){a.css("text-decoration","underline")},function(){d(this).css("text-decoration","")}).focus(function(){d(this).blur()}).on("click",function(d){d.preventDefault();if(b===
ArcheAge.services.community||b===ArcheAge.services.community.type)b=k;try{ArcheAge.Web.CharacterTooltip.show(a,b)}catch(f){console.log(f)}})})};var j=ArcheAge,i;try{i=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")?!0:!1}catch(l){i=!(!navigator.mimeTypes||!navigator.mimeTypes["application/x-shockwave-flash"]||!navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)}j.isFlashEnabled=i;d.aa={replaceAll:function(a,b,c){return a.split(b).join(c)},isEmpty:function(a){return null==a||("undefined"==
a||"undefined"==typeof a)||"string"==typeof a&&(a=this.replaceAll(a,/\s+/g,""),""==a)?!0:!1},isEmptyText:function(a,b){return this.isEmpty(a.val())?(alert(b),a.focus(),!0):!1},isRegnum:function(a){for(var a=a.replace(/[^0-9]+/g,""),b=1,c=0,d=0;12>d;d++)8<b&&(b=1),b++,c+=parseInt(a.charAt(d),10)*b;b=11-c%11;10==b&&(b=0);11==b&&(b=1);return b==parseInt(a.charAt(12),10)?!0:!1},isCount:function(a,b,c){c=new String(c);c=c.length;return c<b&&"min_length"==a||c>b&&"max_length"==a?!1:!0},getAnchor:function(a){return(a=
a.match(RegExp(/#(.*)$/)))&&a[1]?a[1]:""},noArticle:function(a){alert(a+"이 없습니다.");return!1}};d.fn.makeOutLink=function(){d(this).each(function(){d(this).attr("target","_blank")})};d.fn.embedVideos=function(a){if(ArcheAge.isFlashEnabled){var a=!!a,b,c=[{name:"youtube",urlfetcher:"a[href^='http://www.youtube.com/watch?']",codeRegex:/[\?|&]v=([a-zA-Z0-9\-_]+)\b/,generateTags:function(a){a=ArcheAge.Utils.escapeHtml(a);return'<div style="margin: 10px 0"><iframe title="YouTube video player" width="600" height="365" src="http://www.youtube.com/embed/'+
a+'?wmode=transparent" frameborder="0" allowfullscreen></iframe></div>'}},{name:"youtu.be",urlfetcher:"a[href^='http://youtu.be/']",codeRegex:/youtu\.be\/([a-zA-Z0-9\-_]+)\b/,generateTags:function(a){a=ArcheAge.Utils.escapeHtml(a);return'<div style="margin: 10px 0"><iframe title="YouTube video player" width="600" height="365" src="http://www.youtube.com/embed/'+a+'?wmode=transparent" frameborder="0" allowfullscreen></iframe></div>'}},{name:"youtube_https",urlfetcher:"a[href^='https://www.youtube.com/watch?']",
codeRegex:/[\?|&]v=([a-zA-Z0-9\-_]+)\b/,generateTags:function(a){a=ArcheAge.Utils.escapeHtml(a);return'<div style="margin: 10px 0"><iframe title="YouTube video player" width="600" height="365" src="http://www.youtube.com/embed/'+a+'?wmode=transparent" frameborder="0" allowfullscreen></iframe></div>'}},{name:"youtu.be_https",urlfetcher:"a[href^='https://youtu.be/']",codeRegex:/youtu\.be\/([a-zA-Z0-9\-_]+)\b/,generateTags:function(a){a=ArcheAge.Utils.escapeHtml(a);return'<div style="margin: 10px 0"><iframe title="YouTube video player" width="600" height="365" src="http://www.youtube.com/embed/'+
a+'?wmode=transparent" frameborder="0" allowfullscreen></iframe></div>'}},{name:"daum tvpot",urlfetcher:"a[href^='http://tvpot.daum.net/clip/ClipViewByVid.do?vid']",codeRegex:/\?vid=([\$a-zA-Z0-9\-_]+)/,generateTags:function(a){a=ArcheAge.Utils.escapeHtml(a);return"<iframe  width='600px' height='365px' src='http://videofarm.daum.net/controller/video/viewer/Video.html?vid="+a+"&amp;play_loc=undefined' frameborder='0' scrolling='no' ></iframe>"}},{name:"daum tvpot iframe",urlfetcher:"a[href^='http://tvpot.daum.net/v/']",
codeRegex:/\/v\/([\$a-zA-Z0-9\-_]+)/,generateTags:function(a){a=ArcheAge.Utils.escapeHtml(a);return"<iframe  width='600px' height='365px' src='http://videofarm.daum.net/controller/video/viewer/Video.html?vid="+a+"&amp;play_loc=undefined' frameborder='0' scrolling='no' ></iframe>"}},{name:"Vimeo",urlfetcher:"a[href^='http://vimeo.com/']",codeRegex:/vimeo.com\/([0-9]+)\b/,generateTags:function(a){a=ArcheAge.Utils.escapeHtml(a);return'<div style="margin: 10px 0"><iframe src="http://player.vimeo.com/video/'+
a+'?portrait=0" width="600" height="365" frameborder="0"></iframe></div>'}},{name:"Naver",urlfetcher:"a[href^='http://serviceapi.nmv.naver.com/flash/NFPlayer.swf']",codeRegex:/(.*)/,generateTags:function(a){a=ArcheAge.Utils.escapeHtml(a);return"<div style='margin: 10px 0'><object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0'  id='NFPlayer40502' width='600' height='365'><param name='movie' value='"+
a+"' /><param name='wmode' value='transparent' /><param name='allowScriptAccess' value='never' /><param name='allowFullScreen' value='true' /><embed src='"+a+"' wmode='transparent' width='600' height='365' allowScriptAccess='never' name='NFPlayer40502' id='NFPlayer40502' allowFullScreen='true' type='application/x-shockwave-flash' /></object></div>"}},{name:"Afreeca",urlfetcher:"a[href^='http://afbbs.afreeca.com:8080/player.swf']",codeRegex:/(.*)/,generateTags:function(a){a=ArcheAge.Utils.escapeHtml(a);
return"<div style='margin: 10px 0'><br/><object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0'  id='AfreecaPlayer' width='600' height='365'><param name='movie' value='"+a+"' /><param name='wmode' value='transparent' /><param name='allowScriptAccess' value='never' /><param name='allowFullScreen' value='true' /><embed src='"+a+"' wmode='transparent' width='600' height='365' allowScriptAccess='never' name='AfreecaPlayer' id='AfreecaPlayer' allowFullScreen='true' type='application/x-shockwave-flash' /></object></div>"}},
{name:"Naver IFrame",urlfetcher:"a[href^='http://serviceapi.nmv.naver.com/flash/convertIframeTag.nhn']",codeRegex:/(.*)/,generateTags:function(a){a=ArcheAge.Utils.escapeHtml(this._getFlashPlayerCode(a));return"<div style='margin: 10px 0'><object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0'  id='NFPlayer40502' width='600' height='365'><param name='movie' value='"+a+"' /><param name='wmode' value='transparent' /><param name='allowScriptAccess' value='never' /><param name='allowFullScreen' value='true' /><embed src='"+
a+"' wmode='transparent' width='600' height='365' allowScriptAccess='never' name='NFPlayer40502' id='NFPlayer40502' allowFullScreen='true' type='application/x-shockwave-flash' /></object></div>"},_getFlashPlayerCode:function(a){a=a.replace("http://serviceapi.nmv.naver.com/flash/convertIframeTag.nhn","");a=a.replace(/&?width=[0-9]*/,"");a=a.replace(/&?height=[0-9]*/,"");return"http://serviceapi.nmv.naver.com/flash/NFPlayer.swf"+a}},{name:"PandoraTV",urlfetcher:"a[href^='http://channel.pandora.tv/channel/video.ptv']",
codeRegex:/\?(.*)/,generateTags:function(a){var b=ArcheAge.Utils.escapeHtml(this._getChUserId(a)),a=ArcheAge.Utils.escapeHtml(this._getPrgId(a));return["<div style='margin: 10px 0'>\n<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0'\nwidth='600' height='365' id='movie' align='middle'>\n    <param name='quality' value='high' />","    <param name='movie' value='http://flvr.pandora.tv/flv2pan/flvmovie.dll/userid="+
b+"&prgid="+a+"&countryChk=ko&skin=1' />","    <param name='allowScriptAccess' value='always' />\n    <param name='allowFullScreen' value='true' />\n    <param name='wmode' value='transparent' />","    <embed src='http://flvr.pandora.tv/flv2pan/flvmovie.dll/userid="+b+"&prgid="+a+"&countryChk=ko&skin=1'","        type='application/x-shockwave-flash'\n        wmode='transparent'\n        allowScriptAccess='never'\n        allowFullScreen='true'\n        pluginspage='http://www.macromedia.com/go/getflashplayer'\n        width='600'\n        height='365' />\n    </embed>\n</object></div>"].join("\n")},
_getChUserId:function(a){a=a.match(/ch_userid=([a-zA-Z0-9_\-]+)\&/);return null===a?null:a[1]},_getPrgId:function(a){a=a.match(/prgid=([0-9]+)/);return null===a?null:a[1]}}],e=d(this);for(b=0;b<c.length;b+=1){var f=c[b];d(f.urlfetcher,e).each(function(){var b=d(this),c;c=b.attr("href").match(f.codeRegex);c=null===c?null:c[1];var e=b.next("br"),j=f.generateTags(c,a),i=d(j);a&&(i.hide(),j=d(" <button class='video_toggle'>동영상 보기<i class='ico_comm open_view'></i></button>"),d("i",j),j.insertAfter(b),
j.on("click",function(){i.toggle();var a=d(this);a.html("");i.is(":visible")?(a.text("동영상 닫기"),a.append("<i class='ico_comm close_view'></i>")):(a.text("동영상 보기"),a.append("<i class='ico_comm open_view'></i>"));return!1}));1===e.get().length?i.insertBefore(e):i.appendTo(b.parent());f.afterInsertCallback&&f.afterInsertCallback(c,a)})}}};d.fn.embedVideos.soundcloundId=0;d.fn.inputSelector=function(){this.mouseup(function(){var a=d(this),b=!1,c=d(this).get(0);if(document.selection)c.focus(),0<document.selection.createRange().text.length&&
(b=!0);else if(c.selectionStart||"0"===c.selectionStart)c=c.selectionEnd-c.selectionStart,0<c&&(b=!0);a.hasClass("text-selected")?a.removeClass("text-selected"):(a.addClass("text-selected"),b||a.select())})};d.fn.openWindow=function(){this.click(function(){var a=d(this),b=a.attr("href"),c=a.attr("title"),a=a.data("features");window.open(b,c,a);return!1})};d.fn.imgPreload=function(){this.each(function(){d("<img/>")[0].src=ArcheAge.Url.img(this)})}})(jQuery);
(function(){var d=!1,k=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;window.Class=function(){};Class.extend=function(j){function i(){!d&&this.init&&this.init.apply(this,arguments)}var l=this.prototype;d=!0;var a=new this;d=!1;for(var b in j)a[b]="function"===typeof j[b]&&"function"===typeof l[b]&&k.test(j[b])?function(a,b){return function(){var d=this._super;this._super=l[a];var h=b.apply(this,arguments);this._super=d;return h}}(b,j[b]):j[b];i.prototype=a;i.prototype.constructor=i;i.extend=window.Class.extend;
return i};ArcheAge.Modal=Class.extend({init:function(d){this.$modalObj=d;this.$modalObj.aaModalDialog({zIndex:5E4});this.settingKeyDownEvent()},close:function(){this.$modalObj.hide();this.$modalObj.aaModalDialog("close")},open:function(){$("body").append(this.$modalObj);this.$modalObj.show();this.$modalObj.aaModalDialog("open");this.$modalObj.find("button").eq(0).focus();this.$modalObj.find("textarea").eq(0).focus();this.$modalObj.find("input").eq(0).focus()},settingKeyDownEvent:function(){var d=
this;d.$modalObj.on("keydown",function(i){27==i.keyCode&&d.close()})}})})();