// JavaScript Document
Road = {
	env: {
        siteName: "玩儿道",
        domain: window.location.hostname.split(".").reverse().slice(0, 2).reverse().join(".")
    }
};
Road.search={
	/** 
	* 回复框初始值  
	*   
	* @param {object||string} 事件柄 
	* @param {string} 展示的提示语
	*/
	focus:function($sele,$str){	
		$($sele).click(function(){
			if($(this).val()!=$str){return false;}
			$(this).val('');
		});
		$($sele).blur(function(){
			if($(this).val()!=''){return false;}
			$(this).val($str);
		});
	}
};
Road.activeItem=function(item,classiName){
		$(item).bind({
			'mousemove':function(){
				$(item).removeClass(classiName);
				$(this).addClass(classiName)}
		})
	
	
}
Road.account = {
	//用户编辑的步长
	edit_step:function($select){
		var $len = $($select).size();
		var $w =  $($select).parent().width();
		var $size = $w/($len+1)
		var $F_W = $w-$size;
		var $pad = Math.floor($F_W/$len);
		//alert($pad)
		$($select).css({'width':$pad});
		$($select).parent().css({
				'width':$F_W,
				'padding-left':Math.floor($size/2),
				'padding-right':Math.floor($size/2)
				});		
	}	
};
Road.repeat = {
	/** 
	* home 页面 回复框  
	*   
	* @param {string} 事件柄 
	* @param {string} 事件效果元素 
	* @param {string} 事件柄与事件效果元素的父级元素
	*/

	show:function(){
		var $ct=[];		
		for(var $i=0;$i<arguments.length;$i++){
			$ct[$i]=arguments[$i];
		};
		$($ct['0']).parent().toggle(function(){
			$parent = $(this).parents($ct['2']);
			$(this).addClass('active');
			$parent.find($ct['1']).slideDown('normal');
		},function(){
			$parent = $(this).parents($ct['2']);
			$(this).removeClass('active');
			$parent.find($ct['1']).slideUp('normal');
			
		}	
		);	
	}
};
//悬挂效果 悬挂导航
	/** 
	*  悬挂导航 
	* @param {string} 悬挂 元素 
	*/Road.Suspension={
	position:function(arg){
				$(window).bind({
				'scroll':function(){
					$(arg).css({ top: $(window).scrollTop()});
				}});
		}
};

jQuery.fn.imageRoller = function(options){
 var setting={
  count:5,width:200,inner:'li',outer:'ul',left:'.left',right:'.right',cycle:true
 };
 if(options){
  jQuery.extend(setting,options);
 }
 return jQuery(this).each(function (){
  var curr=1,total=Math.ceil($(this).find(setting.inner).length/setting.count),outer=$(this).find(setting.outer);
  $(this).find(setting.left).click(function (){
   if(curr!=1){
    outer.animate({
     left:-(setting.width*(curr-2))
    },500);
    curr--;

   }else if(setting.cycle&&curr==1){
    outer.animate({
     left:-(setting.width*(total-1))
    },500);
    curr=total;

   }this.blur();
   return false;
  });
  $(this).find(setting.right).click(function (){
   if(total!=curr){
    outer.animate({
     left:-(setting.width*curr)
    },500);
    curr++;

   }else if(setting.cycle&&curr==total){
    outer.animate({
     left:0
    },500);
    curr=1;

   }this.blur();
   return false;
  });

 });

}



/** 
* 弹出窗口start  
*  
* @param {object||string} 事件柄 
* @param {string} 展示的提示语
*/
Road.popUp={
		//初使化变量
		init:{
			//页面置灰
			pageGray:$('.make-page-gray'),
			//弹出的窗体
			popUpWin:$('.pop-up'),
			//窗体内容
			popCon:$('.pop-con'),
			//书签列表
			markList:$('.popConList'),
			//拉动元素
			actionW:$('.changerW img')			
		},
		//页面置灰
		pageGray:function(){
			this.init.pageGray.width($('body').width());
			this.init.pageGray.height($('body').height());
		},
		//展示弹出窗体
		putWin:function(){
			this.display('block');
			//弹出窗体定位
			putWinLeft = ($('body').width()-this.init.popUpWin.width())/2;
			putWinTop = (document.documentElement.clientHeight-this.init.popUpWin.height())/2;
			this.init.popUpWin.css({'left':putWinLeft,'top':putWinTop>0?putWinTop:0})

		},
		//添加窗体边框
		radioBorder:function(){
			this.init.popUpWin.prepend('<div class="winA"></div><div class="winB"></div>');
			this.init.popUpWin.append('<div class="winB"></div><div class="winA"></div>');
			this.init.markList.prepend('<div class="markA"></div><div class="markB"></div>');
			this.init.markList.append('<div class="markB"></div><div class="markA"></div>');
		},
		//display 展示 隐藏
		display:function(display){
			this.init.pageGray.css({'z-index':'999','display':display,'opacity': 0.6});
			this.init.popUpWin.css({'z-index':'1000','display':display});
			this.init.popCon.css('z-index','1001');
		},
		//隐藏弹出窗体
		hidden:function(){
			this.display('none');
		},
		//关闭弹出窗体
		close:function(){
			this.display('none');	
		},
		//展示窗口，背景置灰
		pageGrayPutWin:function(){
			this.putWin();
			this.pageGray();	
		},
		// 弹出窗口后的浏览器改变宽高
		fnBind:function(bindtype){
			var  popUpthis= this;
			if( bindtype == 'unbind'){
		  		$(window).unbind('resize scroll');
			}else{
				var top = popUpthis.init.popUpWin.position().top;
				$(window).bind({
				'resize':function(){popUpthis.pageGrayPutWin()},
				'scroll':function(){
					var scrollTop = $(window).scrollTop();
					popUpthis.init.popUpWin.css({ top: scrollTop +top  });
				}});
			}
		},
		//拉动窗体宽度
		actionW:function(){
			this.init.actionW.bind({'mousedown':function(){
					$(this).bind({'mousemove':function(){
							//得到图片的位置
							var imgPos = $(this).position();
							
						}
					})
				},'mouseup':function(){
					$(this).unbind('mousemove');
				}
			})
		},

		//获取鼠标当前坐标
            mouseCoords:function(ev){
		if(ev.pageX || ev.pageY){
		    return {x:ev.pageX, y:ev.pageY};}
		return {
			x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
			y:ev.clientY + document.body.scrollTop  - document.body.clientTop
		};
	    },
		drag:function(arg){
		    var dragThis = this
			$(arg).bind({'mousedown':function(){
					
					$(this).bind({'mousemove':function(){
							//得到元素的位置
							var divPos = $(this).position();
							
							
						}
					})
				},'mouseup':function(){
					$(this).unbind('mousemove');
				}
			})
		},
		//实例窗体
		putWinpageGray:function(arg){
			var popUpthis =this;
				popUpthis.radioBorder()
			$(arg.show).click(function(){
				popUpthis.pageGray();
				popUpthis.putWin();
				popUpthis.fnBind('bind');
				popUpthis.actionW()
			});
			$(arg.hidden).click(function(){
				popUpthis.fnBind('unbind');
				popUpthis.hidden();	
			});
			$(arg.close).click(function(){
				popUpthis.fnBind('unbind');
				popUpthis.close();	
			})
		}
}

//弹出窗口end













;$(document).ready(function(){
		Road.account.edit_step('.account_nav li');
		Road.account.edit_step('.time_mark li');
		Road.account.edit_step('.steps li');
		Road.account.edit_step('.liftMap li');
		//home 页面 回复框
		//事件柄 事件效果元素 事件柄与事件效果元素的父级元素
		Road.repeat.show('img.repeat','div.repeat_hide','div.share_right');
		//事件柄 展示的提示语
		Road.search.focus('.site_search .text','寻找好友，圈子，活动');
		//悬挂导航
		Road.Suspension.position('div#Suspension');
		 $('.right_roll_friend').imageRoller({count:1, width:200, left:'.left', right:'.right'});
		  Road.popUp.putWinpageGray({'show':'.mak-gray','hidden':'.hidden','close':'.close'});
		Road.activeItem('.ourMarkList li','active');
		Road.popUp.drag('.popTitle')

})






