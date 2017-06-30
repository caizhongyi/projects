angular.module('change.product.index.filter',[])
    .filter('flows_status', function() {
        return function(flows) {
            if (flows=='0') {
                return '否';
            } else if(flows=='1')  {
                return '是';
            }else{
                return '未定义';
            }

        }
    }).filter('userstatus', function(userStatus) {
        return function(status) {

            var statusList = userStatus();

            for (var index in statusList) {
                if (statusList[index].type == status) {
                    return statusList[index].name;
                }
            }

            return '未定义';
        }
}) .filter('status', function() {
        return function(status) {
            if (status=='0') {
                return '禁用';
            } else if(status=='1')  {
                return '启用';
            }else{
                return '未定义';
            }

        }
    }).filter('types', function() {
        return function(type) {
            if (type=='1') {
                return '代办费';
            } else if(type=='2')  {
                return '车管所固定费用';
            }else{
                return '未定义';
            }

        }
    })

;
