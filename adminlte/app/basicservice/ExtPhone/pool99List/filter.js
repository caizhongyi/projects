angular.module('basicservice.ExtPhone.pool99List.filter',["basicservice.ExtPhone.pool99List.config"])
    .filter('source99Filter', ["sourceArr99",function(sourceArr99) {
        return function(val) {
            var sourceList = sourceArr99();
            for (var index in sourceList) {
                if (val == sourceList[index].type) {
                    return sourceList[index].name;
                }
            }
            return '未定义';
        }
    }])
    .filter('statusFilter', ["statusArr",function(statusArr) {
        return function(val) {
            var statusList = statusArr();
            for (var index in statusList) {
                if (val == statusList[index].type) {
                    return statusList[index].name;
                }
            }
            return '未定义';
        }
    }]);