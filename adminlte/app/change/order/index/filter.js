angular.module('change.order.index.filter',[])
    .filter('status', function() {
        return function(order_status) {
            if (order_status=='0') {
                return '未付款';
            } else if(order_status=='1')  {
                return '己付款';
            } else if(order_status=='2')  {
                return '办理中';
            } else if(order_status=='3')  {
                return '已完成';
            } else if(order_status=='4')  {
                return '退款中';
            } else if(order_status=='5'){
                return '已退款';
            }else{
                return '未定义';
            }

        }
    });
