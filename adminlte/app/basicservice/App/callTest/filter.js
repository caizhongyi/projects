angular.module('basicservice.App.callTest.filter',["basicservice.App.callTest.config"])
    .filter('channelFilter', ["channel",function(channel) {
    return function(val) {

        var channelList = channel();

        for (var index in channelList) {
            if (channelList[index].type == val) {
            	return channelList[index].channel;
            }
        }

        return '未定义';
    }
    }])
    .filter('numberFilter', ["channel",function(channel) {
    return function(val) {

        var channelList = channel();

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
    .filter('relayFilter', ["channel",function(channel) {
    return function(val) {

        var channelList = channel();

        for (var index in channelList) {
            if (channelList[index].type == val) {
            	return channelList[index].relay;
            }
        }

        return '未定义';
    }
    }])
    .filter('firstFilter', ["channel",function(channel) {
    return function(val) {

        var channelList = channel();

        for (var index in channelList) {
            if (channelList[index].type == val) {
            	return channelList[index].first;
            }
        }

        return '未定义';
    }
    }])
    ;