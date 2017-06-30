angular.module('basicservice.ExtPhone.bindList.filter',["basicservice.ExtPhone.bindList.config"])
    .filter('sourceFilter', ["sourceArr",function(sourceArr) {
        return function(val) {
            var sourceList = sourceArr();
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