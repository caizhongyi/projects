angular.module('basicservice.App.addApp.filter',["basicservice.App.addApp.config"])
    /*.filter('infoFilter',["info", function(info) {
        return function(val) {

            var appstatusList = appstatus();

            for (var index in appstatusList) {
                if (appstatusList[index].type == val) {
                    return appstatusList[index].name;
                }
            }

            return '未定义';
        }
    }]);*/
.filter(  
        'to_trusted', ['$sce', function ($sce) {  
            return function (text) {  
                return $sce.trustAsHtml(text);  
            }  
        }]);