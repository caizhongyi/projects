/* ���ڻ���jQuery�������������(2009.04)
 * ��IE6/IE7/Mozilla 5.0��Firefox 3.0.5���в���ͨ��
 * 
 * 
 * �˲��Ҫ��������jQuery v1.3 ����߰汾��
 * �˲������
 * 1�������������Ҹ���������������;
 * 2���������Ҹ�����������һ��;
 * 3��������ʹ������Ҳ����;
 * 4����������Ļ�ֱ��ʿ��С�ڶ���ʱ�����ֶ������;
 * 5�������Ƿ�����رն�����ÿ����������رա�
 * 6��ʹ��jQueryʹ��ҳ���ݺ���Ϊ���롣
 * 7��������������Ҳ���������������������Ҳ�ľ��롣
 * 8�������������Ҳ�����ĸ߻��,���������ݴ�С������������ֵʱ�����Զ����س������֡�
 * 9��ֻҪ��Ը�⣬������������������������ݡ�
 * 10�����๦���������ҵĲ��������ԣ��Ա��Һ������¡���
 * 
 * 
 * ����֧�֣�HTTP://HI.BAIDU.COM/DPXDQX
 * ��Ϊ���ɿ����汾���������ڴ˻���������κι���
 * ���ڽ��������޸Ĺ��İ汾�򷢲���ַ�������ڲ������Թ���Ҳ�����������������ڵ���Ϣ
 * 
 * 
 * 
 * ʹ��ǰ��һ��Ҫ����jQurey�����ű�,��
 *  <script type="text/javascript" src="js/jquery_last.js"></script>
 *  <script type="text/javascript" src="js/YlFloat.js">
 * ʹ�÷�����
 * 
 * 1����ҳ����Ϊ��Ҫ����������������������<div id="adl">�������</div>��<div id="adr">�Ҳ�����</div>��<div id="ad">��������</div>
 * 2����ҳ�������jQuery��䣬���ô˲����������ز�����������,�磺
 * <script type="text/javascript">
 * $(document).ready(function(){
 *  $("#adl").jFloat({
 *     position:"left",
 *     top:0,
 *     height:200,
 *     width:100,
 *     left:20
 *   });//��ҳ����idΪadl�������е���������Ϊ�󸡶���棬���ര�ڶ���0px,�����20px��
 *  $("#adr").jFloat({
 *     position:"right",
 *     top:0,
 *     height:200,
 *     width:100,
 *     right:20
 *  });//��ҳ����idΪadr�������е���������Ϊ�Ҹ�����棬���ര�ڶ���0px�����Ҳ�20px��
 *  $("#ad").jFloat({
 *     position:"left",
 *     top:260,
 *     width:100,
 *     height:50,
 *     allowClose:false
 *  });//��������idΪad�������е���������Ϊ���Ҹ���������������������ʽ��һ�������������������260px�������0,������رա�
 *});
 * </script>
 * ������������ս�����������ĸ��������ݣ����������ֱ���adl��adr�е�����,����������ad�е����ݡ������Ը�⣬�����Լ������������Ĺ�档
 * 3�������ز�����
 *     top������ҳ�涥�����룬Ĭ��Ϊ60
 *     left������ҳ�������룬Ĭ��Ϊ0
 *     right������ҳ���Ҳ���룬Ĭ��Ϊ0
 *     width����������Ŀ�ȣ�Ĭ��Ϊ100
 *     height����������ĸ߶ȣ�Ĭ��Ϊ360
*minScreenW�����ֹ�����С��Ļ��ȣ�����Ļ�ֱ���С�ڴˣ��������ֶ�����棬Ĭ��Ϊ800������800��600�ֱ����²�����ʾ�������
 *     position����������λ��,left-��������,right-���Ҳ���֣�Ĭ��Ϊ"left"��ע��Ҫ��Ӣ�ĵ���˫���š�
 *     allowClose���Ƿ�����رգ����Ϊtrue������ڹ�������Ϸ���ӡ��رա�������ʱ���ر����ڹ�����ݡ�ֵΪtrue��false 
 */



(function($) { 
    $.fn.jFloat = function(o) {
    
        o = $.extend({
            top:60,  //����ҳ�涥������
            left:0,//���������
            right:0,//����Ҳ����
            width:100,  //��������Ŀ��
            height:360, //��������ĸ߶�
            minScreenW:1024,//���ֹ�����С��Ļ��ȣ�����Ļ�ֱ���С�ڴˣ��������ֶ������
            position:"left", //��������λ��left-��������,right-���Ҳ����
            allowClose:true //�Ƿ�����ر� 
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
           var closeHtml='<div align="right" style="position:absolute;top:0px;right:0px;margin:2px;padding:1px;cursor:pointer;border:1px solid #000;line-height:100%;" class="closeFloat">��</div>';
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






