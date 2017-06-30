angular.module('basicservice.Transfer.transferList.filter',["basicservice.Transfer.transferList.config"])
    .filter('statusFilter', ["status",function(status) {
        return function(val) {

            var statusList = status();

            for (var index in statusList) {
                if (statusList[index].type == val) {
                    return statusList[index].name;
                }
            }

            return '未定义';
        }
    }]);