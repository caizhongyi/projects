angular.module('change.businfo.index.filter',[])
    .filter('type', function() {
        return function(giste_type) {
            if (giste_type=='1') {
                return '个人';
            } else if(giste_type=='2')  {
                return '办证人员';
            } else if(giste_type=='3'){
                return '二手车商';
            }

        }
    }).filter('userstatus', function() {
        return function(status) {
            switch (Number(status)) {
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
