angular.module('basicservice.Msg.countList.filter',["basicservice.Msg.countList.config"])
    .filter('smsstatusFilter', ["smsstatus",function(smsstatus) {
        return function(val) {

            var smsstatusList = smsstatus();

            for (var index in smsstatusList) {
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