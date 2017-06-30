angular.module('basicservice.App.dosageRemain.filter',["basicservice.App.dosageRemain.config"])
    .filter('channelFilters', ["channels",function(channels) {
    return function(val) {

        var channelList = channels();

        for (var index in channelList) {
        	
            if (channelList[index].type == val) {
            	return channelList[index].channel;
            }
        }

        return val;
    }
    }])
    .filter('channelFilterM', ["channelM",function(channelM) {
    return function(val) {

        var channelList = channelM();

        for (var index in channelList) {
            if (channelList[index].type == val) {
            	return channelList[index].channel;
            }
        }

        return '未定义';
    }
    }])
    .filter('firstFilters', ["typeTranslate",function(typeTranslate) {
    return function(val) {

        var channelList = typeTranslate();

        for (var index in channelList) {
            if (channelList[index].type == val) {
            	return channelList[index].channel;
            }
        }

        return '未定义';
    }
    }])
    ;