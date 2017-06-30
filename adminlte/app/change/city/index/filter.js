angular.module('change.city.index.filter',[])
  .filter('trustHtml', function ($sce) {

        return function (input) {

            return $sce.trustAsHtml(input);

        }

    }); 
