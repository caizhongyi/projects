angular.module('basicservice.Work.workList.filter',["basicservice.Work.workList.config"])
    .filter('workstatusFilter', ["workstatus",function(workstatus) {
        return function(val) {

            var workstatusList = workstatus();

            for (var index in workstatusList) {
                if (workstatusList[index].type == val) {
                    return workstatusList[index].name;
                }
            }

            return '未定义';
        }
    }])
    .filter('workstatusFilter', ["workstatus",function(workstatus) {
        return function(val) {

            var workstatusList = workstatus();

            for (var index in workstatusList) {
                if (workstatusList[index].type == val) {
                    return workstatusList[index].name;
                }
            }

            return '未定义';
        }
    }]);
