angular.module('basicservice.App.typeInfo.filter',["basicservice.App.typeInfo.config"])
    .filter('appstatusFilter',["appstatus", function(appstatus) {
        return function(val) {

            var appstatusList = appstatus();

            for (var index in appstatusList) {
                if (appstatusList[index].type == val) {
                    return appstatusList[index].name;
                }
            }

            return '已上线';
        }
    }]);