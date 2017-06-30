/**
 * @desc m���б�ҳ����js
 * @copyright (c) 2013 273 Inc
 * @author �³��� <chency@273.cn>
 * @since 2013-12-11
 */


var $ = require('zepto');
var Base = require('app/car/base.js');
var Log    = require('/widget/log/js/log.js');
var MatchBox = require('app/car/matchBox.js');
var BrandTpl = require('widget/carfilter/temp.tpl');
var CarType = require('/widget/cartype/js/cartype');
var CarFilter = require('widget/carfilter/js/carfilter.js');
var IScroll = require('iscroll');
var cookie = require('cookie');
var Class = require('class');
var Common = require('app/car/common/common.js');
//var Widget = require('app/car/common/widget.js');
var _ = require('app/car/lib/underscore/underscore.js');

require('mobiscroll');

//_.extend(carFilter, Base);

var domain = '';

var List = exports;
_.extend(List, Base);

//显示翻页
List.selectPage = function (config){
    var $elem = config.$el;
    $elem.find('.current').click(function() {
        $(this).find('ul').show();
        return false;
    });
    $(window).click(function (e) {
        $elem.find('ul').hide();
    });
    $elem.find('#page_select').on('change',function(){
        var str = '/wap/list/page@etype=click@value=' + $(this).get(0).selectedIndex;
        Log.trackEventByEqslog(str,$(this),'click');
        window.location.href = $(this).val();
    });
};

//触底加载数据
pageScroll();
function pageScroll(){
    var hash = location.hash.replace('#','');
//    console.log(location.hash);
    //var savePage = cookie.get("savePage");

    var canLoad = true;
    var page = 2,
    severPage = $("#searchForm input[name='current_page']").val(), 
    currentPage = hash || -1 ,
    currentFilter = $("#searchForm input[name='current_filter']").val(),
    solrParams = $("#searchForm input[name='solrParams']").val();
    reqParams = $("#searchForm input[name='reqParams']").val();
    
    
    var scrollTop =   cookie.get("scrollHeight") || 0;
    //console.log(scrollTop)
    if( currentPage != -1 ){
        if( currentPage % 3 == 0){
            currentPage -= 1;
            loadData(function(){
                currentPage += 1;
                loadData(function(){
                     window.scroll(0 ,scrollTop)
                });
            });
        }
        else if( currentPage % 3 == 2){
            loadData(function(){
                window.scroll(0 ,scrollTop)
            });
        }

    }


    window.addEventListener('popstate', function(e){
        /*     var hash = location.hash;
         if(hash ){
         location.href
         }*/
      /*  console.log(currentPage)
        if( currentPage == 2){
            history.replaceState({page: 999 }, "", "" );
        }
        else{

        }*/

    }, false);

    $('#page .prev,#page .next').click(function(){
        //location.hash = "";
    });
    var windowHeight;
    var is_all = false;
    $(window).resize(function(){
        windowHeight = $(window).height() + ( $("#page").height() || 0 ) + ( $(".banner").height() || 0 ) + $("#footer").height();//已优化，下拉到20条时就加载
    });

    $(".reloading").addClass("show");
    $(".reloading").text("加载中...");
    $(window).scroll(function() {
        //$(".pageShow").removeClass("show");
        $(".reloading").text("上拉加载...");
        $('#main').height('');
        windowHeight = $(window).height() + ( $("#page").height() || 0 ) + ( $(".banner").height() || 0 ) + $("#footer").height();
        if(page>3){
            $(".reloading").removeClass("show");
            $(".pageShow").addClass("show");
        }

        //console.log($(window).scrollTop())
        //console.log($(document).height())
        //console.log(windowHeight)
        cookie.set('scrollHeight',$(window).scrollTop());
        if (($(window).scrollTop() >= $(document).height() - windowHeight) && !is_all ) {
            loadData();
        }

    });
    function loadData( callback ){
        if( page >3) {
            return ;
        } else {
            currentPage = severPage * 3 - (3 - page);
            //location.hash = '#'+ currentPage;
            //cookie.set("savePage",currentPage);
            $(".reloading").text("加载中...");
            var data = { page: currentPage , filter : currentFilter , solrParams : solrParams , reqParams : reqParams};
            var chain_id = $("#searchForm input[name='chain_id']").val();
            if(chain_id){
                data['chain_id'] = chain_id;
            }
            var need_bak = $("#searchForm input[name='need_bak']").val();
            if(need_bak){
                data['need_bak'] = need_bak;
            }
            if(canLoad){
                canLoad = false;
                $.ajax({
                    type: 'POST',
//                    url: '/ajax.php?module=getCarSalePost',
                    url: '/ajax/Postbottomscroll/index',
                    data: data,
                    dataType: 'html',
                    timeout: 2000,
                    beforeSend: function(){ },
                    success: function(data){
                        // alert(data);
                        if (data) {
                            $("#carlist").append(data);
                            Common.lazyLoadPic();
                            page++ ;
                            canLoad = true;
                        } else {
                            is_all = true;
                            $(".reloading").removeClass("show");
                            $(".pageShow").addClass("show");
                        }
                        callback && callback( data );
                        history.replaceState({page: 999 }, "", "#" + currentPage );
                        //location.hash = '#'+ currentPage ;
                    },
                    error: function(xhr, type){
                        //alert('数据载入错误');
                    }
                });

            }
        }

    }
}

var carType, carFilter ;
$('.bckColor').click(function(){
	$(this).add($('.down-list-box')).hide();
})

$('.list-filter').on('click','a',function(){
	$(this).addClass('on').find('i').addClass('i-arrow-down').removeClass('i-arrow-right')
	.closest('li').siblings().find('a').removeClass('on').find('i')
	.addClass('i-arrow-right').removeClass('i-arrow-down');
	
	
	if( $(this).hasClass('item-price')){
		$('.down-list-box.d').hide();
		$('.down-list-box.p').toggle();
	
		if($('.down-list-box.p').css('display') == 'none'){
			$(this).removeClass('on').find('i')
			.addClass('i-arrow-right').removeClass('i-arrow-down')	;
			$('.bckColor').hide();
		}
		else{
			$('.bckColor').show();
		}
		
	}
	else  if( $(this).hasClass('item-default')){
		$('.down-list-box.p').hide();
		$('.down-list-box.d').toggle();
		$('.bckColor').toggle();
		if($('.down-list-box.d').css('display') == 'none'){
			$(this).removeClass('on').find('i')
			.addClass('i-arrow-right').removeClass('i-arrow-down')	;
			$('.bckColor').hide();
		}
		else{
			$('.bckColor').show();
		}
		
	}
	else if( $(this).hasClass('item-brand')){
		$('.down-list-box.p,.down-list-box.d').hide();
		if( !window.carType ){
		
			window.carType = new  CarType( $(this).find('span') ,{
		        multiple : true,
		        preventSubmit : false,
		        defaultValue : window.defaultValue
		    }).on('selectedBrand' , function(){
		    });
			window.carType.show()
		}
		else{
			window.carType.show()
		}
		$('.bckColor').hide();
	}
	else if( $(this).parent().hasClass('otherlink')){
		$('.down-list-box.p,.down-list-box.d').hide();
		if( !window.carFilter ){
		
			window.carFilter = new CarFilter( this ).on('closed' , function( e , args ){
		
		    });
			window.carFilter.show()
		}
		else{
			window.carFilter.show()
		}
		$('.bckColor').hide();
	}
})

$('.down-list').on('click', 'a' , function(){
	$(this).addClass('on').closest('li').siblings().find('a').removeClass('on');
	if( $(this).closest('.p').length ){
		$('.item-price span').html( $(this).text() )
	}
	else  if( $(this).closest('.d').length ){
		$('.item-default span').html( $(this).text() )
	}
})


$.mobiscroll.i18n.zh = $.extend($.mobiscroll.i18n.zh, {
	setText: '确定',
	cancelText: '取消'
});
var theme = {
	defaults: {
		dateOrder: 'Mddyy',
		mode: 'mixed',
		rows: 5,
		width: 70,
		height: 36,
		showLabel: false,
		useShortLabels: true
	}
};
$.mobiscroll.themes['android-ics'] = theme;
$.mobiscroll.themes['android-ics light'] = theme;


$.fn.outerWidth = function(){
	return $(this).width() + parseFloat($(this).css('padding-left')) + parseFloat( $(this).css('padding-right'))
};
$.fn.outerHeight = function(){
	return $(this).height() + parseFloat($(this).css('padding-top')) + parseFloat( $(this).css('padding-bottom'))
};
$.fn.scrollLeft = function(){

};

var minPrice, maxPrice ;
//快捷列表的自定义价格
$("#user-define").mobiscroll().treelist({
	lang: "zh",
	placeholder: '选择价格',
	defaultValue  : [minPrice ,maxPrice],
	//headerText: function (valueText) { return "选择价格"; },
	onSelect: function ( e, array ) { //返回自定义格式结果
	array.values = array._wheelArray;
	var $price = $('[name=price]');
	var $minPrice = $('[name=min_price]'),$maxPrice = $('[name=max_price]');
	if($minPrice.length ){
	    $minPrice.val( array.values[0] );
	}
	else{
	    $minPrice = $('<input type="hidden" name="min_price" value="'+ array.values[0] +'"/>').appendTo('#searchForm');
	}
	
	if($maxPrice.length ){
	    $maxPrice.val( array.values[1] );
	}
	else{
	    $maxPrice = $('<input type="hidden" name="max_price" value="'+ array.values[1] +'"/>').appendTo('#searchForm');
	}
	var val = array.values[0] +"-"+ array.values[1] +"万";
	$('.item-price span').text( val );
	// lengthPass();
	$(".down-list-box").removeClass("show");
	$("#price").find("label").html(val);
	$("#price").find("label").parent().removeClass('select').addClass('selected');
	$price.remove();
	//$('#searchForm').submit();
	$('#searchForm input[name="nav"]').val("price");
	$('#searchForm').submit();
	/* return $('#treelist>li').eq(array[0]).children('span').text() +' '+ $('#treelist>li').eq(array[0]).find('ul li').eq(array[1]).text().trim(' ');*/
	},
	onBeforeShow :function(){
	$(".user-define").addClass('on').closest('.down-list-item').siblings().find("a").removeClass("on");
	},
	setText: '确定',
	cancelText: '取消'
});


//默认排序
$(".down-list-box.d li").on('click',function(){
    $(this).find("a").addClass("on");
    $(this).siblings().find("a").removeClass("on");
    var val = $(this).find("a").data("value");
    var defaultSelectText = $(this).find("a").text();
    var defaultText = $(".item-default span").text();
    $(".item-default span").text($(this).find("a").text());
    $(".down-list-box.d").removeClass("show");
    var $defaultUrl = $('[name=order]');
    if(val != "" && val != undefined){
        if($defaultUrl.length ){
            $defaultUrl.val( val );
        }
        else{
            $defaultUrl = $('<input type="hidden" name="order" value="'+ val+'"/>').appendTo('#searchForm');
        }
    }
    else{
        $defaultUrl.remove();
    }

    //if(defaultSelectText != defaultText){
    //   $("#searchForm").submit();
    $('#searchForm input[name="nav"]').val("order");
    $("#searchForm").submit();
    //}
});
//价格列表点击事件

$(".down-list-box.p li").on('click',function(e){
//    console.log(22);
  
    if($(this).find("a").html() != "自定义"){
        var val = $(this).find("a").data("value");
        $("#price").find("label").html($(this).find("a").html());
        $("#price").find("label").parent().removeClass('select').addClass('selected');
        $(this).find("a").addClass("on");
        $(this).siblings().find("a").removeClass("on");
        $(".item-price span").text($(this).find("a").text());

        if($(this).find("a").hasClass("user-define")){
            //$(".select-two option").click(function(){
            //    $(".down-list-box").hide();
            //});
        }else{
            //$(".user-define").show();
            //$(".user-select").hide();
            $(".down-list-box.p").hide();
        }
        var $price = $('[name=price]');
        var $minPrice = $('[name=min_price]'),$maxPrice = $('[name=max_price]');
        if(val != "" && val != undefined){
            if($price.length ){
                $price.val( val );
            }
            else{
                $price = $('<input type="hidden" name="price" value="'+ val+'"/>').appendTo('#searchForm');
            }
        }else{
            $price.remove();
            $minPrice.remove();
            $maxPrice.remove();
        }
   
        if( e.target.tagName != 'INPUT'){
        	
            //$('#searchForm').submit();
            $('#searchForm input[name="nav"]').val("price");
            $('#searchForm').submit();
        }
    }
});




