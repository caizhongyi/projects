/* 彦磊基于jQuery浮动对联广告插件(2009.04)
 * 在IE6/IE7/Mozilla 5.0（Firefox 3.0.5）中测试通过
 * 
 * 
 * 此插件要求运行在jQuery v1.3 或更高版本上
 * 此插件功能
 * 1、单独设置左、右浮动对联各自内容;
 * 2、设置左右浮动对联内容一样;
 * 3、仅单独使用左或右侧对联;
 * 4、可以在屏幕分辨率宽度小于多少时不出现对联广告;
 * 5、设置是否允许关闭对联，每侧对联单独关闭。
 * 6、使用jQuery使网页内容和行为分离。
 * 7、可以设置左或右侧对联距容器顶部及左侧或右侧的距离。
 * 8、灵活设置左或右侧对联的高或宽,当您的内容大小超过您的设置值时，将自动隐藏超出部分。
 * 9、只要您愿意，您可以设置无数多个浮动内容。
 * 10、更多功能请您在我的博客中留言，以便我后续更新……
 * 
 * 
 * 技术支持：HTTP://HI.BAIDU.COM/DPXDQX
 * 此为自由拷贝版本，您可以在此基础上添加任何功能
 * 彦磊建议您将修改过的版本或发布地址发到彦磊博客上以共享，也建议您保留部分彦磊的信息
 * 
 * 
 * 
 * 使用前您一定要引入jQurey及本脚本,如
 *  <script type="text/javascript" src="js/jquery_last.js"></script>
 *  <script type="text/javascript" src="js/YlFloat.js">
 * 使用方法：
 * 
 * 1、在页面中为您要浮动的内容设置容器，如<div id="adl">左侧内容</div>或<div id="adr">右侧内容</div>或<div id="ad">您的内容</div>
 * 2、在页面中添加jQuery语句，调用此插件，并对相关参数进行设置,如：
 * <script type="text/javascript">
 * $(document).ready(function(){
 *  $("#adl").jFloat({
 *     position:"left",
 *     top:0,
 *     height:200,
 *     width:100,
 *     left:20
 *   });//将页面中id为adl的容器中的内容设置为左浮动广告，广告距窗口顶部0px,距左侧20px。
 *  $("#adr").jFloat({
 *     position:"right",
 *     top:0,
 *     height:200,
 *     width:100,
 *     right:20
 *  });//将页面中id为adr的容器中的内容设置为右浮动广告，广告距窗口顶部0px，距右侧20px。
 *  $("#ad").jFloat({
 *     position:"left",
 *     top:260,
 *     width:100,
 *     height:50,
 *     allowClose:false
 *  });//将面面中id为ad的容器中的内容设置为左右浮动（即左右两侧内容样式等一样），广告中容器顶部260px，距左侧0,不允许关闭。
 *});
 * </script>
 * 上面的例子最终结果，将出现四个浮动内容，上面两个分别是adl和adr中的内容,下面两个是ad中的内容。如果您愿意，您可以加无数个这样的广告。
 * 3、插件相关参数：
 *     top－广告距页面顶部距离，默认为60
 *     left－广告距页面左侧距离，默认为0
 *     right－广告距页面右侧距离，默认为0
 *     width－广告容器的宽度，默认为100
 *     height－广告容器的高度，默认为360
*minScreenW－出现广告的最小屏幕宽度，当屏幕分辨率小于此，将不出现对联广告，默认为800，即在800×600分辨率下不会显示广告内容
 *     position－对联广告的位置,left-在左侧出现,right-在右侧出现，默认为"left"。注意要加英文单或双引号。
 *     allowClose－是否允许关闭，如果为true，则会在广告内容上方添加“关闭”，单击时将关闭所在广告内容。值为true或false 
 */



(function($) { 
    $.fn.jFloat = function(o) {
    
        o = $.extend({
            top:60,  //广告距页面顶部距离
            left:0,//广告左侧距离
            right:0,//广告右侧距离
            width:100,  //广告容器的宽度
            height:360, //广告容器的高度
            minScreenW:1024,//出现广告的最小屏幕宽度，当屏幕分辨率小于此，将不出现对联广告
            position:"left", //对联广告的位置left-在左侧出现,right-在右侧出现
            allowClose:true //是否允许关闭 
        }, o || {});
		var h=o.height;
      var showAd=true;
      var fDiv=$(this);
      if(o.minScreenW>=$(window).width()){
          fDiv.hide();
          showAd=false;
       }
       else{
		   fDiv.css("display","block")
           var closeHtml='<div align="right" style="position:absolute;top:0px;right:0px;margin:2px;padding:1px;cursor:pointer;border:1px solid #000;line-height:100%;" class="closeFloat">×</div>';
           switch(o.position){
               case "left":
                    if(o.allowClose){
                       fDiv.prepend(closeHtml);
					   $(".closeFloat",fDiv).click(function(){$(this).hide();fDiv.hide();showAd=false;})
					   h+=20;
					}
                    fDiv.css({position:"absolute",left:o.left+"px",top:o.top+"px",overflow:"hidden"});
                    break;
               case "right":
                    if(o.allowClose){
                       fDiv.prepend(closeHtml)
					   $(".closeFloat",fDiv).click(function(){$(this).hide();fDiv.hide();showAd=false;})
					   h+=20;
					}
                    fDiv.css({position:"absolute",left:"auto",right:o.right+"px",top:o.top+"px",overflow:"hidden"});
                    break;
            };
        };
        function ylFloat(){
            if(!showAd){return}
            var windowTop=$(window).scrollTop();
            if(fDiv.css("display")!="none")
                fDiv.css("top",o.top+windowTop+"px");
        };

      $(window).scroll(ylFloat);
      $(document).ready(ylFloat);     
       
    }; 
})(jQuery);






