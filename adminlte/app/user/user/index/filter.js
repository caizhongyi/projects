angular.module('user.user.index.filter',[])
    .filter('gender', function() {
        return function(sex) {
            if (sex) {
                return sex == 1 ? '男' : '女';
            } else {
                return '';
            }
        }
    }).filter('userstatus', ["userStatus",function(userStatus) {
        return function(status) {

            var statusList = userStatus();

            for (var index in statusList) {
                if (statusList[index].type == status) {
                    return statusList[index].name;
                }
            }

            return '未定义';
        }
    }]).filter('fromtype',["fromType", function(fromType) {
        return function(status) {
            var fromTypeList = fromType();

            for (var index in fromTypeList) {
                if (fromTypeList[index].type == status) {
                    return fromTypeList[index].name;
                }
            }

            return '未定义';
        }
    }]);
