/**
 * @desc 搜索框下拉列表
 * @copyright (c) 2013 273 Inc
 * @author 陈朝阳 <chency@273.cn>
 * @since 2013-12-6
 */

var $ = require('zepto');
var Auto = require('widget/autocomplete/js/autocomplete.js');
var Cookie = require('components/cookie/cookie.js');

var Match = exports;

//绑定搜索框提交事件，记录搜索历史
$("#search_form").on("submit", function() {
    writeHistory($('#vehicle_search').val());
});

//关键字搜索
var domain = $('#vehicle_search').data('domain');
if (domain == '') {
    domain = 'www';
}

//车源id搜索
$('#vehicle_search').parent('form').submit(function(e) {
    var kw = $('#vehicle_search').val();
    var array = searchAuto.getCookie();
    for( var i = 0 ; i < array.length ; i ++ ){
        if( array[i].text == $('#vehicle_search').val() ){
            return ;
        }
    }
    array.push( { text : kw , count : '' , value : 'http://fz.m.273.cn/car/?kw='+ kw +'/' });
    searchAuto.setCookie(array);
    if (kw == '') {
        e.preventDefault();
        return false;
    }
    // redirect to detail page
    if (/^x?\d{6,}$/.test(kw)) {
        e.preventDefault();
        window.location.href = 'http://' + domain + '.m.273.cn/car/' + kw + '.html';
        return false;
    }
});

var $autocomplete = $('#autocomplete'), $searchHistory = $('.search-history');
var searchAuto = {
    load : function( data ){
        var $ul = $('<ul/>') ;
        for( var i = 0 ; i < data.length ; i ++  ){
            var item = data[i];
            $ul.append('<li data-273-click-log="/wap/autocomplete@etype=click@url='+ item.value +'"><a data-273-click-log="/wap/search/input@etype=click@keyword='+ item.text +'" href="'+ item.value +'">'+ item.text +'</a><span>约'+ item.count +'条车源</span></li>');
        }
        $autocomplete.empty()
        if(data.length > 0){
        	$autocomplete.append($ul).append('<span data-273-click-log="/wap/search/input@etype=click@search=close" class="btn" id="close" data-url="autocomplete">关闭</span>');
        }
        return this;
    },
    history : function(){
        var data = this.getCookie();
        var $ul = $('<ul/>') ;
        for( var i = data.length ; i >= data.length  - 5; i --  ){
        	
            var item = data[i];
            if( item )
            	$ul.append('<li><a href="'+ item.value  +'" data-273-click-log="/wap/search/input@etype=click@keyword='+ item.text + '">'+ item.text + '</a><em>&nbsp;</em></li>');
        }
        $searchHistory.empty();
        if(data.length > 0){
        	$searchHistory.append($ul).append('<span data-273-click-log="/wap/search/input@etype=click@search=close" class="btn" id="clear_history" data-url="autocomplete">清除历史记录</span>');
        }
        return this;
    },
    showHistory : function(){
        $('.js_input_clear,#autocomplete').addClass('hidden').hide();
        $('.search-history').removeClass('hidden').show();
        this.history();
        return this;
    },
    clearHistory: function(){
        var options = {};
        options.domain = '.m.273.cn';
        options.path = '/';
        options.expires = 30;//天
    	
		Cookie.set("keywordHistoryV4", "", options);	//TODO 因v4与v3搜索历史的cookie的格式不同，故添加一后缀命名为keywordHistoryV4
		$('.search-history').html('');
    },
    showAutocomplete : function(){
        $('.js_input_clear,#autocomplete').removeClass('hidden').show();
        $('.search-history,.search-history').addClass('hidden').hide();

        var wd = $('#vehicle_search').val();
        $.ajax({
        	url: "http://data.273.cn/?_mod=AutoCompleteV2&platform=m&domain=" + domain,
        	data: {
        		wd: $('#vehicle_search').val()
        	},
        	dataType: 'jsonp',
        	success: function(result){
        		searchAuto.load(result);
        		return this;
        	},
        	error: function(result){
        		
        	}
        });
    },
    hide : function(){
        $('.js_input_clear,#autocomplete').addClass('hidden').hide();
        $('.search-history,.search-history').addClass('hidden').hide();
        return this;
    },
    getCookie : function(){
        var c = Cookie.get('keywordHistoryV4') || '[]';	//TODO 因v4与v3搜索历史的cookie的格式不同，故添加一后缀命名为keywordHistoryV4
        return JSON.parse(c);
    },
    setCookie : function( data ){
        var options = {};
        options.domain = '.m.273.cn';
        options.path = '/';
        options.expires = 30;//天
        
        return Cookie.set('keywordHistoryV4' , JSON.stringify(data) , options) ;	//TODO 因v4与v3搜索历史的cookie的格式不同，故添加一后缀命名为keywordHistoryV4
    }
}

$('#vehicle_search').on('focus keyup' ,function(){
    $(this).closest('#search').addClass('search-show');

    if( $.trim( $(this).val()) != ''){
   
        searchAuto.showAutocomplete();
    }
    else{
   
    	$('#autocomplete').hide();
        searchAuto.showHistory();
    }
});

$('#search').on('click' ,'#cancel,#close',function(){
    $(this).closest('#search').removeClass('search-show');
    searchAuto.hide();
})

$('#search').on('click' ,'#clear_history',function(){
//	$(this).closest('#search').removeClass('search-show');
	searchAuto.clearHistory();
	searchAuto.hide();
})

$('#autocomplete') .on('click' ,'a',function(){
   var array = searchAuto.getCookie();
   for( var i = 0 ; i < array.length ; i ++ ){
	
       if( array[i].text == $(this).text() ){
           return ;
       }
   }
   array.push( { text : $(this).text() , count : '' , value : $(this).attr('href') });
  
   searchAuto.setCookie(array);
   
   location.reload();
   return false;
})

$('.js_input_clear').click(function(){
    $('#vehicle_search').val('');
    searchAuto.showHistory();
})

//是否是首页，首页多了（index-new类）
var isIndex = $('.index-new').length > 0 ? true : false;
//搜索框聚焦全屏
$('#vehicle_search').focus(function(){
    if (isIndex) {
        $('#search').removeClass('index-new');
    }
    $('#search').addClass('search-show');
    $('#main,#js_top_banner').hide();
});

//取消全屏
$('#cancel').click(function(){
//    autoKeyword.close();
    if (isIndex) {
        $('#search').addClass('index-new');
    }
    $('#search').removeClass('search-show');
    $('.search-history').hide();
    $('#vehicle_search').val('');
    $('.js_input_clear').addClass('hidden');
    $('#main,#js_top_banner').show();
});
