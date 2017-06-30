angular.module('basicservice.ExtPhone.cdrList.filter',["basicservice.ExtPhone.cdrList.config"])
    .filter('trunkFilter', ["trunk",function(trunk) {
        return function(val) {
        	var caller    = val.caller;
        	var called    = val.called;
        	var val       = val.trunk;
            var trunkList = trunk();

            for (var index in trunkList) {
                if (trunkList[index].type == val) {
                    return trunkList[index].name;
                }
            }
            
            var re = /^IVR\_FAIL\_/g;  
            if ((arr = re.exec(val)) != null) {
            	
            	for (var index in trunkList) {
                    if (trunkList[index].type == called) {
                        return trunkList[index].name;
                    }
                }
            	
            	return '未定义';
            }
            
            var reA = /^80/g;
            var reB = /^81/g;
            if ((arr = reA.exec(caller)) != null) {
            	return '273客服中心';
            } else if ((arr = reB.exec(caller)) != null) {
            	return '优车到';
            }
            
            return '未定义';
        }
    }])
    .filter('hangupFilter', ["hangup",function(hangup) {
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
    .filter('issyncFilter', ["issync",function(issync) {
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
    .filter('timefixFilter', function(){
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