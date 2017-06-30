angular.module('user.car.recom.filter',[])
    .filter('recomCar', function() {

        return function(status) {
            return status == 1 ? '取消推荐' : '设为推荐车源';
        }

    });
