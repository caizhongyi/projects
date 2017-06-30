(function($){
     $.fn.kxbdMarquee = function(options){
         var opts = $.extend({},$.fn.kxbdMarquee.defaults, options);
         return this.each(function(){
             var $marquee = $(this);//����Ԫ������
             var _scrollObj = $marquee.get(0);//����Ԫ������DOM
             var scrollW = $marquee.width();//����Ԫ�������Ŀ��
             var scrollH = $marquee.height();//����Ԫ�������ĸ߶�
             var $element = $marquee.children(); //����Ԫ��
             var $kids = $element.children();//������Ԫ��
             var scrollSize=0;//����Ԫ�سߴ�
             var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1:0;//�������ͣ�1���ң�0����
             //��ֹ������Ԫ�رȹ���Ԫ�ؿ��ȡ����ʵ�ʹ�����Ԫ�ؿ��
             $element.css(_type?'width':'height',10000);
             //��ȡ����Ԫ�صĳߴ�
             if (opts.isEqual) {
                 scrollSize = $kids[_type?'outerWidth':'outerHeight']() * $kids.length;
             }else{
                 $kids.each(function(){
                     scrollSize += $(this)[_type?'outerWidth':'outerHeight']();
                 });
             }
             //����Ԫ���ܳߴ�С�������ߴ磬������
             if (scrollSize<(_type?scrollW:scrollH)) return; 
             //��¡������Ԫ�ؽ�����뵽����Ԫ�غ󣬲��趨����Ԫ�ؿ��
             $element.append($kids.clone()).css(_type?'width':'height',scrollSize*2);
             var numMoved = 0;
             function scrollFunc(){
                 var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft':'scrollTop';
                 if (opts.loop > 0) {
                     numMoved+=opts.scrollAmount;
                     if(numMoved>scrollSize*opts.loop){
                         _scrollObj[_dir] = 0;
                         return clearInterval(moveId);
                     } 
                 }
                 if(opts.direction == 'left' || opts.direction == 'up'){
                     _scrollObj[_dir] +=opts.scrollAmount;
                     if(_scrollObj[_dir]>=scrollSize){
                         _scrollObj[_dir] = 0;
                     }
                 }else{
                     _scrollObj[_dir] -=opts.scrollAmount;
                     if(_scrollObj[_dir]<=0){
                         _scrollObj[_dir] = scrollSize;
                     }
                 }
             }
             //������ʼ
             var moveId = setInterval(scrollFunc, opts.scrollDelay);
             //��껮��ֹͣ����
             $marquee.hover(
                 function(){
                     clearInterval(moveId);
                 },
                 function(){
                     clearInterval(moveId);
                     moveId = setInterval(scrollFunc, opts.scrollDelay);
                 }
             );
         });
     };
     $.fn.kxbdMarquee.defaults = {
         isEqual:true,//���й�����Ԫ�س����Ƿ����,true,false
         loop: 0,//ѭ������������0ʱ����
         direction: 'left',//��������'left','right','up','down'
         scrollAmount:1,//����
         scrollDelay:20//ʱ��
     };
     $.fn.kxbdMarquee.setDefaults = function(settings) {
         $.extend( $.fn.kxbdMarquee.defaults, settings );
     };
})(jQuery);