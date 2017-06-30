angular.module('basicservice.ExtPhone.pool58List.filter',["basicservice.ExtPhone.pool58List.config"])
    .filter('source58Filter', ["sourceArr58",function(sourceArr58) {
        return function(val) {
            var sourceList = sourceArr58();
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