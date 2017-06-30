angular.module('basicservice.ExtPhone.pool52List.filter',["basicservice.ExtPhone.pool52List.config"])
    .filter('source52Filter', ["sourceArr52",function(sourceArr52) {
        return function(val) {
            var sourceList = sourceArr52();
            console.log(sourceList)
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