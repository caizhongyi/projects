angular.module('change.trade.index.filter',[])
    .filter('reason', function() {
        return function(reason) {
            if (reason=='B') {
                return 'B-转出';
            } else if(reason=='c')  {
                return 'C-被盗抢';
            } else if(reason=='D'){
                return 'D-停行';
            } else if(reason=='E'){
                return 'E-注销';
            } else if(reason=='G'){
                return 'G-违章';
            } else if(reason=='H'){
                return 'H-海关监管';
            } else if(reason=='I'){
                return 'I-事故未处理';
            } else if(reason=='K'){
                return 'K-查封';
            } else if(reason=='M'){
                return 'M-强制注销';
            } else if(reason=='O'){
                return 'O-锁定';
            }
        }
    });
