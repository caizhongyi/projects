angular.module('user.car.index.filter',[])
    .filter('gender', function() {
        return function(sex) {
            if (sex) {
                return sex == 1 ? '男' : '女';
            } else {
                return '';
            }
        }
    }).filter('userstatus', function() {
        return function(status) {
            switch (status) {
                case 1 :
                    return '正常';
                case 2 :
                    return '离职';
                case 4 :
                    return '休长假';
                case 9 :
                    return '暂停';
                case 10 :
                    return '黑名单';
                case 101 :
                    return '驳回';
                case 0 :
                    return '未知';
                default :
                    return '未定义';
            }
        }
});
