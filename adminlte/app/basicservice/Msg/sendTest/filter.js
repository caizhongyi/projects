angular.module('basicservice.Msg.sendTest.filter',["basicservice.Msg.sendTest.config"])
    .filter('channelFilter', ["channelC",function(channelC) {
    return function(val) {

        var channelList = channelC();

        for (var index in channelList) {
            if (channelList[index].type == val) {
            	return channelList[index].channel;
            }
        }

        return '未定义';
    }
    }])
    .filter('numberFilter', ["channelC",function(channelC) {
    return function(val) {

        var channelList = channelC();

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
    .filter('relayFilter', ["channelC",function(channelC) {
    return function(val) {

        var channelList = channelC();

        for (var index in channelList) {
            if (channelList[index].type == val) {
            	return channelList[index].relay;
            }
        }

        return '未定义';
    }
    }])
    .filter('firstFilter', ["channelC",function(channelC) {
    return function(val) {

        var channelList = channelC();

        for (var index in channelList) {
            if (channelList[index].type == val) {
            	return channelList[index].first;
            }
        }

        return '未定义';
    }
    }])
    ;