angular.module('basicservice.ExtPhone.pool53List.filter',["basicservice.ExtPhone.pool53List.config"])
    .filter('source53Filter', ["sourceArr53",function(sourceArr53) {
        return function(val) {
            var sourceList = sourceArr53();
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