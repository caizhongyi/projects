angular.module('utils.filter', [])
    .filter('dateFormat', ["$filter", function ($filter) {
        return function (val) {
            var dateFilter = $filter('date');
            return dateFilter(val, 'yyyy-MM-dd')
        }
    }])
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