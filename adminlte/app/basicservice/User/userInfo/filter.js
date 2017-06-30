angular.module('basicservice.User.userInfo.filter',[])
    .filter('userstatus', ["userStatus",function(userStatus) {
        return function(status) {

            var statusList = userStatus();

            for (var index in statusList) {
                if (statusList[index].type == status) {
                    return statusList[index].name;
                }
            }

            return '未定义';
        }
    }]);
