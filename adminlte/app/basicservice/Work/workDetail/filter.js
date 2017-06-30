angular.module('basicservice.Work.workDetail.filter',["basicservice.Work.workDetail.config"])
    .filter('worktypeFilter', ["worktype",function(worktype) {
        return function(val) {

            var worktypeList = worktype();

            for (var index in worktypeList) {
                if (worktypeList[index].type == val) {
                    return worktypeList[index].name;
                }
            }

            return '未定义';
        }
    }]);