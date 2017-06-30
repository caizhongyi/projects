var $ = require('zepto');
  //  Common = require('app/wap_v2/js/common/common.js'),
var Class = window.Class ||  require('class') ;
var carTypeTpl = require('../cartype.tpl');
require('/widget/lazyload/js/lazyload') ;
  //  seriesTpl = require('app/wap_v2/js/tpl/series_list.tpl');

var carType = Class.create({
    initialize: function( selector , options ) {
        var _this = this;

        this.options = $.extend( {} , {
            multiple : false,
            preventSubmit : false ,
            defaultValue : null,
            isreload : false,
        } , options )

        this.$input = $(selector).prop('readonly' , true );
        this.$hiddenInput = $( this.$input.data('hidden-input') );
        this.val = [] ;
        this.text = [] ;
        this.$input.off('focus.carType').on('focus.carType', function(){
            _this.show();
        })

        var $caption = $('#js_title');
        if ($caption.val()) {
            $('.js_brand').val($caption.val());
        }
        
        _this.$ = $('#shaixuan')
        if( !_this.$.length )
        	_this.$ = $('<div id="shaixuan" class="shaixuan-page" style="min-height:100%"></div>').appendTo('body');
        
      //  _this.$.off('touchmove.cartype').on('touchmove.cartype' , function( e ){ e.stopPropagation() ;})
      
       
        $(window).resize(function(){
        	_this.$.css('bottom', 0 )
        })
   
       /* $('.js_brand').on('click',function() {
            $('#main,#footer').addClass('hidden');
            $('#pageheader .js_pagetitle').html('车型品牌');
            $('#pageheader .reback a').data('type','vehicle');
            if ($('#brand').html() != "") {
                $('#brand').removeClass('hidden');
            } else {
                var param = {};
              //  $('#brand').html(allBrand(param)).removeClass('hidden');

            }
            _this.scrollTop();
        });*/
    },
    getData : function(){
    	  var $searchForm  = $('#searchForm');

    	  var data = {};
           data.brand = $searchForm.find('input[name="brand"]').val();
           data.id = "brand";
          if ($searchForm.find('input[name="type"]').length>0) {
          	 data.type = $searchForm.find('input[name="type"]').val();
          }
          return data;
    },
    setInputValue : function(){
    	   var _this = this;
    	   var $items =  $('.roll-box' , _this.$).children();
           
           var o = {
               text : [],
               val : [],
               id : [],
               url :[]
           } ;
           var brand = [],series = [];
           $items.each(function(){
               o.text.push( $(this).text() )
               o.val.push( $(this).data('value') )
               o.id.push( $(this).data('id') )
               brand.push( $(this).data('brand-id') );
               series.push( $(this).data('value') );
              // o.url.push( $(this).data('value') )
           })
           _this.setValue( o ).hide();
           _this.trigger('selectedMultipleSeries', o );
           
           var $brand = $('[name=brand]'),
           	$series = $('[name=series]');
           
           if( !$brand.length ){ $brand = $('<input name="brand" type="hidden" />').appendTo($('#searchForm'));  }
           if( !$series.length ){ $series =  $('<input name="series"  type="hidden" />').appendTo($('#searchForm'));  }
        
           $brand.val(brand.join(','))
           $series.val(series.join(','))
           
           $brand.eq(1).val(brand.join(','))
           $series.eq(1).val(series.join(','))
           
           
           $('#searchForm input[name="nav"]').val("brand");
           return  this;
    },
    reload : function(){
    	var _this = this;
        var $selectedTags = $('.roll-box' , _this.$ ).children();

    	$.ajax({
            type: 'POST',
//            url: '/ajax.php?module=advancedSearch',
            url: '/ajax/Postscreen/index',
            data: this.getData(),
            dataType: 'json',
            success: function(data){
                if (data) {
                    _this.$.html(carTypeTpl(data)).find('#shaixuan-page');
                    var $rollbox = $( '.roll-box' , _this.$ ).on('touchmove touchstart touchend' , function(e){
                    	e.stopPropagation();
                    })
                    
                    if( $selectedTags.length  ){
                    	$rollbox.append($selectedTags);
                    }
                    else{
                    	 if(_this.options.defaultValue )
     	                    for( var i = 0; i < _this.options.defaultValue.length ; i ++ ){
     	                    	if( _this.options.defaultValue[i].series.length )
     		                    	for( var j = 0 ; j <  _this.options.defaultValue[i].series.length ; j ++ ){
     		                    	 	_this.addLabel( _this.options.defaultValue[i].series[j] ,_this.options.defaultValue[i]);
     		                    	}
     	                    	else
     	                    		_this.addLabel( { key : null , value : '不限'} ,_this.options.defaultValue[i]);
     	                    }
                    }
                   
                    
                

                    _this.$.on('click', '.js_reback',function(){
                    	var isSeries = $('.series-select').hasClass('in');
                    	if(isSeries){
                           	_this.showBrand();
//                            var top = $('.brand-select' , _this.$).find('[data-url='+ $(this).data('url') +']').offset().top;
//                             _this.$.scrollTop( top );
                    	}
                    	else{
                            _this.hide().showBrand();
                    	}
                
             
                     });

                     if( _this.options.multiple ){
                    	 var $sb = $('.shaixuan-bottom-btn', _this.$);
                    	
                    	  $sb.off('click').on('click','.bottom-ok', function(){
                        	  var $items =  $('.roll-box' , _this.$).children();
                              
//                             if (
//                             		(brand[0] != 'undefined' && brand.length > 1) ||
//                             		(series[0] != 'undefined' && series.length > 1) ||
//                             		(brand[0] != 'undefined' && series[0] != 'undefined')
//                             ){		//多品牌或多车系——标记为多选
//                             	$('#searchForm input[name="multi"]').val("1");
//                             	$('#searchFormOut input[name="multi"]').val("1");
//                             }
//                             if (series['0'] != 'undefined' && series.length == 1){
//                             	$('#searchForm input[name="multi"]').val("0");
//                             	$('#searchFormOut input[name="multi"]').val("0");
//                             }
                        	 if( !$items.length ) {
                        		 $('.selected' , _this.$input.closest('.shaixuan-type')).removeClass('selected').addClass('select').find('label');
                        		 _this.hide();
                        	 } 
                        	
                        	 _this.setInputValue();
                        	
                        	 
                            
                             if( !_this.options.preventSubmit ){
                             	$("#searchForm").submit();
                             }
                         
                         }).on('click','a',function(){
                             var value = $(this).closest('a').data('value');
                             $('.series-select' , _this.$ ).find('[data-url="'+ value +'"]').parent().removeClass('select_disabled');
                             $(this).closest('a').remove();
                         })

                         function setTop(){
                             $sb.css('top' ,  $(window).height() - $sb.height() )
                         }

                         /*_this.$.off('scroll.cartype').on('scroll.cartype' , function(){
                             setTop();
                         })*/
                         setTop();
                     }
                   
                    _this.anchor( _this.$).bindBrandEvent().lazyload();
                    
                    if( _this.options.multiple ){
                        $('[data-multiple]' , _this.$).show().css('visibility','visible');
                        $('[data-single]' , _this.$).hide();
                    }
                  
                }
            },
            error: function(xhr, type){
               // _this.bindCancelClick();
            }
        });
       
    	return this;
    },
    lazyload : function(){
        $("img[datasrc]").scrollLoading({
            context : this.$
        }); // 延时载入图片
        return this;
    },
     updateFormData : function($brandId, $seriesId, $modelId, $title) {
        $('.js_brand,#js_title').val($title);
        $brandId > 0 ?  $('#js_brand_id').val($brandId) :  $('#js_brand_id').val('');
        $seriesId > 0 ?  $('#js_series_id').val($seriesId) : $('#js_series_id').val('');
        return this;
    },
    bindSeriesEvent :function(e) {
        var _this = this;
         $('#series').on('click', ' .js_back_brand',function() {
             _this.showBox('brand');
        }).on('click','ul li a', function seriesClick(e) {
            if ($(this).parent().hasClass('unlimit')) {
                return;
            }
            var data = {};
            data.type='model';
            data.series = $(this).data('id');
            $.ajax({
                type: 'GET',
                url: 'http://m.273.cn/ajax.php?module=getModelSeriesV2',
                data: data,
                dataType: 'jsonp',
                success: function(data){
                    if (data) {
                        data.unlimit = true;
                        _this.updateFormData(data.brand.id, data.series.id, 0, data.brand.name + ' ' + data.series.name);
                        $('#series').addClass('hidden');
                        _this.showBox('main');
                    }
                },
                error: function(xhr, type){
                    alert('网络异常，未请求到数据，请检查网络或重试');
                }
            });
        });
        return this;
     },
     scrollTop: function() {
         $('.uptop').css('visibility', 'hidden');
         window.scroll(0, 0);
         return this;
     },
     showBox : function(boxType) {
        switch(boxType) {
            case 'main':
                $('#footer,.gohome').removeClass('hidden');
                $('#pageheader .js_pagetitle').html('卖车');
                $('#brand,#series,#city').addClass('hidden');
                $('#pageheader .reback a').data('type', 'home');
                window.scroll(0, top);
                break;
            case 'brand':
                $('#series,#model').addClass('hidden');
                this.scrollTop();
                break;
            case 'series':
                $('#model').addClass('hidden');
                this.scrollTop();
                break;
        }
         $('#' + boxType).removeClass('hidden');
         return this;
    },
    anchor : function($el) {
        var messager = null;

        $el.on('click','[data-anchor]',function(){
            var anchor = $(this).data('anchor');
            var top = $(anchor).offset().top;

          /*  if (window.parent !== window && /iphone/i.test(navigator.userAgent)) {
                require.async(['lib/messager/messager.js'], function(Messager) {
                    if (!messager) {
                        var messager = new Messager();
                        messager.add(window.parent);
                    }
                    messager.send(top);
                });
            } else {

            }*/
            $el.scrollTop(top)
        });
        return this;
    },
    
    hide : function(){
    	var _this = this;
    	_this.$.removeClass('in');
    	if( this.timerfixedHide ){
    		clearTimeout(this.timerfixedHide )
    	}
    	this.timerfixedHide =setTimeout(function(){
        	var $sb = $('.shaixuan-bottom-btn' , _this.$);
        	$sb.css(
               		{
               			'position' : 'absolute',
               			top : $(window).scrollTop() +  $(window).height() - $sb.height() ,
               			bottom : 'auto'
               		}
               		)
        },200)
        
         $('#main').show();
        // $('.smask').remove();
    	//$('body').css('overflow','visible').off('touchmove.cartype');
        return this;
    },
    show : function(){
        var _this = this;

        if( !this.$.html() || this.options.isreload ){
        	this.reload();
            this.$.scrollTop(0);
        }
        	
        if( this.timerShow ){
    		clearTimeout(this.timerShow )
    	}
        if( this.timerfixedShow ){
    		clearTimeout(this.timerfixedShow )
    	}
    	this.timerShow = setTimeout(function(){
    		_this.$.addClass('in');
        },100)
        this.timerfixedShow = setTimeout(function(){

      	  $('.shaixuan-bottom-btn' , _this.$).css({
          	'position' :　'fixed',
          	top : 'auto',
          	bottom : 0
          });
        },600)
         $('#main').hide();
       /* $('<div class="smask" style="position:fixed;width:100%; height:100%; background:#fff; z-index:99;left:0; top: 0;"></div>')
        .on('touchmove',function(e){
        	e.preventDefault();
        })
        .appendTo('body');*/
       /* $('body').css('overflow','hidden').on('touchmove.cartype',function(e){
        	e.preventDefault();
        })*/
        return this;
    },
    showBrand : function(){
        this.$.find('.brand-select').addClass('in');
        this.$.find('.series-select').removeClass('in');
        
        return this;
    },
    showSeries : function(){
        this.$.find('.brand-select').removeClass('in');
        this.$.find('.series-select').addClass('in');
        return this;
    },
    setValue : function( o ){
        var _this = this;
        if( _this.$hiddenInput.length ){
            var val = o.text.join('');
            _this.$input.val(val).text(val);
            _this.$hiddenInput.val( o.val.join(',') );
        }
        else{
            var val = o.text.join(',');
            _this.$input.val((val || '不限')).text((val || '不限'));
        }
        return this;
    },
    addLabel :function( elem , brand ){
        var _this = this;
        var id , name , url ;

        if( brand ){
        	id = parseInt(Math.random() * 1000);
       	 	name = elem.value ;
       	 	url = elem.key ;
       	 	_this.val[0] = brand.key;
       	 	_this.text[0] = brand.value;
        }
        else{
        	 id = $(elem).data('id');
        	 name = $(elem).text();
        	 url = $(elem).data('url');
        }
        
        _this.val[1] = id;
        _this.text[1] = name ;
        
        
        if( _this.options.multiple ){
            var $roll = $('.roll-box' , this.$ );

            var $items = $roll.children();
            
            if( name == '不限' ){
                if( _this.val[0] == null ){
                    $roll.empty();
                }
                else{
                    $items.each(function(){
                        if( $(this).data('brand-id') == _this.val[0] ){
                            $( this).remove();
                        }
                        if($(this).text() == '不限')
    	                    if( $(this).data('brand-id') == 'undefined' || ($(this).data('brand-id') == _this.val[0] && $(this).data('id') == 'undefined') ){
    	                    	$(this).remove();
    	                    }
                    })
                }
                $(elem).closest('ul').find('.select_disabled').removeClass('select_disabled')
            }
            else{
                $items.each(function(){
                	
	                    if( $(this).data('brand-id') == 'undefined' || ($(this).data('brand-id') == _this.val[0] && $(this).data('id') == 'undefined') ){
	                    	$(this).remove();
	                    }
               })
                $(elem).closest('ul').find('.unlimit').removeClass('select_disabled')
            }
            
            if( $roll.children().length > 4 ){
               	if( !this.$tip ){
               		this.$tip = $('<div style="width: 200px; min-width: 100px; opacity: 0; color: rgb(255, 255, 255); line-height: 30px; text-align: center; border-radius: 8px; position: fixed; top: 50%; left: 50%; margin-left: -100px; z-index: 9999; transition: -webkit-transform 0.5s ease-in, opacity 0.5s ease-in; background-color: rgba(0, 0, 0, 0.701961);">最多选择5个品牌车系哦~！</div>')
   	            	.appendTo('body').css('opacity' ,1);
   	           	
   	            	setTimeout(function(){
   	            		_this.$tip.remove();
   	            		_this.$tip = null ;
   	            	},500)
               	}
   	            	
                   return ;
               }
           
            var brand = $(elem).closest('.series-select').find('h3.js_back_brand').data('url');
            $(elem).parent().addClass('select_disabled');
            if( _this.text[0] && _this.text[1] == '不限'){
            	_this.text.splice(1,1);
            }
        
            var $e = $('<a data-value="'+  url +'" data-id="'+ _this.val[1] +'" data-brand-id="'+  _this.val[0] +'" data-brand-url="'+ brand +'" href="javascript:void(0)"><span>'+( this.text[0] ? _this.text.join('') : _this.text[1] )+'</span><i class="i-close"></i></a>')
            .appendTo($roll);

            if( name == '不限' && _this.val[0] == null ){
                _this.setInputValue().hide();
                $e.remove();
                if( !_this.options.preventSubmit ){
                	$("#searchForm").submit();
                }
                return ;
            }
            
            if($roll.children().length >= 1){
            	$('.choose-already' , this.$ ).show();
            }
        }
        else{
            _this.setValue({ val : _this.val , text: _this.text });
            _this.showBrand().hide();
        }

        _this.trigger('selectedSeries', { id : id  , name : name , url : $(elem).data('url')  });
        return this;
    },
    bindBrandEvent : function(e) {
        var _this = this;

        $('.brand-select', _this.$).on('click', '.row a,ul li a',brandClick);
        function brandClick(e) {

            var params = {};
            params.id = 'series';
            params.brand = $(this).data('url');
            params.url = $(this).data('url');
            params.name = $(this).text();
            _this.val = [] ;
            _this.text = [];
            if( $(this).text() == '不限' ){
                _this.addLabel( this );
                return ;
            }

            $.ajax({
                type: 'post',
                url: '/ajax/Postscreen/index',
                data: params,
                dataType: 'json',
                success: function(data){
                    if (data) {
                        $('.brand-select' , _this.$ ).removeClass('in')
                            var $series = $('.series-select' , _this.$ );
                       $series.addClass('in').find('.js_back_brand').html( "&nbsp;" + params.name );;
                        $series.find('.js_back_brand').data('url' , params.url )
                        var html = '';

                        if( _this.options.multiple ){
                            html += '<li class="unlimit"><a href="javascript:void(0);">不限</a></li>';

                        }

                        for(var i = 0 ; i < data.data.length ; i++ ){
                            var item = data.data[i];
                            /*if (typeof( data.brand.unlimit)!="undefined" && data.brand.unlimit){
                                html += '<li class="unlimit"><a href="javascript:void(0);">不选</a></li>'
                            }
                            else{*/
                            item.id = parseInt(Math.random() * 1000);
                                html += ' <li><a href="javascript:void(0);" data-id="'+ item.id +'" data-url="'+ item.key +'">'+ item.value +'</a></li>'
                            //}
                        }
                        $series.find('ul').html(html);
                        
                        
                        $('.roll-box' ,_this.$submitBar).children().each(function(){
                        	var $elm;
                        	if( $(this).data('value') == null ){
                        		$elm = $('.series-select' ,_this.$).find('.unlimit');
                                
                        	}
                        	else{
                        		$elm = $('.series-select' ,_this.$).find('[data-url="'+ $(this).data('value') +'"]').parent();
                        	}
                        	$elm.addClass('select_disabled');
                            
                        })
                        
                        _this.$.scrollTop(0);
                        _this.bindSeriesEvent();
                        _this.val.push(params.brand) ;
                        _this.text.push( params.name ) ;
                        _this.trigger('selectedBrand', { id : params.brand , name : params.name , icon : ''  , url :  params.url })
                    }
                },
                error: function(xhr, type){
                    alert('网络异常，未请求到数据，请检查网络或重试');
                }
            });
        }
        $('.series-select', _this.$).on('click', '.js_back_brand',function(){
            _this.showBrand();
           var top = $('.brand-select' , _this.$).find('[data-url='+ $(this).data('url') +']').offset().top;
            _this.$.scrollTop( top );
        }).on('click', 'a',function(){
            if( $(this).parent().hasClass('select_disabled') ){
                return ;
            }

            _this.addLabel( this );

        });
        return this;
    }
})

module.exports = carType;

