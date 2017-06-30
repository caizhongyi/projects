angular.module('change.appraise.index.filter',[])
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
