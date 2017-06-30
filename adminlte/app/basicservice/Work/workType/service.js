/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module( 'basicservice.Work.workType.service',[])
    .service('work', [ "$http", "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.get = function( currentPage , pageSize ,  searchData ){
            var  searchData = searchData || '',currentPage = currentPage || 0, pageSize = pageSize || 10;
            return $http.post( MBS_DOMAIN + '/Basicservice/Work/typeList/' + currentPage + '/'+ pageSize ,searchData);
        }
        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/Basicservice/Work/addWorkType' , item );
        }
        this.remove = function(){
            return $http.get();
        }
    }])
