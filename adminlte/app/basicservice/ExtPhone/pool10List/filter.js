angular.module('basicservice.ExtPhone.pool10List.filter',["basicservice.ExtPhone.pool10List.config"])
    .filter('source10Filter', ["sourceArr10",function(sourceArr10) {
        return function(val) {
            var sourceList = sourceArr10();
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