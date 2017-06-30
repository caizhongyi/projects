

angular.module('app.utils.service', [

])
  /*  .factory('factory.utils', function () {
        return {
            // Util for finding an object by its 'id' property among an array
            findById: function findById(a, id) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].id == id) return a[i];
                }
                return null;
            },

            // Util for returning a random key from a collection that also isn't the current key
            newRandomKey: function newRandomKey(coll, key, currentKey){
                var randKey;
                do {
                    randKey = coll[Math.floor(coll.length * Math.random())][key];
                } while (randKey == currentKey);
                return randKey;
            }
        };
    })*/
    .service('utils', ['$http', function ( $http ) {
        this.getToken = function() {
            return $http.get('http://mbs.273.cn/User/Oauth/getToken/token/1?username=testclient&pwd=testpass&type=client_credentials');
        };
        this.login = function( user ) {
            return $http.post('http://mbs.273.cn/User/Users/login/access_token/' + user.token , user );
            // return $http({ url : 'http://mbs.273.cn/User/Users/login/access_token/' + user.token,  method : 'post', data : user });
        };
        this.islogin = function( username ){
            return $http.get('http://mbs.273.cn/User/Users/login/access_token/1?username=' + username )
        }
        this.getUserInfo = function( id ){
            return $http.get('http://mbs.273.cn/User/Users/personalData?id=' + id )
        }
        this.getCurrentCodes = function( user ){
            return $http.get('http://mbs.273.cn/Acl/Index/getCurrentCodes/'+ user.id)
        }
        this.signout = function( id ){}

        this.notice = function(){
            return $http.get('http://mbs.273.cn/User/Friends/getFocusNotice/access_token/1')
        }
    }])
    /*.filter('fillname', function () {
        return function(person, sep) {
            sep = sep || " ";
            person = person || {};
            person.first = person.first || "";
            person.last = person.last || "";
            return person.first + sep + person.last;
        };
    });*/

