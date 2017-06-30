angular.module('change.picture.index.filter',[])
    .filter('status', function() {
        return function(order_statsus) {
            if (order_statsus=='0') {
                return '未付款';
            } else if(order_statsus=='1')  {
                return '已付款';
            } else if(order_statsus=='2'){
                return '办理中';
            S} else if(order_statsus=='3'){
                return '已完成';
            } else if(order_statsus=='4'){
                return '退款中';
            } else if(order_statsus=='5'){
                return '已退款';
            }else{
                return '未定义';
            }
        }
    }).filter('satisfactions', function() {
        return function(satisfaction) {
            switch (Number(satisfaction)) {
                case 1 :
                    return '非常不满意（1分）';
                case 2 :
                    return '不满意（2分）';
                case 3 :
                    return '一般（3分）';
                case 4 :
                    return '满意（4分）';
                case 5 :
                    return '很满意（5分）';
                default :
                    return '未定义';
            }
        }
    });
