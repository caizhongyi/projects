
util.namespace("com.util.ajax");
/**
* ajax 工具类
* 
*/
com.util.ajax = function(){
	
}

com.util.ajax.prototype = {
	get: function(params){
		this.ajaxJson($.extend({type:"GET"}, params));
	},
	post: function(params){
		this.ajaxJson($.extend({type:"POST"}, params));
	},
	ajax: function(params){
		var successFun = params.success;
		var errorFun = params.success;
		var finalParams = {success: function(result){
			successFun(result);
		},
		error: function(result){
			errorFun(result);
		}};
		console.dir(params.data);
		$.ajax($.extend({cache : false}, params, finalParams));
    },
	ajaxJson: function(params){
		var defaultParams = {dataType: 'json', error: function(){
			$.error_pop("温馨提示", "请求失败！");
		}};
		params = $.extend(defaultParams, params);
		params.url = util.getAbsPath(params.url);
		this.ajax(params);
    }
}

var ajaxUtils = new com.util.ajax();