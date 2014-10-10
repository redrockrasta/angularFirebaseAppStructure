'use strict';
(function () {

    var DataRepositoryService = function ($window) {
        this.window = $window;
        this.userData = {};
        this.clientData = []
    };

    DataRepositoryService.prototype = {

        setUser : function (user) {
            this.userData = user;
            return this;
        }

        , getUser : function () {
            return this.userData;
        }

        , addClient : function (client) {
            var self = this;
            var _add = function (c) {
                var d = _.findWhere(self.clientData, { uid : c.uid});
                if ( _.isEmpty(d)) {
                    self.clientData.push(c);
                    return;
                }

                d = c;
            }

            if (_.isArray(client)) {

                _.each (client, function (c) {
                    _add(c);
                });

                return this;
            }

            _add(client);
            return this;
        }

        , getClientById : function (id) {
            var client = _.findWhere(this.clientData, { uid : id});
            return (_.isEmpty(client)) ? false : client;
        }

    };

    angular.module('SwayChat.DataRepository',['ng'])
           .service('DataRepository', ['$window', DataRepositoryService]);

})();
