angular.module('basicservice.Msg.msgList.filter',["basicservice.Msg.msgList.config"])
    .filter('smsstatusFilter', ["smsstatus",function(smsstatus) {
        return function(val) {

            var smsstatusList = smsstatus();

            for (var index in smsstatusList) {
            	if(val == '0') {
            		val = '100';
            	}
                if (smsstatusList[index].type == val) {
                    return smsstatusList[index].name;
                }
            }

            return '未定义';
        }
    }])
    .filter('msgchannelFilter', ["msgchannel",function(msgchannel) {
    return function(val) {

        var msgchannelList = msgchannel();

        for (var index in msgchannelList) {
            if (msgchannelList[index].type == val) {
                return msgchannelList[index].name;
            }
        }

        return '未定义';
    }
    }]);