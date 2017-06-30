angular.module('change.user.index.filter',[])
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
    });
