angular.module( 'basicservice.Work.workDetail.service',[])
    .service('workDetail', [ "$http", "MBS_DOMAIN" , function( $http , MBS_DOMAIN){
        this.get = function(id){
            return $http.post( MBS_DOMAIN + '/Basicservice/Work/workDetail/',{ id : id } );
        }

        this.update = function( item ){
            return $http.post(MBS_DOMAIN + '/Basicservice/Work/addWork' , item );
        }
    }])
