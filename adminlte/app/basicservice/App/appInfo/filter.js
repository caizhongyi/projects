angular.module('basicservice.App.appInfo.filter',["basicservice.App.appInfo.config"])
    .filter('appFilter',["app", function(app) {
        return function(val) {

            var appList = app();

            for (var index in appList) {
                if (appList[index].type == val) {
                    return appList[index].name;
                }
            }

            return '未定义';
        }
    }]);