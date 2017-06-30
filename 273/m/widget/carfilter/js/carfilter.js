/**
 * @desc m版列表页搜索js
 * @copyright (c) 2013 273 Inc
 * @author 陈朝阳 <chency@273.cn>
 * @since 2013-12-11
 */


var $ = require('zepto');
var TPL = require('../temp.tpl');
var CarType = require('/widget/cartype/js/cartype');
var Loaction = require('/widget/location/location');
var IScroll = require('iscroll');
var cookie = require('cookie');
var Class = require('class');
require('mobiscroll')
//var Base = require('app/wap_v2/js/sale/base.js');
//var Common = require('app/wap_v2/js/common/common.js');

var  carFilter = Class.create({
    carType : null ,
    location : null ,
    initialize: function( selector , options ) {
    	
        this.options = $.extend( {} , {

        } , options );
        this.$ = $( selector );
        var _this = this;
        var plateform = '';
        //滚动加载数据
        //文字超出部分先是省略号
        this.pageScoll().lengthPass();

        //android或ios,ios下自定义滚动条
        plateform = this.options.plateform;

        //禁止遮罩层的滑动
        this.$tpl = $('.shaixuan');
      //  this.$tpl.find('.shaixuan-page').off('touchmove.carfilter').on('touchmove.carfilter' , function( e ){ e.stopPropagation() ;})
        
        //this.$tpl.find('.shaixuan-right').css('overflow-y','auto')
        
        if( !this.$tpl.length )
            this.$tpl = $(TPL({})).appendTo('body');
      //  _this.$tpl.off('touchmove.cartype').on('touchmove.cartype' , function( e ){ e.stopPropagation() ;})
        //筛选层显示事件绑定
        this.$.on('click', function(){
            //$("#brand-select").css("height","auto");
            _this.show();

            if (typeof(mainScroll) != 'undefined') {
                mainScroll.refresh();
            } else if (plateform == 'ios') {
                window.mainScroll = new IScroll('#main_wrap',{preventDefault: false,HWCompositing:false});
            }


            /*  if(isTrue){


             //shaixuan.showSlider();
             //shaixuan.showBottomBtn();
             setTimeout(function(){
             //$('html,body').css('overflow','hidden');
             $('#main').css({height:mainHeight,overflow:'hidden'});
             //    $('.shaixuan-bottom-btn').css({right:'0'});
             //筛选层自定义滚动

             },10);
             }else{
             isTrue = false;
             $('.shaixuan').addClass('show');
             var mainHeight = $(window).height() - $('#search').height() - $('.menu-list').height();
             shaixuan.showSlider();
             shaixuan.showBottomBtn();
             setTimeout(function(){
             //$('html,body').css('overflow','hidden');
             $('#main').css({height:mainHeight,overflow:'hidden'});
             //$('.shaixuan-bottom-btn').css({right:'0'});
             //筛选层自定义滚动
             if (typeof(mainScroll) != 'undefined') {
             mainScroll.refresh();
             } else if (plateform == 'ios') {
             window.mainScroll = new IScroll('#main_wrap',{preventDefault: false,HWCompositing:false});
             resizeSearchBox();
             $('#main_page').on("touchmove", function(e) {
             e.preventDefault();
             });
             }
             },10);
             }*/
        })

        var $elem = this.$;
        var $searchForm = $elem.find('#searchForm');
        var data = {};
        var id = 'searchFormar', brandCache = true;
        
     /*   this.$tpl.on('click' ,'#clear' ,function(){
            $(this).find('.selected').removeClass('selected').addClass('select');
        })*/
        
        this.$tpl.off('click.carfilter').on('click.carfilter' , '.reback' , function(){
            _this.hide();
        }).on('click.carfilter' ,'.shaixuan-type' ,function(){
        	
            var $elem  = $(this).closest('li');
            var  id = $(this).parent().attr('id');
            data.id = id;
            if (id == 'type') {
                //用户重新选择类型后，品牌数据需重新取
                brandCache = false;
                $(".roll-box").html("");
                $("#temporaryValue").html("");
                ifNull();
            }
            if ( id == "brand" ) {

                if( !_this.carType ){
                	
                    _this.carType = new  CarType( $(this).find('span label')  ,{
                        multiple : true,
                        preventSubmit : true,
                        isreload : true,
                        defaultValue : window.defaultValue
                    }).off('selectedMultipleSeries').on('selectedMultipleSeries' , function( e , args ){
                            $elem.find('.select').removeClass('select').addClass('selected').find('label').html( args.text.join(',') || '不限' );
                       
                            console.log(typeof args.text[0] )
                            if( args.text[0] == '不限' ||  args.text[0] == null ){
                                $elem.find('.selected').addClass('select').removeClass('selected')
                            }

                        })
                    
                }
                _this.carType.show()
               
                return this;
            }

            if (id == 'district') {
                data.city_id = $('#searchForm input[name="city_id"]').val();
            }
            /*if (id == 'brand' && $searchForm.find('input[name="type"]').length>0) {
             data.type = $searchForm.find('input[name="type"]').val();
             }
             if (id == 'series' && $searchForm.find('input[name="brand"]').length>0) {
             data.brand = $searchForm.find('input[name="brand"]').val();
             if ($searchForm.find('input[name="type"]').length>0) {
             data.type = $searchForm.find('input[name="type"]').val();
             }
             }*/

            if( id == 'price'){
                _this.showSubOptions({} ,$elem );
            }
            else{
                $.ajax({
                    type: 'post',
//                      url: '/ajax.php?module=advancedSearch',
                    url: '/ajax/postScreen/index',
                    data: data,
                    dataType: 'json',
                    success: function(data){
                        if (data) {
                        	var is_cgb = false;
                        	if (id == 'is_cgb'){
                        		is_cgb = true;
                        	}
                            /* if (id == 'brand') {
                             brandCache = true;
                             }*/
                            _this.showSubOptions(data ,$elem, is_cgb );
                        }
                    },
                    error: function(xhr, type){
                        //Base.toast('网络异常，未请求到数据，请检查网络或重试');
                        //bindCancelClick();
                    }
                });
            }

        })

        //快捷列表点击
        $(".condi-list li").on('click',function(){
            $(this).find("a").addClass("on");
            $(this).siblings().find("a").removeClass("on");
            //$(this).find("i").attr("class","i-arrow-down");
            //$(this).siblings().find("i").attr("class","i-arrow-right");
            if($(".item-brand").hasClass("on")){
                $(".item-brand").addClass("on");
                $(".otherlink").click().find("a").removeClass("on");
                //$(".item-brand").find("i").attr("class","i-arrow-down");
                //$(".otherlink").find("i").attr("class","i-arrow-right");
                $("#brand").find('.shaixuan-type').click();
            }
        });

        $.fn.outerWidth = function(){
            return $(this).width() + parseFloat($(this).css('padding-left')) + parseFloat( $(this).css('padding-right'))
        };
        $.fn.outerHeight = function(){
            return $(this).height() + parseFloat($(this).css('padding-top')) + parseFloat( $(this).css('padding-bottom'))
        };
        $.fn.scrollLeft = function(){

        };

        //当自定义价格后，初始化弹出控件的价格范围
        var minPrice = "",maxPrice = "";
        $("#searchForm").children().each(function(){
            if( $(this).attr("name") == "min_price"){
                minPrice = $(this).val();
            }
            if( $(this).attr("name") == "max_price"){
                maxPrice = $(this).val();
            }
        });


        $("#searchForm").children().each(function(){
            if( $(this).attr("name") == "min_price"){
                minPrice = $(this).val();
            }
            if( $(this).attr("name") == "max_price"){
                maxPrice = $(this).val();
            }
        });
        
        //刷选列表的自定义价格
        $("#shaixuan_user-define").mobiscroll().treelist({
            //theme: 'android-ics light', //皮肤样式
            lang: "zh",
            placeholder: '选择价格',
            defaultValue  : [minPrice || 0 ,maxPrice || 1 ],
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
                   // $minPrice = $('<input type="hidden" name="min_price" value="'+ array.values[0] +'"/>').appendTo(searchFormut');
                }

                if($maxPrice.length ){
                    $maxPrice.val( array.values[1] );
                }
                else{
                    $maxPrice = $('<input type="hidden" name="max_price" value="'+ array.values[1] +'"/>').appendTo('#searchForm');
                  //  $maxPrice = $('<input type="hidden" name="max_price" value="'+ array.values[1] +'"/>').appendTo('#searchForm');
                }
                var val = array.values[0] +"-"+ array.values[1] +"万";
                //$('.item-price span').text( val );
                $(".down-list-box").removeClass("show");
                $("#price").find("label").html(val) .parent().removeClass('select').addClass('selected');
                $("#price").find("span.shaixuan_user-define").text(val);
                _this.expendSubOption($('#price'));
                //$("#price").find("span.shaixuan_user-define").removeClass('select').addClass('selected');
                //$("#price").find("span.shaixuan_user-define").siblings().removeClass('selected').addClass('select');
                $price.remove();
            },
            onBeforeShow :function(){
                $("#price").find("span.shaixuan_user-define").removeClass('select').addClass('selected');
                $("#price").find("span.shaixuan_user-define").siblings().removeClass('selected').addClass('select');
            },
            setText: '确定',
            cancelText: '取消'
        });


        //筛选表单提交
        $('.js_submit').on('click', function(){
            $('#searchForm input[name="nav"]').val("other");
//            $(searchFormut input[name="nav"]').val("other");
           // $('#searchForm').submit();
            $('#searchForm').submit();
        });
        //表单清空
        this.bindClearClick();
    },
    show : function(){
        var _this = this;
        this.$tpl.show();
        setTimeout(function(){
            _this.$tpl.find('.shaixuan-right').css('right' , 0);
        },100)
        
        $('#main').hide();
     /*
        $('<div class="smask" style="position:fixed;width:100%; height:100%; z-index:999;left:0; background:#fff; top: 0;"></div>').on('touchmove',function(e){
        	e.preventDefault();
        }).appendTo('body');
       
        $(document).off('touchmove').on('touchmove',function(e){
        	 console.log(11)
        //	e.preventDefault();
        })*/
      /*   $('body').css('overflow','hidden').on('touchmove.carfilter',function(e){
        	e.preventDefault();
        })*/
        return this;
    },
    hide : function(){
        var _this = this;
        this.$tpl.find('.shaixuan-right').css('right' , '-100%' );
        setTimeout(function(){
            _this.$tpl.hide();
        },500);
        $('#main').show();
        /*$('.smask').remove();
        
        $(document).off('touchmove.carfilter')*/
     //	$('body').css('overflow','visible').off('touchmove.carfilter');
        return this;
    },
    pageScoll :function(){
        return this;
    },
    lengthPass : function(){
        return this;
    },
    //子筛选项数据展示
    showSubOptions : function( data  ,$elem, is_cgb ){
    	var is_cgb = is_cgb;

        if (data.data) {
            var $html = '' ;
            if ($('input[name="'+data.key+'"]').length>0) {
                data.value = $('input[name="'+data.key+'"]').val();
                var $nameSpan = $('#'+data.key).find('label');
                data.value_name = $nameSpan.html();
            } else {
                data.value = null;
            }
            $html = this.getSubOptionsHtml(data, is_cgb);
            if ($html) {
                var $box = $( $elem ).find('.shaixuan-box')
                if(!$.trim($box.html())){
                    $box.html($html);
                    this.bindSubOptionClick($elem);
                }
                this.expendSubOption($elem);
            }
            //$('#sub_option').html(SearchTpl(data)).show();
            //$('#main').hide();
            //bindOptionClick();
            //bindBackClick();
        }
        else{
            this.bindSubOptionClick($elem);
            this.expendSubOption($elem);
        }
    },
    //子筛选项的展开与收起
    expendSubOption : function( $elem ){
        if ($elem.hasClass('click')) {
            $elem.removeClass('click');
            $elem.find('.arrow-open').removeClass('arrow-open').addClass('arrow-close');
            this.trigger('opened' , {  text : $elem.find('.shaixuan-type label').text() })
        } else {
            $elem.addClass('click');
            $elem.find('.arrow-close').removeClass('arrow-close').addClass('arrow-open');
            this.trigger('closed', {  text : $elem.find('.shaixuan-type label').text() })
        }
        //展开或收起后需重新刷新滚动条
        if (typeof(mainScroll) != 'undefined') {
            mainScroll.refresh();
        }

        /*   if (id != 'brand') {

         if(id == "price"){
         this.bindSubOptionClick(id);
         }
         }
         else {
         if ($('#brand_page').hasClass('show')) {
         $('#brand_page').removeClass('show');
         $("#series-select").removeClass("show");
         $('#brand-select').removeClass('show');
         shaixuan.hideRepeat();
         $('#main_page').addClass('show');
         } else {
         $('#main_page').removeClass('show');
         $('#brand-select').addClass('show');
         $('#brand_page').addClass('show');
         shaixuan.showRepeat();
         }
         }*/
    },
    //生成子筛选项的html
    getSubOptionsHtml : function( data, is_cgb ){
        var items = data.data;
        
        if (is_cgb === true){
        	$html = '';
        } else {
        	$html = '<span class="select" data-273-click-log="/wap/list/choice@etype=click@choice='+data.key+'_default">不限</span>';
        }
        for (var i=0; i < items.length; i++) {
            if (items[i].key == data.value){
                $html += '<span  class="selected" data-273-click-log="/wap/list/choice@etype=click@choice='+data.key+'_'+items[i].key+'" data-value="'+ items[i].key +'">' + items[i].value + '</span>';
            } else {
                $html += '<span class="select" data-273-click-log="/wap/list/choice@etype=click@choice='+data.key+'_'+items[i].key+'" data-value="'+ items[i].key +'">' + items[i].value + '</span>';
            }
        }
        //if(data.key == "price"){
        //    $html += '<span class="select" data-273-click-log="/wap/list/choice@etype=click@choice='+data.key+'_define">自定义</span>'
        //}
        return $html;
    },
    //子条件选择和事件
    bindSubOptionClick : function( $elem ){
        var _this = this;
        $( $elem ).find('.shaixuan-box span').off('click.carfilter').on('click.carfilter',function(){

            var name = $(this).html();
            var value = $(this).data('value');
            var optionType = $elem.attr('id');
            var $nameSpan = $elem.find('label');
            //最小值
            var low = $('.mileage input[name="low"]').val();
            //最大值
            var high = $('.mileage input[name="high"]').val();
            //最小值的key 如价格为min_price
            var minKey = '';
            //最大值的key 如价格为max_price
            var maxKey = '';
            if (optionType == 'price') {
                minKey = 'min_price';
                maxKey = 'max_price';
            } else if (optionType == 'age') {
                minKey = 'min_age';
                maxKey = 'max_age';
            } else if (optionType == 'displace') {
                minKey = 'min_displace';
                maxKey = 'max_displace';
            } else if (optionType == 'kilometer') {
                minKey = 'min_kilometer';
                maxKey = 'max_kilometer';
            } else if ( optionType == 'type' ){
                $("#brand").find("label").text("不限");
                $("#brand").find("label").parent().removeClass('selected').addClass('select');
                $("#searchForm").children("input[name='series'],input[name ='brand_selected']").remove();
            }

            /* var $input = $('input[name="'+optionType+'"]') ;
             if ($input.length > 0) {
             $input.val(value);
             }
             else{
             $input = $('<input name="'+optionType+'" value="'+value+'" type="hidden" />')
             $input.appendTo('#searchForm');
             }
             var $minKey = $('<input name="'+minKey+'" value="'+value+'" type="hidden" />')
             var $maxKey = $('<input name="'+maxKey+'" value="'+value+'" type="hidden" />')
             if ($minKey.length > 0) {
             $minKey.val(value);
             }
             else{
             $minKey = $('<input name="'+minKey+'" value="'+value+'" type="hidden" />')
             $minKey.appendTo('#searchForm');
             }*/

            var oldName = $nameSpan.html();
            if (name !='不限' ) {

                if (oldName == '不限') {
                    $nameSpan.html(name);
                    //$(".item-price span").html(name);
                    $nameSpan.parent().removeClass('select').addClass('selected');
                    if (!$('input[name="'+optionType+'"]').length>0) {
                        $('#searchForm').append('<input name="'+optionType+'" value="'+value+'" type="hidden" />');
                    }
                } else {
                    $nameSpan.html(name);
                    //$(".item-price span").html(name);
                    $('input[name="'+minKey+'"],input[name="'+maxKey+'"]').remove();
                    var $input = $('input[name="'+optionType+'"]') ;
                    if ($input.length > 0) {
                        $input.val(value);
                    }
                    else {
                        $input = $('<input name="'+optionType+'" value="'+value+'" type="hidden" />')
                        $input.appendTo('#searchForm');
                    }
                }
                $(this).siblings('.selected').removeClass('selected').addClass('select');
                $(this).removeClass('select').addClass('selected');
            } else if(name == '不限' && oldName != '不限') {
                $nameSpan.html(name);
                //$(".item-price span").html(name);
                $nameSpan.parent().removeClass('selected').addClass('select');
                $(this).siblings('.selected').removeClass('selected').addClass('select');
                if ($('input[name="'+optionType+'"]').length>0) {
                    $('input[name="'+optionType+'"]').remove();
                } else if ($('input[name="'+minKey+'"]').length > 0 && $('input[name="'+maxKey+'"]').length > 0) {
                    $('input[name="'+minKey+'"],input[name="'+maxKey+'"]').remove();
                }
            }

            if($(this).html() == '不限'){
                $(this).closest('li').find('.shaixuan-type .selected').removeClass('selected').addClass('select')
            }
            else{
                $(this).closest('li').find('.shaixuan-type .select').addClass('selected').removeClass('select')
            }

            _this.expendSubOption( $elem );
        });
    },
    //品牌车系点击事件
    //绑定清空条件事件
    bindClearClick : function () {
        $('#clear').on('click',function(){
            //清除所有选中样式
            $('#main_page .shaixuan-list li').removeClass('click');
            $('#main_page .shaixuan-list .shaixuan-type .selected label').html('不限');
            $('#main_page #is_cgb .shaixuan-type .selected label').html('否');
            $('#main_page .shaixuan-list .shaixuan-type .selected').removeClass('selected').addClass('select');
            $('#main_page .shaixuan-list .shaixuan-box .selected').removeClass('selected').addClass('select');
            //清除城市id以外的所有表单值
            $('#searchForm').find('input').each(function(){
                if ($(this).attr('name') == 'city_id' || $(this).attr('name') == 'province_id' || $(this).attr('name') == 'order' || $(this).attr('name') == 'chain_name') {

                } else {
                    $(this).remove();
                }
            });
            $(".choose-already .roll-box").html("");
            $("#temporaryValue").html("");
            ifNull();
        });
    }
})

module.exports = carFilter ;

//品牌车系点击事件
function bindBrandClick () {
    if(isTrue){
        if($(".condi-list-item.brand").find("span").text() != "品牌"){
            $("#searchForm").children().each(function(){
                if( $(this).attr("name") == "brand_selected"){
                    var value1 = $(this).data("brand");
                    var value2 = $(this).data("series");
                    var value3 = $(this).data("name");
                    var html = '<a href="javascript:void(0)" data-brand-url="'+value1+'" data-value="'+value2+'"><span>'+value3+'</span><i class="i-close" ></i></a>';
                    $(".roll-box").append(html);
                    //$("#temporaryValue").append(html);
                }
            });
            ifNull();
        }
    }else{
        if($("#brand").find("label").text() != "不限"){
            $("#searchForm").children().each(function(){
                if( $(this).attr("name") == "brand_selected"){
                    var value1 = $(this).data("brand");
                    var value2 = $(this).data("series");
                    var value3 = $(this).data("name");
                    var html = '<a href="javascript:void(0)" data-brand-url="'+value1+'" data-value="'+value2+'"><span>'+value3+'</span><i class="i-close" ></i></a>';
                    $(".roll-box").append(html);
                    $("#temporaryValue").append(html);
                }
            });
            ifNull();
        }else{
            $(".roll-box").html("");
            $("#temporaryValue").html("");
        }
    }

    $('#brand_page h4,#brand_page .zimu').on('click',function(e){
        e.stopPropagation();
    }).on('mousemove mouseup touchmove touchstart',function(e){
        e.stopPropagation();
    })

    //$('#brand_page li a').on('click',brandClick);
    $('#brand-select li a').on('click',brandClick).on('click',function(e){
        e.stopPropagation();
    }).on('mousemove mouseup touchmove touchstart',function(e){
        e.stopPropagation();
    })
    
    $('#hot_brand a').on('click',brandClick).on('click',function(e){
        e.stopPropagation();
    }).on('mousemove mouseup touchmove touchstart',function(e){
        e.stopPropagation();
    })

    var val = "", value, name, value2 ;
    var html = "";
    var data = {};

    $("#series-select ").on('click','li',function(){
        if($(".choose-already .roll-box").find("a").length < 5){

            if($(this).hasClass("select_disabled")){

            }else{
                if($("li.select_disabled").length >= 1 ){
                    $("#unlimited").parent("li").removeClass("select_disabled");
                }
                $(this).addClass("select_disabled");
                //$("#series-select").removeClass("show");
                //$("#brand-select").addClass("show");
                value2 = $(this).find("a").attr("data-value");

                function hasElement( value ,value2 ){
                    var bool = false;
                    $('.roll-box').children().each(function(){
                        if( $(this).attr('data-brand-url') == value && $(this).attr('data-value') == value2 ){
                            bool = true;
                            return false;
                        }
                    });
                    return bool;
                }

                if( hasElement( value , value2 ) ){
                    return;
                }


                if($(this).find("a").html() == "不限"){
                    $('.roll-box').children().each(function(){
                        if($(this).data("brand-url") == value){
                            $(this).remove();
                        }
                    });
                    $('#temporaryValue').children().each(function(){
                        if($(this).data("brand-url") == value){
                            $(this).remove();
                        }
                    });
                    $(this).siblings().removeClass("select_disabled");
                    var html = '<a href="javascript:void(0)" data-brand-url="'+ value +'"><span>'+name+'</span><i class="i-close" ></i></a>';
                    $(".choose-already .roll-box").append(html);
                    //$("#temporaryValue").append(html);
                    ifNull();
                }else{
                    $('.roll-box').children().each(function(){
                        if( $(this).data("brand-url") == value && ($(this).data("value") == "" || $(this).data("value") == undefined) ){
                            $(this).remove();
                        }
                    });
                    $('#temporaryValue').children().each(function(){
                        if( $(this).data("brand-url") == value && ($(this).data("value") == "" || $(this).data("value") == undefined) ){
                            $(this).remove();
                        }
                    });
                    //$("#unlimited").removeClass("select_disabled");
                    val = $(this).find("a").data("value") +','+ $(this).find("a").html();
                    var valueAttr = val.split(',');
                    var seriesNmme1 = name + valueAttr[1];
                    var html = '<a href="javascript:void(0)" data-brand-url="'+value+'" data-value="'+valueAttr[0]+'"><span>'+seriesNmme1+'</span><i class="i-close" ></i></a>';
                    $(".choose-already .roll-box").append(html);
                    //$("#temporaryValue").append(html);
                    ifNull();
                }
                //$(".choose-already .roll-box").append(html);

            }
        }else{
            Base.toast('最多选择5个品牌车系哦~！');
        }
    }).on('click mousemove mouseup touchmove touchstart',function(e){
        e.stopPropagation();
    })

    function brandClick (e) {
        var name = $(this).html();
        var value = $(this).attr('data-brand-url');
        var $nameSpan = $('#brand').find('label');
        var oldName = $nameSpan.html();
        if ( name != "不限") {//name != oldName &&
            //if (name == '不限') {
            //    addChoose(name,value);
            //} else{
            if (oldName == '不限') {
                //$nameSpan.html(nameAttr);
                addChoose(name,value);
                // $nameSpan.parent().removeClass('select').addClass('selected');
                // if (!$('input[name="brand"]').length > 0) {
                //     $('#searchForm').append('<input name="brand" value="'+value+'" type="hidden" />');
                // }
            } else{
                // $nameSpan.html(nameAttr);
                addChoose(name,value);
                /* if ($('input[name="brand"]').length > 0) {
                 $('input[name="brand"]').val(value);
                 }*/
            }

            //}
        }else{
            addChoose(name,value);
        }

    }
    //车系获取
    function seriesName( na , val){
        name = na ;
        value = val;
        data.id = 'series';
        data.brand = val;
        $.ajax({
            type: 'POST',
            url: '/ajax.php?module=advancedSearch',
            data: data,
            dataType: 'json',
            success: function(data){
                if (data) {
                    showSeriesName(data);
                }
            },
            error: function(xhr, type){
                Base.toast('网络异常，未请求到数据，请检查网络或重试');
                $("#series-select").removeClass("show");
                $("#brand-select").addClass("show");
            }
        });
    }
    //车系显示
    function showSeriesName(data){
        $("#brand-select").removeClass("show");
        $("#series-select").addClass("show");
        var $html = "";
        $("#series-select ul").html("");
        //document.getElementById("brand_page").scrollTop = 0;
        $("#brand_page").scrollTop(0);
        //$("#brand-select").css("height",$(window).height());
        if(data.data){
            if(data.key == "series"){
                var items = data.data;
                $html = '<li><a href="javascript:void(0)" data-273-click-log="/wap/list/choice@etype=click@choice'+data.key+'_default" id="unlimited">不限</a></li>';

                for (var i = 0; i < items.length; i++) {
                    var is_true = false;
                    //已选中添加禁止再选
                    $('.roll-box').children().each(function(){
                        if ($(this).data("value") == items[i].key) {
                            $html += '<li class="select_disabled"><a href="javascript:void(0)" data-273-click-log="/wap/list/choice@etype=click@choice' + data.key + '_' + items[i].key + '" data-value="' + items[i].key + '">' + items[i].value + '</a></li>';
                            is_true = true;
                        }
                    });
                    if(is_true){
                        continue;
                    }else{
                        $html += '<li><a href="javascript:void(0)" data-273-click-log="/wap/list/choice@etype=click@choice'+data.key+'_'+items[i].key+'" data-value="'+ items[i].key +'">' + items[i].value + '</a></li>';
                    }
                }
                //for (var i=0; i < items.length; i++) {
                //    $html += '<li><a href="javascript:void(0)" data-273-click-log="/wap/list/choice@etype=click@choice'+data.key+'_'+items[i].key+'" data-value="'+ items[i].key +'">' + items[i].value + '</a></li>';
                //}
                $("#series-select ul").append($html);
            }
        }
    }

    function addChoose(name , value ){
        if(name == "不限"){
            //$(".choose-already .roll-box").html('<a href="javascript:void(0)"><span>不限</span><i class="i-close" ></i></a>');
            $(".choose-already .roll-box").html('');
            ifNull();
            var $nameSpan = $('#brand').find('label');
            $nameSpan.parent().removeClass('selected').addClass('select');
            if ($('input[name="brand"]').length>0) {
                $('input[name="brand"]').remove();
                //$('input[name="series"]').remove();
                //$("#series").hide();
            }
            if ($('input[name="series"]').length>0) {
                $('input[name="series"]').remove();
            }
            $nameSpan.html('不限');
            $(".condi-list-item.brand").find("span").html('不限');
            if(isTrue){
                $("#searchForm").children("input[name = 'type'],input[name = 'series'],input[name = 'brand_selected']").remove();
                $("#searchForm").submit();
            }else{
                expendSubOption('brand');
            }
            lengthPass();
        }else{
            if($(".choose-already .roll-box").find("a").length < 5){
                if($(".choose-already .roll-box").find("span").html() == "不限"){
                    $(".choose-already .roll-box").html('');
                    ifNull();
                }

                //var html = '<a href="#" data-brand-url="'+ value +'"><span>'+name+'</span><i class="i-close" ></i></a>';
                //$(".choose-already .roll-box").append(html);
                seriesName(name,value);
            }else{
                Base.toast('最多选择5个品牌车系哦~！');
            }
        }
    }

    //品牌左上角返回
    $("#brand-select span.reback").on('click',function(){
        if(isTrue){
            bindCancelClick();
        }else{
            $('#brand_page').removeClass('show');
            shaixuan.hideRepeat();
            //$('.choose-already').hide();
            $('#main_page').addClass('show');
        }
    });
    //车系左上角返回
    $("#series-select span.reback").on('click',function(){
        $("#series-select").removeClass("show");
        $("#brand-select").addClass("show");
        //$("#brand-select").css("height","auto");
        //shaixuan.hideBottomBtn();
    });
}


//品牌车系已选列表显示隐藏
function ifNull(){
    if($(".roll-box").html() == ""){
        $(".choose-already").hide();
    }else{
        $(".choose-already").show();
    }
}

