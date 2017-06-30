angular.module('basicservice.ExtPhone.pool54List.filter',["basicservice.ExtPhone.pool54List.config"])
    .filter('source54Filter', ["sourceArr54",function(sourceArr54) {
        return function(val) {
            var sourceList = sourceArr54();
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