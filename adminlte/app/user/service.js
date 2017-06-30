angular.module('user.service', [])

// A RESTful factory for retrieving contacts from 'contacts.json'
    .service('service.user', ['$http', 'utils', function ($http, utils) {
        var path = 'app/user/data.json';
        var contacts = $http.get(path).then(function (resp) {
            return resp.data;
        });

        var factory = {};
        factory.all = function () {
            return contacts;
        };
        factory.get = function (id) {
            return contacts.then(function () {
                return utils.findById(contacts, id);
            })
        };
        return factory;
    }]);
