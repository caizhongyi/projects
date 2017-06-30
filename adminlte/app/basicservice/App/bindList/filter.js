angular.module('basicservice.App.bindList.filter',["basicservice.App.bindList.config"])
    .filter('bindtrunkFilterA', ["bindtrunkB",function(bindtrunkB) {
        return function(val) {
            var trunkList = bindtrunkB();

            for (var index in trunkList) {
                if (trunkList[index].type == val) {
                    return trunkList[index].name;
                }
            }
        }
    }])
    .filter('bindhangupFilter', ["hangup",function(hangup) {
        return function(val) {

            var hangupList = hangup();

            for (var index in hangupList) {
                if (hangupList[index].type == val) {
                    return hangupList[index].name;
                }
            }

            return '未定义';
        }
    }])
    .filter('bindissyncFilter', ["issync",function(issync) {
        return function(val) {
        	val = (val == '0')?2:val;
            var issyncList = issync();

            for (var index in issyncList) {
                if (issyncList[index].type == val) {
                    return issyncList[index].name;
                }
            }

            return '未定义';
        }
    }])
    .filter('bindtimefixFilter', function(){
        return function(val){
        	if(!isNaN(val)){
        		if(val < 61) {
        			return val+"''";
        		}
        		var remainder = val%60;
        		var valInt    = Math.floor(val/60);
        		if(remainder == '0') {
        			valInt        = valInt+"'";
        		} else {
        			valInt        = valInt+"'"+remainder;
        		}
        		return valInt;
        	} else {
        		return '无';
        	}
        }
    })
    .filter('addurlFilter', function(){
        return function(val){
        	if(val && val != 0) {
        		return true;
        	} else {
        		return false;
        	}
        }
    })
    .filter('urlnoneFilter', function(){
        return function(val){
        	if(!val || val == 0) {
        		return '无';
        	} else {
        		return '';
        	}
        }
    });