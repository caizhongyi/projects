angular.module('utils.filter', [])
    /**
     * 格式化时间
     * {{ date ||  dateFormat }}
     * */
    .filter('dateFormat', ["$filter", function ($filter) {
        return function (val) {
            var dateFilter = $filter('date');
            return dateFilter(val, 'yyyy-MM-dd')
        }
    }])
    /**
     * 格式化金钱
     * {{ price || price }}
     * */
    .filter('price', ["$filter", "$sce", function ($filter, $sce) {
        return function (val, classes) {
            var pos = 2;
            if (val) {
                if (classes) {
                    var res = '<span class="' + classes + '">' + $filter('number')(val, pos) + ' 元' + '</span>';
                    return $sce.trustAsHtml(res);
                }
                else
                    return $filter('number')(val, pos)
            }
            else {
                if (classes) {
                    return $sce.trustAsHtml("&mdash;&mdash;");
                }
                else {
                    return "——";
                }
            }
        }
    }])
    /**
     * 转义html
     * {{ html || trust }}
     * */
    .filter('trust', ["$filter", "$sce", function ($filter, $sce) {
        return function ( val ) {
            return $sce.trustAsHtml( val );
        }
    }])