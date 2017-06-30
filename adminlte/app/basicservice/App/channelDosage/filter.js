angular.module('basicservice.App.channelDosage.filter',["basicservice.App.channelDosage.config"])
    .filter('channelFilter', ["channelF",function(channelF) {
    return function(val) {

        var channelList = channelF();

        for (var index in channelList) {
            if (channelList[index].type == val) {
            	return channelList[index].channel;
            }
        }

        return '未定义';
    }
    }])
    .filter('numberFilter', ["channelF",function(channelF) {
    return function(val) {

        var channelList = channelF();

        for (var index in channelList) {
            if (channelList[index].type == val) {
            	if(val == 'ucpaas' || val == 'qingmayun') {
            		return channelList[index].number;
            	} else {
            		return val;
            	}
            	
            }
        }

        return '未定义';
    }
    }])
    .filter('relayFilter', ["channelF",function(channelF) {
    return function(val) {

        var channelList = channelF();

        for (var index in channelList) {
            if (channelList[index].type == val) {
            	return channelList[index].relay;
            }
        }

        return '未定义';
    }
    }])
    .filter('firstFilter', ["channelF",function(channelF) {
    return function(val) {

        var channelList = channelF();

        for (var index in channelList) {
            if (channelList[index].type == val) {
            	return channelList[index].first;
            }
        }

        return '未定义';
    }
    }])
    ;