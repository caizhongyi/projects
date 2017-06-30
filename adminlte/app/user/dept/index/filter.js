angular.module('user.dept.index.filter', ['utils.service'])

    .filter('xxxxx', ["area",function(area) {

        return function(id) {
            var name = '';
            area.province().success(function(result) {
                if (result.code == 0) {

                    for (var i=0; i < result.data.length; i++) {
                        if ( Number(result.data[i].id)  == Number(id)) {
                            name = result.data[i].name;
                            break;
                        }
                    }
                }
            });

            return name;
        }
    }])

    .filter('city', function() {
        return function(status) {

        }
});
