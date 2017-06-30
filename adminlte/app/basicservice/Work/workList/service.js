/**
 * @ngdoc service
 * @name
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module( 'basicservice.Work.workList.service',[])
    .service('work', [ "$http", "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.get = function( currentPage , pageSize ,  searchData ){
            var  searchData = searchData || '',currentPage = currentPage || 0, pageSize = pageSize || 10;
            return $http.post( MBS_DOMAIN + '/Basicservice/Work/workList/' + currentPage + '/'+ pageSize ,searchData);
        }
        this.getType = function(){
            return $http.post( MBS_DOMAIN + '/Basicservice/Work/typeInfo/' );
        }
        this.add = function( item ){
            return $http.post(MBS_DOMAIN + '/Basicservice/Work/addWork' , item );
        }
        this.remove = function(){
            return $http.get();
        }
    }])

